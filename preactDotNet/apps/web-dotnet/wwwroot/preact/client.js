import { hydrate as r, h as a } from "preact";
import { B as n } from "./Button-DdDsF3ZH.js";
const p = { Button: n }, t = document.querySelector("[data-preact]");
if (t) {
  const o = t.getAttribute("data-component"), e = JSON.parse(t.getAttribute("data-props"));
  r(a(p[o], e), t);
}
