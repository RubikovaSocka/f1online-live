import React, { Component } from "react";

import styles from "./Calendar.module.scss";
import { addMinutes, format, parse } from "date-fns";

export default class Calendar extends Component {
  render() {
    const { calendar } = this.props;
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>TV program</h1>
        <div className={`${styles.header} ${styles.row}`}>
          <span className={styles.rowHeader}>Časť</span>
          <span className={styles.time}>Čas</span>
          <span className={styles.tv}>Vysiela</span>
        </div>

        <div className={`${styles.row}`}>
          <span className={styles.rowHeader}>1. tréning</span>
          <span className={styles.time}>{`${calendar.fp1_time} - ${format(
            addMinutes(parse(calendar.fp1_time, "HH:mm", new Date()), 90),
            "HH:mm"
          )}`}</span>
          <span className={styles.tv}>{`${calendar.fp1_tv ? calendar.fp1_tv : "doplníme..."}`}</span>
        </div>

        <div className={`${styles.row}`}>
          <span className={styles.rowHeader}>2. tréning</span>
          <span className={styles.time}>{`${calendar.fp2_time} - ${format(
            addMinutes(parse(calendar.fp2_time, "HH:mm", new Date()), 90),
            "HH:mm"
          )}`}</span>
          <span className={styles.tv}>{`${calendar.fp2_tv ? calendar.fp2_tv : "doplníme..."}`}</span>
        </div>
        <div className={`${styles.row}`}>
          <span className={styles.rowHeader}>3. tréning</span>
          <span className={styles.time}>{`${calendar.fp3_time} - ${format(
            addMinutes(parse(calendar.fp3_time, "HH:mm", new Date()), 60),
            "HH:mm"
          )}`}</span>
          <span className={styles.tv}>{`${calendar.fp3_tv ? calendar.fp3_tv : "doplníme..."}`}</span>
        </div>
        <div className={`${styles.row}`}>
          <span className={styles.rowHeader}>Kvalifikácia</span>
          <span className={styles.time}>{`${calendar.q_time} - ${format(
            addMinutes(parse(calendar.q_time, "HH:mm", new Date()), 60),
            "HH:mm"
          )}`}</span>
          <span className={styles.tv}>{`${calendar.q_tv ? calendar.q_tv : "doplníme..."}`}</span>
        </div>
        <div className={`${styles.row}`}>
          <span className={styles.rowHeader}>Preteky</span>
          <span className={styles.time}>{`${calendar.r_time}`}</span>
          <span className={styles.tv}>{`${calendar.r_tv ? calendar.r_tv : "doplníme..."}`}</span>
        </div>
      </div>
    );
  }
}
