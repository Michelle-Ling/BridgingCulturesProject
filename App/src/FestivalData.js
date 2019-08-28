import React from 'react';

export class FestivalData extends React.Component{
    constructor(props){ 
    super(props);
    this.state = {
    mytext : [ // initial event data
        { title: 'Event Now', start: new Date() },
        { title: 'Help me', start: new Date("2019-08-29") }
      ],
    }
    this.mycontent = [ // initial event data
        { title: 'Event Now', start: new Date() },
        { title: 'Help me', start: new Date("2019-08-29") }
      ]
}
    getData(){ 
        fetch(`http://127.0.0.1:8081/json`,{
        method: 'GET'
        }).then(res => res.json()).then(
        data => {
        this.setState({mytext:data})
        }
        )
        }
        
        componentWillMount(){
            this.getData();
        }
        
        
        render(){
        
        return(
        <div>
            
        </div>
        );
        }
    }