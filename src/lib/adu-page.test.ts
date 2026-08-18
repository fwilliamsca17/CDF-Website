import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { ADU_COMPARE, ADU_FAQS, ADU_SEO } from "./adu-page.ts";

const here = dirname(fileURLToPath(import.meta.url));

describe("ADU findability copy", () => {
  it("puts private money, hard money, and Los Angeles on title, H1, and lede each", () => {
    const h1 = `${ADU_SEO.h1} ${ADU_SEO.h1Highlight}`.toLowerCase();
    for (const [name, text] of [
      ["title", ADU_SEO.title.toLowerCase()],
      ["h1", h1],
      ["lede", ADU_SEO.lede.toLowerCase()],
    ] as const) {
      assert.match(text, /private money|private-money/, name);
      assert.match(text, /hard money|hard-money/, name);
      assert.match(text, /los angeles/, name);
    }
    assert.match(ADU_SEO.lede, /75–85%|75-85%/);
    assert.match(ADU_SEO.lede, /9\.5/);
  });

  it("answers the two People-also-ask queries without inventing rates", () => {
    const questions = ADU_FAQS.map((f) => f.question.toLowerCase());
    assert.ok(
      questions.some((q) => q.includes("requirements") && q.includes("los angeles"))
    );
    assert.ok(questions.some((q) => q.includes("calhfa")));
    const grant = ADU_FAQS.find((f) => /calhfa/i.test(f.question));
    assert.ok(grant);
    assert.match(grant.answer, /December 28, 2023/);
    assert.match(grant.answer, /scam/i);
    assert.doesNotMatch(grant.answer, /6–12%|6-12%/);
    assert.doesNotMatch(ADU_SEO.lede, /\$4\s*million|no equity required/i);
  });

  it("contrasts CalHFA and HELOC with CDF private money", () => {
    const paths = ADU_COMPARE.map((r) => r.path);
    assert.ok(paths.some((p) => /calhfa/i.test(p)));
    assert.ok(paths.some((p) => /heloc/i.test(p)));
    assert.ok(paths.some((p) => /cdf private money/i.test(p)));
  });

  it("ships title and FAQPage wiring on the live route files", () => {
    const layout = readFileSync(
      join(here, "../app/adu-loans/layout.tsx"),
      "utf8"
    );
    const page = readFileSync(join(here, "../app/adu-loans/page.tsx"), "utf8");
    assert.match(layout, /AduLoanSchema/);
    assert.match(layout, /ADU_SEO/);
    assert.match(page, /ADU_FAQS/);
    assert.match(page, /adu-lede/);
  });
});
