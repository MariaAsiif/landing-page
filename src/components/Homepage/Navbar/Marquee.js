import React, { useEffect } from "react";

import Marquee from "react-fast-marquee";
import "./offCanvas.css";
import marqee from "../../../assets/tickerlogo.png";
import axios from "axios";

const MarqueeView = () => {


  useEffect(() => {
    (async () => {
        try {

          let payload = {

                "sortproperty": "created_at",
                "sortorder": -1,
                "offset": 0,
                "limit": 2,
                "query": {
                    "critarion": {"active" : true},
                    
                    "addedby": "_id email first_name",
                    
                    "lastModifiedBy": "_id email first_name"
                }
            
            }
           
            let response = await axios.post("http://localhost:5873/tickers/getTickersWithFullDetailsPublic", payload);
            // setallpermission(response.data.permissions)
            console.log("ticker" , response)
        } catch (error) {
            console.log(error);
        }
    })();
}, [])


  return (
    <div
      style={{
        background: "#0000003b", height: "30px",
        fontSize: "12px",
        color: "white",
        width: "100%"
      }}
    >
      <Marquee
        style={{ paddingTop: "5px" }}
        gradient={false}
        pauseOnHover
        direction="left"
        speed="70"
      >
        <span style={{ display: "inline-block", margin: "0 1rem" }}>
          <img
            className="marq-logo"
            style={{ verticalAlign: "bottom" }}
            src={marqee}
            alt={marqee}
          />
        </span>
        Welcome to Hemp Products Online Therapeutic Pharmaceuticals FinSec Alpha
        v8.1.7.22 React Development Release Candidate.
        <span style={{ display: "inline-block", margin: "0 1rem" }}>
          <img
            className="marq-logo"
            style={{ verticalAlign: "bottom" }}
            src={marqee}
            alt={marqee}
          />
        </span>
        This Alpha v8.1.7.22 development candidate represents the successful
        design phalloplasty we intoed to peruse in a module by module
        development schedule beginning immediately.
        <span style={{ display: "inline-block", margin: "0 1rem" }}>
          <img
            className="marq-logo"
            style={{ verticalAlign: "bottom" }}
            src={marqee}
            alt={marqee}
          />
        </span>
        You are welcome to check back, our design and development process is
        iterative, it will be a pleasure to surprise you as the development is
        completed during 2022.
      </Marquee>
    </div>
  );
};

export default MarqueeView;
