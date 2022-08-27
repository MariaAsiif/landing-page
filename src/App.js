import React, { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Homepage2 from "./components/Homepage2/Homepage2";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainPage from "./components/AgenciesPage/MainPage";
import LocatehomePage from "./components/LocaterPage/LocatehomePage";
import LayerDetail from "./components/LayerDetail/LayerDetail";
function App() {
  const locationFound = localStorage.getItem('saveCurentLocation')




    useEffect(() => {
      if(!locationFound){
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat=position.coords.latitude;
           const lng=position.coords.longitude;
          localStorage.setItem('saveCurentLocation' , JSON.stringify({lat,lng}))
         });
      }
  }, []);


  // useEffect(() => {
  //   fetch("http://ip-api.com/json")
  //     .then((res) => res.json())
  //     .then((response) => {
  //       console.log("Country is : ", response.country);
  //       console.log("Region is: ", response.regionName);
  //     })
  //     .catch((error) => {
  //       console.log("Request failed:", error);
  //     });
  // }, []);


  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage  />
          </Route>
          <Route path="/home">
            <Homepage2 />
          </Route>
          <Route path="/agency">
            <MainPage />
          </Route>
          <Route path="/locator" component={LocatehomePage} />
          <Route path="/detail" component={LayerDetail} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
