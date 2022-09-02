import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactStars from "react-rating-stars-component";
import {StylePopup } from './StylePopup'
function Popup() {
  const [show, setShow] = useState(true);
  const [desc, setDesc] = useState('')
  const [state, setState] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const ratingChanged = (newRating) => {
    setState(newRating)
  };



  return (
    <StylePopup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="p-field"
            style={{ display: "flex", flexDirection: "column", justifyContent:'center' , fontSize:'20px' }}
          >
            <label style={{fontSize:'2rem' , fontWeight:'bold'}}>Rating</label>
            <div style={{ paddingLeft: '10rem' }}>

              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={50}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#d0565c"
              />
            </div>
            <div className="w-100">
              <label style={{fontSize:'2rem' , fontWeight:'bold' , marginBottom:'20px'}}>Review</label>
              <textarea
                style={{fontSize:'20px'}}
                name="short_desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="form-control"
                placeholder="Write Here ...">

              </textarea>
            </div>
            <div className="w-100">
              <label style={{fontSize:'2rem' , fontWeight:'bold' , marginBottom:'20px'}}>Image</label>
              <input type="file"/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="close"  onClick={handleClose}>
            Close
          </button>
          <button className="save" variant="primary" onClick={handleClose}>
            Save 
          </button>
        </Modal.Footer>
      </Modal>
    </StylePopup>
  );
}

export default Popup;
