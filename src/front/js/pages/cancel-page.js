import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/thank-you.css";

export const ThankYou = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <text>
                Sorry to see you go!
            </text>
        </div>
    );
};