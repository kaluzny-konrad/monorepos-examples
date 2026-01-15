import { Stack } from "expo-router";
import "../global.css";
import TrpcProvider from "@repo/trpc/TrpcProvider.native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <TrpcProvider
      url={process.env.EXPO_PUBLIC_TRPC_URL || "http://localhost:3000/trpc"}
    >
      <PaperProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen 
              name="vocabulary" 
              options={{ 
                title: "Vocabulary",
                headerBackTitle: "Home",
                headerStyle: { backgroundColor: "#f9fafb" },
                headerTintColor: "#2563eb",
                headerTitleStyle: { fontWeight: "bold" },
              }} 
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>
        <StatusBar barStyle="dark-content" />
      </PaperProvider>
    </TrpcProvider>
  );
}
