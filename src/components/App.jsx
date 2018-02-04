import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import InfoTable from './InfoTable.jsx';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setActiveTab= this.setActiveTab.bind(this);
    }

    setActiveTab(tab) {
        var activeTab = document.getElementsByClassName("active");
        while (activeTab.length) {
            activeTab[0].classList.remove("active");
        }
        var currentElement = document.getElementById(tab.target.closest('a').id);
        currentElement.classList.add("active");
    }

    render() {
        return (
            <nav id="navbar">
                <BrowserRouter>
                    <div>
                    <ul>
                        <li className="nav-tabs"><Link to="/" id="info-table-tab" onClick={((e) => this.setActiveTab(e))}>Info Table</Link></li>
                        <li className="nav-tabs"><Link to="/Awesome" id="second-tab" onClick={((e) => this.setActiveTab(e))}>Test Link</Link></li>
                        <li className="nav-tabs"><Link to="#" id="third-tab" onClick={((e) => this.setActiveTab(e))}>Dead Link</Link></li>
                    </ul>
            
                    <Switch>
                        <Route exact path="/" component={InfoTable} />
                        <Route exact path="/Awesome" component={AwesomeComponent} />
                    </Switch>
                    </div>
                </BrowserRouter>
            </nav>  
        );
    }
}

export default App;