import React from "react";
import "./DeleteMovie.css";
import { Button} from 'antd';
import {CloseOutlined} from '@ant-design/icons';

function DeleteMovie(props) {
  const { onDelete, movieInfo } = props;

  return (
    <div className="delete-button">
      <Button className="btn btn-primary2" type="primary" shape="circle"  size= "small" onClick={() => onDelete(movieInfo)}>
        <CloseOutlined/>
      </Button>
    </div>
  );
}

export default DeleteMovie;
