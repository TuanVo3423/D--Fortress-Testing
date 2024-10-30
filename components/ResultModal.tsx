import { STATUS } from "@/constants";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
export interface IResultModalProps {
  visible: boolean;
  outcome: STATUS | undefined;
  onRestart: () => void;
}
export const ResultModal = ({
  visible,
  outcome,
  onRestart,
}: IResultModalProps) => (
  <Modal
    transparent={true}
    statusBarTranslucent
    visible={visible}
    animationType="slide"
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Image
          source={
            outcome === STATUS.WIN
              ? require("@/assets/images/you-win.png")
              : require("@/assets/images/you-lose.png")
          }
          style={styles.restartImage}
        />
        <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
          <Image
            source={require("@/assets/images/tap-to-restart.png")}
            style={styles.restartImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    alignItems: "center",
  },
  restartButton: {
    position: "absolute",
    top: 270,
  },
  restartImage: {
    resizeMode: "contain",
    marginBottom: 60,
  },
});
