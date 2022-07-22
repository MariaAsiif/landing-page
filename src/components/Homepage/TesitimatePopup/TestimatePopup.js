import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Modal } from "react-bootstrap";
import './StylePopup.css'
import WaveSurf from "../Testimonials/WaveSurf/WaveSurf";
import { RecordingContainer } from "../Testimonials/StyleTestimonial";
import flag from '../../../assets/flag.svg';
function TestimatePopup({ permition, Info, Toggle }) {
  const [show, setShow] = useState(permition);
  const [value, setValue] = useState('');
  const handleClose = () => {
    setShow(false)
    Toggle()
  }

  return (
    <>
      <Modal show={show} size="md" onHide={handleClose} >
        <Modal.Header closeButton onClick={() => handleClose()}>
          
        </Modal.Header>
        <Modal.Body>
          <Card style={{ border: 'none' }} >
            <div className='text-center card-body'>
              <img class src={Info.img} alt="Testimonial " className='main-image mx-auto' />
              <h3 className="nameHeading">{Info.name}</h3>
              <h6 className="profession">Marketing Agency</h6>

              <img src={flag} alt="flag" className='flag mx-auto' />
              {Info.audio &&
                <RecordingContainer className='pb-4'>
                  <WaveSurf audio={Info.audio} />
                </RecordingContainer>
              }
              {Info.subtitle &&
                <div className='lead'>{`"${Info.subtitle}"`}</div>

              }
            </div>
          </Card>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default TestimatePopup;
