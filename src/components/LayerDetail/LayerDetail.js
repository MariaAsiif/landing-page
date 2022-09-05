import React from "react";
// import Header from "./Header/Header";
import HomePageNav from "../Homepage2/HomePageNav";
import AgenciesHeader from "../AgenciesPage/AgenciesHeader/AgenciesHeader";
import Detail from "./Detail";
import FeedBack from "../Feedback/FeedBack";
function LayerDetail() {
  return (
    <>
      <AgenciesHeader />
      <HomePageNav />
      <Detail />
      <FeedBack/>
    </>
  );
}
export default LayerDetail;
