import { render } from "../../packages/ui-preact/dist/server.cjs";
import { readFileSync } from "fs";

const component = process.argv[2];
const jsonProps = readFileSync(0, "utf-8").trim();
const props = JSON.parse(jsonProps);

process.stdout.write(render(component, props));