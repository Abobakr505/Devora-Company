import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = بيحمّل, null = مفيش, object = مسجل
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
  setError(null);

  const cleanEmail = email.trim();

  console.log("LOGIN DEBUG:", {
    email: cleanEmail,
    passwordExists: Boolean(password),
    passwordLength: password?.length,
  });

  const { data, error: signInError } =
    await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

  console.log("SUPABASE RESPONSE:", {
    data,
    error: signInError,
  });

  if (signInError) {
    setError(signInError.message);

    return {
      ok: false,
      error: signInError.message,
    };
  }

  setSession(data.session);

  return {
    ok: true,
  };
};
  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isLoading: session === undefined,
        isAuthenticated: !!session,
        error,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth لازم يتستخدم جوه AuthProvider");
  return ctx;
}
