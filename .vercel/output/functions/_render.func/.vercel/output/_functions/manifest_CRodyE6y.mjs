import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_B_jYpZxC.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"img[data-astro-cid-eo3wme6m]{border:2px solid black;border-radius:6px}.center[data-astro-cid-eo3wme6m]{display:flex;flex-direction:column;align-items:center;gap:12px}.center[data-astro-cid-eo3wme6m] img[data-astro-cid-eo3wme6m]{max-width:100%}ul[data-astro-cid-eo3wme6m]{list-style:none;padding-left:0}.info[data-astro-cid-eo3wme6m]{background-color:#584966;color:#fff;border-radius:6px;font-weight:600;font-size:.85rem;padding:.3em .6em .2em}.info__list[data-astro-cid-eo3wme6m]{text-indent:1rem;list-style:none;padding:0}.info__list[data-astro-cid-eo3wme6m]>li[data-astro-cid-eo3wme6m]{margin-top:10px}.info__title[data-astro-cid-eo3wme6m]{border-radius:4px;font-size:.7rem;margin-right:5px;padding:.5em .3em .3em}.info__link[data-astro-cid-eo3wme6m]{color:var(--text-link);text-decoration:none}.info__link[data-astro-cid-eo3wme6m]:hover{text-decoration:underline}\na[data-astro-cid-3ef6ksr2]{text-decoration:none}header[data-astro-cid-3ef6ksr2]{display:flex;flex-direction:column;align-items:center;text-align:center}nav[data-astro-cid-3ef6ksr2]{margin-top:20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2]{list-style-type:none;margin:0;padding:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]{display:inline;margin:0 20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#000;text-decoration:none;transition:.25s}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{text-decoration:underline;font-weight:700}@media screen and (min-width: 650px){header[data-astro-cid-3ef6ksr2]{flex-direction:row;justify-content:space-between}nav[data-astro-cid-3ef6ksr2]{margin-top:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]:last-of-type{margin-right:0}}footer[data-astro-cid-sz7xmlte]{display:flex;justify-content:space-between;align-items:center;padding:2.5rem 0 1.5rem;font-size:.75rem}[data-astro-cid-sz7xmlte][data-icon]{font-size:1.25rem;margin-left:20px}footer[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );overflow-y:scroll}body{max-width:calc(100% - 2rem);width:800px;margin:0 auto;padding:0 1rem}main{min-height:75vh;margin:auto;padding:1rem 0;font-size:16px;line-height:1.6}h1{font-size:3rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}.text-gradient{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}html{font-family:system-ui,sans-serif;background:#eee}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2.5rem;padding:0}.underline{width:fit-content;padding:0 .5em;background-image:linear-gradient(rgba(var(--accent-dark),30%),rgba(var(--accent-dark),60%));background-repeat:no-repeat;background-size:100% .48em;background-position:0 90%;transition:background-size .25s ease-in}\n"}],"routeData":{"route":"/academics/[...slug]","isIndex":false,"type":"page","pattern":"^\\/academics(?:\\/(.*?))?\\/?$","segments":[[{"content":"academics","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/academics/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"a[data-astro-cid-3ef6ksr2]{text-decoration:none}header[data-astro-cid-3ef6ksr2]{display:flex;flex-direction:column;align-items:center;text-align:center}nav[data-astro-cid-3ef6ksr2]{margin-top:20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2]{list-style-type:none;margin:0;padding:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]{display:inline;margin:0 20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#000;text-decoration:none;transition:.25s}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{text-decoration:underline;font-weight:700}@media screen and (min-width: 650px){header[data-astro-cid-3ef6ksr2]{flex-direction:row;justify-content:space-between}nav[data-astro-cid-3ef6ksr2]{margin-top:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]:last-of-type{margin-right:0}}footer[data-astro-cid-sz7xmlte]{display:flex;justify-content:space-between;align-items:center;padding:2.5rem 0 1.5rem;font-size:.75rem}[data-astro-cid-sz7xmlte][data-icon]{font-size:1.25rem;margin-left:20px}footer[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );overflow-y:scroll}body{max-width:calc(100% - 2rem);width:800px;margin:0 auto;padding:0 1rem}main{min-height:75vh;margin:auto;padding:1rem 0;font-size:16px;line-height:1.6}h1{font-size:3rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}.text-gradient{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}html{font-family:system-ui,sans-serif;background:#eee}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2.5rem;padding:0}.underline{width:fit-content;padding:0 .5em;background-image:linear-gradient(rgba(var(--accent-dark),30%),rgba(var(--accent-dark),60%));background-repeat:no-repeat;background-size:100% .48em;background-position:0 90%;transition:background-size .25s ease-in}\n.blog-card[data-astro-cid-e3grugc2]{list-style:none;display:flex;padding:1px;background-color:#23262d;background-image:none;background-size:400%;border-radius:7px;background-position:100%;transition:background-position .6s cubic-bezier(.22,1,.36,1);box-shadow:inset 0 0 0 1px #ffffff1a}.blog-card[data-astro-cid-e3grugc2]>a[data-astro-cid-e3grugc2]{width:100%;text-decoration:none;line-height:1.4;padding:calc(1.5rem - 1px);border-radius:8px;color:#fff;background-color:#23262d;opacity:.8}h2[data-astro-cid-e3grugc2]{margin:0;font-size:1.25rem;transition:color .6s cubic-bezier(.22,1,.36,1)}p[data-astro-cid-e3grugc2]{margin-top:.5rem;margin-bottom:0;font-size:1rem}.blog-card[data-astro-cid-e3grugc2]:is(:hover,:focus-within){background-position:0;background-image:var(--accent-gradient)}.blog-card[data-astro-cid-e3grugc2]:is(:hover,:focus-within) h2[data-astro-cid-e3grugc2]{color:rgb(var(--accent-light))}main[data-astro-cid-ijnerlr2]{color:#fff}\n"}],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"a[data-astro-cid-3ef6ksr2]{text-decoration:none}header[data-astro-cid-3ef6ksr2]{display:flex;flex-direction:column;align-items:center;text-align:center}nav[data-astro-cid-3ef6ksr2]{margin-top:20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2]{list-style-type:none;margin:0;padding:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]{display:inline;margin:0 20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#000;text-decoration:none;transition:.25s}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{text-decoration:underline;font-weight:700}@media screen and (min-width: 650px){header[data-astro-cid-3ef6ksr2]{flex-direction:row;justify-content:space-between}nav[data-astro-cid-3ef6ksr2]{margin-top:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]:last-of-type{margin-right:0}}footer[data-astro-cid-sz7xmlte]{display:flex;justify-content:space-between;align-items:center;padding:2.5rem 0 1.5rem;font-size:.75rem}[data-astro-cid-sz7xmlte][data-icon]{font-size:1.25rem;margin-left:20px}footer[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );overflow-y:scroll}body{max-width:calc(100% - 2rem);width:800px;margin:0 auto;padding:0 1rem}main{min-height:75vh;margin:auto;padding:1rem 0;font-size:16px;line-height:1.6}h1{font-size:3rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}.text-gradient{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}html{font-family:system-ui,sans-serif;background:#eee}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2.5rem;padding:0}.underline{width:fit-content;padding:0 .5em;background-image:linear-gradient(rgba(var(--accent-dark),30%),rgba(var(--accent-dark),60%));background-repeat:no-repeat;background-size:100% .48em;background-position:0 90%;transition:background-size .25s ease-in}\n.project-card[data-astro-cid-mspuyifq]{list-style:none;display:flex;background-color:#23262d;background-image:none;background-size:400%;border-radius:12px;background-position:100%;transition:background-position .6s cubic-bezier(.22,1,.36,1);box-shadow:inset 0 0 0 1px #ffffff1a}.image-container[data-astro-cid-mspuyifq]{flex:1}.project-card[data-astro-cid-mspuyifq] img[data-astro-cid-mspuyifq]{max-width:100%;object-fit:contain}.project-card[data-astro-cid-mspuyifq]>a[data-astro-cid-mspuyifq]{width:100%;text-decoration:none;line-height:1.4;padding:calc(1.5rem - 1px);border-radius:8px;color:#fff;background-color:#23262d;opacity:.8}h2[data-astro-cid-mspuyifq]{margin:0;font-size:1.25rem;transition:color .6s cubic-bezier(.22,1,.36,1)}p[data-astro-cid-mspuyifq]{margin-top:.5rem;margin-bottom:0;font-size:1rem}.project-card[data-astro-cid-mspuyifq]:is(:hover,:focus-within){background-position:0;background-image:var(--accent-gradient)}.project-card[data-astro-cid-mspuyifq]:is(:hover,:focus-within) h2[data-astro-cid-mspuyifq]{color:rgb(var(--accent-light))}\nmain[data-astro-cid-aid3sr62]{color:#fff}\n"}],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"img[data-astro-cid-eo3wme6m]{border:2px solid black;border-radius:6px}.center[data-astro-cid-eo3wme6m]{display:flex;flex-direction:column;align-items:center;gap:12px}.center[data-astro-cid-eo3wme6m] img[data-astro-cid-eo3wme6m]{max-width:100%}ul[data-astro-cid-eo3wme6m]{list-style:none;padding-left:0}.info[data-astro-cid-eo3wme6m]{background-color:#584966;color:#fff;border-radius:6px;font-weight:600;font-size:.85rem;padding:.3em .6em .2em}.info__list[data-astro-cid-eo3wme6m]{text-indent:1rem;list-style:none;padding:0}.info__list[data-astro-cid-eo3wme6m]>li[data-astro-cid-eo3wme6m]{margin-top:10px}.info__title[data-astro-cid-eo3wme6m]{border-radius:4px;font-size:.7rem;margin-right:5px;padding:.5em .3em .3em}.info__link[data-astro-cid-eo3wme6m]{color:var(--text-link);text-decoration:none}.info__link[data-astro-cid-eo3wme6m]:hover{text-decoration:underline}\na[data-astro-cid-3ef6ksr2]{text-decoration:none}header[data-astro-cid-3ef6ksr2]{display:flex;flex-direction:column;align-items:center;text-align:center}nav[data-astro-cid-3ef6ksr2]{margin-top:20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2]{list-style-type:none;margin:0;padding:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]{display:inline;margin:0 20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#000;text-decoration:none;transition:.25s}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{text-decoration:underline;font-weight:700}@media screen and (min-width: 650px){header[data-astro-cid-3ef6ksr2]{flex-direction:row;justify-content:space-between}nav[data-astro-cid-3ef6ksr2]{margin-top:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]:last-of-type{margin-right:0}}footer[data-astro-cid-sz7xmlte]{display:flex;justify-content:space-between;align-items:center;padding:2.5rem 0 1.5rem;font-size:.75rem}[data-astro-cid-sz7xmlte][data-icon]{font-size:1.25rem;margin-left:20px}footer[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );overflow-y:scroll}body{max-width:calc(100% - 2rem);width:800px;margin:0 auto;padding:0 1rem}main{min-height:75vh;margin:auto;padding:1rem 0;font-size:16px;line-height:1.6}h1{font-size:3rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}.text-gradient{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}html{font-family:system-ui,sans-serif;background:#eee}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2.5rem;padding:0}.underline{width:fit-content;padding:0 .5em;background-image:linear-gradient(rgba(var(--accent-dark),30%),rgba(var(--accent-dark),60%));background-repeat:no-repeat;background-size:100% .48em;background-position:0 90%;transition:background-size .25s ease-in}\n"}],"routeData":{"route":"/projects/[...slug]","isIndex":false,"type":"page","pattern":"^\\/projects(?:\\/(.*?))?\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/projects/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"a[data-astro-cid-3ef6ksr2]{text-decoration:none}header[data-astro-cid-3ef6ksr2]{display:flex;flex-direction:column;align-items:center;text-align:center}nav[data-astro-cid-3ef6ksr2]{margin-top:20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2]{list-style-type:none;margin:0;padding:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]{display:inline;margin:0 20px}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{color:#000;text-decoration:none;transition:.25s}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]:hover{text-decoration:underline;font-weight:700}@media screen and (min-width: 650px){header[data-astro-cid-3ef6ksr2]{flex-direction:row;justify-content:space-between}nav[data-astro-cid-3ef6ksr2]{margin-top:0}nav[data-astro-cid-3ef6ksr2] ul[data-astro-cid-3ef6ksr2] li[data-astro-cid-3ef6ksr2]:last-of-type{margin-right:0}}footer[data-astro-cid-sz7xmlte]{display:flex;justify-content:space-between;align-items:center;padding:2.5rem 0 1.5rem;font-size:.75rem}[data-astro-cid-sz7xmlte][data-icon]{font-size:1.25rem;margin-left:20px}footer[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none}:root{--accent: 136, 58, 234;--accent-light: 224, 204, 250;--accent-dark: 49, 10, 101;--accent-gradient: linear-gradient( 45deg, rgb(var(--accent)), rgb(var(--accent-light)) 30%, white 60% );overflow-y:scroll}body{max-width:calc(100% - 2rem);width:800px;margin:0 auto;padding:0 1rem}main{min-height:75vh;margin:auto;padding:1rem 0;font-size:16px;line-height:1.6}h1{font-size:3rem;font-weight:700;line-height:1;text-align:center;margin-bottom:1em}.text-gradient{background-image:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:400%;background-position:0%}html{font-family:system-ui,sans-serif;background:#eee}code{font-family:Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace}.link-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(24ch,1fr));gap:2.5rem;padding:0}.underline{width:fit-content;padding:0 .5em;background-image:linear-gradient(rgba(var(--accent-dark),30%),rgba(var(--accent-dark),60%));background-repeat:no-repeat;background-size:100% .48em;background-position:0 90%;transition:background-size .25s ease-in}\n.project-card[data-astro-cid-mspuyifq]{list-style:none;display:flex;background-color:#23262d;background-image:none;background-size:400%;border-radius:12px;background-position:100%;transition:background-position .6s cubic-bezier(.22,1,.36,1);box-shadow:inset 0 0 0 1px #ffffff1a}.image-container[data-astro-cid-mspuyifq]{flex:1}.project-card[data-astro-cid-mspuyifq] img[data-astro-cid-mspuyifq]{max-width:100%;object-fit:contain}.project-card[data-astro-cid-mspuyifq]>a[data-astro-cid-mspuyifq]{width:100%;text-decoration:none;line-height:1.4;padding:calc(1.5rem - 1px);border-radius:8px;color:#fff;background-color:#23262d;opacity:.8}h2[data-astro-cid-mspuyifq]{margin:0;font-size:1.25rem;transition:color .6s cubic-bezier(.22,1,.36,1)}p[data-astro-cid-mspuyifq]{margin-top:.5rem;margin-bottom:0;font-size:1rem}.project-card[data-astro-cid-mspuyifq]:is(:hover,:focus-within){background-position:0;background-image:var(--accent-gradient)}.project-card[data-astro-cid-mspuyifq]:is(:hover,:focus-within) h2[data-astro-cid-mspuyifq]{color:rgb(var(--accent-light))}\n[data-astro-cid-j7pv25f6][data-icon]{font-size:4rem;margin-right:12px}#highlights[data-astro-cid-j7pv25f6],#skills[data-astro-cid-j7pv25f6],#now[data-astro-cid-j7pv25f6]{margin-top:3rem}.button[data-astro-cid-j7pv25f6]{border:1px solid rgba(var(--accent-light),25%);background:linear-gradient(rgba(var(--accent-dark),66%),rgba(var(--accent-dark),33%));padding:1rem;border-radius:8px;width:fit-content}.button[data-astro-cid-j7pv25f6] a[data-astro-cid-j7pv25f6]{color:#fff;text-decoration:none;font-weight:700;text-shadow:black 2px 2px 4px}.button[data-astro-cid-j7pv25f6] a[data-astro-cid-j7pv25f6]:hover{text-decoration:underline}.no-spacing[data-astro-cid-j7pv25f6]{margin:0;padding:0}.no-spacing[data-astro-cid-j7pv25f6] a[data-astro-cid-j7pv25f6]{text-decoration:none;font-weight:700}.no-spacing[data-astro-cid-j7pv25f6] a[data-astro-cid-j7pv25f6]:hover{text-decoration:underline}h3[data-astro-cid-j7pv25f6]{padding-top:1rem}h3[data-astro-cid-j7pv25f6]:first-of-type{padding-top:0}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/teagan/websites/portfolio/src/pages/academics/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/academics/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/teagan/websites/portfolio/src/pages/projects.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/teagan/websites/portfolio/src/pages/projects/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/teagan/websites/portfolio/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["/Users/teagan/websites/portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/blog.astro":"chunks/pages/blog_DRch_nze.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_CeQlL6z3.mjs","/src/pages/projects.astro":"chunks/pages/projects_uWtGq5lY.mjs","\u0000@astrojs-manifest":"manifest_CRodyE6y.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_WdgC_Ni_.mjs","\u0000@astro-page:src/pages/academics/[...slug]@_@astro":"chunks/_.._PwRCNcWR.mjs","\u0000@astro-page:src/pages/blog@_@astro":"chunks/blog_Bz7iOm2T.mjs","\u0000@astro-page:src/pages/projects@_@astro":"chunks/projects_DE617Xl9.mjs","\u0000@astro-page:src/pages/projects/[...slug]@_@astro":"chunks/_.._BpIM0wzr.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DO9A9BwV.mjs","/Users/teagan/websites/portfolio/src/content/academics/work-1.md?astroContentCollectionEntry=true":"chunks/work-1_70EExEZ1.mjs","/Users/teagan/websites/portfolio/src/content/projects/work-1.md?astroContentCollectionEntry=true":"chunks/work-1_BIuwJV73.mjs","/Users/teagan/websites/portfolio/src/content/projects/work-2.md?astroContentCollectionEntry=true":"chunks/work-2_BBVvnpb1.mjs","/Users/teagan/websites/portfolio/src/content/academics/work-1.md?astroPropagatedAssets":"chunks/work-1_BJC2QIi-.mjs","/Users/teagan/websites/portfolio/src/content/projects/work-1.md?astroPropagatedAssets":"chunks/work-1_DnWJUT9f.mjs","/Users/teagan/websites/portfolio/src/content/projects/work-2.md?astroPropagatedAssets":"chunks/work-2_B0cqhC5Q.mjs","/Users/teagan/websites/portfolio/src/content/academics/work-1.md":"chunks/work-1_CUvEMsGq.mjs","/Users/teagan/websites/portfolio/src/content/projects/work-1.md":"chunks/work-1_W3py0NNN.mjs","/Users/teagan/websites/portfolio/src/content/projects/work-2.md":"chunks/work-2__qazINN1.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/favicon.svg","/robots.txt","/images/indie-artists-0.png","/images/indie-artists-1.png","/images/indie-artists-2.png","/images/indie-artists-3.png","/images/ingenium-0.png","/images/ingenium-1.png","/images/ingenium-2.png","/images/ingenium-3.png"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
