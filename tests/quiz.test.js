// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  calculatePercentage,
  getGrade,
  getFeedbackMessage,
  formatTimeLeft,
} = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getFeedbackMessage gives an encouraging message for each grade", () => {
  assert.match(getFeedbackMessage("A"), /excellent|amazing|outstanding/i);
  assert.match(getFeedbackMessage("B"), /great|solid|good/i);
  assert.match(getFeedbackMessage("C"), /nice|steady|effort/i);
  assert.match(getFeedbackMessage("D"), /practice|keep/i);
});

test("formatTimeLeft returns the label with seconds remaining", () => {
  assert.equal(formatTimeLeft(15), "⏱ 15s");
  assert.equal(formatTimeLeft(12), "⏱ 12s");
  assert.equal(formatTimeLeft(5), "⏱ 5s");
  assert.equal(formatTimeLeft(1), "⏱ 1s");
  assert.equal(formatTimeLeft(0), "⏱ 0s");
  assert.equal(formatTimeLeft("12.4"), "⏱ 13s");
  assert.equal(formatTimeLeft(-3), "⏱ 0s");
});

test("getGrade uses inclusive thresholds at 90, 75 and 50", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});
