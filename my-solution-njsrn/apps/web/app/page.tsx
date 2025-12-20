import { ReactElement } from "react";
import SomeButton from "../components/SomeButton";

export default function HomePage(): ReactElement {
  return (
    <div>
      <h1>Web with Tailwind CSS</h1>
      <p>This is a paragraph</p>
      <SomeButton />
    </div>
  );
}
