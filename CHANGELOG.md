# Changelog - INEEDYOU Authentic Wear

All changes made after marker feedback. Dates are in the format DD Month YYYY.

## Part 2 feedback (Formative 2 Part 2) - implemented on 22 October 2026

Feedback received: "Well done!" plus 10 improvement points. Each point and the change made is recorded below.

| # | Feedback received | Change made | Improvement |
|---|-------------------|-------------|-------------|
| 1 | Add a dedicated CHANGELOG.md | Created this file and linked it from README.md | Lecturer can see every edit with its date and reason |
| 2 | Malformed viewport meta tag (`device-witdth`) | Changed to `width=device-width, initial-scale=1.0` on all 6 pages | Pages now scale correctly on phones |
| 3 | Navigation filenames must match exactly (`Contact.html`, `Contacts.html`) | All navigation links now point to `contact.html` (lower case) | Contact link no longer breaks on case-sensitive hosts such as GitHub Pages |
| 4 | Missing `js/script.js` | Created `js/script.js` and loaded it with `defer` on every page | No more 404 error; JavaScript features now work |
| 5 | `:root` block in `style.css` not closed | Added the missing closing brace | Browsers now read all CSS rules after `:root` consistently |
| 6 | Rename `README.md.txt` to `README.md` and expand it | Renamed and rewrote with setup, browser testing, known limitations and development history | README now displays properly on GitHub and is complete |
| 7 | Improve Harvard-style references and valid URLs | Every reference now has an author, title, full URL and access date; two incomplete references (a Bing video link and Google Fonts) were removed because no valid URL could be given | References are complete and consistent |
| 8 | Add a mobile navigation solution | Added a Menu button that opens and closes the navigation on screens 768px wide or smaller | Links no longer wrap over several lines on phones |
| 9 | Correct HTML errors | Closed the unclosed `<table>` on the Contact page; gave every page its own title; fixed the `href` attribute missing `=` on the Instagram link; added missing spaces in attributes (`src="..." alt="..."`); fixed `<html lang = "en">` style spacing; corrected spelling (Authenic, strretwear, annonced, sleeveles, Hoddies, Product, Middleburg) | Valid HTML, clearer page titles and correct spelling |
| 10 | Create several descriptive Git commits | Work is committed in separate, descriptive commits (see README, "Development history") | Clear history of how the site was improved |

## Part 3 - added on 22 October 2026

### Added
- **JavaScript:** mobile menu, active-page highlighting, scroll animations (respects "reduce motion"), back-to-top button.
- **Dynamic products:** the Products page builds its cards from a JavaScript list, with search, category filter and sort by price or name.
- **Lightbox gallery:** images open larger with previous/next arrows and keyboard support.
- **FAQ accordion** on the Enquiry page.
- **Interactive map** (Leaflet + OpenStreetMap) on the Contact page.
- **Enquiry form** (`enquiry.html`): HTML5 form elements, validation, AJAX submission, and a response showing cost and availability. "Enquire about this" buttons pre-select the product.
- **Contact form** (`contact.html`): validation, then the message is compiled into an email the visitor can open in their email app or copy.
- **SEO:** unique titles and meta descriptions, keywords, a short `<head>` on every page, `robots.txt`, `sitemap.xml`, descriptive image file names and alt text, one `h1` per page.
- **Page speed:** images resized and compressed (about 840 KB down to about 350 KB), image width/height set, lazy loading, scripts loaded with `defer`.
- **Security:** user input is shown with `textContent` (not `innerHTML`), external links use `rel="noopener noreferrer"`, hidden honeypot field against spam bots, Leaflet loaded with integrity checks.
- `index.html` so GitHub Pages opens the site at its address.

### Changed
- Product photos: added the vest and beanie photos, and the hoodie now uses the photo of the white hoodie worn by a man instead of the hoodie-and-beanie combo picture. The gallery on the Products page now shows the hoodie, vests and beanies.
- Images renamed without spaces (for example `hoodie and beanie.jpg` is now `hoodie-and-beanie-winter-combo.jpg`).
- The Google Forms embed on the Enquiry page was replaced by our own validated form.
- The "Thanks! Your enquiry has been received." line is now only shown after a successful submission (before, it was always visible).
- Project Plan page updated with Part 3 milestones and limitations.

### Fixed
- Windows-style path `images\instagram url.jpg` on the Contact page now `images/instagram-qr-code.jpg`.
