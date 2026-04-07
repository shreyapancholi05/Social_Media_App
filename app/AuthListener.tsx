"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase";
import { useAuthStore } from "./store/AuthStore";
function AuthListener() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const setUser = useAuthStore.getState().setUser;
      const clearUser = useAuthStore.getState().clearUser;

      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          username:
            currentUser.displayName || currentUser.email?.split("@")[0] || "",
          email: currentUser.email,
        });
      } else {
        clearUser();
      }
    });
    return () => unsubscribe();
  }, []);
  return null;
}

export default AuthListener;
