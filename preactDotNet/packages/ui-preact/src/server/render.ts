import { h } from "preact";
import renderToString from "preact-render-to-string";
import { Button } from "../components/Button";

export function render(component: string, props: any) {
  switch (component) {
    case "Button":
      return renderToString(h(Button, props));
    default:
      throw new Error("Unknown component");
  }
}
