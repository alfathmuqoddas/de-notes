import { SignInButton } from "../Buttons/SignInButton";
import { Search } from "lucide-react";
import useSearchStore from "@/store/useSearchStore";

const Navbar = () => {
  const { setSearchTerm } = useSearchStore();
  return (
    <nav className="py-4 bg-teal-400 dark:bg-teal-600">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary">DE Notes</span>
        </div>
        <div className="hidden md:flex items-center gap-4 min-w-72 border border-gray-100 rounded-lg p-2 text-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={16} color="white" />
        </div>
        <div className="flex items-center">
          <SignInButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
