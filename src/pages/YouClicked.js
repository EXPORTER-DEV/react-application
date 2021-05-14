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

export default function YouClicked(props){
	const [times, setTimes] = React.useState(0);
	return (
	 	<>
	 		<h1>You Clicked for {times} {times !== 1 ? "times" : "time"}!</h1>
	 		<div><Button name="Click me!" onClick={() =>setTimes((p) => {return p+1;})}/><Button name="Clear" options={{className: "red"}} onClick={() => setTimes(0)}/></div>
	 	</>
	);
}