import { useTheme } from "@react-navigation/native";
import { TextInput, TextInputProps, View } from "react-native";

type Props = {
  label?: string;
  helperText?: string;
  error?: string;
} & TextInputProps;

export default function TextForm({ label, helperText, ...props }: Props) {
  const { colors } = useTheme();
  return (
    <View className="mb-2">
      {label && (
        <label className="text-sm font-semibold" style={{ color: colors.text }}>
          {label}
        </label>
      )}

      <TextInput
        className="px-3 py-2 my-1 border border-primary rounded-md"
        style={{ color: colors.text }}
        placeholderTextColor="#ffffff80"
        {...props}
      />
      {props.error && <p className="text-sm text-red-500">{props.error}</p>}
      {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
    </View>
  );
}
