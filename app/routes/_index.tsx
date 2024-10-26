import type { MetaFunction } from "@remix-run/node";

import { RootState } from "~/context/store";
import { useSelector } from "react-redux";
import Hero from "~/components/(root)/hero";
import Slider from "~/components/(root)/slider";
import Highlights from "~/components/(root)/highlights";
export const meta: MetaFunction = () => {
  return [
    { title: "Task Trek | Work Made Easy" },
    {
      name: "description",
      content:
        "Manage tasks and collaborate in real time with role-based access and smart analytics for enhanced productivity.",
    },
  ];
};

export default function Index() {
  const user = useSelector((state: RootState) => state.user.user);
  /*  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  ); */
  return (
    <div className=" flex flex-col ">
      <Hero />
      <Slider />
      <Highlights />
    </div>
  );
}
