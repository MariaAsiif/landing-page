import React, { useState } from 'react'
import AgenciesHeader from '../AgenciesPage/AgenciesHeader/AgenciesHeader';
import FeatureMarketContainer from '../Homepage/FeatureMarketplace/FeatureMarketContainer';
import Footer from '../Homepage/Footer/Footer';
import HomePageNav from "../Homepage2/HomePageNav";
import { ImCross } from "react-icons/im";
import { FiChevronLeft } from "react-icons/fi";

import styles from "./Checkout.module.css"
import paypal from "../../assets/paypal.png"

const Checkout = () => {
    const [products, setProducts] = useState([
        { name: "Wedding video", price: 85.65 },
        { name: "Wedding video", price: 85.65 },

    ]);

    return (
        <>
            <AgenciesHeader />
            <HomePageNav />
            <FeatureMarketContainer order="first" />
            <div className={`container pb-5 ${styles.wrapper}`}>
                <div className='row px-5  '>
                    <div className={`col-12 ${styles.checkouttext}`}>
                        <div>Checkout</div>
                    </div>
                    <div className='col-md-8  '>
                        <div className={styles.cartWrapper}>
                            <h1 className={styles.cartheading}>Shopping Cart</h1>
                            {products.map((product) => {
                                return (
                                    <div className={`row mb-2 border-bottom py-4 px-4 ${styles.productWrapper}`}>
                                        <div className='col-md-1'>
                                            <img className={styles.productimg} src="http://placekitten.com/50/50" alt="productimg" />
                                        </div>
                                        <div className='col-md-8 d-flex align-items-center'>
                                            <div className={styles.productname} >
                                                {product.name}
                                            </div>
                                        </div>
                                        <div className='col-md-1 d-flex align-items-center justify-content-center'>
                                            <div>
                                                <ImCross role="button" className='text-danger ' />
                                            </div>
                                        </div>
                                        <div className='col-md-2 d-flex align-items-center justify-content-end'>
                                            <div className={styles.productprice}>
                                                ${product.price}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={`row mb-2 border-bottom py-4 px-4 ${styles.productWrapper}`}>
                                <div className='col-md-8'></div>
                                <div className='col-md-2 d-flex align-items-center  '>
                                    <div className={styles.productsubtotal}>
                                        Subtotal:
                                    </div>
                                </div>
                                <div className='col-md-2 d-flex align-items-center justify-content-end'>
                                    <div className={styles.productprice}>
                                        $896.35
                                    </div>
                                </div>
                            </div>

                            <div className={`row mb-2 border-bottom py-4 px-4 ${styles.productWrapper}`}>
                                <div className='col-md-8 d-flex align-items-center'>
                                    <div >
                                        <button className={styles.continuShopping}><FiChevronLeft size={21} />Continue Shopping</button>
                                    </div>
                                </div>
                                <div className='col-md-2 d-flex align-items-center  '>
                                    <div className={styles.producttotaltext}>
                                        Total:
                                    </div>
                                </div>
                                <div className='col-md-2 d-flex align-items-center justify-content-end'>
                                    <div className={styles.producttotal}>
                                        $896.35
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-md-4 border'>
                        <div className='row gy-5'>
                            <div className='col-12 '>
                                <div className={styles.infoWrapper}>
                                    <h1 className={styles.cartheading}>Your Information</h1>
                                    <div className={styles.inputfieldWrapper}>
                                        <label>Email</label>
                                        <input type="email" placeholder="john@gmail.com" />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className={styles.paymentWrapper}>
                                    <h1 className={styles.cartheading}>Payment Options</h1>
                                    <div className={`text-center ${styles.paymentinnerWrapper}`}>
                                        <img src={paypal} className={styles.paymentpic} />
                                        <button className={styles.paymentbutton}>Buy now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout