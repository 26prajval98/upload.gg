import React from 'react'

import sectionTitle from '../images/home/section-title-icon.png'

export default function services() {
	return (
		<div>
			<section className="pricing-section spad pt-4">
				<div className="container">
					<div className="section-title">
						<img src={sectionTitle} alt="#" />
						<p>The best out there</p>
						<h2>Select Our Plans</h2>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
							<div className="pricing-plan">
								<div className="pricing-title">
									<h4>Basic</h4>
								</div>
								<div className="pricing-body">
									<h2>₹10<span>/Month</span></h2>
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

		</div>
	)
}
