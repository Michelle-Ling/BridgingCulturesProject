import React, { Component, lazy, Suspense } from 'react';
import comingGraph from "../assets/img/QuizGame.jpeg";
class QuizGame extends Component {
    constructor(props) {
        super(props);
      }
      render() { 
          return(
            <div>
              <img> src = {comingGraph}</img>  
            </div>

          );
      }
    }
    export default QuizGame;
