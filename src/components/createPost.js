import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import '@progress/kendo-theme-default/dist/all.css';
import { Editor, EditorTools } from "@progress/kendo-react-editor";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { useState, useEffect } from 'react';
import Menu from '@material-ui/core/Menu';
import { MenuItem } from '@material-ui/core';
import {useHistory} from 'react-router-dom';

// Axios

import axios from 'axios';
import axiosInstance from '../axios';
import { baseurl } from '../axios';

// Theme

import theme from './theme';

const {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignRight,
    AlignCenter,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo,
    Link,
    Unlink,
  } = EditorTools;

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        margin: theme.spacing(15)
    }
    
}))

export default function CreatePost() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [topicName, setTopicName] = useState("Select Topic");
    const [userData, setUserData] = useState(0);
    const [media, setMedia] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const data = new FormData();
  const [formData, setFormData] = useState({});
  const handleClose = (event) => {
    setAnchorEl(null);
    setFormData({
        ...formData,
        id: event.target.id
    });
    // data.set('topicID', event.target.id);
    if (event.target.title == ""){
      setTopicName("Select Topic");
    } else {
      setTopicName(event.target.title);
    }
  };

    
    // const [formData, setFormData] = useState({});
    const [topics, setTopics] = useState([{
        id: 69,
        title: "Loading...",
    }]);

    const onFileChange = (e) => {
        e.preventDefault();
        setMedia({
          "media": e.target.files,
        })
        // data.set('media', e.target.files[0]);
    }

    const onTitleChange = (e) => {
        console.log(e.target.value);
        setFormData({
            ...formData,
            title: e.target.value,
        })
        // data.set('title', e.target.value);
    }

    const onContentChange = (e) => {
        try {
            setFormData({
                ...formData,
                // content: e.value.content.content[0].content.content[0].text
                content : e.value
        
            })
            // data.set('content', e.value.content.content[0].content.content[0].text);
        } catch (e) {
            console.log(e);
            setFormData({
                ...formData,
                content: ""
            })
            // data.set('content', "");
        }
        console.log(e.value.textContent)
        // console.log(e.value)
    }

    useEffect(()=>{
        axiosInstance.get("topic/").then((res)=>{
            console.log(res.data);
            setTopics(res.data);
        })
        axiosInstance.get("viewprofile/").then((res) => {
          console.log(res.data);
          setUserData(res.data);
        })
    }, [setTopics, setUserData]);

    const handleSubmit = (e) => {
      e.preventDefault();
        // for(var key in data.entries()) {
        //     console.log(key + " " + data[key]);
        // }
        console.log(formData);
        let data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('topicID', parseInt(formData.id));
        data.append('author', parseInt(userData.id));
        data.append('media', media.media[0]);
        const config = { headers: { 'Content-Type' : 'multipart/form-data', Authorization : localStorage.getItem('access_token') ?
        'JWT ' + localStorage.getItem('access_token') : 
            'null' } };
        axiosInstance.post('thread/', data).then((res) => {
          console.log(res.data);
          history.push("/");
        }).catch((err) => {
          console.log(err);
        })
    }
    
    const history = useHistory();

  return (
    <React.Fragment>
        <ThemeProvider theme={ theme }>
            <CssBaseline />
        <Paper className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Create Thread
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="given-name"
            onChange={onTitleChange}
          />
        </Grid>
        <Grid item xs={12}>
            <div className="app">
              <Editor
                tools={[
                [Bold, Italic, Underline],
                [Undo, Redo],
                [Link, Unlink],
                [AlignLeft, AlignCenter, AlignRight],
                [OrderedList, UnorderedList, Indent, Outdent],
                ]}
                contentStyle={{ height: 320, backgroundColor: '#ffffff'}}
                defaultContent="Use shift-enter for new line :)"
                onChange={onContentChange}
                  />
            </div>
        </Grid>
        <Grid item xs={12} sm={6}>
            <input id="media" name="media" type="file" onChange={onFileChange} />
        </Grid>
        <Grid>
            <Button aria-controls="simple-menu" variant="outline" aria-haspopup="true" onClick={handleClick} style={{ color: "#e85a4f" }}>
                { topicName }
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                {topics.map((topic) => (
                    <MenuItem onClick={handleClose} id={topic.id} title={topic.title}>{topic.title}</MenuItem>
                ))}
            </Menu>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
          <Button style={{color:"#e85a4f"}}
            endIcon={<SendIcon />}
            onClick={handleSubmit}
          >Post</Button>
      </Grid>
      </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
}