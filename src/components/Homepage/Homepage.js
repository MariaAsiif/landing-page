import React, { createContext , Suspense} from "react";
import Agriculture from "./Agriculture/Agriculture";
import BelowGrowProfit from "./BelowGrowProfit/BelowGrowProfit";
import Chillum from "./Chillums/Chillums";
import Cutivation from "./Cultivation/Cultivation";
import GrowProfit from "./GrowProfit/GrowProfit";
import Header from "./Header/Header";
import MedicinesSlick from "./Medicines Slick/MedicinesSlick";
import MedicineSmallSlick from "./MedicineSmallSlick/MedicineSmallSlick";
import Portable from "./Portable/Portable";
import Prescribe from "./Prescribe/Prescribe";
import Statistics from "./Statistics/Statistics";
import SubscribeNewsletter from "./SubscribeNewsletter/SubscribeNewsletter";
import TrustedSuppliers from "./TrustedSuppliers/TrustedSuppliers";
import Vaporize from "./Vaporize/Vaporize";
import Footer from "./Footer/Footer";
// import Inhalate from "./Inhalate/Inhalate";
import Marketplace from "../MarketPlace/Marketplace";
import Diaganose from "./Diagnose/Diaganose";
import EMultiVendor from "./EMultiVendor/EMultiVendor";
import mensFashionDiscount from "../../assets/mensFashionDiscount.svg";
import giftCard from "../../assets/giftCard.jpg";
import Locate from "./Locate/Locate";

import interOrg1 from "../../assets/interOrg1.svg";
import interOrg2 from "../../assets/interOrg2.svg";
import interOrg3 from "../../assets/interOrg3.svg";
import interOrg4 from "../../assets/interOrg4.svg";
import interOrg5 from "../../assets/interOrg5.svg";
import trustedSupplier2 from "../../assets/trustedSupplier2.svg";
import trustedSupplier3 from "../../assets/trustedSupplier3.svg";
import trustedSupplier4 from "../../assets/trustedSupplier4.svg";
import trustedSupplier5 from "../../assets/trustedSupplier5.svg";
import trustedSupplier6 from "../../assets/trustedSupplier6.svg";
import FollowUs from "./FollowUs/FollowUs";
import followUs1 from "../../assets/twitter.svg";
import followUs2 from "../../assets/facebook.svg";
import followUs3 from "../../assets/youtube.svg";
import followUs4 from "../../assets/snapchat.svg";
import followUs5 from "../../assets/www.svg";
import followUs6 from "../../assets/messenger.svg";
import followUs7 from "../../assets/instagram.svg";
import followUs8 from "../../assets/linkdin.svg";
import hygie1 from "../../assets/hygie1.svg";
import hygie2 from "../../assets/hygie2.svg";
import hygie3 from "../../assets/hygie3.svg";
import hygie4 from "../../assets/hygie4.svg";
import hygie5 from "../../assets/hygie5.svg";
import hygie6 from "../../assets/hygie6.svg";
import hygie7 from "../../assets/hygie7.svg";
import hygie8 from "../../assets/hygie8.svg";
import hygie9 from "../../assets/hygie9.svg";
import aboveCopyright1 from "../../assets/aboveCopyright1.svg";
import aboveCopyright2 from "../../assets/aboveCopyright2.svg";
import aboveCopyright3 from "../../assets/aboveCopyright3.svg";
import aboveCopyright4 from "../../assets/aboveCopyright4.svg";
import aboveCopyright5 from "../../assets/aboveCopyright5.svg";
import aboveCopyright6 from "../../assets/aboveCopyright6.svg";
import aboveCopyright7 from "../../assets/aboveCopyright7.svg";
import aboveCopyright8 from "../../assets/aboveCopyright8.svg";
import FeatureMarketPlace from "./FeatureMarketplace/FeatureMarketPlace";
import SSL from "./SSL/SSL";
import Terms from "../Terms/Terms";
import Testimonials from "./Testimonials/Testimonials";
import Quote from "./Quote/Quote";
import { ViewTodayContainer } from "../Homepage2/StyledHomepage2";
import ViewedToday from "../Homepage2/ViewedToday/ViewedToday";
import SectionPlaceHolder from '../Globals/SectionPlaceHolder'

export const VolumeContext = createContext();
const styles = {
  margin: "1rem 2rem",
  border: "none",
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  padding: " 0 2rem",
};
const Homepage = () => {
  const [volumeValue, setVolumeValue] = React.useState(false);


  const Inhalate = React.lazy(() => import('./Inhalate/Inhalate'))

  const handleVolume = (value) => {
    setVolumeValue(value);
  };
  const fashionDiscountImgs = [
    mensFashionDiscount,
    mensFashionDiscount,
    mensFashionDiscount,
    mensFashionDiscount,
    mensFashionDiscount,
    mensFashionDiscount,
  ];
  const giftImgs = [giftCard, giftCard, giftCard, giftCard, giftCard, giftCard];
  const trustedSuppliers = [
    trustedSupplier2,
    trustedSupplier3,
    trustedSupplier4,
    trustedSupplier5,
    trustedSupplier6,
    trustedSupplier6,
    trustedSupplier4,
    trustedSupplier5,
    trustedSupplier6,
    trustedSupplier6,
  ];
  const trustedOrganizations = [
    interOrg1,
    interOrg2,
    interOrg3,
    interOrg4,
    interOrg5,
    interOrg1,
  ];
  const followUsImgs = [
    { img: followUs1, title: "Twitter" },
    { img: followUs2, title: "Facbook" },
    { img: followUs3, title: "Youtube" },
    { img: followUs4, title: "Snapchat" },
    { img: followUs5, title: "Vkontakte" },
    { img: followUs6, title: "Messenger" },
    { img: followUs7, title: "Instagram" },
    { img: followUs8, title: "LinkedIn" },
  ];
  const hygieImgs = [
    { img: hygie1, title: "Europe" },
    { img: hygie2, title: "USA" },
    { img: hygie3, title: "Canada" },
    { img: hygie4, title: "Qatar" },
    { img: hygie5, title: "Dubai" },
    { img: hygie6, title: "Spain" },
    { img: hygie7, title: "Qatar" },
    { img: hygie8, title: "Spain" },
    { img: hygie9, title: "Dubai" },
  ];
  const aboveCopyrightImgs = [
    aboveCopyright1,
    aboveCopyright2,
    aboveCopyright3,
    aboveCopyright6,
    aboveCopyright4,
    aboveCopyright5,
    aboveCopyright7,
    aboveCopyright8,
  ];
  return (
    <>
      <VolumeContext.Provider value={handleVolume}>
        <Header id="HOME" value={volumeValue} />
      </VolumeContext.Provider>

      <Suspense fallback={<SectionPlaceHolder/>}>
        <Inhalate id="INHALATE" />
      </Suspense>
      <Vaporize id="VAPORIZE" />
      <Portable id="PORTABLES" />
      <Chillum id="CHILLUMS" />
      <Cutivation id="CULTIVATE" />
      <Agriculture id="CULTIVATE" />
      <GrowProfit id="CULTIVATE" />
      <BelowGrowProfit id="CULTIVATE" />
      <TrustedSuppliers
        id="CULTIVATE"
        imgs={trustedSuppliers}
        head="Trusted International Brands"
      />
      <Diaganose id="DIAGNOSE" />
      <Prescribe id="PRESCRIBE" />
      <MedicinesSlick id="PRESCRIBE" />
      <MedicinesSlick id="PRODUCTS" />
      <MedicineSmallSlick id="PRODUCTS" />
      <Marketplace id="MARKETPLACE" />
      <FeatureMarketPlace order="second" />
      {/* <FashionDiscount imgs={giftImgs} /> */}
      <ViewTodayContainer>
        <ViewedToday section="viewedToday" />
      </ViewTodayContainer>
      <EMultiVendor />
      <Testimonials />
      <Locate id="LOCATE" />
      <Statistics />
      <SubscribeNewsletter />
      <ViewTodayContainer>
        <ViewedToday section="viewedToday" />
      </ViewTodayContainer>
      <TrustedSuppliers
        imgs={trustedOrganizations}
        head="Trusted International Organizations"
      />
      <FollowUs
        imgs={followUsImgs}
        head="Follow Us"
        imgs1={hygieImgs}
        head1="Hygieia Apothecary"
      />
      <Footer />
      <SSL />
      <hr style={styles} />
      <TrustedSuppliers imgs={aboveCopyrightImgs} head="" />
      <Terms />
      <VolumeContext.Provider value={handleVolume}>
        <Quote value={volumeValue} />
      </VolumeContext.Provider>
    </>
  );
};

export default Homepage;
