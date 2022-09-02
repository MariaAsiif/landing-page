// import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
// import LocationMarker from "./LocationMarker";
// import LocationInfoBox from "./LocationInfoBox";
// import axios from "axios";
// import { ViewMoreBtn } from '../../../Globals/Globals';
// import { LocateUsButton } from '../StylesLocate';
// import { useHistory } from 'react-router-dom';


// const Map = ({ allAddresses, doctorsData, locatorData }) => {
//   const history = useHistory()
//   const locationFound = localStorage.getItem('saveCurentLocation');

//   const [locationInfo, setLocationInfo] = useState(false);
//   const [marker, setMarker] = useState([]);
//   const [centerLocation, setCenterLoacation] = useState("");
//   const [defaulcenterLocation, setDefaultCenterLoacation] = useState("");
//   const [selectedAddress, setselectedAddress] = useState({})


//   useEffect(() => {
//     if (locationFound) {
//       setDefaultCenterLoacation(JSON.parse(locationFound));
//       setMarker([JSON.parse(locationFound)]);
//     } else {
//       setDefaultCenterLoacation({ lat: 40.4637, lng: 3.7492 })
//       setMarker([{ lat: 40.4637, lng: 3.7492 }]);
//     }
//   }, [locationFound])


//   useEffect(async () => {


//     //  const location = await axios.get('https://cannabis.top200lawyers.com/wp-json/citadela-directory/map-data/points/citadela-item?dataType=markers&category=157&location=&only_featured=0')
//     //  console.log("location" , location)


//     const arr = [];
//     console.log(allAddresses, 'resresresresresres');
//     if (allAddresses.length) {
//       for (let i = 0; i < allAddresses.length; i++) {
//         if (allAddresses[i] !== "") {
//           arr.push(
//             axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
//               params: {
//                 address: allAddresses[i],
//                 key: "AIzaSyDzGLDNYdjUJ5VuUU-8XvUaB2rj_RvldXw",
//               },
//             })
//           );
//         }
//       }

//       const res = await Promise.all(arr);




//       const getData = res.filter((item) => item.data.status == "OK");

//       const getlatlan = getData.map((item) => {
//         return {
//           address: item.config.params.address,
//           lat: item.data.results[0].geometry.location.lat,
//           lng: item.data.results[0].geometry.location.lng
//         }
//       })
//       setMarker(getlatlan);
//       setCenterLoacation(getlatlan[0]);
//     }
//     else return

//   }, [allAddresses]);


//   const findExactAddressHandler = (selectedAddress) => {
//     const getMatchedAddress = doctorsData.find((item) => item._address == selectedAddress);
//     setselectedAddress(getMatchedAddress);
//     setLocationInfo(true);
//   }


//   return (
//     <div className="map">
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyDzGLDNYdjUJ5VuUU-8XvUaB2rj_RvldXw" }}
//         defaultCenter={defaulcenterLocation}
//         defaultZoom={6}
//         center={centerLocation}
//       >
//         {marker.map((v, i) => (
//           <LocationMarker
//             key={i}
//             lat={v.lat}
//             lng={v.lng}
//             onClick={(e) => findExactAddressHandler(v.address)}
//           />
//         ))}
//       </GoogleMapReact>

//       {locationInfo && <LocationInfoBox selectedAddress={selectedAddress} />}
//       {locatorData.locate ? "" : <LocateUsButton onClick={() => history.push('/locator')} >Locate Us</LocateUsButton>}
//     </div>
//   );
// };


// export default Map;


import React, { useState, useEffect } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import devfas from '../../../../assets/dev.png'
const MapLocation = (props) => {
  const [defualtLocation, setDefualtLocation] = useState({ defaultlat: 38.3628000, defaultlon:  -4.6806000 })
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [drageAbleMarkerPosition, setdrageAbleMarkerPosition] = useState({ lat: '', lng: '' })
  const [activeMarker, setActiveMarker] = useState({})
  const [instituteInfo, setInstituteInfo] = useState({})


  const { locationData } = props

  console.log("locationData", defualtLocation)

  let schools = []
  let colleges = []
  let n = 1
  locationData &&
    locationData.map((branch) => {
      console.log("branc", branch)
      if (branch.category == "Doctors") {
        let obj = {
          id: n,
          name: branch.serviceName,
          // address: branch.address,

          position: {
            lat: branch.serviceLocation.coordinates[1],
            lng: branch.serviceLocation.coordinates[0],
          },
        };
        schools.push(obj)
        n++
      } else if (branch.category == 'Growshop') {
        let obj = {
          id: n,
          name: branch.serviceName,
          // address: branch.address,

          position: {
            lat: branch.serviceLocation.coordinates[1],
            lng: branch.serviceLocation.coordinates[0],
          },
        };
        colleges.push(obj)
        n++
      }
    })
  console.log("school", schools)
  console.log("colleges", colleges)


  const moveMarker = (coord, map, t) => {
  

    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    let location = {
      type: "Point",
      coordinates: [lng, lat]
    }
    props.default(location)

    // props.setInstituteLocation(location) //sending location to create new branch form

    setActiveMarker(map)
    setdrageAbleMarkerPosition({
      lat: lat,
      lng: lng
    })

    setDefualtLocation({
      defaultlat: lat,
      defaultlon: lng
    })

    console.log("Schoold" , schools)
    console.log("colleges" , colleges)


    // var latlng = new window.google.maps.LatLng(lat, lng);
    // // This is making the Geocode request
    // var geocoder = new window.google.maps.Geocoder();
    // geocoder.geocode({ 'latLng': latlng }, (results, status) => {
    //   if (status !== window.google.maps.GeocoderStatus.OK) {
    //     alert(status);
    //   }
    //   // This is checking to see if the Geoeode Status is OK before proceeding
    //   if (status == window.google.maps.GeocoderStatus.OK) {
    //     console.log('results');
    //     console.log(results);
    //     var address = (results[0].formatted_address);
    //     console.log('address')
    //     console.log(address)
    //     props.setBranchaddress(address)
    //     props.setInstituteAddress(address)
    //   }
    // })
  } //end moveMarker


  const getCurrentPosition = () => {
    console.log("getCurrentPosition in map called")
    if (navigator.geolocation) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      )
    } else {
      return new Promise((resolve) => resolve({}))
    }
  } //end getCurrentPosition

  useEffect(() => {
    console.log('use effect in location picker map called')
    getCurrentPosition()
      .then((position) => {
        console.log("Position in map then")
        console.log(position)
        setDefualtLocation({
          defaultlat: position.coords.latitude,
          defaultlon: position.coords.longitude
        })
        setShowMap(true)
        let location = {
          type: "Point",
          coordinates: [position.coords.longitude, position.coords.latitude]

        }
        console.log("location", location)
        props.default(location)
        setDefualtLocation({
          defaultlat: position.coords.latitude,
          defaultlon: position.coords.longitude
        })
      })
      .catch((err) => {
        console.log(err)
      })

    return () => {
      console.log('component will unmount')
    }
  }, [])


  const handleMarkerClick = (props, marker, e) => {
    console.log("handleMarkerClick")
    let institute = {
      name: props.name,
      address: props.address
    }
    setInstituteInfo(institute)
    setActiveMarker(marker)
    setShowInfoWindow(true)
  }

  const handleClose = () => {
    setActiveMarker(null)
    setShowInfoWindow(false)
  }




  console.log("props", props)
  return (
    <div className='map' style={{position:'relative'}}>

      <Map
        google={props.google}
        // className={classes.mapstyle}
        initialCenter={{
          lat: defualtLocation.defaultlat,
          lng: defualtLocation.defaultlon,
        }}
        zoom={props.zoom}
      >
        
        <Marker
          title="Location"
          name={"locationpicker"}
          // position={{ lat: defualtLocation.defaultlat, lng: defualtLocation.defaultlon }}
          draggable={true}
          onDragend={(t, map, coord) => moveMarker(coord, map, t)}
          key={"locationpicker"}
          icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
          onClick={handleMarkerClick}
        ></Marker>
       
        {schools.map((props, i) => {

          return (
            <Marker
              icon={"http://maps.google.com/mapfiles/ms/icons/yellow.png"}
              key={i}
              onClick={handleMarkerClick}
              placeIndex={i}
              name={props.name}
              // address={props.address}
              position={props.position}
            />
          );
        })}
        {colleges.map((props, i) => {
          return (
            <Marker
              icon={"http://maps.google.com/mapfiles/ms/icons/red.png"}
              key={i}
              onClick={handleMarkerClick}
              placeIndex={i}
              name={props.name}
              // address={props.address}
              position={props.position}
            />
          );
        })}

        <InfoWindow
          marker={activeMarker}
          visible={showInfoWindow}
          onClose={handleClose}
        >
          <div>
            {(() => {
              if (activeMarker != null) {
                if (activeMarker.name != "locationpicker") {
                  return (
                    <div>
                      <label key={instituteInfo.name}>

                        <span className="text-sky">
                          {instituteInfo.name}{" "}
                        </span>
                      </label>
                      <br />
                      <label key={instituteInfo.address}>

                        {instituteInfo.address}
                      </label>
                    </div>
                  );
                } else {
                  return (
                    <div key={"dragediv"}>
                      <label>Drag Me</label>
                    </div>
                  );
                }
              } else {
                return <div key={"empty"}></div>;
              }
            })()}
          </div>
        </InfoWindow>


      </Map>

      <div style={{position:'absolute' , bottom:'0px'}}>
        <img src={devfas} style={{width:'50px' , height:'50px'}} alt="devlop"/>
      </div>

    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD0tGMAgpuMIlO51AcuBmxpOWtRGa76Fro",
})(MapLocation)
