import { h, hydrate } from "preact";
import { CounterButton } from "../components/CounterButton";

const components: any = { CounterButton };

const el = document.querySelector("[data-preact]");
if (el) {
  const name = el.getAttribute("data-component")!;
  const props = JSON.parse(el.getAttribute("data-props")!);

  const Component = components[name];
  hydrate(h(Component, props), el);
}
