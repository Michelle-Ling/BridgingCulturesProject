// Packages to be imported
import React, { Component, lazy, Suspense } from 'react';
import comingGraph from "../assets/img/QuizGame.jpeg";
// QuizGame implementation for later iteration
class QuizGame extends Component {
    constructor(props) {
        super(props);
      } 
      render() { 
          return(
            <div class="text-center">
            <img src={comingGraph} class="img-fluid" alt="Responsive image"></img>
            </div>
              
            
          );
      }
    }
    export default QuizGame;
