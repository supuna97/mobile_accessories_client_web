/*!

=========================================================
* Now UI PlaceOrder React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
import 'assets/css/custom/search.css';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Table,
    Button,
    Label,
    FormGroup,
    Input,
    UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { useLocation } from "react-router-dom";

const PlaceOrder  = () => {

    const location = useLocation();

    const [total, setTotal] = useState(parseInt(location.state.price));

    const onSelect = (val) => {
        console.log(val.target.value)
        setTotal(parseInt(location.state.price)* parseInt(val.target.value))
    }

        return (
            <>
                <PanelHeader size="sm"/>
                <div className= "container">
                    <br/><br/>

                    <div className="row">
                        <div className="col-md-6" style={{textAlign: "center"}}>
                            <img src='https://www.linkpicture.com/q/2017.png' className='img-fluid rounded' alt='' />
                        </div>
                        <div className="col-md-6">
                            <br/><br/><br/>
                            <text style={{color:"black", fontSize:"18px", fontWeight:"bold"}}>{location.state.name}</text>
                            <br/><br/>
                            <text style={{color:"black", fontSize:"18px", fontWeight:"bold"}}>Description :  The iPhone 13 Pro is Apple's smaller premium iPhone with a 6.1" screen size and for the first time in an iPhone, it comes with a 120Hz ProMotion display for super smooth scrolling. The list of innovations includes a more capable triple camera setup, with a wide, ultra-wide and zoom cameras, as well as a LiDAR scanner.</text>
                            <br/><br/>
                            <text  style={{color:"black", fontSize:"18px", fontWeight:"bold"}}>Available stock : {location.state.qty}</text>
                            <br/><br/>
                            <text  style={{color:"black", fontSize:"18px", fontWeight:"bold"}}>Select Quantity : </text>
                            <select style={{width: "60px"}} onChange={onSelect}>
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <br/><br/>
                            <text  style={{color:"black", fontSize:"18px", fontWeight:"bold"}}>Total Price : RS {total}</text>
                            <br/>
                            <Button>Place Order</Button>
                        </div>

                    </div>
                </div>
            </>
        );
    // }
}

export default PlaceOrder;
