import React from 'react'
import sectionTitle from '../images/home/section-title-icon.png'

export default function about() {
    return (
        <div>
            <section className="features-section spad pt-4">
                <div className="container">
                    <div className="section-title">
                        <img src={sectionTitle} alt="#" />
                        <p>The best out there</p>
                        <h2>See our features</h2>
                        <div className="w3-container w3-center w3-margin">
                            <a href="/services" className="site-btn w3-xxlarge">Get your plan</a>
                        </div>
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
        </div>
    )
}
