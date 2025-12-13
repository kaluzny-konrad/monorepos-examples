import { h } from "preact";
import renderToString from "preact-render-to-string";
import { CounterButton } from "../components/CounterButton";
import { Greeting } from "../components/Greeting";

export function render(component: string, props: any) {
  switch (component) {
    case "CounterButton":
      return renderToString(h(CounterButton, props));
    case "Greeting":
      return renderToString(h(Greeting, props));
    default:
      throw new Error("Unknown component");
  }
}
