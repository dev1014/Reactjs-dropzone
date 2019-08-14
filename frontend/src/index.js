import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import DashBoard from './views/Dashboard';

import 'bootstrap/dist/css/bootstrap.min.css';


const hist = createBrowserHistory();

// ReactDOM.render(
//   <Provider store={store}>
//       <Router history={hist}>
//           <Route path="/" component={ DashBoard }/>;
//       </Router>
//   </Provider>,  
//   document.getElementById("root")
// );

ReactDOM.render(
  <DashBoard/>,  
  document.getElementById("root")
);
