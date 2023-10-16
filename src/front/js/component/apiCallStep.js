import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types'
import { Context } from '../store/appContext';

const ApiCallStep = (props) => {
  const { steps, triggerNextStep } = props;
  const [apiData, setApiData] = useState(null);
  const { store, actions } = useContext(Context)

  useEffect(() => {
    const userInput = document.querySelectorAll('.rsc-ts-user').length > 0 ? document.querySelectorAll('.rsc-ts-user')[document.querySelectorAll('.rsc-ts-user').length - 1].innerText : ''
    async function fetchData() {
      try {
        const response = await actions.sendChat(userInput);
        setApiData(store.chatBotReply);
        triggerNextStep();
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    }
    fetchData();
  }, []);



  return (
    <div>
      {apiData ? (
        <p>{apiData}</p>
      ) : (
        <p>...</p>
      )}
    </div>
  );
};



export default ApiCallStep;