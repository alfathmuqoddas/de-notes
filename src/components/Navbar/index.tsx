import { SignInButton } from "../Buttons/SignInButton";
import { Search } from "lucide-react";
import useSearchStore from "@/store/useSearchStore";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { setSearchTerm } = useSearchStore();
  const navigate = useNavigate();
  return (
    <nav className="py-2 bg-primary">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div
          className="text-xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          DE Notes
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
