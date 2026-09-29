# Adeel Ahmed — Portfolio

Personal portfolio for Adeel Ahmed, BS Computer Science student at BUET Khuzdar,
focused on Data Science, Machine Learning and Computer Vision.

A fast, dependency-free static site: plain HTML, CSS and JavaScript. No build
step, no `npm install`, nothing to break.

## Run it locally

Option 1: double-click `index.html`. It works straight from your file system.

Option 2 (recommended, behaves exactly like the live site):

```bash
# Python (already installed on most computers)
python -m http.server 8000
# then open http://localhost:8000

# or, with Node.js
npx serve .
```

## Updating your content

All your details are already filled in **`assets/js/data.js`**: contact links,
CV, photo, education, experience, honours and 15 certifications.

**Adding a new certificate**
1. Save the certificate as an image in `assets/certificates/`, e.g. `my-course.jpg`
   (about 1600 px wide), plus a small copy named `my-course-thumb.jpg` (about 560 px wide).
2. Add a line to the `certifications` list in `data.js`:
   ```js
   { name: "Course name", issuer: "Who issued it", date: "Oct 2026", category: "AI & Data",
     image: "assets/certificates/my-course.jpg", link: "https://verification-link" },
   ```
   `category` must be one of the names in `certificationCategories`. `link`, `credential`
   and `note` are optional. The counts in the hero and filters update automatically.

**Still open:** add GitHub/demo links for your projects in `featured.links` and
`projects[].links` whenever they're ready. They appear automatically.

## Contact form

The form validates input and then:

1. If `formEndpoint` is set, sends the message there as JSON.
   Free options: [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
   Create a form, copy its endpoint URL into `formEndpoint`.
2. Otherwise, if `email` is set, opens the visitor's email app with the message filled in.
3. Otherwise, tells the visitor the form isn't connected yet.

## Deploy

Any static host works. Upload the whole folder.

- **Netlify**: drag the folder onto https://app.netlify.com/drop
- **GitHub Pages**: push to a repo, then Settings → Pages → Deploy from branch (`main`, root)
- **Vercel**: import the repo, framework preset "Other", no build command

`index.html` is set up for `https://adeelahmedb46-star.github.io`. If you host it elsewhere,
update that address in the canonical link and Open Graph tags.

## Structure

```
index.html              page structure, SEO/Open Graph metadata, icon sprite
assets/
  css/styles.css        design tokens, layout, components, motion, responsive rules
  js/data.js            ALL your content (edit this file)
  js/render.js          turns data.js into HTML for the repeated sections
  js/main.js            navigation, active-section tracking, scroll reveals,
                        certificate viewer, contact form
  js/hero-canvas.js     the animated "embedding space" figure in the hero
  img/favicon.svg       site icon
  img/og-image.png      preview image for LinkedIn/WhatsApp/X link shares
  img/adeel-ahmed.jpg   profile photo
  cv/                   your CV (Adeel-Ahmed-CV.pdf)
  certificates/         certificate and document images (+ small -thumb versions)
```

## Notes

- Light and dark mode follow the visitor's system setting.
- All animation stops for visitors with "reduce motion" enabled, and the hero
  animation pauses when it's off-screen or the tab is hidden.
- Fonts load from Google Fonts (Schibsted Grotesk) with a system-font fallback.
