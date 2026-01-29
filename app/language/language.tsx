import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { StyleSheet, View } from "react-native";


export default function Language() {

  return (
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        <ButtonIcon
          title="English"
          icon={require("../../assets/images/language/english.png")}
          isChecked={true}
          styleIcon={styles.buttonIcon}
          isShowChecked={true}
        />

        <ButtonIcon
          title="Ukrainian"
          icon={require("../../assets/images/language/Ukrainian.png")}
          isChecked={false}
          styleIcon={styles.buttonIcon}
          isShowChecked={true}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 16,
  },
  buttonIcon: {
    height: 24,
    width: 40,
  },
});