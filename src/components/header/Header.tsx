import useAuthContext from "@/hooks/useAuthContext";
import { Button } from "../ui/button";

const Header = () => {
  const { signOut } = useAuthContext();
  return (
    <div className="w-full h-[100px] flex justify-between px-4 py-5 items-center bg-secondary">
      <div className="font-bold text-xl">Product Market</div>
      <nav>
        <Button onClick={signOut} variant={"link"}>
          Sign out
        </Button>
      </nav>
    </div>
  );
};

export default Header;
