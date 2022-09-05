import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { NewsContainer } from './StyleNewsFeed'
const NewsFeed = () => {

    const [news, setNews] = useState([])


    function add3Dots(string, limit) {
        var dots = "...";
        if (string && string.length > limit) {
          // you can also use substr instead of substring
          string = string.substring(0, limit) + dots;
        }
    
        return string;
      }


    useEffect(() => {
        const newApi = async () => {
            try {
                const res = await axios.get("https://cannabisapi.co/api/news?api_key=1ec3e6b5ac623e62be049dd5c20e8307dc7620e9j")
                setNews(res.data.data)
            }
            catch (err) {

            }
        }
        newApi()
    }, [])


    
    return (
        <Container >
            <h2 style={{ fontSize: '25px', margin: '50px 40px' }}>Cannabis Stocks Latest News</h2>
            <NewsContainer>
                <div className='card_wrapper p-2'>
                    {news && news.map((item, i) => (
                    <div className='card_container mt-4' >
                        <div className='card_item'>
                            <a href="/news/article/altria-stock-the-all-weather-dividend-king-strikes-again">
                                <img class="mt1 mr4 h_px3 w_pxauto mobile_h_pxmedium" src={item.image} loading="lazy" alt="Altria Stock (NYSE:MO): The All-Weather Dividend King Strikes Again" width="100%" height="100%" /></a>
                        </div>
                        <div className="content_info">
                            <a href="/news/article/altria-stock-the-all-weather-dividend-king-strikes-again" style={{ textDecoration: 'none' }}>
                                <span className="news_info">{add3Dots(item.headline , 80)}</span>
                                <div className="data_text">{add3Dots(item.excerpt, 150)}</div>
                            </a>
                            <hr />
                            <div>
                                <span className="date">3d</span>
                            </div>
                        </div>
                    </div>
                    ))}

                </div>
            </NewsContainer>

        </Container>
    )
}

export default NewsFeed