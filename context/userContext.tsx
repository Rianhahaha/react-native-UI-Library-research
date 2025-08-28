import { getProfile, Profile } from "@/api/auth";
import { createContext, useContext, useEffect, useState } from "react";


type ProfileContextType = {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearProfile: () => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    console.log("profile context loaded");
  }, []);

  console.log("profile context loaded", profile);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        refetch: fetchProfile,
        clearProfile: () => setProfile(null),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("profileContext must be used within an ProfileProvider");
  }
  return ctx;
}
