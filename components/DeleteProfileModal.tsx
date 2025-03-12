import { userData } from "@/lib/currentProfile";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { THIText } from "./THIText";

type DeleteProfileModalProps = {
  displayModal: boolean;
  setDisplayModal: (arg: boolean) => void;
  deleteProfile: () => void;
};

export function DeleteProfileModal({
  displayModal,
  setDisplayModal,
  deleteProfile,
}: DeleteProfileModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={displayModal}
      onRequestClose={() => setDisplayModal(!displayModal)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: "row" }}>
            <THIText style={styles.modalText}>Delete </THIText>
            <THIText style={[styles.modalText, styles.usernameText]}>
              @{userData.USERNAME}'s
            </THIText>
            <THIText style={styles.modalText}> Profile</THIText>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setDisplayModal(!displayModal)}
            >
              <THIText style={styles.cancelButtonText}>Cancel</THIText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={async () => {
                await deleteProfile();
                setDisplayModal(!displayModal);
              }}
            >
              <THIText style={styles.logoutButtonText}>Delete</THIText>
            </TouchableOpacity>
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
  usernameText: {
    fontWeight: 700,
  },
});
