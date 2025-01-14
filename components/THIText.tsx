import { StyleProp, Text, TextStyle } from "react-native";

interface THITextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const THIText = ({ children, style }: THITextProps) => {
  return (
    <Text style={[{ fontFamily: "Inter", fontSize: 20 }, style]}>
      {children}
    </Text>
  );
};
