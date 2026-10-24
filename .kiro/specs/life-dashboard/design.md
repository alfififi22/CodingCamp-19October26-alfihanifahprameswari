# Life Dashboard — Design

## Architecture

Single-page application with three files:

```
index.html        — semantic HTML structure (header + 4 card sections)
css/style.css     — all styling, theme variables, responsive layout
js/script.js      — all logic: storage, clock, timer, tasks, links, theme
```

No build step, no dependencies, no frameworks. The app loads as a static file.

## Data Layer

All persistence goes through two helper functions in `js/script.js`:

- `load(key, fallback)` — reads and JSON-parses from Local Storage; returns `fallback` on missing key or parse error.
- `save(key, value)` — JSON-stringifies and writes to Local Storage.

### Storage keys

| Key | Type | Default | Purpose |
|-----|------|---------|---------|
| `theme` | `"light" \| "dark"` | `"light"` | Selected color theme |
| `userName` | `string` | `""` | Custom name shown in greeting |
| `tasks` | `Task[]` | `[]` | To-do list items |
| `links` | `Link[]` | 3 defaults (Google, GitHub, YouTube) | Quick link buttons |

### Data shapes

```
Task  = { id: number, text: string, done: boolean }
Link  = { name: string, url: string }
```

Task `id` uses `Date.now()` for uniqueness.

## UI Layout

```
┌─────────────────────────────────────────┐
│  Life Dashboard                    [🌙] │  ← header + theme toggle
├──────────────────┬──────────────────────┤
│  Greeting card   │  Focus Timer card     │
│  clock · date    │  25:00                │
│  greeting        │  Start Stop Reset     │
│  [name input]    │                       │
├──────────────────┴──────────────────────┤
│  To-Do List (wide, spans 2 columns)      │
│  [input] [Add]                           │
│  ☐ task 1   [Edit] [Delete]              │
│  ☑ task 2   [Edit] [Delete]              │
├─────────────────────────────────────────┤
│  Quick Links (wide, spans 2 columns)     │
│  [Google] [GitHub] [YouTube]             │
│  [name] [url] [Add]                      │
└─────────────────────────────────────────┘
```

Responsive: collapses to a single column on screens ≤ 640 px.

## Feature Designs

### Greeting (RF-1 + CH-2)
- `updateClock()` runs every 1 second via `setInterval`.
- Time formatted with `toLocaleTimeString("en-GB")` (24-hour, tabular numerals).
- Date formatted with `toLocaleDateString` showing full weekday, month, day, year.
- `getGreeting(hour)` returns one of: Good morning (< 12), Good afternoon (< 15), Good evening (< 18), Good night (≥ 18).
- Greeting appends `, <name>!` when `userName` is set, otherwise just `!`.
- Name form submits on "Save" → trims, stores, and re-renders greeting immediately.

### Focus Timer (RF-2)
- Constants: `TIMER_SECONDS = 25 * 60` (1500 seconds).
- `showTimer()` formats remaining seconds as `MM:SS` with zero-padding.
- **Start**: guards against double-start (`if (timerId) return`), then sets a 1-second interval that decrements `remaining` and updates display; on reaching zero, stops the interval and alerts the user.
- **Stop**: clears the interval and nulls `timerId`; preserves `remaining` so Start resumes from where it left off.
- **Reset**: stops the interval and resets `remaining` to `TIMER_SECONDS`.

### To-Do List (RF-3 + CH-3)
- `tasks` array rendered by `renderTasks()` which rebuilds the `<ul>` inner HTML.
- Each task row: checkbox (toggle done), text span, Edit button, Delete button.
- **Add**: trims input; checks `isDuplicate(text, null)` case-insensitively across all tasks; shows error message if duplicate; otherwise pushes a new task object and re-renders.
- **Edit**: uses `prompt()` for the new text; rejects empty input and duplicates (excluding the task being edited via `ignoreId`).
- **Mark done**: checkbox change updates `task.done`, saves, and re-renders (applies strikethrough styling).
- **Delete**: filters the task out by `id`, saves, and re-renders.
- Duplicate detection: `isDuplicate(text, ignoreId)` compares `t.text.toLowerCase()` for all tasks where `t.id !== ignoreId`.

### Quick Links (RF-4)
- `links` array rendered by `renderLinks()` as anchor buttons with a delete button each.
- Links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"` for security.
- **Add**: validates non-empty name and URL; if URL doesn't start with `http://` or `https://`, prepends `https://`.
- **Delete**: splices by index, saves, and re-renders.
- Default links loaded on first run (no existing Local Storage entry).

### Light / Dark Mode (CH-1)
- Theme stored in `data-theme` attribute on `<html>` element.
- CSS uses `:root` variables for light theme and `[data-theme="dark"]` overrides for dark theme.
- `applyTheme(theme)` sets the attribute and updates the toggle button icon (🌙 light / ☀️ dark).
- Toggle button flips between light and dark, saves the choice, and applies immediately.
- Smooth transition via CSS `transition: background 0.2s, color 0.2s`.

## Styling Approach

- CSS custom properties (variables) for all colors, enabling instant theme switching.
- System font stack for cross-platform readability.
- CSS Grid for the two-column card layout; flexbox within cards for rows.
- `font-variant-numeric: tabular-nums` on clock and timer for stable digit width.
- Responsive breakpoint at 640 px collapses to single column.
