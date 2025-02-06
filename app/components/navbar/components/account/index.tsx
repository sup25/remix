import { useEffect } from "react";
import { HiUser } from "react-icons/hi2";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useDispatch } from "react-redux";

import { logout, setUser } from "~/context/slices/userSlice";
import { useUser } from "~/hooks/useUser";

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

  const dispatch = useDispatch();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    fetcher.load("/account");
  }, []);

  useEffect(() => {
    if (fetcher.data?.user) {
      dispatch(setUser({ user: fetcher.data.user, isAuthenticated: true }));
    } else {
      dispatch(logout());
    }
  }, [fetcher.data, dispatch]);

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      onClick={handleAccountClick}
      className="cursor-pointer rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-gray-200"
    >
      {isAuthenticated ? (
        <HiUser size={25} className="text-green-600" />
      ) : (
        <HiUser size={25} className="text-black" />
      )}
    </div>
  );
};

export default Account;
