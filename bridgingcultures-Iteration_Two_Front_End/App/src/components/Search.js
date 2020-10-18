import React, { Component } from 'react';
import ReactSearchBox from 'react-search-box';

export default class Search extends Component {

    data = [
        {
            key: 'austra',
            value: 'Australia',
        },
        {
            key: 'uk',
            value: 'United Kingdom',
        },
        {
            key: 'new zeleand',
            value: 'New Zeland',
        },
        {
            key: 'Chin',
            value: 'Chinese',
        },
        {
            key: 'Indi',
            value: 'Indian',
        },
    ]

    render() {
        return (
            <ReactSearchBox
                placeholder="Discover a Culture"
                value="Doe"
                data={this.data}
                callback={record => console.log(record)}
            />
        )
    }      
        

};
