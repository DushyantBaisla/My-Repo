// import logo from './logo.svg';
// import './App.css';
import Movie from './Components/movie'
import Home from './Components/Home'
import Nav from './Components/nav'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/movies' component={Movie} />
      </Switch>
    </Router>
  );
}

export default App;
