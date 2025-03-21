import { SignInButton } from "../Buttons/SignInButton";

const Navbar = () => {
  return (
    <nav className="fixed flex justify-between items-center w-full h-16 px-4 py-2 bg-primary text-primary-foreground">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">De-Notes</h1>
      </div>
      <SignInButton />
    </nav>
  );
};

export default Navbar;
