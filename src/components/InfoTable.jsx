import React from 'react';

class InfoTable extends React.Component {
    render () {
        return (
            // Hardcoded table data
            <div>
                <h1>List of Awesome | Sort by: [] </h1>
                <table>
                <tbody>
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
                    <tr>
                        <th>Firstname2</th>
                        <th>Lastname2</th> 
                        <th>Country2</th>
                        <th>Address2</th>
                        <th>City2</th>
                        <th>State2</th>
                        <th>Zip2</th>
                        <th>Phone2</th>                       
                    </tr>
                    </tbody>
                </table>                
            </div>
        );
    }
}

export default InfoTable;