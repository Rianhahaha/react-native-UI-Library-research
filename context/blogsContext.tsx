import { Blogs, readBlogs } from "@/utils/readBlogs";
import { createContext, useContext, useEffect, useState } from "react";

type BlogsContextType = {
  blogs: Blogs[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

export function BlogsProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await readBlogs();
      setBlogs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log("Blog context loaded");

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        loading,
        error,
        refetch: fetchBlogs,
      }}
    >
      {children}
    </BlogsContext.Provider>
  );
}

export function useBlogsContext() {
  const ctx = useContext(BlogsContext);
  if (!ctx) {
    throw new Error("useArticleContext must be used within an ArticleProvider");
  }
  return ctx;
}
