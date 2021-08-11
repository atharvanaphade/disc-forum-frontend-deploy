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
// import Icon from 'material-ui/core/Icon';
import PersonIcon from '@material-ui/icons/Person';
import {isLogin, logout} from './utils';

// Local imports
import theme from './theme';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: '1px solid ${theme.palette.divider}',
	},
	link: {
		margin: theme.spacing(1, 1.5),
		color: '#e85a4f',
	},
	toolbarTitle: {
		flexGrow : 1,
	},
	newTheme: {
		backgroundColor: "#d8c3a5",
		textColor: "#e98074",
		flexGrow: 1,
	}
}));

function Header(){
	const classes = useStyles();
	let history = useHistory();
	const [data, setData] = useState({search:''});
	const goSearch = (e) => {
		history.push({
			pathname : '/search/',
			search : '?search=' + data.search,
		});
		window.location.reload();
	};
	if(isLogin())
	{
		return (
			<React.Fragment>
				<div className={classes.newTheme}>
				<AppBar
					position="static"
					color="backgroundColor"
					elevation={0}
					className={classes.newTheme}
				>
					<Toolbar className={classes.newTheme}>
						<Typography
							variant="h6"
							color="background"
							noWrap
							className={classes.newTheme}
						>
							<Link
								component={NavLink}
								className={classes.link}
								to="/"
								underline="none"
								color="secondary"
							>
								Blog
							</Link>
						</Typography>
	
						<SearchBar
							value={data.search}
							onChange={(newValue) => setData({ search: newValue })}
							onRequestSearch={() => goSearch(data.search)}
              // style={{padding:theme.spacing(2)}}
						/>
						<Button
							href="#"
							color="textColor"
							variant="outlined"
							className={classes.link}
							component={NavLink}
							to="/logout"
							onClick = {()=>{
								logout();
								window.location.reload();
							}}
						>
							Logout
						</Button>
            <Button href="/myprofile" variant="outline">
              <PersonIcon style={{fontSize:'35', color:"#e85a4f"}}/>
            </Button>
            
					</Toolbar>
				</AppBar>
				</div>
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
            <div className="header" className={classes.newTheme}>
			<AppBar
				position="static"
				color="backgroundColor"
				elevation={0}
				className={classes.newTheme}
			>
				<Toolbar className={classes.newTheme}>
					<Typography
						variant="h6"
						color="textColor"
						noWrap
						className={classes.newTheme}
					>
						<Link
							component={NavLink}
                            className={classes.link}
							to="/"
							underline="none"
							color="textColor"
						>
							Blog
						</Link>
					</Typography>

					<SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>

					<nav>
						<Link
							color="textColor"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					<Button
						href="#"
						color="textColor"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					{/* <Button
						href="#"
						color="inherit"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button> */}
				</Toolbar>
			</AppBar>
            </div>
		</React.Fragment>
	);
}
export default Header;
