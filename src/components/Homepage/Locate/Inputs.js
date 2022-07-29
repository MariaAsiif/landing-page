import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { StyleHeader } from "./StyleHeader";
import { Form, Formik, ErrorMessage } from "formik";
import Select from "./Select";
import { API_URL } from "../../../services/config";
import GenerecService from "../../../services/GenericService";
import * as Yup from "yup";
import emptyLocation from "../../../assets/emptyLocation.png";
import Search from "../../../assets/Search.svg";
import Map from "./Map/Map";
function Inputs(locator) {
  const genericService = new GenerecService();
  const [countryList, setcountryList] = useState([]);
  const [cityList, setcityList] = useState([]);
  const [serviceList, setserviceList] = useState([]);
  const [doctorsData, setdoctorsData] = useState([]);
  const [allAddresses, setallAddresses] = useState([]);
  const [searchLoading, setsearchLoading] = useState(false);



  const validate = Yup.object({
    country: Yup.string().required("Please select a country"),
    city: Yup.string().required("Please select a city"),
    service: Yup.string().required("Please Select a Service"),
  });

  useEffect(() => {
    const getAddress = doctorsData.map((res) => res._address);

    setallAddresses(getAddress);
  }, [doctorsData]);

  useEffect(() => {
    genericService
      .get(`${API_URL}getAddresses`)
      .then((res) => {
        setcountryList(res.finalData.country);
        setcityList(res.finalData.city);
        setserviceList(res.finalData.service);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <>
      <StyleHeader>
        <div className="container">
          <Formik
            initialValues={{
              country: "",
              city: "",
              service: "",
            }}
            //   validationSchema={validate}
            onSubmit={(values) => {
              setsearchLoading(true);
              const data = { ...values, limit: 500 };
              genericService
                .post(`${API_URL}usersData`, data)
                .then((msg) => {
                  setsearchLoading(false);
                  setdoctorsData(msg.data);
                })
                .catch((error) => {
                  setsearchLoading(false);
                  console.warn("warn", error);
                });
            }}
          >
            {(formik) => (
              <Form>
                <Row className="select-option align-items-center">
                  <Col md={3} sm={6}>
                    <Select
                      label="Country"
                      name="country"
                      title={"Choose country"}
                      list={countryList}
                      className="select"
                    />
                    <ErrorMessage name="country" />
                  </Col>
                  <Col md={3} sm={6}>
                    <Select
                      label="City"
                      name="city"
                      title={"Choose City"}
                      list={cityList}
                    />
                    <ErrorMessage name="city" />
                  </Col>
                  <Col md={3} sm={6}>
                    <Select
                      label="Service"
                      name="service"
                      title={"Choose Service"}
                      list={serviceList}
                    />
                    <ErrorMessage name="service" />
                  </Col>
                  <Col md={3} sm={6}>
                    <Button className="btn" type="submit">
                      {searchLoading ? (
                        <Spinner
                          as="span"
                          animation="grow"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <>
                          <img
                            src={Search}
                            alt="Search icon"
                            className="search-img"
                          />
                          Search
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </StyleHeader>
      <Map locatorData={locator} allAddresses={allAddresses} doctorsData={doctorsData} />
    </>
  );
}
export default Inputs;
