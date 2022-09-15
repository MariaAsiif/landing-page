import React, { useState, useEffect } from 'react'
import GoogleMap from './Map/GoogleMap'
import axios from 'axios'
import { Country, State, City } from 'country-state-city';
import GenerecService from "../../../services/GenericService";
import { API_URL } from "../../../services/config";
import { HOSTNAME } from '../../../services/CallApi';
import ServicePopup from './ServicePopup';
import { Row, Col, Card, Placeholder, Container } from "react-bootstrap";
import emptyLocation from "../../../assets/emptyLocation.png";
import Flag1 from "../../../assets/Flag1.svg";
import Star1 from "../../../assets/Star1.svg";
import Like from "../../../assets/Like.svg";
import styles from "./Inputs.module.css"
import { Link } from "react-router-dom";

const Inputs = () => {
  const genericService = new GenerecService();
  const [allCountries, setallCountries] = useState([])
  const [allStates, setallStates] = useState([])
  const [allCities, setallCities] = useState([])
  const [cityName, setCityName] = useState('')
  const [locationModel, setlocationModel] = useState({
    country: "AF",
    state: "BDS",
    city: "Ashkāsham",
    services: "Doctors",
    latitude: "",
    longitude: "",
    minDistances: "1",
    maxDistances: "100",
  })
  const [services, setservices] = useState([
    { value: "Doctors", label: "Doctors" },
    { value: "Lawyer And Medical Marijuana - Cannabis Specialist", label: "Lawyer And Medical Marijuana - Cannabis Specialist" },
    { value: "Associations & Clubs", label: "Associations & Clubs" },
    { value: "Seeds Bank", label: "Seeds Bank" },
    { value: "Medical Cannabis", label: "Medical Cannabis" },
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "Law Firms", label: "Law Firms" },
    { value: "Industrial hemp", label: "Industrial hemp" },
    { value: "Cannabis related media", label: "Cannabis related media" },
    { value: "Gardening", label: "Gardening" },
    { value: "Growshop", label: "Growshop" },
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "lawyer", label: "lawyer" },
    { value: "Agriculturalist", label: "Agriculturalist" },
    { value: "Horticulturist", label: "Horticulturist" },
    { value: "Herbalist", label: "Herbalist" },
    { value: "Vender", label: "Vender" },
    { value: "Distributor", label: "Distributor" }
  ])
  const [minDistances, setMinDistances] = useState([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
  ])
  const [maxDistances, setMaxDistances] = useState([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { value: 20, label: 20 },
    { value: 25, label: 25 },
    { value: 30, label: 30 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
  ])

  const [serviceData, setserviceData] = useState([])
  const [servicePopup, setservicePopup] = useState(false)

  const getdata = async () => {
    try {
      const payload = {
        "query": {
          "critarion": {},
          "categories": [locationModel.services],
          "serviceCountry": [allCountries.find((country, i) => country.isoCode === locationModel.country).name],
          "serviceCity": [locationModel.city],
          "individualServiceProvider": "_id email title",
          "businessServiceProvider": "_id email businessName"
        },
        "sortproperty": "serviceName",
        "sortorder": 1,
        "minDistance": parseInt(locationModel.minDistances),
        "maxDistance": parseInt(locationModel.maxDistances),
        "offset": 0,
        "limit": 100,
        "location": {
          "lng": [locationModel.longitude],
          "lat": [locationModel.latitude]
        }
      }

      const serviceResponse = await genericService.post(`${HOSTNAME}/locateservices/locateAllServices`, payload)
      setserviceData(serviceResponse.data.services)
    } catch (error) {
      console.log("payload", error);
    }

  }

  const handleMoveMarker = async (data) => {
    try {
      const payload = {
        "query": {
          "critarion": {},
          "categories": [locationModel.services],
          "serviceCountry": [allCountries.find((country, i) => country.isoCode === locationModel.country).name],
          "serviceCity": [locationModel.city],
          "individualServiceProvider": "_id email title",
          "businessServiceProvider": "_id email businessName"
        },
        "sortproperty": "serviceName",
        "sortorder": 1,
        "minDistance": parseInt(locationModel.minDistances),
        "maxDistance": parseInt(locationModel.maxDistances),
        "offset": 0,
        "limit": 100,
        "location": {
          "lng": [data.lng],
          "lat": [data.lat]
        }
      }
      const serviceResponse = await genericService.post(`${HOSTNAME}/locateservices/locateAllServices`, payload)
      setlocationModel((prevmodel) => ({
        ...prevmodel,
        latitude: data.lat,
        longitude: data.lng,
      }))
      setserviceData(serviceResponse.data.services)
    } catch (error) {
      console.log(error);
    }


  }

  const handleChangeCountryStateCity = async (e) => {
    try {
      let { name, value } = e.target
      let updatedCities = []

      if (name === "country") {
        const updatedStates = State.getStatesOfCountry(value)
        const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
        updatedCities = City.getCitiesOfState(value, stateCode)
        const countryInfo = allCountries.find((country) => country.isoCode === value)
        setallStates(updatedStates)
        setallCities(updatedCities)
        setlocationModel((prevmodel) => ({
          ...prevmodel,
          [name]: value,
          latitude: countryInfo.latitude,
          longitude: countryInfo.longitude,
        }))
        const payload = {
          "query": {
            "critarion": {},
            "categories": [locationModel.services],
            "serviceCountry": [allCountries.find((country, i) => country.isoCode === value).name],
            "serviceCity": [cityName],
            "individualServiceProvider": "_id email title",
            "businessServiceProvider": "_id email businessName"
          },
          "sortproperty": "serviceName",
          "sortorder": 1,
          "minDistance": parseInt(locationModel.minDistances),
          "maxDistance": parseInt(locationModel.maxDistances),
          "offset": 0,
          "limit": 100,
          "location": {
            "lng": [locationModel.longitude],
            "lat": [locationModel.latitude]
          }
        }
        const serviceResponse = await genericService.post(`${HOSTNAME}/locateservices/locateAllServices`, payload)
        console.log("serviceResponse", serviceResponse);

      }
      else if (name === "state") {
        updatedCities = City.getCitiesOfState(locationModel.country, value)
        const stateInfo = allStates.find((state) => state.isoCode === value)
        setallCities(updatedCities)
        setlocationModel((prevmodel) => ({
          ...prevmodel,
          [name]: value,
          latitude: stateInfo.latitude,
          longitude: stateInfo.longitude,
        }))

      }
      else if (name === "city") {
        const cityInfo = allCities.find((city) => city.name === value)

        setlocationModel((prevmodel) => ({
          ...prevmodel,
          [name]: value,
          latitude: cityInfo.latitude,
          longitude: cityInfo.longitude,
        }))

      } else {
        setlocationModel((prevmodel) => ({
          ...prevmodel,
          [name]: value
        }))
      }

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    (async () => {
      try {
        const response = await axios('https://api.ipregistry.co/?key=m7irmmf8ey12rx7o')
        const mainresponse = await genericService.get(`${API_URL}getAddresses`)
        const currentCountryCode = response.data.location.country.code
        const latitude = response.data.location.latitude
        const longitude = response.data.location.longitude
        const CurrentCountries = await Country.getAllCountries()
        const CurrentStates = await State.getStatesOfCountry(currentCountryCode)
        const CurrentCities = await City.getCitiesOfState(currentCountryCode, CurrentStates[0].isoCode)
        const payload = {
          "query": {
            "critarion": {},
            "categories": mainresponse.finalData.service,
            "serviceCountry": [response.data.location.country.name],
            "serviceCity": [response.data.location.city],
            "individualServiceProvider": "_id email title",
            "businessServiceProvider": "_id email businessName"
          },
          "sortproperty": "serviceName",
          "sortorder": 1,
          "minDistance": 0,
          "maxDistance": 100,
          "offset": 0,
          "limit": 100,
          "location": {
            "lng": latitude,
            "lat": longitude
          }
        }
        const serviceResponse = await genericService.post(`${HOSTNAME}/locateservices/locateAllServices`, payload)
        setallCountries(CurrentCountries)
        setallStates(CurrentStates)
        setallCities(CurrentCities)
        setlocationModel((prevmodel) => ({
          ...prevmodel,
          country: currentCountryCode,
          state: "",
          city: "",
          latitude: latitude,
          longitude: longitude,
        }))
        setserviceData(serviceResponse.data.services)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])
  return (
    <>
      {servicePopup ? <ServicePopup show={servicePopup} onClose={() => setservicePopup(false)} /> : null}
      <div className='container mb-4'>
        <div className='row'>
          <div className='col-lg-2'>
            <select name="country" value={locationModel.country} onChange={handleChangeCountryStateCity}  >
              <option>Choose Country</option>
              {allCountries.map((country, i) => <option key={i} value={country.isoCode}>{country.name}</option>)}
            </select>
          </div>
          <div className='col-lg-2'>
            <select name="state" value={locationModel.state} onChange={handleChangeCountryStateCity}  >
              <option>Choose State</option>
              {allStates.map((state, i) => <option key={i} value={state.isoCode}>{state.name}</option>)}
            </select>
          </div>
          <div className='col-lg-2'>
            <select name="city" value={locationModel.city} onChange={handleChangeCountryStateCity}  >
              <option>Choose City</option>
              {allCities.map((city, i) => <option key={i} value={city.name}>{city.name}</option>)}
            </select>
          </div>
          <div className='col-lg-2'>
            <select name="services" value={locationModel.services} onChange={handleChangeCountryStateCity}>
              <option>Choose Service</option>
              {services.map((service, i) => <option value={service.value} key={i}>{service.label}</option>)}
            </select>
          </div>
          <div className='col-lg-1'>
            <select name="minDistances" value={locationModel.minDistances} onChange={handleChangeCountryStateCity}>
              <option>Min. Distance</option>
              {minDistances.map((mindist, i) => <option value={mindist.value} key={i}>{mindist.label}Km</option>)}
            </select>
          </div>
          <div className='col-lg-1'>
            <select name="maxDistances" value={locationModel.maxDistances} onChange={handleChangeCountryStateCity}>
              <option>Max. Distance</option>
              {maxDistances.map((maxdist, i) => <option value={maxdist.value} key={i}>{maxdist.label}Km</option>)}
            </select>
          </div>
          <div className='col-lg-2 d-flex align-items-center justify-content-around'>
            <button
              disabled={(locationModel.country && locationModel.state && locationModel.city && locationModel.services && locationModel.minDistances && locationModel.maxDistances) ? false : true}
              onClick={getdata} style={{ width: "45%", fontSize: 16, fontWeight: "600" }} className='btn btn-danger h-100'>Search</button>
            <button onClick={() => setservicePopup(true)} style={{ fontSize: 16, marginLeft:'10px', fontWeight: "600" }} className='btn btn-danger h-100'>Add Service</button>
          </div>

        </div>


      </div>
      <div className='container-fluid mb-4'>
        <GoogleMap
          location={{ latitude: locationModel.latitude, longitude: locationModel.longitude }}
          onMoveMarker={handleMoveMarker}
          data={serviceData}

        />
      </div>
      <div className='container'>
        <div className='row'>
          {serviceData.map((service) => {
            return (
              <div ke={service._id} className='col-lg-3'>
                <Card className={styles.cards}>
                  <div className={styles.locator_person_image_container} >
                    <img src={emptyLocation} className={styles.img_section} alt="img" />
                  </div>
                  <div className={styles.card_data}>
                    <h6>{service.serviceName}</h6>
                    {/* <p className={styles.para}>this is address</p> */}
                    <div className={`d-flex pt-1 ${styles.text1}`}>
                      <div>
                        <img src={Flag1} className={styles.icon} alt="icon" />
                        <span className={styles.country_name_text}>{service.serviceCountry}</span>
                      </div>
                      <div>
                        <img src={Star1} className={styles.icon} alt="icon" />
                        <span className={styles.icon_text}>0.0</span>
                      </div>
                      <div>
                        <img src={Like} className={styles.icon} alt="icon" />
                        <span className={styles.icon_text}>Likes 0</span>
                      </div>
                    </div>
                    <div>
                      <Link to={`/detail/${service._id}`} >
                        <input type="submit" className={styles.locator_card_bt} name="See Details" value="See Details" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

    </>

  )
}

export default Inputs