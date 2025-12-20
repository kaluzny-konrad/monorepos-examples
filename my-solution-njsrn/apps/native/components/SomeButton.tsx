import { Button } from "react-native";
import { useState } from "react";

export default function SomeButton() {
  const [count, setCount] = useState(0);
  const handlePress = () => {
    setCount(count + 1);
  };
  return (
    <Button title={`Click me ${count}`} onPress={handlePress} color="red" />
  );
}
