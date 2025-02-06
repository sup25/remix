import { useSelector } from "react-redux";
import { RootState } from "~/context/store";

export const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return { user, isAuthenticated };
};
