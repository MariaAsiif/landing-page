import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { ViewTableContainer } from './StyleTable'
import logo from "../../../assets/tickerlogo.png";
import axios from 'axios';

const SalesTable = () => {

    useEffect(() => {
      const apiFetch = async () => {
        const options = {
            method: 'GET',
            url: 'https://brianiswu-otreeba-open-cannabis-v1.p.rapidapi.com/brands/asasa/edibles',
            headers: {
              'X-RapidAPI-Key': '74c6a59e06msha26a52b45fe145fp118b28jsn4b367836b750',
              'X-RapidAPI-Host': 'brianiswu-otreeba-open-cannabis-v1.p.rapidapi.com'
            }
          };
          
        await axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
      }
      apiFetch()
    },[])
    return (
        <Container>
            <ViewTableContainer>

                <h2>Popular Cannabis </h2>

                <Table style={{ border: 'none' }} >
                    <thead >
                        <tr >
                            <th>Name</th>
                            <th>Last Price</th>
                            <th>24h Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="table_row">
                                <img src={logo} style={{ width: '30px', }} alt="logo" />
                                <h2>BNB</h2>
                            </td>
                            <td>$277.9</td>
                            <td style={{ color: 'green' }}>+0.65%</td>
                            <td>$44,345M</td>
                        </tr>
                        <tr>
                            <td className="table_row">
                                <img src={logo} style={{ width: '30px', }} alt="logo" />
                                <h2>BNB</h2>
                            </td>
                            <td>$277.9</td>
                            <td style={{ color: 'green' }}>+0.65%</td>
                            <td>$44,345M</td>
                        </tr>
                        <tr>
                            <td className="table_row">
                                <img src={logo} style={{ width: '30px', }} alt="logo" />
                                <h2>BNB</h2>
                            </td>
                            <td>$277.9</td>
                            <td style={{ color: 'green' }}>+0.65%</td>
                            <td>$44,345M</td>
                        </tr>
                    </tbody>
                </Table>
            </ViewTableContainer>
        </Container>
    )
}

export default SalesTable