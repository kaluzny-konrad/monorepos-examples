import { render } from "../../packages/ui-preact/dist/server.cjs";

const component = process.argv[2];
const props = JSON.parse(process.argv[3]);

process.stdout.write(render(component, props));