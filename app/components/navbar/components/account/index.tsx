import { useEffect } from "react";
import { HiUser } from "react-icons/hi2";
import { useFetcher, useNavigate } from "@remix-run/react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoaderData {
  user: User | null;
}

const Account = () => {
  const fetcher = useFetcher<LoaderData>();
  const navigate = useNavigate();

  useEffect(() => {
    fetcher.load("/account");
  }, []);

  const user = fetcher.data?.user ?? null;

  const handleAccountClick = () => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <div
      onClick={handleAccountClick}
      className="cursor-pointer rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-gray-200"
    >
      <HiUser size={25} />
    </div>
  );
};

export default Account;
