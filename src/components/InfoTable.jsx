import React from 'react';
var faker = require('faker');

// Class containing pagination and sorting functions
class TableFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            selectedOption: 'firstname',
            itemsPerPage: 5,
            firstdisplayedRow: 0,
            lastdisplayedRow: 5, 
            reverse: false, // boolean to toggle the column sort upon header click
        };
        this.sortByProperty = this.sortByProperty.bind(this);
        this.sortOptionsUpdate = this.sortOptionsUpdate.bind(this);   
        this.originalTableData = this.props.tableData;
        this.previousResults = this.previousResults.bind(this);
        this.nextResults = this.nextResults.bind(this);
    }

    // --- SORTING ---

    // Function to sort by chosen column. 
    sortByProperty(property, reverse) {
        // Set property to default of firstname if undefined
        if (!property | property === 'undefined'){ 
            property = "firstname";
        }
        // Set reverse boolean if undefined
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
            else{    
                if (a[property] < b[property]){
                    return 1;
                }
                if (a[property] > b[property]){
                    return -1;
                }
                return 0;
            }
        }
    }

    // Is called from sort dropdown or column header.
    // Here we update the state with our selected property from the first param.
    // 'fromHeader' tells us if the function was invoked from a column header.
    sortOptionsUpdate(property, reverse, fromHeader){
        this.setState({selectedOption: property});
        this.state.tableData.sort(this.sortByProperty(property, this.state.reverse));
        if (fromHeader) { this.setState({ reverse: !this.state.reverse }); }
        this.props.callbackFromTable(this.state.tableData, this.state.reverse);
    }

    // --- SORTING END ---


    // --- PAGINATION ---

    updateItemsPerPage(selectedItemsPerPage) {
        this.setState({itemsPerPage: selectedItemsPerPage});   
        this.state.tableData = this.originalTableData.slice(0, selectedItemsPerPage);
        this.setState({firstdisplayedRow: 0});
        this.setState({lastdisplayedRow: selectedItemsPerPage});
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

    // --- PAGINATION END ---

    render() {
        return (
            <div>
                <div id="title-sort"><span>List of Awesome </span><span id="separation-pipe"> | </span>
                    <span id="sort-type"> Sort by: </span>
                    <select value={this.state.selectedOption} 
                            onChange={(event) => {this.sortOptionsUpdate(event.target.value, false, false)}}>
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
                        {this.state.firstdisplayedRow + 1}-{this.state.lastdisplayedRow} of {this.originalTableData.length} 
                        <i onClick={() => {this.previousResults(this.state.itemsPerPage)}} className="page-arrows fa fa-angle-left"></i>
                        <i onClick={() => {this.nextResults(this.state.itemsPerPage)}} className="page-arrows fa fa-angle-right"></i>
                    </span>
                </div>
            </div>
        );
    }
}

class TableRow extends React.Component {
    render() {
        return (
            <tr className="table-row">
                <td >{this.props.row.firstname}</td>
                <td >{this.props.row.lastname}</td>
                <td >{this.props.row.country}</td>
                <td >{this.props.row.address}</td>
                <td >{this.props.row.city}</td>
                <td >{this.props.row.state}</td>
                <td >{this.props.row.zip}</td>
                <td >{this.props.row.phone}</td>
            </tr>
        );
    }
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            reverse: false,
            fromHeader: true,
        };    
    };

    tableFiltersCallback = (updatedTableData, updatedReverse) => {
        this.setState({ tableData: updatedTableData });
        this.setState({ reverse: updatedReverse });
    };

    componentDidMount() {
        this.tableFilters.updateItemsPerPage(5);
    }

    render() {
        return (
            <table id="info-table" cellSpacing="0">
                <caption id="info-table-caption">
                    <TableFilters ref={(cd) => this.tableFilters = cd} tableData={this.state.tableData} callbackFromTable={this.tableFiltersCallback} />
                </caption>
                <thead className="table-header">
                    <tr>
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="firstname" scope="col">Firstname</th>
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="lastname" scope="col">Lastname</th> 
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="country" scope="col">Country</th>
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="address" scope="col">Address</th>
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="city" scope="col">City</th>
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="state" scope="col">State</th>
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="zip" scope="col">Zip</th>
                        <th onClick={(event) => {this.tableFilters.sortOptionsUpdate(event.target.id, this.state.reverse, this.state.fromHeader)}} id="phone" scope="col">Phone</th>                       
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

        // This is where our ajax called would occur to populate userArray. Insead we are using faker.js to populate a test array.
        
        // loadUserArray() {
        //     $.ajax({
        //       url: 'http://sample-rest-url.com/getUserArray',
        //       dataType: 'json',
        //       success: function(data) {
        //         this.setState({this.state.userArray: data});
        //       }.bind(this),
        //       error: function(xhr, status, err) {
        //         console.error('http://sample-rest-url.com/getUserArray', status, err.toString());
        //       }.bind(this)
        //     });
        // }
        
        // Generate faker data to fill object array of arbitrary users
        if (this.state.userArray[0] === undefined || this.state.userArray.length === 0) {
            for(var i=0; i<500; i++) { // Set 500 user objects in our test userArray
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