import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { ViewTableContainer } from './StyleTable'
import logo from "../../../assets/tickerlogo.png";

const SalesTable = () => {
    return (
        <Container>
            <ViewTableContainer>

                <h2>Popular cryptocurrencies</h2>

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