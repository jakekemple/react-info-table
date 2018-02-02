import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import InfoTable from './InfoTable.jsx';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={InfoTable} />
            <Route exact path="/Awesome" component={AwesomeComponent} />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;