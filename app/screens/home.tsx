import CustomCard from "@/components/card/CustomCard";
import CustomSkeleton from "@/components/card/CustomSkeleton";
import GradientMain from "@/components/gradient/GradientMain";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useArticleContext } from "@/context/articleContext";
import { useBlogsContext } from "@/context/blogsContext";
import { useProfileContext } from "@/context/userContext";
import React from "react";
import { ScrollView } from "react-native";
import ScreenLayout from "./layout";

export default function HomeScreen() {
  console.log("Home Screen");
  const { articles } = useArticleContext();
  const { blogs } = useBlogsContext();

  const { profile, loading } = useProfileContext();

  // useEffect(() => {

  //   if (!profile) {
  //     navigation.push("/register");
  //   }
  // }, []);

  console.log("profile at home", profile?.email);

  return (
    <ScreenLayout>
      <Box className="flex flex-col gap-5 mb-[10rem] relative">
        {profile && (
          <>
            <GradientMain>
              <Box className="h-[200px] sticky top-0 gap-1 rounded-xl justify-end items-center p-5  border-primary-100/20 border overflow-hidden">
                <Avatar size="xl" className="mb-3 bg-gradient-main">
                  <AvatarFallbackText>{profile?.username}</AvatarFallbackText>
                  {/* <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
                /> */}
                </Avatar>
                <Text className="text-md font-semibold text-left text-white">
                  Welcome, {profile?.username}
                </Text>
                <Text className="text-xs font-normal text-left text-white">
                  {profile?.email}
                </Text>
              </Box>
            </GradientMain>
          </>
        )}

        {/* Latest Blogs */}
        <Text className="text-lg font-bold text-text">Latest Blogs</Text>
        <ScrollView className="" horizontal={true}>
          <Box className="flex flex-row gap-3">
            {loading ? (
              <>
              <CustomSkeleton variant="horizontal" />
              <CustomSkeleton variant="horizontal" />
              </>
            ) : (
              <>
              {blogs.map((blog: any) => (
                <CustomCard
                  key={blog.id}
                  variant="horizontal"
                  content={blog}
                />
              ))}
              </>
            )}
          </Box>
        </ScrollView>
        {/* Latest Article */}
        <Text className="text-lg font-bold text-text">Latest Articlesa</Text>
        <ScrollView className="w-full ">
          <Box className="flex flex-col gap-3">
            {loading ? (
              <>
                  <CustomSkeleton variant="vertical" />
                  <CustomSkeleton variant="vertical" />
              </>
            ) : (
              <>
              {articles.map((article: any) => (
                <CustomCard
                  key={article.id}
                  variant="vertical"
                  content={article}
                />
              ))}
              </>
            )
            }
            
          </Box>
        </ScrollView>
      </Box>
    </ScreenLayout>
  );
}
