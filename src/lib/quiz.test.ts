import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  applyQuizBack,
  applyQuizSelection,
  CONTACT_STEP,
  questionForStep,
  QUIZ_QUESTIONS,
} from "./quiz.ts";

const here = dirname(fileURLToPath(import.meta.url));

describe("applyQuizSelection", () => {
  it("advances from property type to property use", () => {
    const result = applyQuizSelection({
      step: 1,
      field: "property_type",
      value: "commercial",
      answers: {},
    });
    assert.equal(result.accepted, true);
    if (!result.accepted) return;
    assert.equal(result.step, 2);
    assert.equal(result.answers.property_type, "commercial");
    assert.equal(questionForStep(result.step)?.field, "property_use");
    assert.notEqual(
      questionForStep(result.step)?.question,
      questionForStep(1)?.question
    );
  });

  it("rejects a stale-panel click whose field is not the live step", () => {
    const result = applyQuizSelection({
      step: 3,
      field: "property_use",
      value: "investment",
      answers: { property_type: "commercial", property_use: "investment" },
    });
    assert.deepEqual(result, { accepted: false });
  });

  it("walks all five questions to the contact step", () => {
    const path: Array<{ field: "property_type" | "property_use" | "timeline" | "equity" | "goal"; value: string }> = [
      { field: "property_type", value: "commercial" },
      { field: "property_use", value: "investment" },
      { field: "timeline", value: "exploring" },
      { field: "equity", value: "moderate" },
      { field: "goal", value: "advice" },
    ];

    let step = 1;
    let answers = {};
    for (const [index, choice] of path.entries()) {
      const live = questionForStep(step);
      assert.ok(live, `missing question at step ${step}`);
      assert.equal(live.field, choice.field);
      const result = applyQuizSelection({
        step,
        field: choice.field,
        value: choice.value,
        answers,
      });
      assert.equal(result.accepted, true, `rejected live answer at step ${index + 1}`);
      if (!result.accepted) return;
      step = result.step;
      answers = result.answers;
    }

    assert.equal(step, CONTACT_STEP);
    assert.equal(questionForStep(step), null);
    assert.equal(CONTACT_STEP, QUIZ_QUESTIONS.length + 1);
    assert.equal(CONTACT_STEP, 6);
  });

  it("does not advance past the contact step", () => {
    const result = applyQuizSelection({
      step: CONTACT_STEP,
      field: "goal",
      value: "advice",
      answers: {},
    });
    assert.deepEqual(result, { accepted: false });
  });
});

describe("applyQuizBack", () => {
  it("returns to the previous question and stops at step 1", () => {
    assert.equal(applyQuizBack(3), 2);
    assert.equal(applyQuizBack(1), 1);
  });
});

describe("property-strategy-review page", () => {
  it("does not use AnimatePresence wait, which can show a stale question after the counter advances", () => {
    const page = readFileSync(
      join(here, "../app/property-strategy-review/page.tsx"),
      "utf8"
    );
    assert.equal(page.includes("AnimatePresence"), false);
    assert.equal(page.includes("mode=\"wait\""), false);
  });
});
