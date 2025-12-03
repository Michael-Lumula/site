# CyberSec Engineer — Portfolio

A lightweight, single-page portfolio with a cyber / terminal aesthetic. Built with plain HTML, CSS and JavaScript.

## Features
- Neon "matrix" background animation and scanline overlay.
- Glitch header effect and terminal-style typewriter lines.
- Scroll reveal animations using the Intersection Observer.
- Contact link that can open Gmail compose via a helper function.

## Files
- [index.html](index.html) — main HTML markup and inline `openMailComposer` helper (`openMailComposer` is defined in this file)  
- [style.css](style.css) — theme variables, layout, scanline, glitch, and responsive styles  
- [script.js](script.js) — DOM behaviors: intersection observer (`observer`), typewriter, matrix rain (`drawMatrix`) and resize handling  
- [README.md](README.md) — this file

## Key code references
- Contact compose helper: [`openMailComposer`](index.html)  
- Matrix rendering function: [`drawMatrix`](script.js)  
- Intersection Observer instance: [`observer`](script.js)  
- Important selectors / assets: [#matrix](style.css), [`.scanline`](style.css), [`.glitch`](style.css), [`.hidden` / `.visible`](style.css)

## Usage
1. Clone or copy the project files into a folder.
2. Open [index.html](index.html) in a modern browser (no build step required).
3. Click "Execute_Contact_Protocol" to trigger the mail composer behavior (prompts to open Gmail or the system mail client).

## Development notes
- Layout and theme colors are driven by CSS variables in [style.css](style.css) (edit `:root` to customize colors and font).
- The matrix effect uses a canvas (`#matrix`) and runs in [script.js](script.js). Adjust `fontSize` or interval in [`drawMatrix`](script.js) to change density/speed.
- Scroll reveals are implemented with Intersection Observer (`observer`) — `.hidden` elements become `.visible` when scrolled into view.

## Customization tips
- Change the neon palette in `:root` inside [style.css](style.css).
- Replace the hero text in [index.html](index.html) (`MICHAEL_LUMULA`) or update the `.delayed` text to change the typewriter content.
- To stop the matrix animation, remove or comment out the `setInterval(drawMatrix, 33);` call in [script.js](script.js).

## License
Personal/Portfolio — modify as needed.

----
If you want, I can populate this README with badges, a screenshot, or a short deployment section for GitHub Pages.