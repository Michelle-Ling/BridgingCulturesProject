import React from 'react';

class FestivalData extends React.Component{
    constructor(props){ 
    super(props);
    this.state = {
    mytext : '',
    }
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
    export default FestivalData;