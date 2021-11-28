import {LOGIN_SUCCESS,LOGIN_FAILED,USER_LOADED,AUTH_ERROR,LOGOUT} from "../actions/types";

const initialState = {
    access_token:localStorage.getItem('access_token'),
    isAuthenticated: null,
    loading:true,
    user:null,
}

export default function(state=initialState,action){
    const {type,payload} = action;


   switch(type){
       case USER_LOADED:
           return {
               ...state,
               isAuthenticated: true,
               loading:false,
               user:payload
           }
       case LOGIN_SUCCESS:
           localStorage.setItem('access_token',payload.access_token);
           return {
               ...state,
               ...payload,
               isAuthenticated: true,
               loading:false
           }
       case LOGIN_FAILED:
       case AUTH_ERROR:
       case LOGOUT:
           localStorage.removeItem('access_token');
           return {
               ...state,
               access_token  :null,
               isAuthenticated: false,
               loading:false,
               user:null,
           }

       default:
           return state;
   }
}