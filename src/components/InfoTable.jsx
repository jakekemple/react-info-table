import React from 'react';
var faker = require('faker');

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsPerPage: 5,
            pageIncrementer: 0,
            tableData: this.props.tableData,
            firstdisplayedRow: 0, //itemsPerPage unless itemsPerPage is 5
            lastdisplayedRow: 5, //pageIncrementer + itemsPerPage
        }
        this.originalTableData = this.props.tableData;
        this.previousResults = this.previousResults.bind(this);
        this.nextResults = this.nextResults.bind(this);
    }

    updateItemsPerPage(selectedItemsPerPage) {
        this.setState({itemsPerPage: selectedItemsPerPage});   
        this.state.tableData = this.originalTableData.slice(0, selectedItemsPerPage);
        this.setState({firstdisplayedRow: 0});
        this.setState({lastdisplayedRow: selectedItemsPerPage});
        this.setState({tableData: this.originalTableData.slice(0, selectedItemsPerPage)})
        this.props.callbackFromTable(this.state.tableData);
    }

    previousResults() {
        if(this.state.firstdisplayedRow != 0) {
            this.state.firstdisplayedRow = this.state.firstdisplayedRow - this.state.itemsPerPage;
            this.state.lastdisplayedRow = this.state.lastdisplayedRow - this.state.itemsPerPage;
            this.state.tableData = this.originalTableData.slice(this.state.firstdisplayedRow, this.state.lastdisplayedRow);
            this.props.callbackFromTable(this.state.tableData);
        }
    }

    nextResults(selectedItemsPerPage) {
        if(this.state.lastdisplayedRow < this.originalTableData.length) {
            this.state.firstdisplayedRow = this.state.firstdisplayedRow + this.state.itemsPerPage;
            this.state.lastdisplayedRow = this.state.lastdisplayedRow + this.state.itemsPerPage;
            this.state.tableData = this.originalTableData.slice(this.state.firstdisplayedRow, this.state.lastdisplayedRow);
            this.props.callbackFromTable(this.state.tableData);
        }
    }

    render() {
        return (
            <div id="items-per-page">
                <span>Items per page:</span>
                <span id="items-per-page-dropdown">
                    <select value={this.state.itemsPerPage} 
                            onChange={(event) => {this.updateItemsPerPage(parseInt(event.target.value))}}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </span>
                <span> 
                    1-10 of 30 <i onClick={() => {this.previousResults(this.state.itemsPerPage)}} className="page-arrows fa fa-angle-left"></i><i onClick={() => {this.nextResults(this.state.itemsPerPage)}} className="page-arrows fa fa-angle-right"></i>
                </span>
            </div>
        );
    }
}

class ColumnSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            selectedOption: 'firstname'
        };
        this.sortByProperty = this.sortByProperty.bind(this);
        this.sortOptionsUpdate = this.sortOptionsUpdate.bind(this);
        
    }

    sortByProperty(property) {
        let reverse = false;
        if (!property | property === 'undefined'){ 
            property = "firstname";
        }
        if (typeof reverse === 'undefined') {
            reverse = false;
        }

        return function(a, b) {
            if (!reverse) {
                if (a[property] < b[property]){
                    return -1;
                }
                if (a[property] > b[property]){
                    return 1;
                }
                return 0;
            }
    
            if (a[property] < b[property]){
                return 1;
            }
            if (a[property] > b[property]){
                return -1;
            }
            return 0;
        }
    }

    sortOptionsUpdate(property){
        this.setState({selectedOption: property});
        this.state.tableData.sort(this.sortByProperty(property));
        this.props.callbackFromTable(this.state.tableData);
    }

    render() {
        return (
            <div id="title-sort"><span>List of Awesome </span><span> | </span>
                <span id="sort-type"> Sort by: </span>
                <select value={this.state.selectedOption} 
                        onChange={(event) => {this.sortOptionsUpdate(event.target.value)}}>
                    <option value="firstname">First Name</option>
                    <option value="lastname">Last Name</option>
                    <option value="country">Country</option>
                    <option value="address">Address</option>
                    <option value="city">City</option>
                    <option value="state">State</option>
                    <option value="zip">Zip</option>
                    <option value="phone">Phone</option>
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
            tableData: this.props.tableData
        };    
    };

    columnSortCallback = (updatedTableData) => {
        this.setState({ tableData: updatedTableData });
    };

    paginationCallback = (updatedTableData) => {
        this.setState({ tableData: updatedTableData });
    };

    componentDidMount() {
        this.columnSort.sortOptionsUpdate();
        this.pagination.updateItemsPerPage(5);
    }

    render() {
        return (
            <table id="info-table" cellSpacing="0">
                <caption id="info-table-caption">
                    <ColumnSort ref={(cd) => this.columnSort = cd} tableData={this.state.tableData} callbackFromTable={this.columnSortCallback} />
                    <Pagination ref={(cd) => this.pagination = cd} tableData={this.state.tableData} callbackFromTable={this.paginationCallback} />
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
                    {this.state.tableData.map(
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

        if (this.state.userArray[0] === undefined || this.state.userArray.length === 0) {
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
        }   

        return (
            <div>
                <Table tableData={this.state.userArray} />      
            </div>
        );
    }
}

export default InfoTable;