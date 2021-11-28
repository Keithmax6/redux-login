import axios from 'axios';
import {LOGIN_SUCCESS,LOGIN_FAILED,USER_LOADED,AUTH_ERROR,LOGOUT} from "./types";
import {setAlert} from "./alertAction";
import setAuthToken from "../../Utilities/setAuthToken";
import {url} from '../../api'

//LOAD USER
export const loadUser = ()=> async dispatch=>{

if(localStorage.access_token){
    setAuthToken(localStorage.access_token)
}
try {
    const res = await axios.post(url);
    dispatch({
        type:USER_LOADED,
        payload: res.data.user
    });
}catch (err){
    dispatch(
        {
            type:AUTH_ERROR
        }
    );

}
}

//LOGIN USER
export const login =(email,password)=>async dispatch=>{
  const config={
      headers:{
          "Content-Type":"application/json"
      }
  }
  const body = JSON.stringify({email,password});
  try{
      const res = await axios.post(url,body,config);
        console.log(res.data);
        localStorage.setItem("access_token", res.data.access_token);
          if(res.data.user.user_type===0){
              console.log('Unautherized Access');
          }else if(res.data.user.user_type===1){

              console.log('SuperAdmin');
          }else if(res.data.user.user_type===2){

              console.log('Admin');
          }else if(res.data.user.user_type===3){

              console.log('Delivery');
          }else if(res.data.user.user_type===4){

              console.log('vendor');
          }else if(res.data.user.user_type===5) {
              console.log('customer');
          }
          dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
          });
          dispatch(loadUser());

  }catch(error){
      const errors = error.response.data.error;
      if(errors){
        errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type:LOGIN_FAILED,

      });
  }
}

//LOGOUT
export const logout=()=> dispatch=>{
    dispatch({
        type:LOGOUT
    });
}