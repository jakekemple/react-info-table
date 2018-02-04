import React from 'react';

class InfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.generateObjectArray= this.generateObjectArray.bind(this);
      }

    generateObjectArray() {
        var faker = require('faker');
        var a = [];
        
        for(var i=0; i<100; i++) {
            var newUser = { 
                firstname : faker.name.firstName(),
                lastname : faker.name.lastName(),
                country : faker.address.country(),
                address : faker.address.streetName(),
                city : faker.address.city(),
                state : faker.address.state(),
                zip : faker.address.zipCode(),
                phone : faker.phone.phoneNumber()
            };
            a.push(newUser);
        }
        console.log(a);
    }


    render () {
        return (
            // Hardcoded table data
            <div>
                <button onClick={this.generateObjectArray}>Click Me</button>
                <table id="info-table" cellSpacing="0">
                    <caption id="info-table-caption"><span>List of Awesome</span><span>|</span><span id="sort-type">Sort by: [] </span></caption>
                    <thead className="table-header">
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th> 
                            <th>Country</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Phone</th>                       
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-row">
                            <td>Firstname</td>
                            <td>Lastname</td> 
                            <td>Country</td>
                            <td>Address</td>
                            <td>City</td>
                            <td>State</td>
                            <td>Zip</td>
                            <td>Phone</td>                       
                        </tr>
                        <tr className="table-row">
                            <td>Firstname</td>
                            <td>Lastname</td> 
                            <td>Country</td>
                            <td>Address</td>
                            <td>City</td>
                            <td>State</td>
                            <td>Zip</td>
                            <td>Phone</td>                        
                        </tr>
                    </tbody>
                </table>                
            </div>
        );
    }
}

export default InfoTable;