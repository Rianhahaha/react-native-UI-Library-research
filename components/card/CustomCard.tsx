import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { format } from "date-fns";
import { Star } from "lucide-react-native";
import GradientMain from "../gradient/GradientMain";
import { Card } from "../ui/card";

interface Content {
  id: number;
  Title: string;
  title: string;
  description: string;
  createdAt: string;
  Ratings: number;
  category: {
    name: string;
  };
  cover: {
    url: string;
  };
}
type CustomCardProps = {
  content: Content;
  variant?: "vertical" | "horizontal";
};
const getImage = (cover?: { url?: string }) => {
  return cover?.url
    ?  cover.url
    : "https://gluestack.github.io/public-blog-video-assets/yoga.png";
};
export default function CustomCard({ content, variant }:CustomCardProps) {
  return (
    <Card key={content.id} className={`rounded-lg ${variant === "vertical" ? "min-w-[240px]" : "max-w-[240px]"}  bg-card  backdrop-blur-sm border-border border`}>
      <Image
        source={{ uri: getImage(content.cover) }}
        className="mb-2 h-[120px] w-full rounded-md "
        alt="image"
      />
      <Text className="text-sm font-normal mb-2 opacity-50 text-text">
        {format(new Date(content.createdAt), "EEEE, MMMM d, yyyy")}{" "}
      </Text>
      <Text size="md" className="mb-1 font-bold text-text">
        {content.Title || content.title}
      </Text>
      <Text size="md" className="mb-1 line-clamp-2 text-text">
        {content.description}
      </Text>
      {content.category && (
          <GradientMain className="my-2 w-[70px] rounded-full overflow-hidden">
          <Text size="md" className="text-white text-center py-2 px-4">{content.category.name}</Text>
          </GradientMain>
      )}
      {content.Ratings && (
        <Box className="flex flex-row gap-2 items-center ">
          <Icon as={Star} className="text-text"/>
          <Text size="sm" className="text-text">{content.Ratings}</Text>
        </Box>
      )}
    </Card>
  );
}
