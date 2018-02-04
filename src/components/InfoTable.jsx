import React from 'react';
var faker = require('faker');

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
    render() {
        return (
            <table id="info-table" cellSpacing="0">
                <caption id="info-table-caption">
                    <div id="title-sort"><span>List of Awesome </span>
                    <span> | </span><span id="sort-type"> Sort by: </span>
                    <select>
                        <option defaultValue>Choose here</option>
                        <option value="1">First Name</option>
                        <option value="2">Last Name</option>
                        <option value="3">Country</option>
                        <option value="4">City</option>
                        <option value="5">State</option>
                    </select>
                    </div>
                    <div id="items-per-page"><span>items per page </span>
                    <span>
                    <select>
                        <option defaultValue>Choose here</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                    </select>
                    </span><span> 1-10 of 30 <i className="fa fa-angle-left"></i><i className="fa fa-angle-right"></i></span></div>
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
                {
                this.props.data.map(
                    (row) => {
                    return <TableRow key={row.id} row={row} />;
                    }
                    )
                }
                </tbody>
            </table>
        );
    }
}

class InfoTable extends React.Component {
    render () {
        let userArray = [];
        
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
            userArray.push(newUser);
        }

        return (
            <div>
                <Table data={userArray} />      
            </div>
        );
    }
}

export default InfoTable;