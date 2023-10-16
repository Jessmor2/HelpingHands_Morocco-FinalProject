import React from "react";


const PrintDonationHistory = ({ userDonationHistory }) => {
    return (
        <div className="printable-content">

            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Currency</th>
                        <th>Payment Method</th>
                        <th>Donation Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {userDonationHistory.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.date}</td>
                            <td>{payment.currency}</td>
                            <td>{payment.payment_method}</td>
                            <td>${payment.payment_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrintDonationHistory;
