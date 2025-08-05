import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
type Props = {
  label?: string;
  helperText?: string;
  error?: string;
} & TextInputProps;

export default function PasswordForm({ label, helperText, ...props }: Props) {
  const { colors } = useTheme();
   const [visible, setVisible] = useState(false);
  return (
    <View className="mb-2">
      {label && (
        <label className="text-sm font-semibold" style={{ color: colors.text }}>
          {label}
        </label>
      )}

      <TextInput
        className="px-3 py-2 my-1 border border-primary rounded-md"
        secureTextEntry={!visible}
        style={{ color: colors.text }}
        placeholderTextColor="#ffffff80"
        {...props}
      />
              <Pressable
          onPress={() => setVisible((prev) => !prev)}
          className="absolute right-3 bottom-3"
        >
          <Ionicons
            name={visible ? "eye" : "eye-off"}
            size={20}
            color={colors.text}
          />
        </Pressable>
      {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
    </View>
  );
}
