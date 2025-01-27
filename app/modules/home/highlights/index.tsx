import { RiStore3Line, RiCheckDoubleFill } from "react-icons/ri";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GoTag } from "react-icons/go";

const Highlights = () => {
  const infos = [
    {
      icon: <RiStore3Line size={25} className="text-black" />,
      title: "Ex-display products",
      description:
        "A wide selection of products from the best luxury design showrooms",
    },
    {
      icon: <GoTag size={25} className="text-black" />,
      title: "Unmissable offers",
      description:
        "The most iconic design products discounted for exhibition renewal",
    },
    {
      icon: <IoCheckmarkDoneOutline size={25} className="text-black" />,
      title: "Selected by Off Design",
      description:
        "Verified showrooms to ensure genuine products with 100% original warranty",
    },
  ];

  return (
    <div className="section">
      <div className="container ">
        <div className="flex w-full gap-5  md:flex-nowrap flex-wrap">
          {infos.map((info) => (
            <div
              key={info.title}
              className="flex border w-full max-w-[450px] text-gray-800 border-gray-200 p-5"
            >
              <div className="flex flex-col gap-3">
                {info.icon}
                <h2 className="font-bold text-lg text-gray-800">
                  {info.title}
                </h2>
                <p className="font-semibold w-full max-w-[400px] text-gray-600 text-base">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
