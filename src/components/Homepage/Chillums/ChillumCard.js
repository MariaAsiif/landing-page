import React from "react";
import PlayBtn from "../../Globals/PlayBtn";
import { ChillumBtn, ChillumImg, ChillumImgContainer } from "./StyledChillums";
import VideoModal from "../VideoModal/VideoModal";
import Popup from "../Popup/Popup";

const ChillumCard = ({ img }) => {
  const [modalShow, setModalShow] = React.useState(false);

  const data = localStorage.getItem("ageGateActive");


  const openModalContainer = () => {
    setModalShow(true);
  };
  return (
    <ChillumImgContainer>
      <VideoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        children={
          data !== "active" ? (
            <Popup setModalShow={setModalShow} />
          ) : (
            <div>
              <iframe
                title="vimeo-player"
                src="https://player.vimeo.com/video/658079243?h=6f459e1962"
                width="100%"
                height="550px"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          )
        }
      />
      <ChillumImg src={img} alt={img} />
      <div className="overlay"></div>
      <div className="inner-overlay">
        <PlayBtn clicked={() => openModalContainer()} />
        <h3>CHILLUMS</h3>
        <p>
          Curabitur cursus sagittis varius. Quisque aliquet luctus elit, in
          hendrerit orci malesuada eu.
        </p>
        <p className="price">$450</p>
        <ChillumBtn>Quick Shop</ChillumBtn>
      </div>
    </ChillumImgContainer>
  );
};

export default ChillumCard;
