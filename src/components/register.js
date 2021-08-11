import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';


//MaterialUI

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Theme

import Theme from './theme';

const darkTheme = createMuiTheme({
	palette: {
    	type: 'dark',
  	},	
})

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: "#e85a4f",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: "#e85a4f",
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "#e85a4f"
	},
	text: {
		textEmphasisColor: "#e85a4f",
	}
}));

export default function SignUp() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
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
			.post(`user/`, {
				email: formData.email,
				username: formData.username,
				password: formData.password,
			})
			.then((res) => {
				history.push('/login');
				console.log(res);
				console.log(res.data);
			})
			.catch((err) => {
				alert("Detials are incorrect or user exists!");
			})
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<ThemeProvider theme={Theme}>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								color="secondary"
								autoFocus
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								color="secondary"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								color="secondary"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2" color="inherit">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		    </ThemeProvider>
		</Container>
	);
}