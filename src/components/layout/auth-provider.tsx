"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/database";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    console.log("[AuthProvider] fetchProfile result:", { data: data ? { role: (data as Profile).role, id: (data as Profile).id } : null, error: error?.message });
    if (!error && data) {
      setProfile(data as Profile);
    } else {
      setProfile(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Use onAuthStateChange as the single source of truth.
    // It fires INITIAL_SESSION immediately, then TOKEN_REFRESHED / SIGNED_OUT etc.
    let initialDone = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AuthProvider] onAuthStateChange:", event, "session:", !!session, "user:", session?.user?.email);
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        console.log("[AuthProvider] Fetching profile for:", currentUser.id);
        await fetchProfile(currentUser.id);
        console.log("[AuthProvider] Profile fetched");
      } else {
        console.log("[AuthProvider] No user, clearing profile");
        setProfile(null);
      }

      // Mark loading as done after the first event (INITIAL_SESSION)
      if (!initialDone) {
        initialDone = true;
        console.log("[AuthProvider] Setting loading=false");
        setLoading(false);
      }
    });

    // Safety timeout: if onAuthStateChange never fires (broken client),
    // stop loading after 5 seconds to prevent infinite spinner
    const timeout = setTimeout(() => {
      if (!initialDone) {
        initialDone = true;
        setLoading(false);
      }
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
