import { Button } from "../ui/button";
import { auth } from "../../lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import useAuthStore from "@/store/useAuthStore";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SignInButton() {
  const { user, setUser } = useAuthStore();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user) {
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={user?.photoURL || ""} />
              <AvatarFallback>{user?.displayName}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              <span className="text-red-500">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={handleSignIn}>Sign In</Button>
      )}
    </div>
  );
}
