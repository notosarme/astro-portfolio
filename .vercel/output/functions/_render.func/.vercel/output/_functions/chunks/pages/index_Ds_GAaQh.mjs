import { d as createComponent, g as renderTemplate, m as maybeRenderHead, j as addAttribute, i as createAstro, h as renderComponent } from '../astro_B_jYpZxC.mjs';
import 'kleur/colors';
import { a as $$Icon, $ as $$Layout } from './__DV42Pc1_.mjs';
import 'clsx';
/* empty css                          */
/* empty css                          */

const $$Astro$1 = createAstro();
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { image, href, title, body } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="project-card" data-astro-cid-mspuyifq> <a${addAttribute(href, "href")} data-astro-cid-mspuyifq> <div class="image-container" data-astro-cid-mspuyifq> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} data-astro-cid-mspuyifq> </div> <h2 data-astro-cid-mspuyifq> ${title} <span data-astro-cid-mspuyifq>&rarr;</span> </h2> <p data-astro-cid-mspuyifq> ${body} </p> </a> </li> `;
}, "/Users/teagan/websites/portfolio/src/components/ProjectCard.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "TJ Clayton", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div data-astro-cid-j7pv25f6> <div id="about" data-astro-cid-j7pv25f6> <h2 class="underline" data-astro-cid-j7pv25f6>About</h2> <p data-astro-cid-j7pv25f6>
I'm Teagan, a junior developer currently based in the Canadian
        Maritimes. Graduated with a college diploma in Mobile Application Design
        & Development from Algonquin College in Ottawa. I specialize in
        cross-platform, responsive, and accessible web design, including
        mobile-first website development.
</p> <p data-astro-cid-j7pv25f6>
I have a background in interdisciplinary arts and still have a passion
        for the scene which can be seen in my projects. I also have a passion
        for retro technology. This background gives me a particular interest in
        creative, user friendly solutions, and making the most out of
        limitations.
</p> <p class="no-spacing" data-astro-cid-j7pv25f6> <a href="" data-astro-cid-j7pv25f6>Download my resume.</a> </p> </div> <div id="highlights" data-astro-cid-j7pv25f6> <h2 class="underline" data-astro-cid-j7pv25f6>Highlights</h2> <ul role="list" class="link-card-grid" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "image": "/images/ingenium-0.png", "href": "/projects/work-2/", "title": "Wayfinding App for the Visually Impaired", "body": "PWA developed for the Canadian Aviation and Space Museum.", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "image": "/images/indie-artists-0.png", "href": "/projects/work-1/", "title": "The Online Indie Artists Club", "body": "Created a website for a volunteer-ran online artist collective.", "data-astro-cid-j7pv25f6": true })} </ul> <p class="no-spacing" data-astro-cid-j7pv25f6><a href="/projects/" data-astro-cid-j7pv25f6>See all projects.</a></p> </div> <div id="skills" data-astro-cid-j7pv25f6> <h2 class="underline" data-astro-cid-j7pv25f6>Skills</h2> <h3 data-astro-cid-j7pv25f6>Stacks</h3> <p data-astro-cid-j7pv25f6>
These are the ones that I use most often, enjoy, or have completed
        projects in that can be seen in my portfolio.
</p> <div data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/html", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/css", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/javascript", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/react", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/vite", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/astro", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/flutter", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/swift", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/bun", "data-astro-cid-j7pv25f6": true })} </div> <p data-astro-cid-j7pv25f6>MERN</p> <h3 data-astro-cid-j7pv25f6>Experimented Stacks</h3> <p data-astro-cid-j7pv25f6>
Ones I have done small projects in and would like to expand on further.
</p> ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/java", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/c", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/cplusplus", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/csharp", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/kotlin", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/sass", "data-astro-cid-j7pv25f6": true })} <h3 data-astro-cid-j7pv25f6>Programs</h3> ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/git", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/github", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/vscode", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/visualstudio", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/xcode", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/androidstudio", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/figma", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Icon", $$Icon, { "name": "stacks/wordpress", "data-astro-cid-j7pv25f6": true })} </div> <div id="now" data-astro-cid-j7pv25f6> <h2 class="underline" data-astro-cid-j7pv25f6>Now</h2> <p data-astro-cid-j7pv25f6>
Now that I've graduated, I've been busy making the move back home.
        Catching up, looking for a place to live and work, all that jazz. I took
        on some work-trade projects in order to practice my skills further, and
        have been looking into some other small projects to practice new things.
        Most recently, I've been learning TypeScript (all around useful) and
        Astro (which is fun, lightweight, and is what this site is built with!).
</p> <p class="no-spacing" data-astro-cid-j7pv25f6> <a href="https://nownownow.com/about" target="_blank" data-astro-cid-j7pv25f6>Why now?</a> </p> </div> </div> ` })} `;
}, "/Users/teagan/websites/portfolio/src/pages/index.astro", void 0);

const $$file = "/Users/teagan/websites/portfolio/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ProjectCard as $, index as i };
