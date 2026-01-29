import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { useLocale } from "@/hooks/useLocale";
import { StyleSheet, View } from "react-native";


export default function Language() {
  const { locale, setLocale, t } = useLocale();

  const handleSelectEnglish = async () => {
    await setLocale("en");
  };

  const handleSelectUkrainian = async () => {
    await setLocale("uk");
  };

  return (
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        <ButtonIcon
          title={t("language.english")}
          icon={require("../../assets/images/language/english.png")}
          isChecked={locale === "en"}
          styleIcon={styles.buttonIcon}
          isShowChecked={true}
          onPress={handleSelectEnglish}
        />

        <ButtonIcon
          title={t("language.ukrainian")}
          icon={require("../../assets/images/language/Ukrainian.png")}
          isChecked={locale === "uk"}
          styleIcon={styles.buttonIcon}
          isShowChecked={true}
          onPress={handleSelectUkrainian}
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
    marginTop: 16,
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 16,
    marginTop: 16,
  },
  buttonIcon: {
    height: 24,
    width: 40,
  },
});
