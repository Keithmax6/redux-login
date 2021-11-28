import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Alert from './components/Alert/Alert';
//redux
import {Provider} from "react-redux";
import store from "./store/store";

import { Route, Switch } from "react-router";
import {BrowserRouter} from "react-router-dom";
import {loadUser} from "./store/actions/authActions";
import React,{useEffect} from "react";
import setAuthToken from "./Utilities/setAuthToken";
import PrivateRoute from "./components/Routing/PrivateRoute";




if(localStorage.access_token){
    setAuthToken(localStorage.access_token);
}

function App() {
    useEffect(()=>{
      store.dispatch(loadUser())
    },[]);
  return (
      <Provider store={store}>
          <BrowserRouter>
    <div className="App">
        <Alert/>
        <Switch>
            <Route path="/login" exact component={Login}/>

            <PrivateRoute path="/dashboard" component={Dashboard}/>

        </Switch>
    </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;

/////////This is madness////////////
