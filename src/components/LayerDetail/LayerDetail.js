import React from "react";
// import Header from "./Header/Header";
import HomePageNav from "../Homepage2/HomePageNav";
import AgenciesHeader from "../AgenciesPage/AgenciesHeader/AgenciesHeader";
import Detail from "./Detail";
function LayerDetail() {
  return (
    <>
      <AgenciesHeader />
      <HomePageNav />
      <Detail />
    </>
  );
}
export default LayerDetail;
