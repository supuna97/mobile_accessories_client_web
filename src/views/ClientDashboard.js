/*!

=========================================================
* Now UI CustomerDashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import 'assets/css/custom/search.css';

// reactstrap components
import {
    Button,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {Link} from "react-router-dom";

class CustomerDashboard extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/v1/product_list')
            .then(response => response.json())
            .then(json => this.setState({ products: json.data }));
    }

    render() {

        return (
            <>
                <div style={{background: "darkorange", height: "100px"}}>
                    <br/>
                    <text style={{fontSize: "30px", fontWeight: "bold" , color: "white", marginLeft: "20px"}}>TechMart</text>
                    <div style={{marginLeft: "1300px", marginTop: "-50px"}}>
                        <Link to="/login"><Button  color="primary">Login</Button></Link>
                        <Link to="/register"><Button color="secondary">Register</Button></Link>
                    </div>
                </div>
                <div className= "container">
                    <br/><br/>
                    <form className="example" action="/">
                        <div className="row">
                            <div className="col-md-10">
                                <input type="text" placeholder="Search..." name="search"></input>
                            </div>
                            <div className="col-md-2" style={{marginTop: "-10px"}}>
                                <Button type="submit"><i className="fa fa-search"></i></Button>
                            </div>
                        </div>
                    </form>
                    <br/>
                    <div className="row">
                        {this.state.products.length == 0
                            ? 'Loading products...'
                            : this.state.products.map(products => (
                            <div className="col-md-3" style={{textAlign: "center", color:"black"}}>
                                <img src='https://www.linkpicture.com/q/2017.png' className='img-fluid rounded' alt='' />
                                <text>{products.name}</text>
                                <br/>
                                <text>Available stock  {products.qty}</text>
                                <br/>
                                <text>Price Rs: {products.price}</text>
                                <br/><br/>
                                <Link to={'/login'}>
                                    <button>Add to Cart</button>
                                </Link>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default CustomerDashboard;
