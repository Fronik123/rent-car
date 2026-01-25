import { Colors } from "@/constants/theme";
import { Modal, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";

export type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <ThemedView style={styles.modalContainer}>
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>

            <ThemedText style={styles.message}>{message}</ThemedText>

            <View style={styles.buttonsContainer}>
              <Button
                title={confirmText}
                option="primary"
                onPress={onConfirm}
                style={styles.button}
                lightColor={danger ? Colors.light.error : undefined}
                darkColor={danger ? Colors.light.error : undefined}
                lightTextColor="#fff"
                darkTextColor="#fff"
              />

              <Button
                title={cancelText}
                option="outline"
                onPress={onCancel}
                style={styles.button}
              />
            </View>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    gap: 16,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
});
