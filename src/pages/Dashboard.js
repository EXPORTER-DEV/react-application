import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button, Input } from './../components/Form.js';

export default function Dashboard(props){
	if(!props.user){
		return (<Redirect to="/" />);
	}
	return (
	 	<>
	 		<h1>Hello, {props.user.name}!</h1>
	 		<div><Button name="Logout" options={{"className": "red"}} onClick={() => props.setUser(0)}/></div>
	 	</>
	);
}