import React, { useState, useEffect } from 'react'
import { Country } from 'country-state-city';
import axios from 'axios'
import { FaChevronDown } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { CountryStateWrpper } from './StylePopup'
const CountryState = ({ handleNext }) => {
    const [all_Countries] = useState(() => Country.getAllCountries())
    const [formModel, setformModel] = useState({

        country: "AF",
        state: "BDS",

    })
    const handleChangeCountryStateCity = (value, fieldname) => {
        setformModel((prevmodel) => ({
            ...prevmodel,
            [fieldname]: value
        }))
    }

    useEffect(() => {
        (async () => {
            const response = await axios('https://api.ipregistry.co/?key=m7irmmf8ey12rx7o')
            const currentCountryCode = response.data.location.country.code

            setformModel((prevmodel) => ({
                ...prevmodel,
                country: currentCountryCode,

            }))

        })();
    }, [])


    const submitform = () => { }

    return (
        <CountryStateWrpper>
            <h1>
                Please select your country and state
            </h1>

            <form onSubmit={(e) => submitform(e)}>
                <div class="form-group">

                    <select>
                        <option >Select Country</option>
                        {
                            all_Countries.map((country) => {
                                return (
                                    <option >{country.name}</option>
                                )
                            })
                        }
                    </select>

                </div>
                <div class="form-group">

                    <select>
                        <option>Select Country</option>
                        {
                            all_Countries.map((country) => {
                                return (
                                    <option>{country.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <Button
                    onClick={() => handleNext()}
                    className="btns d-grid col-2 mx-auto btn-lg clo-3"
                >
                    Next
                </Button>
            </form>
        </CountryStateWrpper>
    )
}

export default CountryState