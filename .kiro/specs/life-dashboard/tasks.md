# Life Dashboard — Tasks

## Status Legend

- `[x]` Completed
- `[ ]` Not started

## T1: HTML Structure

- [x] T1.1: Create `index.html` with semantic header, main grid, and four card sections (greeting, timer, to-do, quick links)
- [x] T1.2: Link `css/style.css` and `js/script.js`
- [x] T1.3: Add theme toggle button in header
- [x] T1.4: Add name input form in greeting section
- [x] T1.5: Add timer display and start/stop/reset buttons
- [x] T1.6: Add to-do input form and list container
- [x] T1.7: Add quick links container and add-link form

## T2: CSS Styling

- [x] T2.1: Define CSS custom properties for light and dark themes
- [x] T2.2: Style base layout: header, grid, cards
- [x] T2.3: Style form elements (inputs, buttons)
- [x] T2.4: Style to-do list items (checkbox, text, buttons, done state)
- [x] T2.5: Style quick link buttons
- [x] T2.6: Add responsive breakpoint at 640 px
- [x] T2.7: Add smooth theme transition

## T3: Greeting + Clock (RF-1, CH-2)

- [x] T3.1: Implement `load`/`save` Local Storage helpers
- [x] T3.2: Implement clock update every second (time + date)
- [x] T3.3: Implement time-based greeting logic
- [x] T3.4: Implement custom name input, save to Local Storage, display in greeting

## T4: Focus Timer (RF-2)

- [x] T4.1: Implement 25-minute countdown with `MM:SS` display
- [x] T4.2: Implement Start (with double-start guard)
- [x] T4.3: Implement Stop (pause, preserve remaining time)
- [x] T4.4: Implement Reset (return to 25:00)
- [x] T4.5: Implement completion notification (alert)

## T5: To-Do List (RF-3, CH-3)

- [x] T5.1: Implement add task with Local Storage persistence
- [x] T5.2: Implement edit task via prompt
- [x] T5.3: Implement mark done toggle (checkbox)
- [x] T5.4: Implement delete task
- [x] T5.5: Implement duplicate prevention (case-insensitive) on add and edit with error message

## T6: Quick Links (RF-4)

- [x] T6.1: Render link buttons that open in new tab (secure `rel` attribute)
- [x] T6.2: Implement add link with URL normalization
- [x] T6.3: Implement delete link
- [x] T6.4: Persist links in Local Storage with default links on first load

## T7: Light / Dark Mode (CH-1)

- [x] T7.1: Implement theme toggle with Local Storage persistence
- [x] T7.2: Apply theme via `data-theme` attribute on `<html>`
- [x] T7.3: Update toggle button icon based on current theme
