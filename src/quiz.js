// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

/**
 * Returns a short encouraging message for a grade.
 */
function getFeedbackMessage(grade) {
  const normalizedGrade = String(grade || "").toUpperCase();

  if (normalizedGrade === "A") {
    return "Excellent work! You nailed it.";
  }

  if (normalizedGrade === "B") {
    return "Great job! You’re on a solid streak.";
  }

  if (normalizedGrade === "C") {
    return "Nice effort! A little more practice will push you higher.";
  }

  return "Keep practicing — every round helps you improve.";
}

/**
 * Formats the remaining countdown into a readable label.
 */
function formatTimeLeft(seconds) {
  const numericSeconds = Number.isFinite(Number(seconds)) ? Number(seconds) : 0;
  return `⏱ ${Math.max(0, Math.ceil(numericSeconds))}s`;
}

function isNewBestScore(current, best) {
  const numericCurrent = Number(current);

  if (!Number.isFinite(numericCurrent)) {
    return false;
  }

  if (best === null || typeof best === "undefined") {
    return true;
  }

  const numericBest = Number(best);

  if (!Number.isFinite(numericBest)) {
    return true;
  }

  return numericCurrent > numericBest;
}

function createQuiz(questions) {
  const availableQuestions = Array.isArray(questions) ? questions : [];

  return {
    questions: shuffle(availableQuestions),
    current: 0,
    score: 0,
    timeLeft: 15,
    timerId: null,
  };
}

function answerQuestion(state, selectedIndex) {
  const currentQuestion = state && Array.isArray(state.questions) ? state.questions[state.current] : null;
  const correct = currentQuestion ? isCorrect(currentQuestion, selectedIndex) : false;

  return {
    state: {
      ...state,
      score: state.score + (correct ? 1 : 0),
    },
    correct,
  };
}

function isQuizFinished(state) {
  if (!state || !Array.isArray(state.questions)) {
    return false;
  }

  return state.current >= state.questions.length;
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    shuffle,
    isCorrect,
    calculatePercentage,
    getGrade,
    getFeedbackMessage,
    formatTimeLeft,
    isNewBestScore,
    createQuiz,
    answerQuestion,
    isQuizFinished,
  };
}
