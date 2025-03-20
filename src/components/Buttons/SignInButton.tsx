import { Button } from "../ui/button";
import { auth } from "../../lib/firebase";
import { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export function SignInButton() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user) {
        console.log("User signed in", result.user);
      } else {
        console.log("No user");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    try {
      if (window.confirm("Are you sure you want to sign out?")) {
        await signOut(auth);
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("User is signed in");
      } else {
        setUser(null);
        console.log("User is signed out");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {user ? (
        <Button variant={"destructive"} size={"lg"} onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button size={"lg"} onClick={handleSignIn}>
          Sign In
        </Button>
      )}
    </div>
  );
}
