import { SvgIconFromFile } from "@/components/ui/svg-icon-from-file";

export const tabIcons = {
  index: {
    active: require("../../assets/images/navigation/home-active.svg"),
    inactive: require("../../assets/images/navigation/home.svg"),
  },
  setting: {
    active: require("../../assets/images/navigation/setting-active.svg"),
    inactive: require("../../assets/images/navigation/setting.svg"),
  },
  profile: {
    active: require("../../assets/images/navigation/profile-active.svg"),
    inactive: require("../../assets/images/navigation/profile.svg"),
  },
  calendar: {
    active: require("../../assets/images/navigation/calendar-active.svg"),
    inactive: require("../../assets/images/navigation/calendar.svg"),
  },
};

export const TabIcon = ({
  name,
  color,
  focused,
}: {
  name: keyof typeof tabIcons;
  color: string;
  focused: boolean;
}) => {
  const source = tabIcons[name][focused ? "active" : "inactive"];
  return (
    <SvgIconFromFile
      source={source}
      size={40}
      lightColor={color}
      darkColor={color}
    />
  );
};
