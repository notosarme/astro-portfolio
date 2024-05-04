import { d as createComponent, g as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_B_jYpZxC.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus a tortor at molestie. Sed pellentesque leo auctor, auctor lorem nec, venenatis risus. Vivamus commodo ipsum vitae orci finibus, vel porta nunc viverra. In hac habitasse platea dictumst. Nunc pretium, ligula ultricies consequat sollicitudin, enim ex ullamcorper nisl.</p>";

				const frontmatter = {"title":"Academic 1","description":"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci","imageThumb":{"url":"/GitHub.webp","alt":"GitHub wallpaper"},"image":{"url":"/GitHub.webp","alt":"GitHub wallpaper"},"supImage1":{"url":"/image-1.webp","alt":"first image of your project."},"supImage2":{"url":"/image-2.webp","alt":"second image of your project."},"platform":"Web","stack":"Astro, JavaScript","website":"https://astro-milky-way.netlify.app/","github":"https://github.com/ttomczak3/Milky-Way"};
				const file = "/Users/teagan/websites/portfolio/src/content/academics/work-1.md";
				const url = undefined;
				function rawContent() {
					return "\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus a tortor at molestie. Sed pellentesque leo auctor, auctor lorem nec, venenatis risus. Vivamus commodo ipsum vitae orci finibus, vel porta nunc viverra. In hac habitasse platea dictumst. Nunc pretium, ligula ultricies consequat sollicitudin, enim ex ullamcorper nisl.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
