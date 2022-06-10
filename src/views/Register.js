import React, {Component} from "react";
import 'assets/css/custom/login.css';
import {Form} from "react-bootstrap";
import Joi from "joi-browser";
import axios from "axios";
import Functions from "../variables/functions";
import INTERCEPTOR from "../variables/global/interceptor";
import {SERVER_URL,USER_KEY } from "../variables/constants";
import {dashRoutes, internalRoutes} from "../routes";
import Memory from "../variables/memory";
import {InputText} from "../variables/input";
import {Button} from "reactstrap";

class Register extends Component {
    state = {
        interceptor: INTERCEPTOR, // added this line to avoid unused import warning for INTERCEPTOR
        registerUrl: SERVER_URL.concat(`/customer`),
        addCustomer:{
            name: '',
            address: '',
            mobile: '',
            username:'',
            password:''
        },

        addCustomerErrors: {
            name: '',
            address: '',
            mobile: '',
            username:'',
            password:''
        },

        loginData: {
            username: '',
            password: ''
        },
        loginDataErrors: {
            username: '',
            password: ''
        },
        processing: false
    };

    addValidateSchema = {
        name: Joi.string().required(),
        address: Joi.string().required(),
        mobile: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }

    loginValidateSchema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }

    render() {
        return (
            <React.Fragment>

                <div className="login-body">

                    <div style={{height:"900px"}}  className="login-wrap">
                        <div className="login-html">
                            <input id="tab-1" type="radio" name="tab" className="sign-in"/>
                            <label htmlFor="tab-1" className="tab">Sign In</label>

                            <Form className="login-form" onSubmit={this.addCustomer}>
                                <div className="sign-in-htm">
                                    <div className="group">
                                        <InputText
                                                   label="Customer Name"
                                                   id="name"
                                                   name="name"
                                                   error={this.state.addCustomerErrors.name}
                                                   value={this.state.addCustomer.name}
                                                   onChange={this.handleAddFormChange}
                                        />
                                    </div>
                                    <div className="group">
                                        <InputText
                                            label="Address"
                                            id="address"
                                            name="address"
                                            error={this.state.addCustomerErrors.address}
                                            value={this.state.addCustomer.address}
                                            onChange={this.handleAddFormChange}
                                        />
                                    </div>
                                    <div className="group">
                                        <InputText
                                            label="Mobile"
                                            id="mobile"
                                            name="mobile"
                                            error={this.state.addCustomerErrors.mobile}
                                            value={this.state.addCustomer.mobile}
                                            onChange={this.handleAddFormChange}
                                        />
                                    </div>
                                    <div className="group">
                                        <InputText
                                            label="Username"
                                            id="username"
                                            name="username"
                                            error={this.state.addCustomerErrors.username}
                                            value={this.state.addCustomer.username}
                                            onChange={this.handleAddFormChange}
                                        />
                                    </div>
                                    <div className="group">
                                        <InputText
                                            label="Password"
                                            type={"password"}
                                            id="password"
                                            name="password"
                                            error={this.state.addCustomerErrors.password}
                                            value={this.state.addCustomer.password}
                                            onChange={this.handleAddFormChange}
                                        />
                                    </div>

                                    <div className="group">
                                        <Button type="submit"
                                               style={this.state.processing ? {backgroundColor: "lightsteelblue"} : {}}
                                               disabled={this.state.processing}
                                                block
                                                >Save</Button>
                                    </div>
                                    <div className="login-hr"/>
                                </div>

                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleAddFormChange = ({currentTarget: input}) => {
        const addCustomer = {...this.state.addCustomer};
        addCustomer[input.name] = input.value;
        this.setState({addCustomer});
    }

    handleRegisterFormChange = ({currentTarget: input}) => {
        const loginData = {...this.state.loginData};
        loginData[input.name] = input.value;
        this.setState({loginData});
    }

    login = async (event) => {
        event.preventDefault();
        const loginDataErrors = this.loginDataErrors();
        this.setState({loginDataErrors});
        if (Object.keys(loginDataErrors).length > 0)
            return;
        this.setProcessing(true);
        try {
            const response = await axios.post(this.state.loginUrl, this.state.loginData);
            if (!response.data.userRole) Functions.errorSwal('Invalid login response');
            Memory.setValue(USER_KEY, response.data);
            this.redirectToDash();
        } catch (e) {
        }
        this.setProcessing(false);
    }

    loginDataErrors = () => {
        const errors = {};
        const {loginData} = this.state;
        const options = {abortEarly: false};
        let validate = Joi.validate(loginData, this.loginValidateSchema, options);

        if (!validate.error) return errors;

        for (const detail of validate.error.details)
            errors[detail.path] = detail.message;
        return errors;
    }

    addCustomer = async event => {
        event.preventDefault();
        const addCustomerErrors = this.addFormErrors();
        this.setState({addCustomerErrors});
        if (Object.keys(addCustomerErrors).length > 0)
            return;

        this.setProcessing(true);

        try {
            const response = await axios.post(this.state.registerUrl, this.state.addCustomer);
            if (response.data.success) {
                Functions.successSwal("Successfully Registerd");
                this.setState({addCustomer: {name: ''}});
                this.redirectToDash();
                // await this.setBranches();
            }
        } catch (e) {
        }

        this.setProcessing(false);
    }

    addFormErrors = () => {
        const errors = {};
        const {addCustomer} = this.state;
        const options = {abortEarly: false};
        let validate = Joi.validate(addCustomer, this.addValidateSchema, options);

        if (!validate.error) return errors;

        for (const detail of validate.error.details)
            errors[detail.path] = detail.message;
        return errors;
    }

    redirectToDash = () => {
        const path = internalRoutes[0].layout;
        this.props.history.push(path);
    }

    setProcessing = (processing) => {
        this.setState({processing: processing});
    }
}

export default Register;