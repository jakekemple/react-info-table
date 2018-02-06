import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import InfoTable from './InfoTable.jsx';
import LandingComponent from './LandingComponent.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.setActiveTab = this.setActiveTab.bind(this);
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
                        <li className="nav-tabs"><Link to="/" id="second-tab" onClick={((e) => this.setActiveTab(e))}>Home</Link></li>
                        <li className="nav-tabs"><Link to="/InfoTable" id="info-table-tab" onClick={((e) => this.setActiveTab(e))}>Info Table</Link></li>
                        <li className="nav-tabs"><Link to="#" id="third-tab" onClick={((e) => this.setActiveTab(e))}>Dead Link</Link></li>
                    </ul>
            
                    <Switch>
                        <Route exact path="/InfoTable" component={InfoTable} />
                        <Route exact path="/" component={LandingComponent} />
                    </Switch>
                    </div>
                </BrowserRouter>
            </nav>  
        );
    }
}

export default App;