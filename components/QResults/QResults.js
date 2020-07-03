import React, { Component } from "react";

import styles from "./QResults.module.scss";

export default class QResults extends Component {
  render() {
    return (
      <div className={styles.container}>
      <h1 className={styles.title}>Výsledky Q</h1>
        <div className={styles.fixedPart}>
        {this.props.results.map((item, index) => {
          return (
            <div
              className={`${index === 0 ? styles.header : ""} ${styles.row}`}
            >
              <span className={styles.position}>{index > 0 ? `${index}.`: ""}</span>{" "}
              <span className={styles.driverName}>{item.driverName}</span>{" "}
            </div>
          );
        })}
        </div>
        <div className={styles.scrollablePart}>
        {this.props.results.map((item, index) => {
          return (
            <div
              className={`${index === 0 ? styles.header : ""} ${styles.row} ${styles.scrollableRow}`}
            >
              <span className={styles.teamName}>{item.teamName}</span>{" "}
              <span className={styles.time}>{item.q1time}</span>{" "}
              <span className={styles.time}>{item.q2time}</span>{" "}
              <span className={styles.time}>{item.q3time}</span>{" "}
              <span className={styles.laps}>{item.laps}</span>{" "}
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}
