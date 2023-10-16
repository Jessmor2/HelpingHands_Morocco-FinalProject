import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/contact.css"

export const Contact = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="headerDiv">
                <h1 className="text-center pt-4" >
                    Contact Us
                </h1>
            </div>
            <div className="container mt-4" id="contactPageP">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <p>
                            If you have any questions for our team send us a message below. If you are interested in ways you can help or
                            about volunteering in Morocco please fill out the form below. We will reach out to you about our next
                            volunteer trip schedules and other ways to get involved!
                        </p>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-5">
                        <img className="aftermathPhoto1" src="https://s.france24.com/media/display/e57eef1a-4eee-11ee-b700-005056bf30b7/w:1280/p:1x1/2023-09-09T081028Z_1417888762_RC2U43AEAKXE_RTRMADP_3_MOROCCO-QUAKE.JPG"></img>
                        <br></br><br></br>
                        <img className="aftermathPhoto2" src="https://marvel-b1-cdn.bc0a.com/f00000000209887/www.projecthope.org/wp-content/uploads/2023/09/b17c7677-8481-4083-a711-1ac421de8ef6.jpg"></img>
                    </div>
                    <div className="col-7">
                        <div className="mb-3">
                            <label for="Name" className="form-label">First & Last Name</label>
                            <input type="text" className="form-control" id="formNameInput" placeholder="John Doe"></input>
                        </div>
                        <div className="mb-3">
                            <label for="Email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="formEmailInput" placeholder="john@abc.com"></input>
                        </div>
                        <div className="mb-3">
                            <label for="Phone-Number" className="form-label">Phone Number</label>
                            <input type="text" className="form-control" id="formPhoneNumberInput" placeholder="1-555-222-1234"></input>
                        </div>
                        <div className="mb-3">
                            <label for="Comments" className="form-label">Questions/Comments</label>
                            <textarea type="text-area" className="form-control" id="formCommentsInput" rows="5" placeholder="Let us know how we can help you help others."></textarea>
                        </div>
                        <button className="btn btn-primary btn-lg" id="contactFormSubmit">Submit</button>
                    </div>

                </div>
            </div>
        </>
    );
};
