# Life Dashboard — Requirements

## Overview

A clean, minimal single-page web app that combines a greeting clock, a 25-minute focus timer, a to-do list, and quick links — all persisted in the browser via Local Storage. No backend, no frameworks.

## Technical Constraints

| ID | Constraint |
|----|-----------|
| TC-1 | HTML for structure, CSS for styling, Vanilla JavaScript only (no React/Vue/etc.) |
| TC-2 | Browser Local Storage API for all data; client-side only, no backend server |
| TC-3 | Compatible with modern browsers (Chrome, Firefox, Edge, Safari); usable as standalone web app or browser extension |

## Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-1 | Clean, minimal interface; easy to understand and use; no complex or test setup required |
| NFR-2 | Fast load time; responsive UI interactions; no noticeable lag when updating data |
| NFR-3 | User-friendly aesthetic; clear visual hierarchy; readable typography |

## Required Features (MVP)

### RF-1: Greeting
- Display the current time, updating every second.
- Display the current date (weekday, month, day, year).
- Show a greeting based on time of day (morning / afternoon / evening / night).
- Allow the user to save a custom name; greeting includes the name when set.

### RF-2: Focus Timer
- 25-minute countdown timer.
- Start button to begin the countdown.
- Stop button to pause the countdown (preserving remaining time).
- Reset button to return the timer to 25:00.
- Notify the user when the timer reaches zero.

### RF-3: To-Do List
- Add a new task via text input.
- Edit an existing task.
- Mark a task as done / not done via checkbox.
- Delete a task.
- Persist all tasks in Local Storage across sessions.

### RF-4: Quick Links
- Display buttons that open favorite websites in a new tab.
- Add a new link (name + URL).
- Delete an existing link.
- Persist all links in Local Storage across sessions.
- Provide sensible default links on first load.
- Normalize URLs that are missing the `http://` / `https://` prefix.

## Challenges (3 chosen)

| ID | Challenge | Description |
|----|-----------|-------------|
| CH-1 | Light / Dark mode | Toggle between light and dark themes; persist the user's choice in Local Storage |
| CH-2 | Custom name in greeting | Let the user enter and save their name; display it in the greeting; persist across sessions |
| CH-3 | Prevent duplicate tasks | Reject adding or editing a task if an identical task (case-insensitive) already exists; show an error message |

## Folder Rules

- Only **1 CSS file** inside `css/` (`style.css`).
- Only **1 JavaScript file** inside `js/` (`script.js`).
- Keep code clean and readable.
- Do not add new CSS or JS files.

## Out of Scope

- Backend server or database
- User accounts / authentication
- Notifications (other than the timer completion alert)
- Task priorities, due dates, or categories
- Drag-and-drop reordering
