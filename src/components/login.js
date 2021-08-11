import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';

// Material UI

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Theme

import theme from './theme';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
		color: "#e85a4f",
    },
    avatar: {
        width: theme.spacing(5),
        backgroundColor: "#e85a4f",
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
		color: "#e85a4f",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
		backgroundColor: "#e85a4f",
    },
}));

export default function SignIn(){
    const history = useHistory();
    const initialFormData = Object.freeze({
        username: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post('api/token/', {
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                        'JWT' + localStorage.getItem('access_token');
                history.push('/');
				window.location.reload();
            });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
			<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						color="secondary"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						color="secondary"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="inherit"/>}
						label="Remember Me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="#e2b714"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="form" color="inherit">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/register" variant="body2" color="inherit">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			</ThemeProvider>
		</Container>
    );
}