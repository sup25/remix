import type { MetaFunction } from "@remix-run/node";

import { RootState } from "~/context/store";
import { useSelector } from "react-redux";
import Hero from "~/modules/home/hero";
import Slider from "~/modules/home/slider";
import Highlights from "~/modules/home/highlights";
import MarqueeBanner from "~/modules/home/marqueebanner";
import FeaturedProducts from "~/modules/home/featuredProducts";

import BrandFeatures from "~/modules/home/brandFeatures";

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
    <div className=" flex flex-col gap-20 ">
      <Hero />
      <Slider />
      <Highlights />
      <MarqueeBanner />
      <FeaturedProducts />
      <BrandFeatures />
    </div>
  );
}
