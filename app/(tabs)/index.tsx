import { getProfile } from "@/api/auth";
import MainButton from "@/components/button/MainButton";
import HomeContainer from "@/components/container/HomeContainer";
import { Article, readArticles } from "@/utils/readArticles";
import { Blogs, readBlogs } from "@/utils/readBlogs";
import { getToken, removeToken } from "@/utils/storage";
import { useTheme } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

type Profile = {
  username: string;
  email: string;
};

export default function HomeScreen() {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [articles, serArticles] = useState<Article[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigation = useRouter();
  const { colors } = useTheme();
  useEffect(() => {
    readBlogs().then(setBlogs);
    readArticles().then(serArticles);
  }, []);

  useEffect(() => {
    const checkProfile = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }

      try {
        const user = await getProfile();
        setProfile(user);
      } catch (error) {
        removeToken();
        navigation.replace("/login");
      }
    };

    checkProfile();
  }, []);

  return (
    <>
      <HomeContainer>
        <View className="relative items-center justify-center bg-gradient rounded-b-2xl h-[30%]">
          <View className="absolute left-1/2 -translate-x-1/2 -bottom-[30%] w-[80%] pt-[2rem] pb-5 px-3  justify-center bg-black/10 rounded-xl backdrop-blur-xl border border-primary ">
            <img
              className="w-20 h-20 mx-auto border border-primary rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt=""
            />
            <Text className="text-white text-xl font-semibold text-center">
              Welcome, {profile?.username || "..."}!
            </Text>
            <Text className="text-white text-xs font-thin text-center">
              {profile?.email || "..."}
            </Text>
            <MainButton
              title="Logout"
              onPress={() => {
                removeToken();
                navigation.replace("/login");
              }}
            />
          </View>
        </View>
        {/* {profile && (
          <View style={{ padding: 20, gap: 10 }}>
            <Text style={{ color: "white", fontSize: 20 }}>
              Welcome {profile?.username || "..."}
            </Text>
            <Button
              title="Logout"
              onPress={() => {
                removeToken();
                navigation.replace("/login");
              }}
            />
          </View>
        )} */}
        <View className="h-full px-5 py-5 mt-20 rounded-t-2xl">
          <View className="mb-5">
            <View>
              <Text
                className="text-xl font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Recent Blogs
              </Text>
            </View>
            <View>
              {blogs.length === 0 && <Text>No articles found</Text>}

              <View className="gap-3">
                {Array.isArray(blogs) &&
                  blogs.map((blog: any) => (
                    <Link
                      href={`/(tabs)/explore`}
                      className="px-3 py-4 rounded-md shadow-sm shadow-black/50 bg-white/10"
                      key={blog.id}
                    >
                      <Text
                        className="text-xl font-bold"
                        style={{ color: colors.text }}
                      >
                        {blog.Title}
                      </Text>
                      <Text
                        className="line-clamp-1"
                        style={{ color: colors.text }}
                      >
                        {blog.description}
                      </Text>
                      <Button
                        className="!text-red-400"
                        icon="camera"
                        onPress={() => console.log("Pressed")}
                      >
                        Press me
                      </Button>
                    </Link>
                  ))}
              </View>
            </View>
          </View>
          <View className="pb-5">
            <View>
              <Text
                className="text-xl font-semibold mb-2"
                style={{ color: colors.text }}
              >
                Recent Articles
              </Text>
            </View>
            <View className="w-full  overflow-x-auto">
              {articles.length === 0 && <Text>No articles found</Text>}

              <View className="flex w-[50rem] gap-2 flex-row flex-nowrap ">
                {Array.isArray(articles) &&
                  articles.map((article: any) => (
                    <Link
                      href={`/(tabs)/explore`}
                      className="px-3 py-2 rounded-md bg-white/10 size-[10rem]"
                      key={article.id}
                    >
                      <Text
                        className="text-md font-bold"
                        style={{ color: colors.text }}
                      >
                        {article.title}
                      </Text>
                      <Text
                        className="line-clamp-1"
                        style={{ color: colors.text }}
                      >
                        {article.description}
                      </Text>
                    </Link>
                  ))}
              </View>
            </View>
          </View>
        </View>
      </HomeContainer>
    </>
  );
}
