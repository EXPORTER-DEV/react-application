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

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const randomString = (length) => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      	result.push(characters.charAt(randomInteger(0, charactersLength)));
   	}
   return result.join('');
}

const Message = (props) => {
	const date = new Date(props.timestamp);
	const time = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' in '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	return (
		<div className={"message"+(props.from == "me" ? " my" : "")}>
			<div className="text">{props.message}</div>
			<div className="username">by <span>{props.username}</span></div> — <div className="time">{time}</div>
		</div>
	);
}

export default function Chat(props){
	if(!props.user){
		return (<Redirect to="/" />);
	}

	const [messages, updateMessages] = React.useReducer((state, action) => {
		if(action.type == 'newMessage'){
			return [...state, {username: action.username, timestamp: Date.now(), message: action.message, from: action.from, id: randomString(16)}];
		}
		if(action.type == 'clear'){
			return [];
		}
	}, []);

	const [message, setMessage] = React.useState('');

	const generateMessage = () => {
		const words = ["Hello", "Are", "Happy", "May", "You", "Go", "The Weather", "Is Sunny", "Deal", "Walk", "Sell"];

		let message = "";

		for(let i = 0; i < 4; i++){
			message+=(i > 0 ? " ": "")+words[randomInteger(0, words.length - 1)];
		}
		updateMessages({type: 'newMessage', 'username': 'root', message: message, from: 'server'});
	}

	const sendMessage = () => {
		if(message){
			updateMessages({type: 'newMessage', 'username': props.user.name, message: message, from: 'me'});
			document.getElementById("message").value = "";
			setMessage("");
		}else{
			document.getElementById("message").classList.add('error');
		}
	}

	React.useEffect(() => {
		const interval = setInterval(() => generateMessage(), 1500);
		onScroll(document.getElementById("chat").getElementsByClassName("list")[0]);
		return () => {
			clearInterval(interval);
		}
	}, []);

	React.useEffect(() => {
		const element = document.getElementById("chat").getElementsByClassName("list")[0];
		if(element.scrollHeight - element.offsetHeight > 0 && scrollValue < 100){
			element.scroll({ top: element.scrollHeight - element.offsetHeight, behavior: 'smooth' });
		}
	}, [messages]);

	const onScroll = (target) => {
		if(target){
			setScrollValue(target.scrollHeight - target.scrollTop - target.offsetHeight);
		}
	}
	const [scrollValue, setScrollValue] = React.useState(0);

	return (
	 	<>
	 		<h1>Chat</h1>
	 		<div id="chat">
				<div className="list" onScroll={(e) => onScroll(e.target)}>
					{messages.map((item) => {
						return <Message {...item} key={item.id.toString()}/> 
					})}
				</div>
				<div className="input">
					<Input name="Message" id="message" onClick={(e) => {e.target.classList.remove('error');}} onChange={(e) => {e.target.classList.remove('error'); setMessage(e.target.value)}}/>
					<Button onClick={sendMessage}>Send</Button>
					<Button options={{className: "red right"}} onClick={() => {updateMessages({type: "clear"});}}>Clear</Button>
				</div>
			</div>
	 	</>
	);
}