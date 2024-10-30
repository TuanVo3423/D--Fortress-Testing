import { StyleSheet, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text>123</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});
