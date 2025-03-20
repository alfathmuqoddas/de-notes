import { Button } from "../ui/button";
import { auth } from "../../lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import useAuthStore from "@/store/useAuthStore";

export function SignInButton() {
  const { user, setUser } = useAuthStore();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user) {
        console.log("User signed in");
        setUser(result.user);
      } else {
        console.log("User not signed in");
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  const handleSignOut = async () => {
    try {
      if (window.confirm("Are you sure you want to sign out?")) {
        await signOut(auth);
        setUser(null);
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <Button variant={"destructive"} size={"lg"} onClick={handleSignOut}>
            Sign Out
          </Button>
          <p>{user?.displayName}</p>
        </>
      ) : (
        <Button size={"lg"} onClick={handleSignIn}>
          Sign In
        </Button>
      )}
    </div>
  );
}
