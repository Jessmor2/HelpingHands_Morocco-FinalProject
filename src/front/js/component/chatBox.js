import React, { useContext, useEffect, useState } from "react";
import roboImageURL from "../../img/robot-line-icon.png"
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Context } from "../store/appContext";
import ApiCallStep from "./apiCallStep";

const theme = {
  background: '#FFF',
  headerBgColor: '#800073',
  headerFontSize: '20px',
  botBubbleColor: '#ddd',
  headerFontColor: 'white',
  botFontColor: 'black',
  userBubbleColor: '#800073',
  userFontColor: 'white',
};
const config = {
  botAvatar: roboImageURL,
  floating: true,
};
const ChatBox = (props) => {
  const { store, actions } = useContext(Context)
  const [steps, setSteps] = useState([
    {
      id: '1',
      message: 'Welcome to the Chatbot!',
      trigger: 'name',
    },
    {
      id: 'name',
      user: true,
      trigger: 'apiCall',
    },
    {
      id: 'apiCall',
      component: (
        <ApiCallStep />
      ),
      waitAction: true,
      asMessage: true,
      trigger: 'name',
    },
    {
      id: 'end',
      message: 'Thank you for using the chatbot. Have a great day!',
      end: true,
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Helping Hands bot"
          steps={steps}
          floating={true}
          recognitionEnable={true}
          {...config}
        />
      </ThemeProvider>
    </>
  )
}

export default ChatBox