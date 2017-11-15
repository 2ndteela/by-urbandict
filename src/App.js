import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Home from './comps/home/index'
import Search from './comps/search/index'
import AddNew from './comps/new-word/index'
import Top from './comps/top/index'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/search/:word' component={Search} />
          <Route exact path='/search/' component={Search} />
          <Route path='/new' component={AddNew} />
          <Route path='/top' component ={Top} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
