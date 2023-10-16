import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/contact.css";
import { Link, useNavigate } from "react-router-dom";

export const Dashboard = (props) => {
    const { store, actions } = useContext(Context);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newStreetAddress, setNewStreetAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newState, setNewState] = useState('');
    const [newCountry, setNewCountry] = useState('')

    useEffect(() => {
        actions.getUser()
        console.log(localStorage.getItem("user_id"))
    }, [])

    const handleSubmitEditContact = (e) => {
        e.preventDefault()
        const newObj = {
            first_name: newFirstName,
            last_name: newLastName,
            phone: newPhone,
            gender: newGender,
            street_address: newStreetAddress,
            city: newCity,
            state: newState,
            country: newCountry,
            user_id: localStorage.getItem("user_id")
        };
        actions.editObject(newObj)
    }

    return (
        <>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col dashboard">
                            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 my-5">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                                    <li className="breadcrumb-item"><Link to="/dashboard-history">Donation History</Link></li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4" style={{ width: 'auto' }}>
                                <div className="card-body text-center">
                                    <img src={store.user.gender == "male" ? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1696263499~exp=1696264099~hmac=e15908ec944c24765a64d9b8185abf84624a8d5de64883456a88f04bbb692d58' :
                                        store.user.gender == "female" ? 'https://img.freepik.com/free-vector/illustration-businesswoman_53876-5857.jpg?w=740&t=st=1696264556~exp=1696265156~hmac=32e49fc27755cf638e74a7414a1ef7dd852eedce42db8323c85c7499f1244623' :
                                            'https://t3.ftcdn.net/jpg/01/77/54/02/360_F_177540231_SkxuDjyo8ECrPumqf0aeMbean2Ai1aOK.jpg'} alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: "250px", height: "250px" }}></img>
                                    <h5 className="mt-n5 mb-3 fs-2">{store.user.first_name}  {store.user.last_name}</h5>
                                    <p className="text-muted mb-4 fs-3">{store.user.city},  {store.user.state}, {store.user.country}</p>

                                    <div className="d-flex justify-content-center mb-2">

                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Edit Contact Info
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0" style={{ width: 'auto' }}>
                                <div className="card-body p-0">

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4" style={{ width: 'auto' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.first_name} {store.user.last_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{store.user.street_address}, {store.user.city}, {store.user.state}, {store.user.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Contact Info</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                {/* -- Name input -- */}
                                <div className="form-outline mb-2">
                                    <input type="text" id="new_first_name" className="form-control" placeholder="Enter First name" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
                                    <label className="form-label" htmlFor="new_first_name">First Name</label>
                                </div>
                                <div className="form-outline mb-2">
                                    <input type="text" id="new_last_name" className="form-control" placeholder="Enter Last name" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
                                    <label className="form-label" htmlFor="new_last_name">last Name</label>
                                </div>

                                {/* -- Gender -- */}
                                <div className="form-outline mb-2">
                                    <label htmlFor="gender" className="form-label me-2">Gender</label>
                                    <select onChange={(e) => {
                                        setNewGender(e.target.value)
                                    }} className="picker" id="gender">
                                        <option value="not specified">Select your Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="not specified">I'd rather not say</option>
                                    </select>
                                </div>

                                {/* -- phone input -- */}
                                <div className="form-outline mb-2">
                                    <input type="text" id="phone" className="form-control" placeholder="Enter Phone Number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                                    <label className="form-label" htmlFor="phone">Phone</label>
                                </div>

                                {/* -- address -- */}
                                <div className="form-outline mb-2">
                                    <input type="text" id="new_street_address" className="form-control" placeholder="Enter Street Address" value={newStreetAddress} onChange={(e) => setNewStreetAddress(e.target.value)} />
                                    <label className="form-label" htmlFor="new_street_address">Street Address</label>
                                </div>
                                {/* -- city -- */}
                                <div className="form-outline mb-2">
                                    <input type="text" id="new_city" className="form-control" placeholder="Enter City" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
                                    <label className="form-label" htmlFor="new_city">city</label>
                                </div>
                                {/* -- state -- */}
                                <div className="form-outline mb-2">
                                    <input type="text" id="new_state" className="form-control" placeholder="Enter State" value={newState} onChange={(e) => setNewState(e.target.value)} />
                                    <label className="form-label" htmlFor="new_state">State</label>
                                </div>
                                {/* -- country -- */}
                                <div className="form-outline mb-2">
                                    <input type="text" id="new_country" className="form-control" placeholder="Enter Country" value={newCountry} onChange={(e) => setNewCountry(e.target.value)} />
                                    <label className="form-label" htmlFor="new_country">Country</label>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary btn-block" data-bs-dismiss="modal"
                                onClick={(e) => handleSubmitEditContact(e)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}