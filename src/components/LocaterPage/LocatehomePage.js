import React from "react";
import Header from "./Header/Header";
import HomePageNav from "../Homepage2/HomePageNav";
import AgenciesHeader from "../AgenciesPage/AgenciesHeader/AgenciesHeader";
import FeedBack from "../Feedback/FeedBack";
function LocatehomePage() {
  return (
    <>
      <AgenciesHeader />
      <HomePageNav />
      <Header />
      <FeedBack/>
    </>
  );
}
export default LocatehomePage;
