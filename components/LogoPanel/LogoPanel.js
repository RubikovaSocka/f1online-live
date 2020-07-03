import React, { Component } from "react";
import styles from "./LogoPanel.module.scss";

export default class LogoPanel extends Component {
  render() {
    return (
      <div className={styles.logoContainer}>
        <a href="https://f1online.sk" target="_blank">
          <img
            className={styles.logo}
            src="https://wpadmin.f1online.sk/wp-content/uploads/logo-medium.jpg"
          />
        </a>
      </div>
    );
  }
}
