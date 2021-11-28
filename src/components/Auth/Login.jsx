import * as React from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,Container} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {url} from '../../api';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from '../../store/actions/authActions';
import {setAlert} from "../../store/actions/alertAction";



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
function SignIn({login,setAlert,isAuthenticated}) {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });
    const {email,password} = formData;
    const onChange= e=>setFormData({...formData,[e.target.name]:e.target.value,})
    const handleSubmit =  (event) => {
        event.preventDefault();
        login(email, password);
        setAlert('Wrong credentials', 'danger');
    }
    if(isAuthenticated){
        return <Navigate to='/dashboard'/>
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>


                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            id="email"
                            label="Email Address"
                            onChange={e=>onChange(e)}
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e=>onChange(e)}
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
SignIn.propTypes = {
    setAlert:PropTypes.func.isRequired,
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}
const mapStateToProps = state=>({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{setAlert,login})(SignIn) ;

