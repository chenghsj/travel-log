import React from "react";
import {
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

function Header() {
  const classes = useStyles();
  return (
    <div className={classes.headerContainer}>
      <div className={classes.titleContainer}>
        <h2>Travel Log</h2>
        <p>&emsp;Double click to add a log</p>
      </div>
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

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundColor: "steelblue",
    boxSizing: "border-box",
    color: "white",
    width: "100%",
    height: "45px",
    position: "fixed",
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    zIndex: 20,
    "& a": {
      [theme.breakpoints.down("xs")]: {
        margin: 0,
      },
    },
    "& svg": {
      [theme.breakpoints.down("xs")]: {
        transform: "scale(0.7)",
      },
    },
  },
  titleContainer: {
    display: "flex",
    alignItems: "baseline",
    "& h2": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "1rem",
      },
    },
    "& p": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.5rem",
      },
    },
  },
}));
