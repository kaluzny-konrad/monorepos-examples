import { Stack } from "expo-router";
import "../global.css";
import TrpcProvider from "@repo/trpc/TrpcProvider.native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import Constants from "expo-constants";

function getTrpcUrl(): string {
  // Try to get the local IP from Expo's debugger host
  // This works when running on physical devices via Expo Go
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  const ipAddress = debuggerHost ? debuggerHost.split(":")[0] : null;

  // Check if URL is explicitly set via environment variable
  if (process.env.EXPO_PUBLIC_TRPC_URL) {
    let url = process.env.EXPO_PUBLIC_TRPC_URL;
    
    // If the URL contains localhost and we have an IP address, replace it
    // This allows the env var to work for both simulators and physical devices
    if (url.includes("localhost") && ipAddress) {
      url = url.replace("localhost", ipAddress);
      console.log("[tRPC] Replaced localhost with detected IP:", ipAddress, "-> URL:", url);
      return url;
    }
    
    console.log("[tRPC] Using URL from EXPO_PUBLIC_TRPC_URL:", url);
    return url;
  }

  // Use detected IP if available
  if (ipAddress) {
    const url = `http://${ipAddress}:3000/trpc`;
    console.log("[tRPC] Detected IP from Expo:", ipAddress, "-> URL:", url);
    return url;
  }

  // Fallback to localhost for simulators/emulators
  console.log("[tRPC] Using fallback localhost URL");
  return "http://localhost:3000/trpc";
}

export default function RootLayout() {
  const trpcUrl = getTrpcUrl();
  
  return (
    <TrpcProvider
      url={trpcUrl}
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
