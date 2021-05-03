import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ImageDetails from './components/ImageDetails';
import Results from './components/Results';

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
