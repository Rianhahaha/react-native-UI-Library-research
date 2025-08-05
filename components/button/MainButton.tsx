import { useTheme } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

type Props = {
  title?: any;
  onPress?: () => void;
} 

export default function MainButton({ title, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <View className="my-1">
      <Pressable
        onPress={onPress}
        className="bg-gradient w-full rounded-md py-3 px-4 items-center"
      >
        <Text className="text-white text-base font-semibold">{title}</Text>
      </Pressable>
    </View>
  );
}
