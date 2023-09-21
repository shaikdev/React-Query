import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const navigate = useNavigate();
  const labels = [
    {
      label: "Users",
      route: "/users",
    },
    {
      label: "Colors",
      route: "/colors",
    },
    {
      label: "Create Users",
      route: "/create_users",
    },
  ];

  const navigateControl  =(data)=> {
    navigate(data.route)
  }

  return (
    <div className="navbar_wrapper">
      {labels.map((item, i) => {
        return (
          <div
            onClick={() => navigateControl(item)}
            key={i}
            className={`navbar_text`}
          >
            <p>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
