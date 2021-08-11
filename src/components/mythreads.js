import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import theme from './theme';
import { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axiosInstance from '../axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(2),
    color: '#1e1e1e'
  }
}));

export default function MyThreads() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [myThreads, setMyThreads] = useState([{
    title: "Loading...",
    postedAt: "2021-07-09",
    content: "Harman new thread for testing",
    upvotes: 100,
    media: "##",
    author: 4,
    expanded: false,
  }]);

  useEffect(()=>{
    axiosInstance.get("mythreads/").then((res)=>{
      console.log(res.data);
      setMyThreads(res.data);
      console.log(myThreads);
    });
    }, [setMyThreads]);
  
  const [username, setUsername] = useState("username")
  useEffect(()=>{
    axiosInstance.get("viewprofile/").then((res)=>{
      setUsername(res.data.username);
    });
  }, [setUsername]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  console.log(myThreads);
  return (
	<ThemeProvider theme={theme}>
	<CssBaseline/>
  <Paper className={classes.paper}>
    <Grid container scrollable spacing={2}>
    {myThreads.map((thread)=>{
      return (
      <Grid item xs={3}>
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {username[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title="Shrimp and Chorizo Paella"
        title = {thread.title}
        
        // subheader="September 14, 2016"
        subheader = {thread.postedAt.substr(0, 10)}
      />
      <CardMedia
        className={classes.media}
        image={thread.media}
        title={thread.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {thread.content.substr(0, 50) + "...  "}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{thread.content}</Typography>
          {/* <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
    );})}
    </Grid>
    </Paper>
	</ThemeProvider>
  );
}
