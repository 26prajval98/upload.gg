import React from 'react'

import rocket from '../images/home/rocket.png'

export default function home() {
    return (
        <div>
            <header className="header-section">
                <div className="nav-switch">
                    <i className="fa fa-bars"></i>
                </div>
                <div className="w3-container">
                    <div className="user-panel">
                        <a className="w3-button" href="/login">Login</a>
                        <a className="w3-button" href="/register">Register</a>
                    </div>
                    <ul className="main-menu w3-left">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About us</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="mailto:contact@upload.gg">Contact</a></li>
                    </ul>
                </div>
            </header>

            <section className="hero-section" style={{ backgroundColor: "black" }}>
                <div className="container h-100">
                    <div className="hero-content text-white">
                        <div className="row">
                            <div className="col-lg-6 pr-0">
                                <h2>Upload.gg  Store & Share</h2>
                                <p>Store It. Share It </p>
                                <a href="/login" className="site-btn">Login to get your plan</a>
                            </div>
                        </div>
                        <div className="hero-rocket">
                            <img src={rocket} alt="rocket" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}