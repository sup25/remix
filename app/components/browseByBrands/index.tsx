import BrowseItems from "../browseItems";
const Brands = [
  { value: "evercove", label: "EverCove", count: 120 },
  { value: "brightnest", label: "BrightNest", count: 85 },
  { value: "lunaluxe", label: "LunaLuxe", count: 45 },
  { value: "peakaura", label: "PeakAura", count: 67 },
  { value: "swiftwave", label: "SwiftWave", count: 93 },
  { value: "truehaven", label: "TrueHaven", count: 38 },
  { value: "glowforge", label: "GlowForge", count: 72 },
  { value: "urbanzen", label: "UrbanZen", count: 54 },
  { value: "noblenest", label: "NobleNest", count: 61 },
  { value: "skyvibe", label: "SkyVibe", count: 43 },
  { value: "boldsprout", label: "BoldSprout", count: 89 },
  { value: "echobloom", label: "EchoBloom", count: 35 },
  { value: "vividpeak", label: "VividPeak", count: 47 },
];
interface Props {
  hide: () => void;
}
const BrowseByBrands = ({ hide }: Props) => {
  return (
    <BrowseItems
      heading="Browse by Brands"
      products={Brands}
      handler={hide}
      link="products"
    />
  );
};

export default BrowseByBrands;
