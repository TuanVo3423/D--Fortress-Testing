import React from "react";
import {
    Animated,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

interface CupProps {
  index: number;
  animatedValueX: Animated.Value;
  animatedValueY: Animated.Value;
  isSelected: boolean;
  ballPosition: number;
  onSelect: (index: number) => void;
}

export const Cup: React.FC<CupProps> = ({
  index,
  animatedValueX,
  animatedValueY,
  isSelected,
  ballPosition,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(index)}
      style={styles.cupContainer}
    >
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Animated.View
          style={{
            transform: [
              { translateX: animatedValueX },
              { translateY: animatedValueY },
            ],
          }}
        >
          <Image
            source={require("@/assets/images/plastic-cup.png")}
            style={styles.image}
          />
        </Animated.View>
        {isSelected && ballPosition === index && (
          <Image
            source={require("@/assets/images/ball.png")}
            style={styles.ball}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cupContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  ball: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 0,
  },
});
