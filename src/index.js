import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";

import "./main.scss";

import Main from './pages/Main.js';
import Dashboard from './pages/Dashboard.js';
import Chat from './pages/Chat.js';
import YouClicked from './pages/YouClicked.js';

import { Back } from './components/Form.js';

const App = () => {
	const [user, setUser] = React.useState(0);
  	return (
  	  	<Router>
  	  	  	<div>
  	  	  		{user ? <Back /> : null}
  	  	    	<h1>React Example</h1>
  	  	    	<ul>
  	  	    		{!user ? <li>
  	  	    	  	  <Link className="niceLink" to="/">Login Page</Link>
  	  	    	  	</li> : null}
  	  	    	  	<li>
  	  	    	  		<Link className="niceLink" to="/youclicked">You Clicked</Link>
  	  	    	  	</li>
  	  	    	  	<li>
  	  	    	  	  <Link className="niceLink" to="/dashboard">{!user ? <s>Dashboard</s> : "Dashboard"}</Link>
  	  	    	  	</li>
  	  	    	  	{user ? 
  	  	    	  		<>
  	  	    	  			<li>
  	  	    	  				<Link className="niceLink" to="/chat">Chat</Link>
  	  	    	  			</li>
  	  	    	  		</> : null}
  	  	    	</ul>
			
  	  	    	<Switch>
  	  	    		<Route path='/youclicked' children={<YouClicked />}/>
  	  	    		<Route path='/dashboard' children={<Dashboard user={user} setUser={setUser} />}/>
  	  	    		<Route path='/chat' children={<Chat user={user} setUser={setUser} />}/>
  	  	    		<Route exact path="/" children={<Main user={user} setUser={setUser} />} />
  	  	    		{/*<Route path="/:name" children={<Child />} />*/}
  	  	    	  	{/*<Route path="/netflix/:name" children={<Child />} />*/}
  	  	    	</Switch>
  	  	  	</div>
  	  	</Router>
  	);
}

ReactDOM.render(<App />, document.getElementById("root"));