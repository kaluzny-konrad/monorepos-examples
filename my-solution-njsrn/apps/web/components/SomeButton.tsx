"use client";

import { useState } from "react";

export default function SomeButton() {
  const [count, setCount] = useState(0);
  const handlePress = () => {
    setCount(count + 1);
  };
  return (
    <button
      className="bg-blue-500 text-white font-bold text-3xl"
      onClick={handlePress}
    >
      Click me {count}
    </button>
  );
}
