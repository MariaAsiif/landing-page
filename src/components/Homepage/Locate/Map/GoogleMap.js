import React, { useState, useEffect } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
const GoogleMap = (props) => {
  const [serviceMarkers, setserviceMarkers] = useState([])
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [instituteInfo, setInstituteInfo] = useState({})
  const [mapLocation, setmapLocation] = useState({ lat: 0, lng: 0 })
  const [markerLocation, setmarkerLocation] = useState({ lat: 0, lng: 0 })



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
    setmapLocation({
      lat: props.location.latitude,
      lng: props.location.longitude,
    })
    setmarkerLocation({
      lat: props.location.latitude,
      lng: props.location.longitude,
    })

  }, [props.data, props.location])
  return (
    <div className='map' style={{ position: 'relative' }}>
      <Map onClick={onMapClicked} google={props.google} center={{ lat: mapLocation.lat, lng: mapLocation.lng }} zoom={5}   >
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


  )
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyD0tGMAgpuMIlO51AcuBmxpOWtRGa76Fro",
})(GoogleMap)