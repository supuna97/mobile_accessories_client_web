/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import React from "react";
import {USER_ROLES as roles} from "./variables/constants";
import OrderResultCustomer from "./views/OrderResultCustomer";
import CustomerDashboard from "./views/ClientDashboard";
import PlaceOrder from "./views/PlaceOrder";
import Login from "./views/Login";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "design_app",
    component: Dashboard,
    layout: "/en",
    roles: [roles.CUSTOMER]
  },
  {
    path: "/my_order_details",
    name: "My Order Details",
    icon: "shopping_box",
    component: OrderResultCustomer,
    layout: "/en",
    roles: [roles.CUSTOMER]
  }

];

const internalRoutes = [

  {
    path: "/techmart",
    component: CustomerDashboard,
    layout: "/en",
    roles: [roles.CUSTOMER]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/place_order",
    name: "Place Order",
    icon: "shopping_box",
    component: PlaceOrder,
    layout: "/en",
    roles: [roles.CUSTOMER]
  },

];

export {dashRoutes, internalRoutes};
