import React from "react";
import "./Opinion.css";
import { Button} from 'antd';
import { LikeOutlined,DislikeOutlined} from '@ant-design/icons';

function Opinion(props) {
  const { rating, onClick, movieId } = props;

  const text = rating ? "liked" : "haven't liked";
  const label = rating ? <LikeOutlined /> : <DislikeOutlined /> ;

  return (
    <div className="custom-container">
      <Button className="btn btn-primary" type="primary" shape="circle"  size= "small" onClick={() => onClick(movieId)}>
        {label}
      </Button>
      <p>You {text} this</p>
    </div>
  );
}

export default Opinion;
