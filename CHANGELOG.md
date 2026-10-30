# Changelog - INEEDYOU Authentic Wear

Every edit made after marker feedback, with its date, the feedback received, the change made and the improvement. Dates are DD Month YYYY.

## Part 2 feedback (Formative 2 Part 2)

Date implemented: **22 October 2026**. Overall feedback received: "Well done!" plus 10 improvement points. Each point is recorded below with the feedback received, the files changed, the change made and the improvement.

### Feedback point 1

- **Date:** 22 October 2026
- **Feedback received:** Add a dedicated CHANGELOG.md documenting dates, feedback received, changes made and improvements implemented.
- **Files changed:** `CHANGELOG.md` (new), `README.md`
- **Change made:** Created `CHANGELOG.md` with one entry per feedback point, each showing the date, the feedback received, the files changed, the change made and the improvement. Linked it from the README and copied the same entries into the README Changelog section.
- **Improvement:** The lecturer can see every edit, when it was made and why, without reading the code.

### Feedback point 2

- **Date:** 22 October 2026
- **Feedback received:** Correct the malformed viewport meta tag on all pages: change `device-witdth` to `width`.
- **Files changed:** `home.html`, `about.html`, `products.html`, `contact.html`, `enquiry.html`, `planning.html`
- **Change made:** Replaced the broken tag with `<meta name="viewport" content="width=device-width, initial-scale=1.0">` in the `<head>` of all 6 pages.
- **Improvement:** Phones now use their real screen width, so the layout scales properly instead of showing a zoomed-out desktop page.

### Feedback point 3

- **Date:** 22 October 2026
- **Feedback received:** Fix navigation links so filenames match exactly, especially `Contact.html` and `Contacts.html`, which should link to `contact.html`.
- **Files changed:** all 6 `.html` pages (navigation bar and in-page links)
- **Change made:** Changed every link that pointed to `Contact.html` or `Contacts.html` to `contact.html`, and checked that every other link matches its file name exactly (all lower case): `home.html`, `about.html`, `products.html`, `enquiry.html`, `planning.html`. Also corrected the Windows-style image path `images\instagram url.jpg` to `images/instagram-qr-code.jpg`.
- **Improvement:** No broken links. The site works on GitHub Pages, which is case-sensitive, not only on Windows.

### Feedback point 4

- **Date:** 22 October 2026
- **Feedback received:** Add the missing JavaScript file at `js/script.js`, or remove the script references if JavaScript is not required.
- **Files changed:** `js/script.js` (new), all 6 `.html` pages
- **Change made:** Created `js/script.js` (JavaScript is needed for Part 3) and loaded it at the end of every page with `<script src="js/script.js" defer></script>`.
- **Improvement:** The 404 error for the missing file is gone, and the script now powers the menu, product search, lightbox, accordion, forms and map.

### Feedback point 5

- **Date:** 22 October 2026
- **Feedback received:** Close the `:root` CSS block correctly in `style.css`, as the missing brace can cause inconsistent CSS interpretation across browsers.
- **Files changed:** `css/style.css`
- **Change made:** Added the missing closing brace `}` after the last custom property (`--shadow-md`) so the `:root` block closes before the rules that follow. Checked that the stylesheet has equal numbers of `{` and `}`.
- **Improvement:** All rules after `:root` are read correctly, so the site looks the same in every browser.

### Feedback point 6

- **Date:** 22 October 2026
- **Feedback received:** Rename `README.md.txt` to `README.md` and expand it with setup instructions, browser testing, known limitations and development history.
- **Files changed:** `README.md` (renamed from `README.md.txt`)
- **Change made:** Renamed the file to `README.md`. Added: what the site is, setup and deployment steps, folder structure, Part 3 features, browser testing, known limitations, development history, the Changelog and the reference list.
- **Improvement:** GitHub now shows the README on the repository page, and it tells a new reader how to run, test and understand the project.

### Feedback point 7

- **Date:** 22 October 2026
- **Feedback received:** Improve reference formatting by using complete, consistent Harvard-style references and valid URLs.
- **Files changed:** reference list on every page, `README.md`
- **Change made:** Rewrote every reference in Harvard style: author, year (or n.d.), title in italics, full URL and access date. Removed two incomplete references (a Bing video link and a Google Fonts entry) because no valid URL could be given. Added references for the new tools used in Part 3 (MDN, Leaflet, OpenStreetMap, JSONPlaceholder, Google Search Central, GitHub Docs).
- **Improvement:** References are complete, consistent and can be checked by clicking the links.

### Feedback point 8

- **Date:** 22 October 2026
- **Feedback received:** Add a mobile navigation solution, such as a menu button, because the current navigation only wraps onto multiple lines.
- **Files changed:** all 6 `.html` pages (button in the header), `css/style.css`, `js/script.js`
- **Change made:** Added a Menu button to the header of every page. In `style.css` it only shows on screens 768px wide or smaller, where the links turn into a vertical list. `script.js` opens and closes the list when the button is pressed and closes it with the Esc key. Without JavaScript the links stay visible.
- **Improvement:** On a phone the navigation is a tidy dropdown instead of several wrapped lines.

### Feedback point 9

- **Date:** 22 October 2026
- **Feedback received:** Correct HTML errors, including unclosed tables, inconsistent page titles, missing spaces, spelling mistakes and malformed attributes.
- **Files changed:** all 6 `.html` pages
- **Change made:** (a) Closed the unclosed `<table>` on the Contact page. (b) Gave every page its own title, for example `Products and Prices | INEEDYOU Authentic Wear`; before, they all started with "Home". (c) Fixed the Instagram link on the Contact page, which had `href "..."` without `=`. (d) Added missing spaces between attributes, for example `src="..." alt="..."`. (e) Fixed spacing in `<html lang = "en">` and `<meta charset = ...>`. (f) Corrected spelling: Authenic, strretwear, annonced, sleeveles, Hoddies, "Product" in the menu, and Middleburg to Middelburg. (g) Checked that every page has matching opening and closing tags.
- **Improvement:** The HTML is valid, each page has a clear title for the browser tab and search results, and the spelling is correct.

### Feedback point 10

- **Date:** 22 October 2026
- **Feedback received:** Create several descriptive Git commits, for example: Add shared responsive stylesheet; Improve mobile navigation layout; Fix accessibility and navigation links; Add README and changelog documentation.
- **Files changed:** Git history
- **Change made:** Work is committed in separate commits with descriptive messages: "Close :root block and add responsive styles, mobile menu and form styles", "Add JavaScript: mobile menu, product search, lightbox, accordion, map", "Rename and compress images with descriptive file names", "Fix HTML errors, viewport tags and navigation links; add validated forms", "Add robots.txt and sitemap.xml for SEO" and "Add README and changelog documentation".
- **Improvement:** The repository history shows how the site was improved step by step.

## Other changes after the feedback

### 22 October 2026 - Part 3 features added

- **Date:** 22 October 2026
- **Files changed:** `js/script.js`, `css/style.css`, `enquiry.html`, `contact.html`, `products.html`
- **Change made:** Added the mobile menu, product search/filter/sort (cards built by JavaScript), lightbox gallery, FAQ accordion, Leaflet map, scroll animations and back-to-top button. Replaced the Google Forms embed on the Enquiry page with our own form (validation, AJAX submit, cost and availability reply). Added validation and an email-building function to the Contact form.
- **Improvement:** Meets the Part 3 requirements for interactive elements, dynamic content, forms and validation.

### 22 October 2026 - SEO and speed

- **Date:** 22 October 2026
- **Files changed:** all `.html` pages, `robots.txt` (new), `sitemap.xml` (new), `index.html` (new), `images/`
- **Change made:** Added unique titles, meta descriptions and keywords; `robots.txt` and `sitemap.xml`; `index.html` so GitHub Pages opens the site. Renamed images without spaces (for example `hoodie and beanie.jpg` to `hoodie-and-beanie-winter-combo.jpg`) and compressed them (about 840 KB down to about 350 KB). Added image width/height, lazy loading and `defer` on scripts.
- **Improvement:** Search engines can find and describe every page, and pages load faster.

### 22 October 2026 - Security and small fixes

- **Date:** 22 October 2026
- **Files changed:** `js/script.js`, all `.html` pages
- **Change made:** User text is shown with `textContent` (never `innerHTML`); external links use `rel="noopener noreferrer"`; a hidden honeypot field catches spam bots; the Leaflet files have integrity checks. The line "Thanks! Your enquiry has been received" is now hidden until a form is really sent (before, it was always visible).
- **Improvement:** Safer pages and no misleading message.

### 24 October 2026 - Product photos

- **Date:** 24 October 2026
- **Files changed:** `js/script.js`, `products.html`, `images/`
- **Change made:** Added the vest photo (`vests-grey-white.jpg`) and the beanie photo (`beanies-grey-black-white.jpg`). The hoodie now uses the photo of the white hoodie worn by a man (`hoodie-cartoon-back-print.jpg`) instead of the hoodie-and-beanie picture. The Gallery now shows the hoodie, vests and beanies; the hoodie-and-beanie picture stays on the Winter Combo card only. Wide photos are shown in full instead of being cropped.
- **Improvement:** Every product card now has a real photo, and no card says "Photo coming soon".

### 24 October 2026 - Shorter page head

- **Date:** 24 October 2026
- **Files changed:** all `.html` pages
- **Change made:** Kept only the important tags in the `<head>`: character set, viewport, title, description, keywords, tab icon and stylesheet. Removed the JSON-LD structured data and the author, robots, theme-colour, canonical and Open Graph tags.
- **Improvement:** The head is short and easy to read, and nothing required by the brief was lost.

### 30 October 2026 - README changelog and browser testing

- **Date:** 30 October 2026
- **Files changed:** `README.md`
- **Change made:** Moved the full, detailed list of Part 2 feedback changes into the README Changelog section (before, it only had a short summary). Completed the Browser testing section with real results from Chrome (Chromium 141) on a desktop and a phone-sized screen: all 6 pages, menu, product search/sort, lightbox, accordion and both forms passed.
- **Improvement:** The README now records the feedback edits in detail and shows evidence of testing.

