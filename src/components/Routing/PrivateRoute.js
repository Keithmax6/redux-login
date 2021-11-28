import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Route,Navigate} from "react-router-dom";

const PrivateRoute=({element:Component,auth:{isAuthenticated,loading},...rest })=>(
    <Route {...rest} render={props=>!isAuthenticated && !loading?(<Navigate to='/login'/>):(<Component {...props}/>)}/>
)
PrivateRoute.prototype={
 auth: PropTypes.object.isRequired,
}
const mapStateToProps =state=> ({
    auth:state.auth
});
export default connect(mapStateToProps)(PrivateRoute);