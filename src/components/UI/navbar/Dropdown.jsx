import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const DropdownTriggerExample = (props) => {
  let history = useHistory();
  const trigger = (
    <span>
      <Icon name="user" /> Hello,{props.userName}
    </span>
  );

  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{props.userName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "My-Profile",
      text: "My Profile",
      onClick: () => {
        history.push("/profile");
      },
    },
    {
      key: "My-Books",
      text: "My Books",
      onClick: () => {
        history.push("/mybooks");
      },
    },
    {
      key: "Sell",
      text: "Sell a Book",
      onClick: () => {
        history.push("/bookform");
      },
    },
    {
      key: "Wishlist",
      text: "Wishlist",
      onClick: () => {
        history.push("/wishlist");
      },
    },
  ];

  return <Dropdown className="dd" trigger={trigger} options={options} />;
};

export default DropdownTriggerExample;
