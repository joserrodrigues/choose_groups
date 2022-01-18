import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Container} from 'reactstrap';

import './App.css';
import MainController from './Container/Main/MainController';
import ReportController from './Container/Report/ReportController'
import NoticeController from './Container/Notice/NoticeController';

function App() {
  
  // const result = dotenv.config()
  //console.log("URL = ")
  //console.log(process.env.apiKey)
  //console.log(process.env.REACT_APP_databaseURL)

  const bgInfo = "cr-app mainViewBg";
  //const random = parseInt(Math.floor(Math.random() * Math.floor(2)),10)+1;

  const routes = (
    <Container fluid={true} className="mainContainer">
      <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<MainController />} />
          {/* <Route path="/report" exact element={<ReportController />} /> */}
          {/* <Route path="/" exact element={<NoticeController />} /> */}
      </Routes>
      </BrowserRouter>
    </Container>
  );

  return (
    
    <main className={bgInfo}>          
      {routes}
    </main>
  );
}

export default App;
