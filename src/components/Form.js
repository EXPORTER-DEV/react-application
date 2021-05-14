import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  useHistory,
} from "react-router-dom";

const Button = (props) => {
	let className = "defaultNiceButton";
	if(props.options && props.options.className){
		className += " "+props.options.className;
	}
	return (
		<button className={className} {...props}>{props.children || props.name}</button>
	);
}
const Back = () => {
	const history = useHistory();
	const handleBack = () => {
		history.goBack();
	}
	return (
		<a className="defaultBackButton" onClick={handleBack}>&lt; Назад</a>
	);
}

const Input = (props) => {
	return (
		<div className="form">
			<label htmlFor={"#"+props.id}>{props.name}</label>
			<input className="defaultNiceInput" id={props.id} onClick={props.onClick} onChange={props.onChange} />
		</div>
	);
}

export {
	Button,
	Input,
	Back,
}