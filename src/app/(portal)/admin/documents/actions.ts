"use server";

import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import { asNullableString, asString, requireAdminAction } from "../admin-utils";

const MAX_FILE_BYTES = 12 * 1024 * 1024;
const BUCKET = "loan-docs";

function extensionFor(file: File) {
  if (file.type === "application/pdf") return "pdf";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/jpeg") return "jpg";
  return null;
}

async function sanitizeFile(file: File) {
  const ext = extensionFor(file);
  if (!ext) throw new Error("Upload a PDF, JPEG, PNG, or WebP file");
  if (file.size > MAX_FILE_BYTES) throw new Error("Document must be 12 MB or smaller");

  const raw = Buffer.from(await file.arrayBuffer());
  if (file.type.startsWith("image/")) {
    // sharp strips metadata by default when writing output buffers.
    return {
      data: await sharp(raw, { failOn: "none" }).rotate().toBuffer(),
      contentType: file.type,
      ext,
    };
  }
  return { data: raw, contentType: "application/pdf", ext };
}

async function ensureBucket(service: ReturnType<typeof createSupabaseServiceClient>) {
  const { data } = await service.storage.getBucket(BUCKET);
  if (!data) {
    const { error } = await service.storage.createBucket(BUCKET, { public: false });
    if (error && !String(error.message).toLowerCase().includes("already exists")) {
      throw new Error(error.message);
    }
  }
}

export async function uploadLoanDocument(formData: FormData) {
  const { user } = await requireAdminAction();
  const service = createSupabaseServiceClient();
  const loan_ref = asString(formData.get("loan_ref"));
  const title = asString(formData.get("title"));
  const visibility = asString(formData.get("visibility"));
  const file = formData.get("file");

  if (!loan_ref || !title) throw new Error("Loan ref and title are required");
  if (!["borrower", "investor", "both"].includes(visibility)) {
    throw new Error("Select document visibility");
  }
  if (!(file instanceof File) || file.size === 0) throw new Error("Upload a document");

  const sanitized = await sanitizeFile(file);
  await ensureBucket(service);

  const storage_path = `phase0/${loan_ref}/${crypto.randomUUID()}.${sanitized.ext}`;
  const { error: uploadError } = await service.storage.from(BUCKET).upload(storage_path, sanitized.data, {
    contentType: sanitized.contentType,
    upsert: false,
  });
  if (uploadError) throw new Error(uploadError.message);

  const { error } = await service.from("loan_documents").insert({
    loan_ref,
    title,
    description: asNullableString(formData.get("description")),
    storage_path,
    visibility,
    uploaded_by: user.id,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/documents");
  revalidatePath("/loans");
  revalidatePath("/portfolio");
}
