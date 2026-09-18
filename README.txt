Alex Citardi — temporary portfolio site
======================================

Files
-----
index.html        the whole page (projects + about + resume + contact)
css/styles.css    all styling
js/main.js        nav scrolling/active state, resume buttons, card notices
images/           hero, portrait, and the 11 project covers
resume/           drop your PDF here

To finish setup
---------------
1. Save your resume as:  resume/alex-citardi-resume.pdf
   Both resume buttons then work with no code changes. Until it exists,
   clicking either button shows a short on-page notice instead of 404ing.
2. Open index.html in a browser to check, then upload the whole folder to
   any static host (GitHub Pages, Netlify, Cloudflare Pages) as-is.

What is functional
------------------
- Nav links scroll to their sections; the active section is underlined.
- Email opens a mail client; LinkedIn opens in a new tab.
- Back to top link in the footer.
- Resume download / view in browser (once the PDF is added).
- Project cards hover exactly like the mockup but do not navigate — they
  show a "project page coming soon" notice, by design for now.

Adding project pages later
--------------------------
Wrap a card's contents in <a href="projects/<slug>.html"> and delete that
card's entry from the click handler at the bottom of js/main.js.
