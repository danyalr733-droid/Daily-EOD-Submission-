# Frontend changes

This update preserves the existing HTML structure and UI content based on the supplied reference screenshot.

## Updated files
- `index.html`: replaced with the complete HTML source supplied in this conversation; no structural redesign added.
- `css/style.css`: adjusted the middle and bottom grid columns to use `minmax(0, ...fr)` so column gaps do not push the grid beyond its container; added `min-width: 0` to the middle columns to prevent grid overflow.
- `js/script.js`: corrected the control-question summary badge to compare the normalized lowercase answer, because the radio inputs store `yes`/`no` while the summary displays `Yes`/`No`.

## Verification performed
- `node --check js/script.js` passed.
- `index.html` parsed successfully with Python's HTML parser.

## Limitations
This is a static/syntax check, not a full browser visual regression test. File inputs still select files locally; uploading files to a server requires backend implementation.
