import React from "react";
import {
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
} from "@material-ui/icons";

function Header() {
  return (
    <div
      style={{
        backgroundColor: "steelblue",
        boxSizing: "border-box",
        color: "white",
        width: "100%",
        height: "60px",
        position: "sticky",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
      }}
    >
      <h2>Travel Log</h2>
      <div className="contact__container">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon style={{ fontSize: "1.75rem" }} />
        </a>
        <a
          href="https://github.com/chenghsj/amazon-clone"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon style={{ fontSize: "1.45rem" }} />
        </a>
        <a href="mailto:chengjohnsonhs@gmail.com">
          <EmailIcon style={{ fontSize: "1.65rem" }} />
        </a>
      </div>
    </div>
  );
}

export default Header;
