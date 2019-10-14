import React from 'react';
import '../css/style.css';
import '../css/materialize.css';
import '../css/materialize.min.css';
import { Parallax, Card, CardTitle, Row, Col, Caption } from 'react-materialize';
import { Link } from "react-router-dom";

class Notfound extends React.Component {
    state = {
      today_content: {"resource": []}
    }
    componentDidMount() {
    }

    render() {
        return (                                

            <div className="get_lost">
              <div className="get_lost_inner">
                <h2> Sorry no contents available! Got lost?</h2>
                <Link to={{ pathname: "/" }}  >Back to home</Link>
              </div>
            </div>
        );

    }

}

export default Notfound;