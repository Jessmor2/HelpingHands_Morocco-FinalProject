import React, { useState, } from "react";



const DateFilter = ({ onFilter, onPrint }) => {
    const [selectedDate, setSelectedDate] = useState("All");




    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onFilter(selectedDate);
        console.log(selectedDate);
    };

    const handlePrintClick = () => {


        onPrint();


    };

    return (
        <form className="dateFilter" onSubmit={handleSubmit}>
            <select
                value={selectedDate}
                onChange={handleDateChange}

            >
                <option value="" disabled hidden>
                    Select a date
                </option>
                <option value="All">All</option>
                <option value="2023">2023-2024</option>
                <option value="2022">2022-2023</option>
                <option value="2021">2021-2022</option>
                <option value="2020">2020-2021</option>
                <option value="2019">2019-2020</option>

            </select>

            <button className="applyFilterBtn" type="submit" style={{ marginLeft: "5px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
                Apply Filter
            </button>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-printer"
                viewBox="0 0 16 16"
                style={{ marginLeft: "10px", cursor: "pointer" }}

                onClick={handlePrintClick}
            >
                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
            </svg>


        </form>
    );
};

export default DateFilter;
