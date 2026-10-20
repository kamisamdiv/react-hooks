# React Hooks Practical Exam
# Sinay, Lady Divinah M.


## Run the app

```bash
npm install
npm run dev
```

## Exam 1 — Smart Task Counter

**Requirements:** Uses `useState` for the count and target. Includes increment, decrement, reset, plus two, derived status, disabled controls at the target, and an activity log.

**Known limitation:** Plus two can go past the target because it always adds exactly two.

**Test steps:** Increment to 4 and press **Plus two**; the count should be 6. Decrement at 0, then reset.

**Bug and fix:** Plus two originally added only one. Both calls used the same `count` value. I changed them to two functional updates, `setCount(c => c + 1)`, so each update uses the latest value.

## Exam 2 — Live Search and Timer

**Requirements:** Searches local user data after a short delay, cancels earlier searches, runs a one-second timer, cleans up effects, and updates the page title with the result count.

**Known limitation:** Search uses local data, not a real server. A background browser tab may make the timer drift.

**Test steps:** Search for a name, type another query quickly, then unmount and mount the widget. Check the results, timer, and browser tab title.

**Bug and fix:** The interval used to keep setting seconds to 1 because it captured the first render's value. I used `setSeconds(s => s + 1)` so each tick uses the latest value. The timeout and interval are also cleared in their effect cleanups.

## Exam 3 — Accessible Form Toolkit

**Requirements:** Controlled name, email, and password fields; validation; focus on the first invalid field; previous successful email stored in a ref.

**Known limitation:** Form data is not sent to a server or saved.

**Test steps:** Submit the empty form, then try an invalid email and a short password. Submit valid data twice to see the previous email.

**Bug and fix:** A ref value shown in the UI did not update when the ref changed. I used state for displayed values because changing state triggers a render; refs remain for values that do not need to render.

## Exam 4 — Application Preferences

**Requirements:** Shares theme and font size with context, updates consumers together, and guards against using the preferences hook outside its provider.

**Known limitation:** Preferences reset when leaving the exam.

**Test steps:** Change the theme and font size and check the article preview. The demo also shows what happens outside the provider.

**Bug and fix:** A consumer without a provider only received the context default. I wrapped the consumers in one provider and made the custom hook show a clear error if used outside it. Provider and consumers import the same context object.

## Exam 5 — Product Explorer

**Requirements:** Filters and sorts 600 products, memoizes the calculation and selection callback, and avoids rerendering the product list for an unrelated counter.

**Known limitation:** Products are generated locally; performance timings depend on the device.

**Test steps:** Search and sort the products, select a product, then change the unrelated counter and check the console.

**Bug and fix:** Search results could become stale when `query` was missing from the `useMemo` dependencies. I added it, added `selectedId` to the callback dependencies, and moved analytics to `useEffect`.

## Exam 6 — Issue Tracker

**Requirements:** Uses a reducer for issue actions and filters, keeps updates immutable, saves state to localStorage, and includes reducer tests.

**Known limitation:** Saved issues are only available in the same browser.

**Test steps:** Add, complete, and delete issues; try each filter; clear completed issues; run `npm test`.

**Bug and fix:** A reducer action used to return `undefined` for an unknown action. I changed the default branch to return the existing state. I also aligned the add-issue action payload and return new objects instead of mutating state.
