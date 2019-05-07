import React from 'react';
// import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const homeStyle = {
    textAlign: "center"
}

const SignIn = (props) => {

    const { classes } = props;
    return (
        <div style={homeStyle}>
            <h1>Sign in</h1>

            <TextField
                label="Username"
                variant="outlined"
                id="custom-css-outlined-input"
            />
            <br />
            <br />
            <TextField
                label="Password"
                variant="outlined"
                id="custom-css-outlined-input"
            />

        </div>
    );

}

export default SignIn;
