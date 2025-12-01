# Ocean Quiz (LightningJS + Blits)

A simple multiple-choice quiz with an Ocean Professional theme. Supports keyboard/remote navigation (Up/Down/Enter), score tracking, and an optional backend fetch via VITE env variables.

## Run

- Install deps: `npm install`
- Dev server: `npm run dev` (served on port 3000 via Vite config)
- Production build: `npm run build`

## Screens

- Intro (Home): Start Quiz
- Quiz: 5–10 questions flow with progress, Next/Submit
- Results: score and Restart option

## Keyboard/Remote

- Up/Down: navigate options
- Enter: select/confirm
- Back: go to previous screen (Intro from Quiz, Intro from Results via Back)

## Theming

- Located in `src/theme.js` using the Ocean Professional palette:
  - primary #2563EB, secondary #F59E0B, success #F59E0B, error #EF4444
  - background/surface/text styles, rounded corners and soft shadows

## Questions

- By default, static questions are loaded from `src/quizData.js`.
- If `VITE_API_BASE` or `VITE_BACKEND_URL` is set, the app will try to fetch from `${VITE_API_BASE || VITE_BACKEND_URL}/api/quiz`.
- The expected API response shape: an array of objects `{ id, question, options: string[], answerIndex: number }`.

## Modifying questions

- Edit `src/quizData.js` to add/remove/change static questions.
- To wire an API later, ensure your backend serves `/api/quiz` at the configured base and returns the format above.

## Notes

- No hard-coded ports in code; Vite dev server is set to 3000 in `vite.config.js`.
- Source maps/feature flags can be controlled via existing `VITE_*` envs as needed.

### Resources

- [Blits documentation](https://lightningjs.io/v3-docs/blits/getting_started/intro.html)
- [Blits Example App](https://blits-demo.lightningjs.io/?source=true)
- [Blits Components](https://lightningjs.io/blits-components.html)
