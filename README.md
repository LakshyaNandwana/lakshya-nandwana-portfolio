# Lakshya Nandwana — Portfolio

Single-page portfolio site for Lakshya Nandwana, Backend & AI Applications Engineer.

## Structure

```
.
├── index.html              # Page markup and content
├── assets/
│   ├── css/styles.css      # All styling (design tokens live in :root)
│   └── js/main.js          # Mobile nav toggle + scroll-spy nav highlighting
├── profile.png              # Hero portrait
└── Lakshya_Nandwana_Resume_v3.docx  # Resume served via the "Download Resume" button
```

## Running locally

No build step — it's static HTML/CSS/JS. Serve the directory with any static server, e.g.:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Updating content

- Copy/text lives directly in `index.html`.
- Colors, spacing, and layout live in `assets/css/styles.css`, driven by CSS custom properties in `:root`.
- When the resume changes, replace `Lakshya_Nandwana_Resume_v3.docx` and update the `href` on the "Download Resume" button if the filename changes.
