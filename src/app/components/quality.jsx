import React from "react";

const Quality = (props) => {
  const qualities = props.user;
  return qualities.map((item) => (
    <span className={"badge m-1 bg-" + item.color} key={item._id}>
      {item.name}
    </span>
  ));
};

export default Quality;
