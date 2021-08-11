// REACT
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// MaterialUI
import AppBar from '@material-ui/core/AppBar'; 
import Toolbar from '@material-ui/core/Toolbar'; 
import Typography from '@material-ui/core/Typography'; 
import CssBaseline from '@material-ui/core/CssBaseline'; 
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';

import theme from './theme';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: '1px solid ${theme.palette.divider}',
	},
	link: {
		margin: theme.spacing(1, 1.5),
		color: '#22C5A2',
	},
	toolbarTitle: {
		flexGrow : 1,
	},
	footer: {
		borderTop: '1px solid',
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		color: "secondary",
		backgroundColor: "primary",
		[theme.breakpoints.up("sm")]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

const Footer = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<div className={classes.footer}>
					<Typography variant="body2" color="secondary" align="center">
						FOOTER 
					</Typography>
				</div>
			</ThemeProvider>
		</React.Fragment>
	)
}
export default Footer;