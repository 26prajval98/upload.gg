import React, { Component } from 'react'

import bg from '../images/home/bg.jpg'
import rocket from '../images/home/rocket.png'
import sectionTitle from '../images/home/section-title-icon.png'

export default class home extends Component {
    render() {
        return (
            <div>

                <header className="header-section">
                    <div className="nav-switch">
                        <i className="fa fa-bars"></i>
                    </div>
                    <div className="nav-warp">
                        <div className="user-panel">
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                        </div>
                        <ul className="main-menu">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                </header>

                <section className="hero-section" style={{backgroundColor : "black"}}>
                    <div className="container h-100">
                        <div className="hero-content text-white">
                            <div className="row">
                                <div className="col-lg-6 pr-0">
                                    <h2>Upload.gg  Store & Share</h2>
                                    <p>Store It. Share It </p>
                                    <a href="/plan" className="site-btn">Get your plan</a>
                                </div>
                            </div>
                            <div className="hero-rocket">
                                <img src={rocket} alt="rocket" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features-section spad">
                    <div className="container">
                        <div className="section-title">
                            <img src={sectionTitle} alt="#" />
                            <p>The best out there</p>
                            <h2>See our features</h2>
                        </div>
                        <div className="row">

                            <div className="col-lg-4 col-md-6 feature-item ">
                                <div className="ft-icon">
                                    <i className="flaticon-server"></i>
                                </div>
                                <h4>Cloud Database</h4>
                                <p>Upload files to the cloud database</p>
                            </div>
                            <div className="col-lg-4 col-md-6 feature-item">
                                <div className="ft-icon">
                                    <i className="flaticon-devices"></i>
                                </div>
                                <h4>Share Files</h4>
                                <p>Files can be shared and made public</p>
                            </div>

                            <div className="col-lg-4 col-md-6 feature-item">
                                <div className="ft-icon">
                                    <i className="flaticon-folder"></i>
                                </div>
                                <h4>Free Support</h4>
                                <p> Support on any type of errors </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pricing-section spad pt-0">
                    <div className="container">
                        <div className="section-title">
                            <img src={sectionTitle} alt="#" />
                            <p>The best out there</p>
                            <h2>See our features</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                                <div className="pricing-plan">
                                    <div className="pricing-title">
                                        <h4>Basic</h4>
                                    </div>
                                    <div className="pricing-body">
                                        <h2>₹0<span>/Month</span></h2>
                                        <ul>
                                            <li>25MB storage</li>
                                            <li>5 Uploads </li>
                                            <li>share and public access</li>
                                            <li>24/7 technical support</li>
                                        </ul>
                                        <a href="/plan" className="site-btn">Get Plan</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                                <div className="pricing-plan gold-plan">
                                    <div className="pricing-title">
                                        <h4>Premium</h4>
                                    </div>
                                    <div className="pricing-body">
                                        <h2>₹20<span>/Month</span></h2>
                                        <ul>
                                            <li>50MB storage</li>
                                            <li>Unlimited Uploads </li>
                                            <li>share and public access</li>
                                            <li>24/7 technical support</li>
                                        </ul>
                                        <a href="/plan" className="site-btn">Get Plan</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
                                <div className="pricing-plan">
                                    <div className="pricing-title">
                                        <h4>Public</h4>
                                    </div>
                                    <div className="pricing-body">
                                        <h2>₹0<span>/Month</span></h2>
                                        <ul>
                                            <li>No uploads</li>
                                            <li>Only download public files</li>
                                            <li>Read access</li>
                                            <li>24/7 technical support</li>
                                        </ul>
                                        <a href="/plan" className="site-btn">Get Plan</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="footer-section">
                    <div className="container">
                        <ul className="footer-menu">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About us</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        )
    }
}
