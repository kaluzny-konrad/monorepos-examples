import { h, hydrate } from "preact";
import { Button } from "../components/Button";

const components: any = { Button };

const el = document.querySelector("[data-preact]");
if (el) {
  const name = el.getAttribute("data-component")!;
  const props = JSON.parse(el.getAttribute("data-props")!);

  hydrate(h(components[name], props), el);
}
