import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/index.module.scss";
import Chat from "../components/ChatComponent/Chat";
import PostsBlock from "../components/PostsBlock/PostsBlock";
import LogoPanel from "../components/LogoPanel/LogoPanel.js";
import ArticlesPanel from "../components/ArticlesPanel/ArticlesPanel";
import FPResults from "../components/FPResults/FPResults.js";
import { ARTICLES, FP1, FP2, FP3, Q, GRID, CALENDAR } from "../utils/constants";
import QResults from "../components/QResults/QResults";
import Grid from "../components/Grid/Grid";
import Calendar from "../components/Calendar/Calendar";

import SwipeableViews from "react-swipeable-views";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoboxPanelOpened: false,
      opened: ARTICLES,
      fpResultsPanelOpened: true,
      index: 0,
      windowWidth: 320,
      venueName: ""
    };
    this.infoboxPanelChangeState = this.infoboxPanelChangeState.bind(this);
    this.loadPostsFromServer = this.loadPostsFromServer.bind(this);
    this.openInfobox = this.openInfobox.bind(this);
    this.closeInfobox = this.closeInfobox.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.changeIndex = this.changeIndex.bind(this);
  }

  loadPostsFromServer() {
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/online_details?per_page=1`
      )
      .then(res => {
        this.setState({
          topPosts: res.data[0].acf.featured_clanok,
          isLoaded: true
        });

        const { acf } = res.data[0];

        if (acf.vysledky_fp1) {
          axios.get(acf.vysledky_fp1).then(res => {
            this.setState({ fp1: res.data });
          });
        }
        if (acf.vysledky_fp2) {
          axios.get(acf.vysledky_fp2).then(res => {
            this.setState({ fp2: res.data });
          });
        }
        if (acf.vysledky_fp3) {
          axios.get(acf.vysledky_fp3).then(res => {
            this.setState({ fp3: res.data });
          });
        }
        if (acf.vysledky_q) {
          axios.get(acf.vysledky_q).then(res => {
            this.setState({ q: res.data });
          });
        }
        if (acf.grid_order) {
          axios.get(acf.grid_order).then(res => {
            this.setState({ grid: res.data });
          });
        }
        if (acf.calendar_gp_id) {
          axios
            .get(
              `https://wpadmin.f1online.sk/wp-json/wp/v2/calendar/${acf.calendar_gp_id}`
            )
            .then(res => {
              this.setState({
                calendar: res.data.acf,
                venueName: res.data.acf.venue_name
              });
            });
        }
      });
  }

  componentDidMount() {
    this.loadPostsFromServer();
    this.setState({
      windowWidth: window.innerWidth
    });
  }

  infoboxPanelChangeState(id) {
    if (id === this.state.opened) {
      this.state.infoboxPanelOpened
        ? this.closeInfobox()
        : this.openInfobox(id);
    } else {
      this.openInfobox(id);
    }
  }

  openInfobox(id) {
    if (this.state.infoboxPanelOpened) {
      this.closeInfobox();
      this.focusInterval = setTimeout(
        () =>
          this.setState({
            infoboxPanelOpened: true,
            opened: id
          }),
        520
      );
    } else {
      this.setState({
        infoboxPanelOpened: true,
        opened: id
      });
    }
  }

  closeInfobox() {
    this.setState({
      infoboxPanelOpened: false
    });
  }

  handleChangeIndex(index) {
    console.log(index);
    this.setState({
      index
    });
  }

  changeIndex(value) {
    this.setState({
      index: value
    });
  }

  render() {
    const { opened, index } = this.state;

    let buttons = (
      <div className={styles.mobileButtons}>
        <button
          className={`${index === 0 ? styles.selected : ""}`}
          onClick={() => this.changeIndex(0)}
        >
          <i className="fas fa-bars"></i>
        </button>
        <button
          className={`${index === 1 ? styles.selected : ""}`}
          onClick={() => this.changeIndex(1)}
        >
          <i className="far fa-newspaper"></i>
        </button>
        <button
          className={`${index === 2 ? styles.selected : ""}`}
          onClick={() => this.changeIndex(2)}
        >
          <i className="far fa-comments"></i>
        </button>
      </div>
    );

    let leftPanel = (
      <div className={styles.leftPanel}>
        <LogoPanel />
        <div className={styles.gpTitle}>
          <span>VC {this.state.venueName}</span>
        </div>
        <div className={styles.menu}>
          {this.state.topPosts ? (
            <button
              className={`${styles.menuItem} ${
                this.state.infoboxPanelOpened && opened === ARTICLES
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                this.infoboxPanelChangeState(ARTICLES);
              }}
            >
              <i className="fas fa-fire-alt"></i>
              <span>Top články</span>
            </button>
          ) : (
            ""
          )}
          {this.state.calendar ? (
            <button
              className={`${styles.menuItem} ${
                this.state.infoboxPanelOpened && opened === CALENDAR
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                this.infoboxPanelChangeState(CALENDAR);
              }}
            >
              <i className="fas fa-tv"></i>
              <span>Televízny program</span>
            </button>
          ) : (
            ""
          )}

          {this.state.fp1 ? (
            <button
              className={`${styles.menuItem} ${
                this.state.infoboxPanelOpened && opened === FP1
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                this.infoboxPanelChangeState(FP1);
              }}
            >
              <i className="fas fa-flag-checkered"></i>
              <span>Výsledky 1. tréningu</span>
            </button>
          ) : (
            ""
          )}
          {this.state.fp2 ? (
            <button
              className={`${styles.menuItem} ${
                this.state.infoboxPanelOpened && opened === FP2
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                this.infoboxPanelChangeState(FP2);
              }}
            >
              <i className="fas fa-flag-checkered"></i>
              <span>Výsledky 2. tréningu</span>
            </button>
          ) : (
            ""
          )}
          {this.state.fp3 ? (
            <button
              className={`${styles.menuItem} ${
                this.state.infoboxPanelOpened && opened === FP3
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                this.infoboxPanelChangeState(FP3);
              }}
            >
              <i className="fas fa-flag-checkered"></i>
              <span>Výsledky 3. tréningu</span>
            </button>
          ) : (
            ""
          )}
          {this.state.q ? (
            <button
              className={`${styles.menuItem} ${
                this.state.infoboxPanelOpened && opened === Q
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                this.infoboxPanelChangeState(Q);
              }}
            >
              <i className="fas fa-flag-checkered"></i>
              <span>Výsledky kvalifikácie</span>
            </button>
          ) : (
            ""
          )}
          {this.state.grid ? (
            <button
              className={`${styles.menuItem} ${
                this.state.infoboxPanelOpened && opened === GRID
                  ? styles.selected
                  : ""
              }`}
              onClick={() => {
                this.infoboxPanelChangeState(GRID);
              }}
            >
              <i className="fas fa-flag-checkered"></i>
              <span>Štartový rošt</span>
            </button>
          ) : (
            ""
          )}
          <a
            className={styles.partnerImageLink}
            href="https://elisplus.sk/"
            target="_blank"
          >
            <img className={styles.partnerImage} src="/images/riso.png"></img>
          </a>
        </div>
      </div>
    );

    let dataPanel = (
      <div
        className={`${styles.topArticlesPanel} ${
          this.state.infoboxPanelOpened ? styles.opened : styles.closed
        }`}
      >
        <button
          onClick={() => {
            //this.infoboxPanelChangeState(this.state.opened);
            this.closeInfobox();
          }}
        >
          <i className="fas fa-times"></i>
        </button>
        {opened === ARTICLES ? (
          <ArticlesPanel posts={this.state.topPosts} />
        ) : opened === FP1 || opened === FP2 || opened === FP3 ? (
          <FPResults
            title={`Výsledky ${opened.toUpperCase()}`}
            results={this.state[`${opened}`]}
          />
        ) : opened === Q ? (
          <QResults results={this.state[`${opened}`]} />
        ) : opened === GRID ? (
          <Grid results={this.state[`${opened}`]} />
        ) : opened === CALENDAR ? (
          <Calendar calendar={this.state[`${opened}`]} />
        ) : (
          ""
        )}
      </div>
    );
    if (this.state.windowWidth > 1023) {
      return (
        <>
          <div className={styles.container}>
            {leftPanel}
            <div className={styles.feedContainer}>
              <PostsBlock />
            </div>
            <div className={styles.rightPanel}>
              <Chat />
            </div>
            {dataPanel}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.swipableContainer}>
            {dataPanel}
            <SwipeableViews
              index={index}
              onChangeIndex={index => this.handleChangeIndex(index)}
            >
              {leftPanel}
              <div className={styles.feedContainer}>
                <PostsBlock />
              </div>
              <div className={`xfkdfsa ${styles.rightPanel}`}>
                <Chat />
              </div>
            </SwipeableViews>
          </div>
          {buttons}
        </>
      );
    }
  }
}
