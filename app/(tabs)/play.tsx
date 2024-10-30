import { Cup, ResultModal } from "@/components";
import { STATUS } from "@/constants";
import { useEffect, useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";

export default function PlayScreen() {
  const [ballPosition, setBallPosition] = useState(
    Math.floor(Math.random() * 3)
  );
  const [selectedCup, setSelectedCup] = useState<number | null>(null);
  const [cupAnimations] = useState([
    { x: new Animated.Value(0), y: new Animated.Value(0) },
    { x: new Animated.Value(0), y: new Animated.Value(0) },
    { x: new Animated.Value(0), y: new Animated.Value(0) },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [gameOutcome, setGameOutcome] = useState<STATUS | undefined>();

  const handleCupSelect = (index: number) => {
    setSelectedCup(index);

    Animated.timing(cupAnimations[index].y, {
      toValue: -140,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (index === ballPosition) {
      setGameOutcome(STATUS.WIN);
    } else {
      setGameOutcome(STATUS.LOSE);
    }
    setModalVisible(true);
  };

  const handleRestart = () => {
    setBallPosition(Math.floor(Math.random() * 3));
    setSelectedCup(null);
    setModalVisible(false);
    setGameOutcome(undefined);

    cupAnimations.forEach((anim) => {
      anim.x.setValue(0);
      anim.y.setValue(0);
    });
    startShuffleAnimation();
  };

  const startShuffleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(cupAnimations[0].x, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(cupAnimations[1].x, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(cupAnimations[0].x, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(cupAnimations[1].x, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(cupAnimations[2].x, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(cupAnimations[1].x, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(cupAnimations[2].x, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]),
      { iterations: 3 }
    ).start();
  };

  useEffect(() => {
    startShuffleAnimation();
  }, []);

  return (
    <View style={styles.droidSafeArea}>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.imageContainer}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Cup
              key={index}
              index={index}
              animatedValueX={cupAnimations[index].x}
              animatedValueY={cupAnimations[index].y}
              isSelected={selectedCup === index}
              ballPosition={ballPosition}
              onSelect={handleCupSelect}
            />
          ))}
        </View>
      </ImageBackground>
      <ResultModal
        onRestart={handleRestart}
        outcome={gameOutcome}
        visible={isModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
