import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
// import { Drawer, Button } from 'antd';
// import logo from './website_logo.png'
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "mail",
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <nav className="menuBar">
        <div className="logo" />
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
        </div>
      </nav>
    );
  }
}
export default Navbar;
