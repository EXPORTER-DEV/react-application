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

export default function Main(props){
	let params = useParams();
	if(props.user){
		return (<Redirect to="/dashboard" />);
	}
	const [name, setName] = React.useState('');

	const login = () => {
		if(!name || name.replace(/\s/gi, "").toLowerCase() == "root"){
			document.getElementById("name").classList.add("error");
			return;
		}
		props.setUser({name: name});
		setName('');
	}

	return (
		<>
	 		<h1>Main Page</h1>
	 		<Input name="Please, enter your name:" id="name" onChange={(e) => {e.target.classList.remove("error"); setName(e.target.value)}}/>
	 		<div><Button name="Login" onClick={login}/></div>
	 	</>
	);
}