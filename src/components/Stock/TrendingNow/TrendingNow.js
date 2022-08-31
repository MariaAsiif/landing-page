import React, { useState } from "react";
import { StyleTrending, TrendNowInner } from "./StyleTrendingNow";
import Slider from "react-slick";
import { BASE_URL, GET_PRODUCTS } from "../../../services/config";
import axios from "axios";
import { useQuery } from "react-query";
import CustomCard from "../../Globals/CustomCard";
import ViewMore from "../ViewMore/ViewMore";
import { Placeholder } from "react-bootstrap";
import MultiRangeSlider from "multi-range-slider-react";
function TrendingNow({ heading, section }) {
  const [viewMor, setviewMor] = useState(false);

  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const {
    data: productData,
    isSuccess: stateIsSuccess,
    isLoading: stateIsLoading,
    isFetching: stateIsFetching,
    error: stateError,
    isError: stateIsError,
  } = useQuery(
    "products",
    () => {
      return axios.get(BASE_URL + GET_PRODUCTS);
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: "false",
      keepPreviousData: "false",
      select: (data) =>
        data.data.data.filter((item) => item.productType === section),
      enabled: true,
    }
  );

  var settings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },

      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const style = {
    borderBottom: "1px solid #DADADA",
    paddingBottom: "1rem",
  };

  return (
    <StyleTrending>
      <TrendNowInner>
        <div className="container">
          <h1 style={style} className="main-heading">
            {heading}
          </h1>
          {stateIsLoading && (
            <div>
              <Placeholder as="p" animation="glow" size="lg">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="p" animation="glow" size="lg">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder as="p" animation="glow" size="lg">
                <Placeholder xs={12} />
              </Placeholder>

            </div>
          )}

          <div className="row">
            <Slider {...settings} className="trendingNow-slick">
              {!stateIsLoading &&
                productData.splice(1).map((item, index) => (
                  <div key={index} className="col-md-3 mb-4"  >
                    <CustomCard desc={item.description} img={item.productImage} title={item.title} price={item.price} />
                  </div>
                ))}
            </Slider>

            <div className="col-md-4 offset-4 text-center mt-3">

              {!viewMor && <button className="more_btn" onClick={() => setviewMor(!viewMor)}>View more </button>}
            </div>

            {viewMor &&
              <div className="row">
                <div className="col-md-3 left_catagory">
                  <div className="catagoey_list">
                    <h3>Catagories</h3>
                    <ul>
                      <li className="list_data">
                        <input type="checkbox" />
                        <span>Catagory Name</span>
                      </li>
                      <li className="list_data">
                        <input type="checkbox" />
                        <span>Catagory Name</span>
                      </li>
                      <li className="list_data">
                        <input type="checkbox" />
                        <span>Catagory Name</span>
                      </li>
                      <li className="list_data">
                        <input type="checkbox" />
                        <span>Catagory Name</span>
                      </li>
                      <li className="list_data">
                        <input type="checkbox" />
                        <span>Catagory Name</span>
                      </li>
                      <li className="list_data">
                        <input type="checkbox" />
                        <span>Catagory Name</span>
                      </li>
                    </ul>

                    <div>
                      <h3 className="mb-5">Price Range </h3>
                      <MultiRangeSlider
                        min={0}
                        max={100}
                        step={5}
                        ruler={true}
                        label={true}
                        preventWheel={false}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) => {
                          handleInput(e);
                        }}
                      />

                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <ViewMore data={productData} />

                </div>
              </div>
            }

            {/* <Slider {...settings} className="trendingNow-slick">
            {!stateIsLoading &&
              productData.map((item, index) => (
                <div key={index} className="d-inline-block">
                  <h5 className="outside-card-text">{item.title}</h5>
                  <CustomCard
                    img={item.productImage}
                    title={item.title}
                    price={item.price}
                  />
                </div>
              ))}
          </Slider> */}
          </div>
        </div>
      </TrendNowInner>
    </StyleTrending>
  );
}
export default TrendingNow;
