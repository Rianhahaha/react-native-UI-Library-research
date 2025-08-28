import { Article, readArticles } from "@/utils/readArticles";
import { createContext, useContext, useEffect, useState } from "react";

type ArticleContextType = {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await readArticles();
      setArticles(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     fetchArticles();
  }, []);


  return (
    <ArticleContext.Provider
      value={{
        articles,
        loading,
        error,
        refetch: fetchArticles,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticleContext() {
  const ctx = useContext(ArticleContext);
  if (!ctx) {
    throw new Error("useArticleContext must be used within an ArticleProvider");
  }
  return ctx;
}
