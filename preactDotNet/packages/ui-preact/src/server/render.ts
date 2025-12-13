import { h } from "preact";
import renderToString from "preact-render-to-string";
import { Greeting } from "../components/Greeting";

export function render(component: string, props: any) {
  switch (component) {
    case "Greeting":
      return renderToString(h(Greeting, props));
    case "CounterButton":
      return `<div data-preact data-component="CounterButton" data-props="{}"></div>`;
    default:
      throw new Error("Unknown component");
  }
}
