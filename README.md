# INEEDYOU Authentic Wear - WEDE5020 Part 3

**Repository:** https://github.com/nthabiseng-bit/INEEDYOU-business-website-POE
**Live site (GitHub Pages):** https://nthabiseng-bit.github.io/INEEDYOU-business-website-POE/

## What the website is about

INEEDYOU Authentic Wear is a message-driven streetwear brand made in South Africa. The website shows the brand story, products and prices, contact details, an enquiry form and the project plan. It has 6 pages: Home, About, Products, Contact, Enquiry and Project Plan.

This is **Part 3 - Enhancing Functionality and SEO**. It builds on Part 1 (HTML structure and content) and Part 2 (CSS and responsive design).

## Folder structure

```
index.html            opens the site (redirects to home.html)
home.html, about.html, products.html, contact.html, enquiry.html, planning.html
css/style.css         all styling (shared by every page)
js/script.js          all JavaScript
images/               logo, product photos, QR code
robots.txt, sitemap.xml
README.md, CHANGELOG.md
```

## Part 3 features

### JavaScript enhancements
- **Mobile menu button** and active-page highlighting.
- **Dynamic content:** the Products page builds its cards with JavaScript, with **search, category filter and sort**.
- **Lightbox gallery** with arrows, keyboard keys (Esc, left, right) and focus handling.
- **Accordion** (FAQ) on the Enquiry page.
- **Interactive map** on the Contact page (Leaflet with OpenStreetMap).
- **Animations:** fade-in on scroll and hover transitions; switched off for visitors who choose reduced motion.
- **Advanced DOM manipulation:** elements are created, filled and removed with `createElement`, `textContent` and event delegation.

### Forms and validation
- `enquiry.html` collects contact details, enquiry type, product, size, quantity, date needed and a message. After validation it is sent with **AJAX** (`fetch`) and the page shows a response with the estimated **cost** (item price x quantity + R100 courier) and **availability** (5-7 days, made to order).
- `contact.html` is for general messages. After validation the details are **compiled into an email** to the address in `SETTINGS.recipientEmail`, which the visitor opens in their email app (`mailto:`) or copies.
- Both forms use HTML5 attributes (`required`, `type="email"`, `minlength`, `maxlength`, `min`, `max`) and JavaScript checks (name letters only, valid email, South African phone number, future date, whole-number quantity, message length). Error messages appear under each field and the first wrong field gets focus.

### Search Engine Optimisation (SEO)
- **On-page:** unique `<title>` and meta description on every page, keywords, one `<h1>` per page with `h2`/`h3` below it, descriptive image names and alt text, clean lower-case file names, internal links between pages, mobile-friendly design.
- **Technical:** `robots.txt` and `sitemap.xml`, plus a short, clean `<head>` on every page (charset, viewport, title, description, keywords, icon, stylesheet).
- **Off-page plan:** share the site and the Instagram page (@ineedyouauthenticwear26), ask local businesses and micro-influencers to link to it, and keep the opening hours and location consistent online for local search.
- **Page speed:** images compressed, lazy loading, `defer` scripts, no large libraries.
- **Security:** no `innerHTML` with user data, `rel="noopener noreferrer"` on external links, honeypot field, integrity hashes on Leaflet, HTTPS through GitHub Pages.

## Known limitations

- The enquiry form posts to a free test API (JSONPlaceholder), so enquiries are checked and answered on screen but **not stored or emailed**. Connect a real service (for example Formspree) by changing `ajaxEndpoint` in `js/script.js`.
- The contact form relies on the visitor's email app opening the `mailto:` link.
- Prices are estimates; final prices are confirmed by the business.
- The map and Leaflet need an internet connection.

## Development history

- **Part 1:** page structure, content, tables, images and forms planning.
- **Part 2:** shared stylesheet, responsive layout (breakpoints at 1024px, 768px and 600px), hover effects, responsive images.
- **Part 3:** fixed Part 2 feedback (see below), added JavaScript, forms, SEO files and deployment.

## Changelog

The full, dated list is in [CHANGELOG.md](CHANGELOG.md). Summary of entries for **22 October 2026**:

**Feedback from Part 2:** added CHANGELOG.md; fixed viewport tag on all pages; fixed navigation filenames (`contact.html`); added `js/script.js`; closed the `:root` block in `style.css`; renamed `README.md.txt` to `README.md` and expanded it; completed Harvard references with valid URLs; added a mobile menu button; corrected HTML errors (unclosed table, page titles, attributes, spelling); committed work in several descriptive Git commits.

**New in Part 3:** interactive elements, dynamic products with search and sort, lightbox, accordion, map, validated enquiry and contact forms, SEO files, image compression and deployment.

## References

Harvard style (IIE).

1. MDN Web Docs (n.d.) *Fetch API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API (Accessed: 22 October 2026).
2. MDN Web Docs (n.d.) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (Accessed: 22 October 2026).
3. MDN Web Docs (n.d.) *Intersection Observer API*. Available at: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (Accessed: 22 October 2026).
4. MDN Web Docs (n.d.) *Responsive design*. Available at: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design (Accessed: 22 October 2026).
5. W3Schools (n.d.) *CSS Flexbox*. Available at: https://www.w3schools.com/css/css3_flexbox.asp (Accessed: 22 October 2026).
6. W3Schools (n.d.) *CSS Media queries*. Available at: https://www.w3schools.com/css/css3_mediaqueries.asp (Accessed: 22 October 2026).
7. Leaflet (n.d.) *Leaflet quick start guide*. Available at: https://leafletjs.com/examples/quick-start/ (Accessed: 22 October 2026).
8. OpenStreetMap (n.d.) *Copyright and licence*. Available at: https://www.openstreetmap.org/copyright (Accessed: 22 October 2026).
9. Google (n.d.) *Introduction to robots.txt*. Available at: https://developers.google.com/search/docs/crawling-indexing/robots/intro (Accessed: 22 October 2026).
10. Google (n.d.) *Build and submit a sitemap*. Available at: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview (Accessed: 22 October 2026).
11. GitHub (n.d.) *GitHub Pages documentation*. Available at: https://docs.github.com/en/pages (Accessed: 22 October 2026).
12. JSONPlaceholder (n.d.) *Free fake and reliable API for testing and prototyping*. Available at: https://jsonplaceholder.typicode.com/ (Accessed: 22 October 2026).
13. Mashigo, N.B. (2026) *INEEDYOU (Pty) Ltd: company profile*. [Unpublished]. Mohlakeng: INEEDYOU (Pty) Ltd.
