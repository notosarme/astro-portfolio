import { d as createComponent, g as renderTemplate, h as renderComponent, i as createAstro, m as maybeRenderHead } from '../astro_B_jYpZxC.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Layout } from './__DV42Pc1_.mjs';
import { $ as $$ProjectCard } from './index_Ds_GAaQh.mjs';
/* empty css                             */

const $$Astro = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
  const allProjects = await getCollection("projects");
  const allAcademics = await getCollection("academics");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects", "data-astro-cid-aid3sr62": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2 class="underline" data-astro-cid-aid3sr62>Projects</h2> <ul role="list" class="link-card-grid" data-astro-cid-aid3sr62> ${allProjects.reverse().map((card) => renderTemplate`${renderComponent($$result2, "Card", $$ProjectCard, { "href": `/projects/${card.slug}/`, "image": card.data.imageThumb.url, "title": card.data.title, "body": card.data.description, "data-astro-cid-aid3sr62": true })}`)} </ul> <h2 class="underline" data-astro-cid-aid3sr62>Academic Work</h2> <ul role="list" class="link-card-grid" data-astro-cid-aid3sr62> ${allAcademics.reverse().map((card) => renderTemplate`${renderComponent($$result2, "Card", $$ProjectCard, { "href": `/academics/${card.slug}/`, "image": card.data.image.url, "title": card.data.title, "body": card.data.description, "data-astro-cid-aid3sr62": true })}`)} </ul> ` })} `;
}, "/Users/teagan/websites/portfolio/src/pages/projects.astro", void 0);

const $$file = "/Users/teagan/websites/portfolio/src/pages/projects.astro";
const $$url = "/projects";

export { $$Projects as default, $$file as file, $$url as url };
