import { useState } from "react";
import BrowseByBrands from "~/components/browseItems/browseByBrands";
import BrowseByCategories from "~/components/browseItems/browseByCategories";
import HeroHeader from "./components/heroHeader";
import BrowseLinks from "./components/browseLinks";

const Hero: React.FC = () => {
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showBrands, setShowBrands] = useState<boolean>(false);

  const showAllCategories = () => setShowCategories(true);
  const hideCategories = () => setShowCategories(false);

  const showAllBrands = () => setShowBrands(true);
  const hideBrands = () => setShowBrands(false);

  return (
    <div className="section">
      <div className="container">
        {showCategories && (
          <BrowseByCategories hideCategories={hideCategories} />
        )}
        {showBrands && <BrowseByBrands hide={hideBrands} />}

        <div className="flex justify-between pt-20 items-center gap-10 flex-wrap">
          <HeroHeader />
          <BrowseLinks
            onShowCategories={showAllCategories}
            onShowBrands={showAllBrands}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
