import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Results from './Results';
import ImageDetails from './ImageDetails';

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/">
          <Results />
        </Route>
        <Route path="/image/:id">
          <ImageDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
