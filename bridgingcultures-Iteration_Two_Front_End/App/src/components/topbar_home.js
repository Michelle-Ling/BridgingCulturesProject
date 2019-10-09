import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
import { Navbar, NavItem, Dropdown, Divider, Modal, Button, Icon, Row, Col } from 'react-materialize';


import LogoHeader from "./logo_header.png";
import ls from 'local-storage';



class Topbar extends React.Component {
    constructor(props) {
        super(props);

        let wishlist = ls('wishlist');
        this.state = {
            added: wishlist && [...wishlist] || []

        }


    }

    render() {
        function updateState(item) {
            this.setState({ added: [...item] })
        }
        console.log(this.state)
        return (

            <Navbar brand={<Link to="/"><a className='brand-logo-link' style={{ paddingLeft: '10px', textDecorationLine: 'none' }}> <img style={{ paddingLeft: '10px', width: '35px', height: '35px ' }} src={LogoHeader} />Bridging Cultures</a ></Link>} alignLinks="right">

                {/*<NavItem><select id="gg_translate_drop_topbar_home"  style={{display:'block'}}><option value="">Select Language</option><option value="en|ar">Arabic</option><option value="en|zh-CN">Chinese (Simplified)</option><option value="en|en">English</option><option value="en|hi">Hindi</option><option value="en|ms">Malay</option><option value="en|es">Spanish</option><option value="en|ta">Tamil</option></select></NavItem>*/}
                <Modal header="Wishlist" trigger={
                    <Button
                        waves="light" style={{ marginRight: '10px', marginTop: '10px', marginBottom: '10px' }}


                    >
                        Wishlist
                </Button>
                }>
                    <Row >


                        {this.state.added && this.state.added.map((e, i) => {

                            return (
                                <Col>
                                    <div key={i}>{e.title}
                                        <div key={i}>{e.description}</div>

                                    </div>
                                </Col>

                            )
                        })}

                        <Button

                            onClick={() => {
                                ls.clear();
                                this.setState({ added: [] })
                            }}
                        >
                            Clear Wishlist
                        </Button>

                    </Row>
                </Modal>
            </Navbar>




        );



    }
}

export default Topbar;


