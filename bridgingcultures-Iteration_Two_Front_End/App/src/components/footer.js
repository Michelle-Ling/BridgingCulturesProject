import React from 'react';
import '../css/style.css';

const Footer = (props) => {

    return (
        <footer className="page-footer teal">
            
            <div className="footer-copyright">
                <div className="container">
                    <i className="material-icons left">copyright</i>  2019 Copyright
            <a className="grey-text text-lighten-4 right" >developed by Elites - Monash University B1</a>
                </div>
            </div>
        </footer>

    );
}

export default Footer;