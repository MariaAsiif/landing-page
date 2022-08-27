import React, { useState, useEffect } from "react";
import { Row, Col, Card, Placeholder, Container } from "react-bootstrap";
import { StyleHeader } from "./StyleHeader";
// import { Form, Formik, ErrorMessage } from "formik";
// import Select from "./Select";
// import Search from "../../../assets/Search.svg";
import Flag1 from "../../../assets/Flag1.svg";
import Star1 from "../../../assets/Star1.svg";
import Like from "../../../assets/Like.svg";
// import Card1img from "../../../assets/Card1img.svg";
// import Card2img from "../../../assets/Card2img.svg";
// import Card3img from "../../../assets/Card3img.svg";
// import Card4img from "../../../assets/Card4img.svg";
// import emptyUser from "../../../assets/emptyUser.png";
import emptyLocation from "../../../assets/emptyLocation.png";
import GenerecService from "../../../services/GenericService";
import { API_URL } from "../../../services/config";
// import * as Yup from "yup";
import ReactPaginate from "react-paginate";
import Footer from "../../Homepage/Footer/Footer";
import Inputs from "../../Homepage/Locate/Inputs";
import { LocateMainContainer } from './StylesLocate'
import { Link } from "react-router-dom";
// import { PrimaryHeading } from '../../Globals/Globals'
// import ReactCountryFlag from 'react-country-flag';
// const validate = Yup.object({
//   country: Yup.string().required("Please select a country"),
// city: Yup.string().required("Please select a city"),
// service: Yup.string().required("Please Select a Service"),
// });
function Header() {
  const genericService = new GenerecService();

  // const [currentPage, setCurrentPage] = useState(1);
  // const [postPerPage, setPostPerPage] = useState(12);
  const [countryList, setcountryList] = useState([]);
  const [cityList, setcityList] = useState([]);
  const [serviceList, setserviceList] = useState([]);
  const [doctorsData, setdoctorsData] = useState([]);
  const [cardsLoading, setcardsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    genericService
      .get(`${API_URL}getAddresses`)
      .then((res) => {
        setcountryList(res.finalData.country);
        setcityList(res.finalData.city);
        setserviceList(res.finalData.service);
        setcardsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);



  useEffect(() => {
    genericService
      .post(`${API_URL}usersData`, {
        city: "",
        country: "",
        service: "",
        // limit: 50,
      })
      .then((res) => {
        setdoctorsData(...doctorsData, res.data);
        setcardsLoading(false);
      })
      .catch((error) => {
        setcardsLoading(false);
        console.log("error", error);
      });
  }, []);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + 12;
    setCurrentItems(doctorsData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(doctorsData.length / 12));
  }, [itemOffset, doctorsData]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 12) % doctorsData.length;
    setItemOffset(newOffset);
  };


  return (
    <>

      <LocateMainContainer id={"LOCATE"}>
        <Container>
          <h2>LOCATE</h2>
          <h3>DOCTORS, ASSOCIATIONS, CANNABIS CLUBS, CAFES, DISPENSARIES AND LAWYERS</h3>
          <p>
            Welcome, the above-listed professionals and services can be found using our mapping locator function. The service is provided to all clients and visitors at no charge. However, we request your feedback and use of the service to assess the quality of the assistance you encountered from any of those using the locator. That information will be shared with your peers seeking a similar experience if satisfactory or avoid any establishment that doesn't afford them excellent treatment or a high-quality product, goods, or service. The search function is powered by Google Maps technologies, it will direct you to any of the stated services available nearest your hotel, if traveling, or your current in-country location.
          </p>
        </Container>
        <Inputs locate={true} />
      </LocateMainContainer>

      <StyleHeader>

        <div className="container">
          {doctorsData.length == 0 && cardsLoading ? (
            <>
              <Placeholder as="p" animation="glow" size="lg">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="p" animation="wave" size="lg">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="p" animation="glow" size="lg">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="p" animation="wave" size="lg">
                <Placeholder xs={12} />
              </Placeholder>
            </>
          ) : (
            <div className="loacateUsCard-container">
              {!cardsLoading && doctorsData.length == 0 ? (
                <h1>No Data Found</h1>
              ) : (
                <>
                  <Row>
                    {currentItems.map((v, i) => (
                      console.log("value", v),
                      <Col key={i} lg={3} md={6} sm={6}>
                        <Card className="cards">
                          <div className="locator-person-image-container" >
                            <img
                              src={v.ImageURL ? v.ImageURL : emptyLocation}
                              className="img-section"
                              alt="img"
                            />{" "}
                          </div>
                          <div className="card-data">
                            <h6>{v.Title}</h6>
                            <p className="para">{v._address}</p>
                            <div className="d-flex pt-1 text1">
                              <div>
                                <img src={Flag1} className="icon " alt="icon" />
                                <span className="country-name-text">
                                  {v.LocatorCountries}
                                </span>
                              </div>
                              <div>
                                <img src={Star1} className="icon " alt="icon" />
                                <span className="icon-text">0.0</span>
                              </div>
                              <div>
                                <img src={Like} className="icon " alt="icon" />
                                <span className="icon-text">Likes 0</span>
                              </div>
                            </div>
                            <div>
                              <Link to="/detail" >
                                <input
                                  type="submit"
                                  className="locator-card-bt"
                                  name="See Details"
                                  value="See Details"
                                />
                              </Link>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    renderOnZeroPageCount={null}
                    className='locator-pagination'
                  />
                </>
              )}
            </div>
          )}
        </div>
        <Footer />
      </StyleHeader>
    </>
  );
}

export default Header;
