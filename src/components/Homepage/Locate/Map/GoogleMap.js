import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
// import { GoogleMap, InfoWindow, Marker, GoogleApiWrapper, DirectionsRenderer } from "google-maps-react"
import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

import "@reach/combobox/styles.css";
import GooglePlaceSidebar from './GooglePlaceSidebar/GooglePlaceSidebar';
import { FaDirections } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { useMemo } from 'react';



const GogleMap = (props) => {
  const [serviceMarkers, setserviceMarkers] = useState([])
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [instituteInfo, setInstituteInfo] = useState({})
  const [mapLocation, setmapLocation] = useState({ lat: 0, lng: 0 })
  const [markerLocation, setmarkerLocation] = useState({ lat: 0, lng: 0 })
  const [showSidebar, setshowSidebar] = useState(false)
  const [sidebarData, setsidebarData] = useState({})
  const [direction, setDirections] = useState()
  const center = useMemo(
    () => ({ lat: 43.45, lng: -80.49 }),
    []
  );

  const google = window.google;


  //  -------------------
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete();
  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions()
    const results = await getGeocode({ address })

    const { lat, lng } = await getLatLng(results[0])
    console.log(results[0]);
    const parameter = { placeId: results[0].place_id, };
    const placeDetails = await getDetails(parameter)
    setshowSidebar(true)
    setsidebarData(placeDetails)
    setmarkerLocation({
      lat, lng
    })
    setmapLocation({
      lat, lng
    })

    console.log("loca", mapLocation)

    let obj = {
      lat: lat,
      lng: lng
    }

    console.log("data", obj)
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: center,
        destination: center,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        console.log("locations res", result)
        console.log("locations status", status)

        if (status === "OK" && result) {
          // setDirections(result);
          console.log("locations result", result)
        }
      }

    );
    console.log("service", service)

  };


  const moveMarker = (coord, map, t) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    props.onMoveMarker({ lat, lng })
    // setActiveMarker(map)

  }

  const onMapClicked = (mapProps) => {
    if (showInfoWindow) {
      setShowInfoWindow(false)
      setActiveMarker(null)
    }
  }
  const onMarkerClick = (props, marker, service) => {
    let institute = {
      name: props.name,
      address: props.address
    }
    setmapLocation({
      lat: service.serviceLocation.coordinates[1],
      lng: service.serviceLocation.coordinates[0],
    })
    setInstituteInfo(institute)
    setActiveMarker(marker)
    setShowInfoWindow(true)


  }

  const handleClose = () => {
    setActiveMarker(null)
    setShowInfoWindow(false)
  }
  useEffect(() => {
    setserviceMarkers(props.data)




    setmarkerLocation({
      lat: props.markerLocation.latitude,
      lng: props.markerLocation.longitude,
    })

    setmapLocation({
      lat: props.mapLocation.latitude,
      lng: props.mapLocation.longitude,
    })

  }, [props.data, props.markerLocation, props.mapLocation])
  return (
    <>

      <div className='map' style={{ position: 'relative' }}>
        <div style={{ position: "absolute", zIndex: 10, top: 13 }}>
          <Combobox onSelect={handleSelect} aria-labelledby="demo" style={{ marginLeft: '10px', height: '45px', border: '1pt solid gray', boxShadow: '0px 0px 2px lightgray', padding: '5px', display: 'flex', alignItems: 'center', maxWidth: '500px', borderRadius: '10px', backgroundColor: 'white' }}>
            {/* <ComboboxInput className='custom_ComboboxInput' value={value} onChange={handleInput} placeholder="Search any place" disabled={!ready} /> */}
            <ComboboxInput style={{ width: 300, border: 'none', backgroundColor: 'transparent', maxWidth: "90%", padding: 10, fontSize: 18, borderRadius: 9 }} value={value} onChange={handleInput} placeholder="Search Google Maps" disabled={!ready} />
            <BiSearch style={{ fontSize: '20px', color: 'lightgray' }} />
            <div style={{ borderLeft: '1pt solid lightgray', padding: '5px', height: '30px', marginLeft: '10px' }}>
              <FaDirections style={{ fontSize: '20px', marginLeft: '10px', color: 'blue', cursor: 'pointer' }} />

            </div>
            <ComboboxPopover>
              <ComboboxList  >
                {status === "OK" && data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>
        <GooglePlaceSidebar showSidebar={showSidebar} sidebarData={sidebarData} />
        <GoogleMap disableDefaultUI={true} onClick={onMapClicked} google={props.google} center={{ lat: mapLocation.lat, lng: mapLocation.lng }} zoom={7}   >
          {direction && (
            <DirectionsRenderer
              directions={direction}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          <Marker
            title="Location"
            name={"locationpicker"}
            position={{ lat: markerLocation.lat, lng: markerLocation.lng }}
            draggable={true}
            onDragend={(t, map, coord) => moveMarker(coord, map, t)}
            key={"locationpicker"}
            icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
            onClick={onMarkerClick}
          />
          {/* <Marker
          icon={"http://maps.google.com/mapfiles/ms/icons/yellow.png"}
          name={"asdfsf"}
          placeIndex={1}
          position={{ lat: 40.4435411, lng: -7.9361573 }} /> */}
          {serviceMarkers.map((service, i) => {
            return (
              <Marker
                key={i}
                icon={"http://maps.google.com/mapfiles/ms/icons/yellow.png"}
                name={service.serviceName}
                placeIndex={i}
                onClick={(props, marker) => onMarkerClick(props, marker, service)}
                position={{ lat: service.serviceLocation.coordinates[1], lng: service.serviceLocation.coordinates[0] }} />
            )
          })}



          {/* <InfoWindow
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
          </InfoWindow> */}


        </GoogleMap>




      </div>
    </>



  )
}


// export default GoogleApiWrapper({
//   apiKey: "AIzaSyD0tGMAgpuMIlO51AcuBmxpOWtRGa76Fro",
// })(GogleMap)

export default GogleMap