import React, { useState, useEffect } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

import "@reach/combobox/styles.css";
import GooglePlaceSidebar from './GooglePlaceSidebar/GooglePlaceSidebar';



const GoogleMap = (props) => {
  const [serviceMarkers, setserviceMarkers] = useState([])
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [instituteInfo, setInstituteInfo] = useState({})
  const [mapLocation, setmapLocation] = useState({ lat: 0, lng: 0 })
  const [markerLocation, setmarkerLocation] = useState({ lat: 0, lng: 0 })
  const [showSidebar, setshowSidebar] = useState(false)
  const [sidebarData, setsidebarData] = useState({})


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

    console.log("props", props);
    console.log("marker", marker);
    console.log("service", service);
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
          <Combobox onSelect={handleSelect} aria-labelledby="demo">
            <ComboboxInput className='custom_ComboboxInput' value={value} onChange={handleInput} placeholder="Search any place" disabled={!ready} />
            <ComboboxPopover>
              <ComboboxList  >
                {status === "OK" && data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>
        <GooglePlaceSidebar showSidebar={showSidebar} sidebarData={sidebarData} />
        <Map disableDefaultUI={true} onClick={onMapClicked} google={props.google} center={{ lat: mapLocation.lat, lng: mapLocation.lng }} zoom={7}   >
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




      </div>
    </>



  )
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyD0tGMAgpuMIlO51AcuBmxpOWtRGa76Fro",
})(GoogleMap)