import { Modal, Pressable, StyleSheet, View } from "react-native";
import { THIText } from "../THIText";

interface LogOutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function LogOutModal({ visible, onClose, onLogout }: LogOutModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <THIText style={styles.modalText}>
            Are you sure you want to log out?
          </THIText>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <THIText style={styles.cancelButtonText}>Cancel</THIText>
            </Pressable>
            <Pressable
              style={[styles.button, styles.logoutButton]}
              onPress={() => {
                onLogout();
                onClose();
              }}
            >
              <THIText style={styles.logoutButtonText}>Log Out</THIText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 65,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 50,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    width: 120,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F6F6F6",
  },
  logoutButton: {
    backgroundColor: "#DC4731",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
  },
});
