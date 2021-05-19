import './App.css';
import Nav from './components/Nav';
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Subject from './components/Subject';
import Chapter from './components/Chapter'
import NoMatch from './components/NoMatch'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <div>
      <ErrorBoundary>
        <BrowserRouter>
          <Nav/>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <Route path="/subject/:course_id" component={Subject} exact/>
            <Route path="/chapter/:subject_id" component={Chapter} exact/>
            <Route component={NoMatch}/>
          </Switch>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
