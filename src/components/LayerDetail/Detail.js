import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Footer from "../Homepage/Footer/Footer";
import { LocateMainContainer } from './StylesLocate'
import emptyLocation from "../../assets/emptyLocation.png";
import { FaMapMarkerAlt } from 'react-icons/fa'
import { RiMessage2Line } from 'react-icons/ri'
import Map from "../Homepage/Locate/Map/Map";
import Popup from "./Popup";
import { useParams } from "react-router-dom";
import GenericService from "../../services/GenericService";
function Detail() {
  const [doctorsData, setdoctorsData] = useState([]);
  const [allAddresses, setallAddresses] = useState([]);
  const genericService = new GenericService();
  const serviceId = useParams().id

  useEffect(() => {
    const fetchService = async () => {
      try {
        let payload = {
          "critarion": { "_id": serviceId },

          "addedby": "_id email first_name",

          "lastModifiedBy": "_id email first_name",
          "individualServiceProvider": "_id email title content",

          "businessServiceProvider": "_id email businessName content"


        }
        const response = await genericService.post(`http://localhost:5873/locateservices/findServiceById`, payload)
        console.log("response", response)
      }
      catch (err) {

      }
    }

    fetchService()

  }, [serviceId])

  return (
    <>
      <LocateMainContainer >
        <Container>
          <Row>
            <Col lg={4}>
              <div className="image_wrapper">
                <img src={emptyLocation} alt="img_user" />
              </div>




              <div className="report">
                <button >
                  <RiMessage2Line className="me-2" />
                  Send Message </button>
              </div>



            </Col>
            <Col lg={8} >
              <div className="right_wrapper">
                <div className="name_wraper">
                  <h2>React js Pakistan <p> <FaMapMarkerAlt /> New York, city </p> </h2>
                  <p>Bookmark</p>
                </div>
                <span className="project">Project manager</span>

                <div className="ranking"   >
                  <h2>Rankings</h2>
                  <h1>8,6</h1>
                </div>

                <div className="work_exp my-10">
                  <div className="text-wrapper">
                    <h2>Address and Contact</h2>
                  </div>
                  <div className="address">
                    <p>Phone : <span >+1 903-332-332</span></p>
                    <p>Address : <p className="ml-2">street 23 new york</p></p>
                    {/* <p>Phone : <span >+1 903-332-332</span></p>
                    <p>Phone : <span >+1 903-332-332</span></p> */}
                  </div>
                </div>



                <div className="timeline">
                  <div className="para">
                    <p className="active_tab">Description</p>

                  </div>
                </div>

                <div className="contact">
                  <p>hellow adkfhasjkdfh ksadfhasd kfhasdjk akfhasdjk</p>
                  {/* <h2>Contact Information</h2>
                  <ul>
                    <li >
                      <p>hellow</p>
                      <span>yes </span>
                    </li>
                  </ul> */}
                </div>

              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <Map locatorData={"locate"} allAddresses={allAddresses} doctorsData={doctorsData} /> */}
            </Col>
          </Row>
        </Container>
        {/* <Popup /> */}

      </LocateMainContainer>
      <Footer />

    </>
  );
}

export default Detail;
