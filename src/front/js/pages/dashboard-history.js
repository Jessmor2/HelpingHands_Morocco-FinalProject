import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import DateFilter from "./dateFilter";
import PrintDonationHistory from "./printDonationHistory"
import "../../styles/print.css"


export const DashboardHistory = () => {
    const { store, actions } = useContext(Context);
    const [filteredDonationHistory, setFilteredDonationHistory] = useState([]);
    const [selectedDate, setSelectedDate] = useState("All");

    useEffect(() => {

        actions.fetchEachDonation();
        setFilteredDonationHistory(store.donations);

    }, []);

    const handlePrint = () => {

        if (filteredDonationHistory.length === 0) {
            console.log("No records to print");
            return;
        }
        const printWindow = window.open("", "", "width=600,height=600");

        printWindow.document.open();
        printWindow.document.write('<html><head><title>Print</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></head><body>');
        printWindow.document.write('<div id="printable-content">');
        printWindow.document.write(document.querySelector('.printable-content').innerHTML);
        printWindow.document.write('</div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script></body></html>');
        printWindow.document.close();

        printWindow.print();
        printWindow.onafterprint = function () {
            printWindow.close();
        };
    };
    const handleFilter = (selectedDate) => {
        setSelectedDate(selectedDate);

        actions.fetchEachDonation(selectedDate);
        if (selectedDate === "All") {
            setFilteredDonationHistory(store.donations);
        } else {
            const filteredData = store.donations.filter((payment) => {
                let newPayment = "";
                for (let i = 4; i < 8 || i == 7; i++) {
                    newPayment += payment.date.toString()[i];
                }
                let newSelected = "";
                for (let i = 0; i < 4; i++) {
                    newSelected += selectedDate[i];
                }
                console.log(newPayment, "payment date");
                console.log(newSelected, "selected");

                return newPayment === newSelected;
            });

            setFilteredDonationHistory(filteredData);
        }
    };

    useEffect(() => {
        actions.getUser();
        console.log(localStorage.getItem("user_id"));
    }, []);

    return (
        <>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col dashboard">
                            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mx-5 my-5">
                                <ol className="breadcrumb mt-0">
                                    <li className="breadcrumb-item"><Link to="/dashboard">User Profile</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Donation History</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4" style={{ width: 'auto' }}>
                                <div className="card-body text-center">
                                    <img src={store.user.gender == "male" ? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1696263499~exp=1696264099~hmac=e15908ec944c24765a64d9b8185abf84624a8d5de64883456a88f04bbb692d58' :
                                        store.user.gender == "not specified" ? 'https://t3.ftcdn.net/jpg/01/77/54/02/360_F_177540231_SkxuDjyo8ECrPumqf0aeMbean2Ai1aOK.jpg' :
                                            'https://img.freepik.com/free-vector/illustration-businesswoman_53876-5857.jpg?w=740&t=st=1696264556~exp=1696265156~hmac=32e49fc27755cf638e74a7414a1ef7dd852eedce42db8323c85c7499f1244623'} alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: "250px", height: "250px" }}></img>
                                    <h5 className="mt-n5 mb-3 fs-2">{store.user.first_name}  {store.user.last_name}</h5>
                                    <p className="text-muted mb-4 fs-3">{store.user.city},  {store.user.state}, {store.user.country}</p>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0" style={{ width: 'auto' }}>
                                <div className="card-body p-0"></div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card  mb-4" style={{ width: 'auto' }}>
                                <div className="col-sm-10">
                                    <div className="card-body">
                                        <div className="row">
                                            <DateFilter onFilter={handleFilter} onPrint={handlePrint} />
                                            <h3 className="my-3 donationHistoryHeader">Donation History</h3>
                                        </div>
                                    </div>

                                    {filteredDonationHistory.length === 0 ? (
                                        <h3 style={{ textAlign: "center", color: "red" }}>No record found!</h3>
                                    ) : (
                                        <PrintDonationHistory userDonationHistory={filteredDonationHistory} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
