import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Card, Spinner, Container } from "react-bootstrap";
import Search from "../../../assets/Search.svg";
import { StyleHeader } from "./StyleHeader";
import GenerecService from "../../../services/GenericService";
import MapLocation from '../Locate/Map/Map'
import { API_URL } from "../../../services/config";

const Inputs = () => {
  const genericService = new GenerecService();
  const [loading, setloading] = useState(false)
  const [countries, setcountries] = useState([])
  const [cities, setcities] = useState([])
  const [services, setservices] = useState([
    { value: "Doctors", label: "Doctors" },
    { value: "Lawyer And Medical Marijuana - Cannabis Specialist", label: "Lawyer And Medical Marijuana - Cannabis Specialist" },
    { value: "Associations & Clubs", label: "Associations & Clubs" },
    { value: "Seeds Bank", label: "Seeds Bank" },
    { value: "Medical Cannabis", label: "Medical Cannabis" },
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "Law Firms", label: "Law Firms" },
    { value: "Industrial hemp", label: "Industrial hemp" },
  ])
  const [formData, setformData] = useState({
    categories: "",
    serviceCountry: "",
    serviceCity: ""
  })
  const [location, setlocation] = useState({
    lng: -4.6806000,
    lat: 38.3628000
  })

  const [locationData, setLocationData] = useState([])


  const handleChange = (e) => {
    setformData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value
    }))
  }

  // const defultValue = async (data) => { }


  const defultValue = async (data) => {
    const defultValues = {
      "query": {
        "critarion": {},
        "categories": ["Doctors", "Lawyer And Medical Marijuana - Cannabis Specialist", "Associations & Clubs",
          "Seeds Bank",
          "Medical Cannabis",
          "Manufacturer",
          "Law Firms",
          "Industrial hemp",
          "Cannabis related media",
          "Distributor",
          "Gardening",
          "Growshop"],
        "serviceCountry": [
          "Spain",
          "Holanda",
          "Republica Checa",
          "Alemania",
          "Norfolk",
          "France",
          "Polonia",
          "\n\nSpain"
        ],
        "serviceCity": [
          "Alava",
          "Alicante",
          "Amsterdam",
          "Asturias",
          "Badajoz",
          "Baleares",
          "Barcelona",
          "Burgos",
          "Cadiz",
          "Codiz",
          "canaria",
          "Cantabria",
          "Castaoeda",
          "Castellon",
          "Cordoba",
          "Gerona",
          "Granada",
          "Guipozcoa",
          "Hlavni Mesto Praha",
          "Huelva",
          "Huesca",
          "Jaon",
          "La Coruoa",
          "Las Palmas",
          "Leon",
          "Lorida",
          "Llubo Mallorca",
          "Madrid",
          "Molaga",
          "Monchen",
          "Murcia",
          "Navarra",
          "Norwich",
          "Palencia",
          "Palma de Mallorca,Baleares",
          "Paris",
          "Pontevedra",
          "Poznan",
          "Republica Checa",
          "Santa Cruz de Tenerife",
          "Sevilla",
          "Soria",
          "Tarragona",
          "Teruel",
          "Valencia",
          "Vizcaya",
          "Zaragoza",
          "Las palmas",
          "La coruoa",
          "Ourense",
          "Almeroa",
          "olava",
          "La rioja",
          "Lugo",
          "Salamanca",
          "Valladolid",
          "Montilla",
          "Guadalajara",
          "Caceres",
          "Albacete",
          "ovila",
          "Coceres",
          "Ceuta",
          "Ciudad real",
          "Cuenca",
          "Segovia",
          "Toledo",
          "Zamora"
        ],
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
        "lng": -4.6806000,
        "lat": 38.3628000
      }
    }
    try {
      const response = await genericService.post(`https://hporxadminbackend.herokuapp.com/locateservices/locateAllServices`, defultValues)
      setLocationData(response.data.services)

      console.log("res", response);
    }
    catch (err) {

    }
  }


  useEffect(() => {
    defultValue()

  }, [])

  const handleSubmit = async () => {
    setloading(true)
    try {
      const payload = {
        "query": {
          "critarion": {},
          "categories": [formData.categories],
          "serviceCountry": [formData.serviceCountry],
          "serviceCity": [formData.serviceCity],
          "individualServiceProvider": "_id email title",
          "businessServiceProvider": "_id email businessName"
        },
        "sortproperty": "serviceName",
        "sortorder": 1,
        "minDistance": 0,
        "maxDistance": 1,
        "offset": 0,
        "limit": 100,
        "location": {
          "lng": -4.6806000,
          "lat": 38.3628000
        }
      }
      const response = await genericService.post(`https://hporxadminbackend.herokuapp.com/locateservices/locateAllServices`, payload)
      setloading(false)
      console.log(response);
      setLocationData(response.data.services)
    } catch (error) {
      setloading(false)
      console.log(error);
    }
  }

  useEffect(() => {


    (async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              console.log(position.coords);
              setlocation({
                lng: position.coords.longitude,
                lat: position.coords.latitude,
              })
            },
            function (error) {
              console.error("Error Code = " + error.code + " - " + error.message);
            }
          );
        }
        const response = await genericService.get(`${API_URL}getAddresses`)

        console.log(response);
        setcountries(response.finalData.country)
        setcities(response.finalData.city)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])
  return (
    <StyleHeader>
      <Container>
        <Row>
          <Col>
            <select name="serviceCountry" value={formData.serviceCountry} onChange={handleChange}  >
              <option>Choose Country</option>
              {countries.map((country, i) => <option key={i}>{country}</option>)}
            </select>
          </Col>
          <Col>
            <select name="serviceCity" value={formData.serviceCity} onChange={handleChange}>
              <option>Choose City</option>
              {cities.map((city, i) => <option key={i}>{city}</option>)}
            </select>
          </Col>
          <Col>
            <select name="categories" value={formData.categories} onChange={handleChange}>
              <option>Choose Service</option>
              {services.map((service, i) => <option value={service.value} key={i}>{service.label}</option>)}
            </select>
          </Col>
          <Col>
            <Button className="btn mt-1" onClick={handleSubmit} >
              {loading ? <Spinner as="span" animation="grow" role="status" aria-hidden="true" /> : <img src={Search} alt="Search icon" className="search-img" />}
              Search
            </Button>
          </Col>
        </Row>
      </Container>

      <MapLocation default={defultValue} locationData={locationData} />
    </StyleHeader>

  )
}

export default Inputs