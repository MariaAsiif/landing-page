import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller } from "react-hook-form";
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
import { ImCross } from "react-icons/im";
import { InputFields, ModelStyled } from './StyleService'
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



    
  const handleChangeCountry = (e) => {
    let { value } = e.target
    const updatedStates = State.getStatesOfCountry(value)
    setall_States(updatedStates)
    setrecruitModel((prevmodel) => ({
      ...prevmodel,
      country: value,

    }))



  }


  const handleState = (e) => {
    let { value } = e.target
    const updatedCities = City.getCitiesOfState(recruitModel.country, value)
    setrecruitModel((prevmodel) => ({
      ...prevmodel,
      state: value,

    }))
    setall_Cities(updatedCities)

  }


    const handleChange = (e) => {
        let { name, value } = e.target
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
                const updatedStates = State.getStatesOfCountry(currentCountryCode)
                setall_States(updatedStates)
                setrecruitModel((prevmodel) => ({
                    ...prevmodel,
                    country: currentCountryCode,
                   
                }))
                setall_Countries(get_countris)
                

            })();
        } catch (error) {
            console.log(error);
        }

    }, [])
    return (
        <ModelStyled>
            <Modal show={props.show} onHide={props.onClose} size="xl"  >
                <Modal.Header  >
                    <Modal.Title>Add Service</Modal.Title>
                    <button onClick={props.onClose} className='btn float-left'><ImCross /></button>
                </Modal.Header>
                <Modal.Body style={{ height: 520 }}>
                    <InputFields>
                        <Container>
                            <Row className="input_fields">
                                <Col md={4}>
                                    <label>Business</label>
                                    <input {...register('business')} placeholder='business' className={` form-control  form-control-lg   ${errors.business ? "border-red-400" : "border-gray-400"} `} />
                                    {errors.business && (<p className="text-red-500 text-sm">This field is required</p>)}
                                </Col>
                                <Col md={4}>
                                    <label>Content</label>
                                    <input {...register('Content')} placeholder='Content' className={` form-control  form-control-lg   ${errors.Content ? "border-red-400" : "border-gray-400"} `} />
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
                                    <input type="email" {...register('email')} placeholder='business' className={` form-control  form-control-lg   ${errors.email ? "border-red-400" : "border-gray-400"} `} />
                                    {errors.email && (<p className="text-red-500 text-sm">This field is required</p>)}
                                </Col>
                                <Col md={4}>
                                    <label>Longitude</label>
                                    <input type="text"  {...register('longitude')} placeholder='Longitude' className={` form-control  form-control-lg   ${errors.longitude ? "border-red-400" : "border-gray-400"} `} />
                                    {errors.longitude && (<p className="text-red-500 text-sm">This field is required</p>)}
                                </Col>
                                <Col md={4}>
                                    <label>Latitude</label>
                                    <input type="text"  {...register('latitude')} placeholder='Latitude' className={` form-control  form-control-lg   ${errors.latitude ? "border-red-400" : "border-gray-400"} `} />
                                    {errors.latitude && (<p className="text-red-500 text-sm">This field is required</p>)}
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="country">Country</label>
                                    <select value={recruitModel.country} onChange={handleChangeCountry} name="country" id="country" className={`form-control  form-control-lg ${errors.country && 'border-red-500'}`} >
                                        <option>Select Country </option>
                                        {all_Countries.map((contry) => <option value={contry.isoCode}>{contry.name}</option>)}
                                    </select>
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="state">State</label>
                                    <select value={recruitModel.state} onChange={handleState} name="state" id="state" className={`form-control  form-control-lg  `}   >
                                        <option>Select State </option>
                                        {all_States.map((contry) => <option value={contry.isoCode}>{contry.name}</option>)}
                                    </select>
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="city">City</label>
                                    <select value={recruitModel.city} onChange={handleChange} name="city" id="city" className={`form-control  form-control-lg  `}      >
                                        <option>Select city </option>
                                        {all_Cities.map((contry) => <option >{contry.name}</option>)}
                                    </select>
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="phone">Phone</label>
                                    <Controller
                                        name="mobile"
                                        control={control}
                                        rules={{ required: true }}
                                        style={{ height: '40px' }}
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
                                    <input type="number"  {...register('zipcode')} placeholder='business' className={` form-control  form-control-lg   ${errors.zipcode ? "border-red-400" : "border-gray-400"} `} />
                                    {errors.zipcode && (<p className="text-red-500 text-sm">This field is required</p>)}
                                </Col>
                                <Col md={4}>
                                    <label htmlFor="instagram">Instagram </label>
                                    <input {...register('instagram')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="instagram" type="text" />
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="instagram">LinkedIn </label>
                                    <input {...register('linkedin')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="LinkedIn" type="text" />
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="instagram">Twitter </label>
                                    <input {...register('twitter')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="Twitter" type="text" />
                                </Col>

                                <Col md={4}>
                                    <label htmlFor="instagram">Facebook </label>
                                    <input {...register('facebook')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="Facebook" type="text" />
                                </Col>

                                <Col md={12} className="mb-3">
                                    <label htmlFor="instagram">Permanent Address </label>
                                    <input {...register('address')} autoComplete="off" className={` form-control  form-control-lg`} placeholder="address" type="text" />
                                </Col>
                                <Col md={4}>
                                    <button className='btn_submit'>Submit</button>
                                </Col>







                            </Row>
                        </Container>
                    </InputFields>
                </Modal.Body>

            </Modal >
        </ModelStyled>
    )
}

export default ServicePopup