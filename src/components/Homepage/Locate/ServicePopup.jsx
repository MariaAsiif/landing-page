import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller } from "react-hook-form";
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
const ServicePopup = (props) => {
    const { register, watch, handleSubmit, control, formState: { errors } } = useForm({ mode: 'onChange', });
    const [all_Countries, setall_Countries] = useState([])
    const [all_States, setall_States] = useState([])
    const [all_Cities, setall_Cities] = useState([])
    const [countryCode, setCountryCode] = useState("")
    const [recruitModel, setrecruitModel] = useState({
        city: "",
        state: "",
        country: "",
    })

    const handleChange = (e) => {
        let { name, value } = e.target
        console.log(e.target);
        if (name === "country") {
            const updatedStates = State.getStatesOfCountry(value)
            const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
            const updatedCities = City.getCitiesOfState(value, stateCode)
            setall_States(updatedStates)
            setall_Cities(updatedCities)

        }
        else if (name === "state") {
            const updatedStates = State.getStatesOfCountry(value)
            const stateCode = updatedStates.length > 0 ? updatedStates[0].isoCode : ""
            const updatedCities = City.getCitiesOfState(value, stateCode)
            setall_Cities(updatedCities)

        }

        setrecruitModel((prevmodel) => ({
            ...prevmodel,
            [name]: value
        }))
    }

    useEffect(() => {
        try {
            (async () => {
                const response = await axios('https://api.ipregistry.co/?key=m7irmmf8ey12rx7o')
                const currentCountryCode = response.data.location.country.code
                let id = response.data.location.country.tld
                let removeDot = id.replace('.', "")
                setCountryCode(removeDot)
                const get_countris = Country.getAllCountries()
                const CurrentStates = State.getStatesOfCountry(currentCountryCode)
                const CurrentCities = City.getCitiesOfState(currentCountryCode, CurrentStates[0].isoCode)
                setrecruitModel((prevmodel) => ({
                    ...prevmodel,
                    country: currentCountryCode,
                    state: CurrentStates.length > 0 ? CurrentStates[0].isoCode : "",
                    city: CurrentCities.length > 0 ? CurrentCities[0].name : ""
                }))
                setall_Countries(get_countris)
                setall_States(CurrentStates)
                setall_Cities(CurrentCities)

            })();
        } catch (error) {
            console.log(error);
        }

    }, [])
    return (
        <Modal show={props.show} onHide={props.onClose} size="xl"  >
            <Modal.Header closeButton>
                <Modal.Title>Add Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={4}>
                            <label>Business</label>
                            <input {...register('business')} placeholder='business' className={` form-control  form-control-lg w-full h-full  ${errors.business ? "border-red-400" : "border-gray-400"} `} />
                            {errors.business && (<p className="text-red-500 text-sm">This field is required</p>)}
                        </Col>
                        <Col md={4}>
                            <label>Content</label>
                            <input {...register('Content')} placeholder='business' className={` form-control  form-control-lg w-full h-full  ${errors.Content ? "border-red-400" : "border-gray-400"} `} />
                            {errors.Content && (<p className="text-red-500 text-sm">This field is required</p>)}
                        </Col>
                        <Col md={4}>
                            <label>Gender</label>
                            <select  {...register('gender')} className='form-control form-control-lg'>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {errors.business && (<p className="text-red-500 text-sm">This field is required</p>)}
                        </Col>
                        <Col md={4}>
                            <label>Email</label>
                            <input type="email" {...register('email')} placeholder='business' className={` form-control  form-control-lg w-full h-full  ${errors.email ? "border-red-400" : "border-gray-400"} `} />
                            {errors.email && (<p className="text-red-500 text-sm">This field is required</p>)}
                        </Col>
                        <Col md={4}>
                            <label>Longitude</label>
                            <input type="text"  {...register('longitude')} placeholder='business' className={` form-control  form-control-lg w-full h-full  ${errors.longitude ? "border-red-400" : "border-gray-400"} `} />
                            {errors.longitude && (<p className="text-red-500 text-sm">This field is required</p>)}
                        </Col>
                        <Col md={4}>
                            <label>Latitude</label>
                            <input type="text"  {...register('latitude')} placeholder='business' className={` form-control  form-control-lg w-full h-full  ${errors.latitude ? "border-red-400" : "border-gray-400"} `} />
                            {errors.latitude && (<p className="text-red-500 text-sm">This field is required</p>)}
                        </Col>

                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="country">Country</label>
                            <select value={recruitModel.country} onChange={handleChange} name="country" id="country" className={`form-control  form-control-lg ${errors.country && 'border-red-500'}`} >
                                <option defaultChecked disabled>Select Country </option>
                                {all_Countries.map((contry) => <option value={contry.isoCode}>{contry.name}</option>)}
                            </select>
                        </Col>

                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                            <select value={recruitModel.state} onChange={handleChange} name="state" id="state" className={`form-control  form-control-lg  `}   >
                                <option defaultChecked disabled>Select State </option>
                                {all_States.map((contry) => <option value={contry.isoCode}>{contry.name}</option>)}
                            </select>
                        </Col>

                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                            <select value={recruitModel.city} onChange={handleChange} name="city" id="city" className={`form-control  form-control-lg  `}      >
                                <option defaultChecked disabled>Select city </option>
                                {all_Cities.map((contry) => <option >{contry.name}</option>)}
                            </select>
                        </Col>

                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                            <Controller
                                name="mobile"
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                        value={value}
                                        enableSearch
                                        disableSearchIcon
                                        country={countryCode}
                                        onChange={onChange}
                                        placeholder="000 000 000"
                                        // countryCodeEditable={false}
                                        className={` w-full  ${errors.mobile && 'error_form'}`}
                                        dropdownClass={"custom-dropdown"}
                                    />
                                )}
                            />
                        </Col>

                        <Col md={4}>
                            <label>Zipcode</label>
                            <input type="number"  {...register('zipcode')} placeholder='business' className={` form-control  form-control-lg w-full h-full  ${errors.zipcode ? "border-red-400" : "border-gray-400"} `} />
                            {errors.zipcode && (<p className="text-red-500 text-sm">This field is required</p>)}
                        </Col>
                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="instagram">Instagram </label>
                            <input {...register('instagram')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="instagram" type="text" />
                        </Col>

                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="instagram">LinkedIn </label>
                            <input {...register('linkedin')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="LinkedIn" type="text" />
                        </Col>

                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="instagram">Twitter </label>
                            <input {...register('twitter')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="Twitter" type="text" />
                        </Col>

                        <Col md={4}>
                            <label className="block text-sm font-medium mb-1" htmlFor="instagram">Facebook </label>
                            <input {...register('facebook')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="Facebook" type="text" />
                        </Col>

                        <Col md={12} className="mb-3">
                            <label className="block text-sm font-medium mb-1" htmlFor="instagram">Permanent Address </label>
                            <input {...register('address')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="address" type="text" />
                        </Col>
                        <Col md={4}>
                            <button className='btn btn-primary'>Submit</button>
                        </Col>







                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}

export default ServicePopup