import React from "react";
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import StyleDesignShowcase, { StyleDesignInner, StyleData } from './StyleDesignShowcase';
// import './StyleDesignShowcase.css'
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel, Autoplay } from 'swiper/core';


import banner1 from '../../../assets/banner1.jpg';
import banner2 from '../../../assets/banner2.jpg';
import banner3 from '../../../assets/banner3.jpg';
import banner4 from '../../../assets/banner4.jpg';
import banner5 from '../../../assets/banner5.jpg';
// import banner6 from '../../../assets/banner6.jpg';
// import banner2 from '../../../img/banner2.jpg';
// import banner7 from '../../../img/banner7.jpg';
// import banner4 from '../../../img/banner4.jpg';
// import banner5 from '../../../img/banner5.jpg';
// import banner6 from '../../../img/banner6.jpg';
// import banner8 from '../../../img/banner8.jpg';
// import banner9 from '../../../img/banner9.jpg';
// import banner10 from '../../../img/banner10.jpg';
// import banner11 from '../../../img/banner11.jpg';

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel, Autoplay]);

let inspiration = [
    { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    { text: 'Start by doing whats necessary; then do whats possible; and suddenly you are doing the impossible.', writer: "Francis of Assisi" },
    { text: 'If you have men who will exclude any of Gods creatures from the shelter of compassion and pity, you will have men who will deal likewise with their fellow men.', writer: "Francis of Assisi" },
    { text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.", writer: "Jimmy Dean" },
    { text: 'Keep your face always toward the sunshine - and shadows will fall behind you.', writer: "Walt Whitman" },
    { text: "You don't do things right once in a while. You do things right all the time.", writer: "Vince Lombardi" },
    { text: 'Early to bed and early to rise makes a man healthy, wealthy and wise.', writer: "Benjamin Franklin" },
    { text: 'Healing is a matter of time, but it is sometimes also a matter of opportunity.', writer: "Hippocrates" },
    { text: 'He who has health, has hope; and he who has hope, has everything.', writer: "Thomas Carlyle" },
    { text: 'We must accept finite disappointment, but never lose infinite hope.', writer: "Martin Luther King, Jr." }
]

function DesignShowcase() {
    return (
        <StyleDesignShowcase>
            <h3>Inspire Quotes</h3>
            <StyleDesignInner>
                <div className="container">
                    <Swiper navigation={false}
                        effect={"coverflow"}
                        direction={"vertical"}
                        centeredSlides={true}
                        slidesPerView={3}
                        loop={true}
                        speed={1000}

                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                            reverseDirection: true
                        }}

                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 6,
                            slideShadows: false
                        }}
                        mousewheel={true}
                        keyboard={true}
                        pagination={false}
                        slideToClickedSlide={true}
                        className="mySwiper"
                    >
                        {inspiration.map((item, index) => (
                            <SwiperSlide  >
                                <StyleData>
                                    <h4>"{item.text}"</h4>
                                    <p>{item.writer}</p>
                                    <span>05/2020</span>
                                </StyleData>


                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </StyleDesignInner>

        </StyleDesignShowcase >);
}

export default DesignShowcase;