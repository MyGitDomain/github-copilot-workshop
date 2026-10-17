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
  createQuiz,
  answerQuestion,
  isQuizFinished,
  isNewBestScore,
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

test("createQuiz builds a fresh quiz state without mutating the input questions", () => {
  const questions = [
    { question: "Q1", options: ["A", "B", "C", "D"], answer: 1 },
    { question: "Q2", options: ["A", "B", "C", "D"], answer: 3 },
  ];

  const state = createQuiz(questions);

  assert.equal(state.current, 0);
  assert.equal(state.score, 0);
  assert.equal(state.timeLeft, 15);
  assert.equal(state.timerId, null);
  assert.equal(state.questions.length, 2);
  assert.notStrictEqual(state.questions, questions);
  assert.deepEqual(questions.map((q) => q.question).sort(), ["Q1", "Q2"]);
});

test("answerQuestion updates score and returns correct without mutating the original state", () => {
  const originalState = {
    questions: [
      { question: "Q1", options: ["A", "B", "C", "D"], answer: 1 },
      { question: "Q2", options: ["A", "B", "C", "D"], answer: 3 },
    ],
    current: 0,
    score: 0,
    timeLeft: 15,
    timerId: null,
  };

  const result = answerQuestion(originalState, 1);

  assert.equal(result.correct, true);
  assert.equal(result.state.score, 1);
  assert.equal(originalState.score, 0);
  assert.equal(result.state.current, 0);
  assert.notStrictEqual(result.state, originalState);

  const wrongResult = answerQuestion(originalState, 0);
  assert.equal(wrongResult.correct, false);
  assert.equal(wrongResult.state.score, 0);
});

test("isQuizFinished reports when the current index has reached the end", () => {
  const activeState = {
    questions: [{ question: "Q1", options: ["A", "B", "C", "D"], answer: 0 }],
    current: 0,
    score: 0,
    timeLeft: 15,
    timerId: null,
  };

  const finishedState = {
    questions: [{ question: "Q1", options: ["A", "B", "C", "D"], answer: 0 }],
    current: 1,
    score: 0,
    timeLeft: 15,
    timerId: null,
  };

  assert.equal(isQuizFinished(activeState), false);
  assert.equal(isQuizFinished(finishedState), true);
  assert.equal(isQuizFinished({ questions: [], current: 0, score: 0, timeLeft: 15, timerId: null }), true);
});

test("isNewBestScore returns true for a new high score and null best", () => {
  assert.equal(isNewBestScore(80, null), true);
  assert.equal(isNewBestScore(80, 70), true);
  assert.equal(isNewBestScore(80, 80), false);
  assert.equal(isNewBestScore(80, 90), false);
  assert.equal(isNewBestScore(80, undefined), true);
});

test("getGrade uses inclusive thresholds at 90, 75 and 50", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});
