import './App.css';
import Nav from './components/Nav';
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Subject from './components/Subject';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Nav/>
      <Switch>
         <Route path="/" component={Home} exact/>
         <Route path="/login" component={Login} exact/>
         <Route path="/register" component={Register} exact/>
         <Route path="/subject" component={Subject} exact/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
