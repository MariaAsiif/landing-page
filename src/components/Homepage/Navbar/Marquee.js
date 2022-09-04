import React, { useEffect } from "react";

import Marquee from "react-fast-marquee";
import "./offCanvas.css";
import marqee from "../../../assets/tickerlogo.png";
import axios from "axios";
import { useState } from "react";

const MarqueeView = () => {

  const [tickers, setTickers] = useState([])
  useEffect(() => {
    (async () => {
      try {

        let payload = {

          "sortproperty": "created_at",
          "sortorder": -1,
          "offset": 0,
          "limit": 2,
          "query": {
            "critarion": { "active": true },

            "addedby": "_id email first_name",

            "lastModifiedBy": "_id email first_name"
          }

        }

        let response = await axios.post("https://hporxadminbackend.herokuapp.com/tickers/getTickersWithFullDetailsPublic", payload);
        // setallpermission(response.data.permissions)
        setTickers(response.data.data.tickers)
        console.log("ticker", response)
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
        {tickers.map((ticker, i) => (
          <>
            <span style={{ display: "inline-block", margin: "0 1rem" }}>
              <img
                className="marq-logo"
                style={{ verticalAlign: "bottom" }}
                src={`https://hporxadminbackend.herokuapp.com/${ticker.logoFile}`}
                alt={marqee}
              />
              {ticker.tickerText}
            </span>
          </>
        ))}

      </Marquee>
    </div>
  );
};

export default MarqueeView;
