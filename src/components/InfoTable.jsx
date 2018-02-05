import React from 'react';
var faker = require('faker');

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsPerPage: 10,
        }
    }

    render() {

        return (
            <div id="items-per-page">
                <span>Items per page:</span>
                <span id="items-per-page-dropdown">
                    <select>
                        <option defaultValue value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </span>
                <span> 
                    1-10 of 30 <i className="page-arrows fa fa-angle-left"></i><i className="page-arrows fa fa-angle-right"></i>
                </span>
            </div>
        );
    }

}

class ColumnSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'First Name',
            data: this.props.data,
            selectedOption: 'First Name'
        };
        this.sortByProperty = this.sortByProperty.bind(this);
        this.sortOptionsUpdate = this.sortOptionsUpdate.bind(this);
        
    }

    sortByProperty(property, reverse) {
        if (!property){ property = 'First Name';}
        if (typeof reverse === 'undefined') {reverse = false;}

        return function(a, b) {
            if (!reverse) {
                if (a[property] < b[property])
                    return -1;
                if (a[property] > b[property])
                    return 1;
                return 0;
            }
    
            if (a[property] < b[property])
                return 1;
            if (a[property] > b[property])
                return -1;
            return 0;
        }
    }

    sortOptionsUpdate(property, reverse){
        this.setState({selectedOption: property});
        this.sortByProperty(property, reverse);
        this.props.callbackFromParent(this.state.data);
    }

        render() {
            return (
                <div id="title-sort"><span>List of Awesome </span><span> | </span>
                    <span id="sort-type"> Sort by: </span>
                    <select value={this.state.selectedOption} 
                            onChange={(selectedOption) => {console.log(selectedOption.target.value);this.setState({ data: this.state.data.sort(this.sortOptionsUpdate(selectedOption.target.value))})}}>
                        <option value="First Name">First Name</option>
                        <option value="Last Name">Last Name</option>
                        <option value="Country">Country</option>
                        <option value="Address">Address</option>
                        <option value="City">City</option>
                        <option value="State">State</option>
                        <option value="Zip">Zip</option>
                        <option value="Phone">Phone</option>
                    </select>
                </div>
            );
        }
}

class TableRow extends React.Component {
    render() {
        return (
            <tr className="table-row">
                <td key={this.props.row.firstname}>{this.props.row.firstname}</td>
                <td key={this.props.row.lastname}>{this.props.row.lastname}</td>
                <td key={this.props.row.country}>{this.props.row.country}</td>
                <td key={this.props.row.address}>{this.props.row.address}</td>
                <td key={this.props.row.city}>{this.props.row.city}</td>
                <td key={this.props.row.state}>{this.props.row.state}</td>
                <td key={this.props.row.zip}>{this.props.row.zip}</td>
                <td key={this.props.row.phone}>{this.props.row.phone}</td>
            </tr>
        );
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };    
    };

    myCallback = (dataFromChild) => {
        this.setState({ data: dataFromChild });
    };

    render() {
        return (
            <table id="info-table" cellSpacing="0">
                <caption id="info-table-caption">
                    <ColumnSort data={this.state.data} callbackFromParent={this.myCallback} />
                    <Pagination data={this.state.data} />
                </caption>
                <thead className="table-header">
                    <tr>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th> 
                        <th scope="col">Country</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Zip</th>
                        <th scope="col">Phone</th>                       
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(
                        (row) => {
                            return <TableRow key={row.id} row={row} />;
                        }
                    )}
                </tbody>
            </table>
        );
    }
}

class InfoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
        }
    }

    render () {
        
        for(var i=0; i<100; i++) {
            var newUser = { 
                id: i,
                firstname : faker.name.firstName(),
                lastname : faker.name.lastName(),
                country : faker.address.country(),
                address : faker.address.streetName(),
                city : faker.address.city(),
                state : faker.address.state(),
                zip : faker.address.zipCode(),
                phone : faker.phone.phoneNumber()
            };
            this.state.userArray.push(newUser);
        }

        return (
            <div>
                <Table data={this.state.userArray} />      
            </div>
        );
    }
}

export default InfoTable;