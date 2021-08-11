import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Header from './components/header';
import Footer from './components/footer';
import FeedView from './components/feed';
import MyThreads from './components/mythreads';
import UserProfile from './components/profile';
import ViewThread from './components/singlepost';
import CreatePost from './components/createPost';

const routing = ( 
  <Router>
    <React.StrictMode>
      <Header/>
      <Switch>
        <Route exact path = '/login' component = {Login}/>
        <Route exact path = '/register' component = {Register}/>
        <Route exact path = '/' component = {FeedView}/>
        <Route exact path = '/single/:id' component = {ViewThread}/>
        <Route exact path = '/myprofile/' component = {UserProfile}/>
        <Route exact path = '/mythreads/' component = {MyThreads}/>
        <Route exact path = '/createthread/' component = {CreatePost} />
      </Switch>
      <Footer/>
    </React.StrictMode>
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
