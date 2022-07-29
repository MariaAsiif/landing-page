import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";
import axios from "axios";
import { ViewMoreBtn } from '../../../Globals/Globals';
import { LocateUsButton } from '../StylesLocate';
import { useHistory } from 'react-router-dom';


const Map = ({ allAddresses, doctorsData, locatorData }) => {
  const history = useHistory()
  const locationFound = localStorage.getItem('saveCurentLocation');

  const [locationInfo, setLocationInfo] = useState(false);
  const [marker, setMarker] = useState([]);
  const [centerLocation, setCenterLoacation] = useState("");
  const [defaulcenterLocation, setDefaultCenterLoacation] = useState("");
  const [selectedAddress, setselectedAddress] = useState({})


  useEffect(() => {
    if (locationFound) {
      setDefaultCenterLoacation(JSON.parse(locationFound));
      setMarker([JSON.parse(locationFound)]);
    } else {
      setDefaultCenterLoacation({ lat: 40.4637, lng: 3.7492 })
      setMarker([{ lat: 40.4637, lng: 3.7492 }]);
    }
  }, [locationFound])


  useEffect(async () => {


    //  const location = await axios.get('https://cannabis.top200lawyers.com/wp-json/citadela-directory/map-data/points/citadela-item?dataType=markers&category=157&location=&only_featured=0')
    //  console.log("location" , location)


    const arr = [];
    console.log(allAddresses, 'resresresresresres');
    if (allAddresses.length) {
      for (let i = 0; i < allAddresses.length; i++) {
        if (allAddresses[i] !== "") {
          arr.push(
            axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
              params: {
                address: allAddresses[i],
                key: "AIzaSyDzGLDNYdjUJ5VuUU-8XvUaB2rj_RvldXw",
              },
            })
          );
        }
      }

      const res = await Promise.all(arr);




      const getData = res.filter((item) => item.data.status == "OK");

      const getlatlan = getData.map((item) => {
        return {
          address: item.config.params.address,
          lat: item.data.results[0].geometry.location.lat,
          lng: item.data.results[0].geometry.location.lng
        }
      })
      setMarker(getlatlan);
      setCenterLoacation(getlatlan[0]);
    }
    else return

  }, [allAddresses]);


  const findExactAddressHandler = (selectedAddress) => {
    const getMatchedAddress = doctorsData.find((item) => item._address == selectedAddress);
    setselectedAddress(getMatchedAddress);
    setLocationInfo(true);
  }


  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDzGLDNYdjUJ5VuUU-8XvUaB2rj_RvldXw" }}
        defaultCenter={defaulcenterLocation}
        defaultZoom={6}
        center={centerLocation}
      >
        {marker.map((v, i) => (
          <LocationMarker
            key={i}
            lat={v.lat}
            lng={v.lng}
            onClick={(e) => findExactAddressHandler(v.address)}
          />
        ))}
      </GoogleMapReact>

      {locationInfo && <LocationInfoBox selectedAddress={selectedAddress} />}
      {locatorData.locate ? "" : <LocateUsButton onClick={() => history.push('/locator')} >Locate Us</LocateUsButton>}
    </div>
  );
};


export default Map;
