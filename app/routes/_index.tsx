import type { MetaFunction } from "@remix-run/node";
import Hero from "~/modules/home/hero";
import Slider from "~/modules/home/slider";
import Highlights from "~/modules/home/highlights";
import MarqueeBanner from "~/modules/home/marqueebanner";
import FeaturedProducts from "~/modules/home/featuredProducts";
import BrandFeatures from "~/modules/home/brandFeatures";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix | Shopping Made Easy" },
    {
      content:
        "Discover a seamless shopping experience with Remix. Enjoy intuitive navigation, real-time product updates, and personalized recommendations.",
    },
  ];
};

export default function Index() {
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
