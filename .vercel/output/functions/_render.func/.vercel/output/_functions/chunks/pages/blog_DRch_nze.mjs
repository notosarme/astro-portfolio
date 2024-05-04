import { d as createComponent, g as renderTemplate, m as maybeRenderHead, j as addAttribute, i as createAstro, h as renderComponent } from '../astro_B_jYpZxC.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './__DV42Pc1_.mjs';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro();
const $$BlogCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { href, title, body } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="blog-card" data-astro-cid-e3grugc2> <a${addAttribute(href, "href")} data-astro-cid-e3grugc2> <h2 data-astro-cid-e3grugc2> ${title} <span data-astro-cid-e3grugc2>&rarr;</span> </h2> <p data-astro-cid-e3grugc2> ${body} </p> </a> </li> `;
}, "/Users/teagan/websites/portfolio/src/components/BlogCard.astro", void 0);

const $$Astro = createAstro();
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blogs", "data-astro-cid-ijnerlr2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div data-astro-cid-ijnerlr2> <h2 class="underline" data-astro-cid-ijnerlr2>Blog Posts</h2> <ul role="list" class="link-card-grid" data-astro-cid-ijnerlr2> ${renderComponent($$result2, "Card", $$BlogCard, { "href": "https://www.techsculpt.blog/exploring-useless-languages/", "title": "The usefulness of exploring so-called useless languages", "body": "Is it worth it to join a hype bubble, when often all that built up praise and hype turns to annoyance and doubt?", "data-astro-cid-ijnerlr2": true })} ${renderComponent($$result2, "Card", $$BlogCard, { "href": "https://www.techsculpt.blog/can-tech-be-too-smart-for-its-own-good/", "title": "Can tech be too smart for its own good?", "body": "What happens when a smart tech product solves zero problems I have, and adds in about five new problems I wouldn't have even considered before?", "data-astro-cid-ijnerlr2": true })} ${renderComponent($$result2, "Card", $$BlogCard, { "href": "https://www.techsculpt.blog/foldable-phones/", "title": "The Futuristic Retro: Design and Users of Foldable Phones", "body": "It's now been four years since foldable phones were brought to consumer market. What considerations must be had about these devices, or will they last long enough to matter?", "data-astro-cid-ijnerlr2": true })} </ul> </div> ` })} `;
}, "/Users/teagan/websites/portfolio/src/pages/blog.astro", void 0);

const $$file = "/Users/teagan/websites/portfolio/src/pages/blog.astro";
const $$url = "/blog";

export { $$Blog as default, $$file as file, $$url as url };
