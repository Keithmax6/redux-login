import {Button} from "@mui/material";
import * as React from "react";
import{connect} from "react-redux";
import PropTypes from 'prop-types';
import {logout} from "../../store/actions/authActions";
import {Fragment} from "react";
import {Link} from "react-router-dom";


const Dashboard = ({auth:{isAuthenticated,loading},logout})=>{
const authLinks = (
    <ul>
        <li>
            <a onClick={logout} href='#!'>Logout</a>
        </li>
    </ul>
);
const guestLinks =(
  <ul>
      <li>
          <a href='#!'>Dev</a>
      </li>
      <li>
          <Link to='/login'>Login</Link>
      </li>
  </ul>
);
    return(
        <div>

        <h1>Welcome</h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks:guestLinks}</Fragment>)}
    {/*<Button*/}
    {/*    onClick={logout}*/}
    {/*    type="submit"*/}
    {/*    fullWidth*/}
    {/*    variant="contained"*/}
    {/*    sx={{ mt: 3, mb: 2 }}*/}
    {/*>*/}
    {/*    Logout*/}
    {/*</Button>*/}
        </div>

    )
}
Dashboard.propTypes={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}
const mapStateToProps = state=>({
    auth:state.auth
})
export default connect(mapStateToProps,{logout})(Dashboard);