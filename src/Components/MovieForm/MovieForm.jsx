import React from "react";
import "./MovieForm.css";
import { Input } from 'antd';
const { Search } = Input;
class Form extends React.Component {
  render() {
    const { onSubmit } = this.props;
    return (
      <Search
      placeholder="input search text"
      onSearch={onSubmit}
      style={{ width: 200 }}
    />
    );
  }
}

export default Form;
