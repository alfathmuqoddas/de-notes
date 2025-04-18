import { SignInButton } from "../Buttons/SignInButton";

const Navbar = () => {
  return (
    <nav className="p-6 bg-primary">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="text-xl font-bold text-secondary">DE Notes</span>
        </div>
        <div className="flex items-center">
          <SignInButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
