import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette : {
		// type : 'dark',
		primary : {
			main : '#eae7dc',
		},
		secondary : {
			main : '#d8c3a5',
		},
		error : {
			main : red.A400,
		},
		background : {
			default : '#EAE7DC',
		},
		textColor : {
			main: "#e98074",
		},
	},
});

export default theme;