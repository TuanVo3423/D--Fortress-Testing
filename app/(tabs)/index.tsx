import { router } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const handleNavigateToGame = () => {
    router.push("./play");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/home-background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.imageContainer}>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToGame}>
            <Image
              source={require("@/assets/images/tap-to-play.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  image: {
    resizeMode: "cover",
  },
});

export default HomeScreen;
