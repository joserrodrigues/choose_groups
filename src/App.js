import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import {Container} from 'reactstrap';

import './App.css';
import MainController from './Container/Main/MainController';
import ReportController from './Container/Report/ReportController'
import NoticeController from './Container/Notice/NoticeController';

function App() {
  
  // const result = dotenv.config()
  console.log("URL = ")
  console.log(process.env.apiKey)
  console.log(process.env.REACT_APP_databaseURL)

  const bgInfo = "cr-app mainViewBg";
  const random = parseInt(Math.floor(Math.random() * Math.floor(2)),10)+1;

  const routes = (
    <Container fluid={true} className="mainContainer">
      <Switch>
        <Route path="/" exact component={MainController} />
        {/* <Route path="/report" exact component={ReportController} /> */}
        {/* <Route path="/" exact component={NoticeController} /> */}
        <Redirect to="/" />
      </Switch>
    </Container>
  );

  return (
    <BrowserRouter>
        <main className={bgInfo}>          
          {routes}
        </main>
    </BrowserRouter>
  );
}

export default App;
