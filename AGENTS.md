# AGENTS

- Keep this project plain JavaScript: no frameworks, build tools, or added npm dependencies.
- Use `npm test` for verification; Node's built-in test runner is the project standard.
- Put pure logic in [src/quiz.js](src/quiz.js) and export it with `module.exports`.
- Keep browser/DOM work in [src/app.js](src/app.js); do not mix DOM logic into quiz logic.
- Use CSS variables only in `:root` inside [src/style.css](src/style.css); avoid hard-coded colors elsewhere.
- Preserve accessible UI patterns: buttons for actions, visible `:focus-visible` styles, and `aria-live` on changing status messages.
- Tests belong in [tests/](tests/); prefer small, behavior-focused checks for logic and UI boundaries.
- Stay consistent with the current quiz-app architecture and keep changes minimal.
