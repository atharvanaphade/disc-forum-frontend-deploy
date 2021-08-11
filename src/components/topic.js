import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import Container from '@material-ui/core/Container';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    primary: "#e98074",
  },
  topicTable: {
    backgroundColor: "#d8c3a5",
    primary: "#e98074"
  },
});


function Row(props) {
  const { id, post } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const history = useHistory();
  console.log(post);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: "#E85A4F" }} component="th" scope="row">
          {post.title}
        </TableCell>
        <TableCell style={{ color: "#E85A4F" }} align="right">{post.topic}</TableCell>
        <TableCell style={{ color: "#E85A4F" }} align="right">{post.upvotes}</TableCell>
        <TableCell style={{ color: "#E85A4F" }} align="right">{post.author}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                  <Typography variant="h8" gutterBottom component="div">
                    {post.content.toString().substr(0, 100)+"..."}                    
                  </Typography>
                <Button
                align="right"
                onClick={() => {history.push("/single/" + post.id)}}>
                  <LinkIcon />
                </Button>                
              </Box>
            </Collapse>
        </TableCell>
    </TableRow>
  </React.Fragment>
);
}



export default function TopicTable(props) {
  const classes = useRowStyles();
	console.log(props);
	const posts = props.posts
  return (
    <TableContainer component={Paper} className={classes.topicTable}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell> {/*Lates post*/}
            <TableCell align="right">Topic</TableCell>
            <TableCell align="right">Upvotes</TableCell>
            <TableCell align="right">Author</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.data.map((post) => (
            <Row key={post.id} post={post} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}