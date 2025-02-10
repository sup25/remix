import { TbLoader } from "react-icons/tb";
export const Loading = ({ size = 50 }) => {
  return (
    <div className="flex justify-center items-center ">
      <TbLoader className="animate-spin " size={size} />
    </div>
  );
};
