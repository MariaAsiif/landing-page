import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import StyleDesignShowcase, { StyleDesignInner } from './StyleDesignShowcase';
import './StyleDesignShowcase.css'
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel } from 'swiper/core';


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

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel]);

let inspiration = [
    { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    // { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    // { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    // { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    // { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    // { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    // { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" },
    // { text: 'Love is composed of a single soul inhabiting two bodies', writer: "Aristotle" }
]

function DesignShowcase() {
    return (
        <StyleDesignShowcase>
            <h3>Inspirational Quotes</h3>
            <StyleDesignInner>
                <div className="container">
                    <Swiper navigation={false}
                        effect={"coverflow"}
                        direction={"vertical"}
                        centeredSlides={true}
                        slidesPerView={3}
                        loop={true}
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
                            <SwiperSlide>
                                <div className="inspiration_data">
                                    <h4>"{item.text}"</h4>
                                    <p>{item.writer}</p>
                                     </div>
                                   

                            </SwiperSlide>

                        ))}
                    </Swiper>
                </div>
            </StyleDesignInner>

        </StyleDesignShowcase>);
}

export default DesignShowcase;