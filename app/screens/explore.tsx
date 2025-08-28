import CustomCard from "@/components/card/CustomCard";
import CustomSkeleton from "@/components/card/CustomSkeleton";
import GradientMain from "@/components/gradient/GradientMain";
import { Box } from "@/components/ui/box";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useArticleContext } from "@/context/articleContext";
import { Category, readCategories } from "@/utils/category";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { ScreenLayoutNoScroll } from "./layout";

export default function Explore() {
  console.log("Explore");
  const { articles, loading } = useArticleContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoadingCategory(true);
      const data = await readCategories();
      setCategories(data);
    } catch (err: any) {
      console.error(err.message || "Failed to fetch categories");
    } finally {
      setLoadingCategory(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFilter = (category: string) => {
    setFilter((prev) => (prev === category ? "" : category));

  };

  const filteredArticles = useMemo(() => {
    return articles.filter((article: any) => {
      const searched =
        search === "" ||
        article.title.toLowerCase().includes(search.toLowerCase());
      const filtered =
        filter === "" ||
        article.category.name.toLowerCase().includes(filter.toLowerCase());
      return searched && filtered;
    });
  }, [articles, filter, search]);

  return (
    <ScreenLayoutNoScroll>
      <Box className="">
        <Input className=" bg-card rounded-md mb-5 border-border">
          <InputSlot className="pl-3">
            <InputIcon as={SearchIcon} className="text-text" />
          </InputSlot>
          <InputField
            className="text-text"
            placeholder="Search..."
            placeholderTextColor={"#9CA3AF"}
            value={search}
            onChangeText={setSearch}
          />
        </Input>
            {loadingCategory ? (
              <Box className="flex flex-row gap-2 justify-center items-center w-full">
              <Spinner size="large" color={"#D951DF"} />
              </Box>
            ) : (
        <ScrollView horizontal={true} className="pb-2">
          <Box className="flex flex-row gap-2">
              <>
              {categories.map((category: any) => {
              if (filter === category.name) {
                return (
                  <GradientMain className="min-w-[80px] px-3 py-1 rounded-full overflow-hidden ">
                    <Pressable
                      onPress={() => handleFilter(category.name)}
                      key={category.id}
                    >
                      <Text className="text-white text-center font-bold">
                        {category.name}
                      </Text>
                    </Pressable>
                  </GradientMain>
                );
              } else {
                return (
                  <Pressable
                    onPress={() => handleFilter(category.name)}
                    key={category.id}
                    className={`px-3 py-1 min-w-[80px] rounded-full border bg-card  border-border`}
                  >
                    <Text className="text-text text-center">
                      {category.name}
                    </Text>
                  </Pressable>
                );
              }
            })}
              </>
          </Box>
        </ScrollView>
            )}
      </Box>
      <ScrollView className="mb-[70px] overflow-y-auto">
        {filteredArticles.length === 0 && (
          <>
            <Box className="w-full text-center h-full flex-col justify-center items-center">
              <Text className="text-text"> No Article Found </Text>
            </Box>
          </>
        )}
        <Box className="flex flex-col gap-3">
          {loading ? (
            <>
            <CustomSkeleton variant="vertical" />
            <CustomSkeleton variant="vertical" />
            <CustomSkeleton variant="vertical" />
                </>
            
          ): (
            <>
            {filteredArticles.map((article: any) => (
              <CustomCard key={article.id} variant="vertical" content={article} />
            ))}
            </>
          )}
        </Box>
      </ScrollView>
    </ScreenLayoutNoScroll>
  );
}
