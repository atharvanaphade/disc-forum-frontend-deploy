import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// Axios

import axiosInstance from '../axios';

const categories = [
  {
    id: 'Navigate',
    children: [
      { id: 'Home', icon: <HomeIcon />, active: true, to: '/' },
      { id: 'Create Threads', icon: <CreateIcon />, to: '/createthread' },
      { id: 'My Threads', icon: <DescriptionIcon />, to: '/mythreads' },
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: '#e98074',
    },
  },
  itemCategory: {
    backgroundColor: '#e85a4f',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#e98074',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const { classes, ...other } = props;
  const history = useHistory();

  const [user, setUser] = useState({
    username: "Loading..",
    organisation: "Loading...",
  });

  useEffect(() => {
    axiosInstance.get('viewprofile/').then((res) => {
      setUser(res.data);
    })
  }, [setUser])

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          {user.organisation}
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            {user.username}
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, to }) => (
				<ListItem onClick={()=>history.push(to)}
					key={childId}
					button
					className={clsx(classes.item, active && classes.itemActiveItem)}
				>
					<ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
					<ListItemText
					classes={{
						primary: classes.itemPrimary,
					}}
					>
					{childId}
					</ListItemText>
				</ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);