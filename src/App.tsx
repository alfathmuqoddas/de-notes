import { Button } from "./components/ui/button";
import { useState, useEffect } from "react";
import { ModeToggle } from "./components/mode-toggle";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import { SignInButton } from "./components/Buttons/SignInButton";

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in");
          setUser(user);
        } else {
          console.log("User is signed out");
          setUser(null);
        }
      });
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <SignInButton />
      <pre>
        {user
          ? JSON.stringify(user.displayName, null, 2)
          : "User not logged in"}
      </pre>
    </div>
  );
};

export default App;
