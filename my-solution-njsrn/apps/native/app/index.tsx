import { Text, View } from "react-native";
import SomeButton from "../components/SomeButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Native with Tailwind CSS</Text>
      <Text>This is a paragraph</Text>
      <SomeButton />
    </View>
  );
}
