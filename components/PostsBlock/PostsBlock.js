import React, { Component } from "react";
import axios from "axios";
import PostItem from "../PostItem/PostItem";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./PostsBlock.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactGA from "react-ga";
import moment from "moment";

export default class PostsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoadMinInterval: 10, //aspon 10 sekund - countdownje 10 sekund
      userLoadCountdown: 0,
      autoLoadMinInterval: 30,
      posts: [],
      hasMoreOldPosts: true,
      scrolledToTop: true,

      autoload: false,
      spinnerLoading: false,
      focusMaxTimeout: 25,
      focusTimeoutRunning: false,
      windowHeight: 600,
      windowWidth: 380
    };
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.scrollListener = this.scrollListener.bind(this);
  }

  fetchMoreOldPosts = () => {
    const { posts } = this.state;
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/online_spravy?per_page=15${
          posts.length > 0
            ? `&before=${posts[posts.length - 1].date}&after=${moment().format(
                "YYYY-MM-DDT00:00:01"
              )}`
            : `&after=${moment().format("YYYY-MM-DDT00:00:01")}`
        }`
      )
      .then(res =>
        this.setState(previousState => {
          return {
            hasMoreOldPosts: res.data.length === 15,
            posts: previousState.posts.concat(res.data)
          };
        })
      );
  };

  fetchNewData = () => {
    const { posts } = this.state;
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/online_spravy?per_page=15${
          posts.length > 0
            ? `&after=${moment().format("YYYY-MM-DDT00:00:01")}&after=${
                posts[0].date
              }`
            : `&after=${moment().format("YYYY-MM-DDT00:00:01")}`
        }`
      )
      .then(res => {
        const { spinnerLoading } = this.state;
        this.setState(previousState => {
          return {
            posts: res.data.concat(previousState.posts),
            spinnerLoading: false
          };
        });
        if (spinnerLoading) {
          this.countdownInterval = setInterval(() => {
            this.setState(prev => {
              const newCountdownValue = prev.userLoadCountdown - 1;
              return {
                userLoadCountdown: newCountdownValue > 0 ? newCountdownValue : 0
              };
            });
          }, 1000);
        }
      });
  };

  scrollListener() {
    if (this.state.scrolledToTop && window.pageYOffset > 70) {
      this.setState({
        scrolledToTop: false
      });
    } else if (!this.state.scrolledToTop && window.pageYOffset < 70) {
      this.setState({
        scrolledToTop: true
      });
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    });
    this.fetchMoreOldPosts();
    window.addEventListener("blur", this.onBlur);
    window.addEventListener("focus", this.onFocus);
    window.onscroll = () => this.scrollListener();
  }

  componentWillUnmount() {
    window.removeEventListener("blur", this.onBlur);
    window.removeEventListener("focus", this.onFocus);
    window.onscroll = null;
  }

  onFocus = () => {
    if (this.state.autoload) {
      if (!this.state.focusTimeoutRunning) {
        this.fetchNewData();
      }
      this.interval = setInterval(
        () => this.fetchNewData(),
        this.state.autoLoadMinInterval * 1000
      );
      this.focusInterval = setTimeout(
        () =>
          this.setState({
            focusTimeoutRunning: false
          }),
        this.state.focusMaxTimeout * 1000
      );
      this.setState({
        isFetching: true,
        focusTimeoutRunning: true
      });
    }
  };

  onBlur = () => {
    if (this.state.autoload) {
      clearInterval(this.interval);
    }
  };

  //Turn on/off autoload
  handleFormInputChange(event) {
    const { checked } = event.target;
    this.setState({ [event.target.id]: checked });

    if (checked) {
      this.interval = setInterval(
        () => this.fetchNewData(),
        this.state.autoLoadMinInterval * 1000
      );
    } else {
      clearInterval(this.interval);
    }
  }

  userRefresh = () => {
    if (!this.state.autoload && this.state.userLoadCountdown === 0) {
      this.setState({
        userLoadCountdown: this.state.userLoadMinInterval,
        spinnerLoading: true
      });
      this.fetchNewData();
    }
  };

  render() {
    if (this.state.userLoadCountdown < 1) {
      clearInterval(this.countdownInterval);
    }
    const { posts, userLoadCountdown, spinnerLoading, autoload } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.headerToolbox}>
          <div
            className={`${styles.refreshButton} ${
              userLoadCountdown === 0 && !autoload
                ? styles.refreshButtonEnabled
                : styles.refreshButtonDisabled
            }`}
            onClick={() => this.userRefresh()}
          >
            {spinnerLoading ? (
              <i className={`fas fa-sync fast-spin`}> </i>
            ) : userLoadCountdown > 0 ? (
              <span>{userLoadCountdown}</span>
            ) : (
              <i className={`fas fa-sync`}> </i>
            )}
            <span className={styles.buttonText}>Obnoviť</span>
          </div>
          <form className={styles.autoloadBox}>
            <label>
              <input
                type="checkbox"
                id="autoload"
                defaultChecked={false}
                onChange={this.handleFormInputChange}
              />
              Automatické načítavanie{" "}
            </label>
          </form>
        </div>
        <InfiniteScroll
          dataLength={posts.length}
          next={this.fetchMoreOldPosts}
          hasMore={this.state.hasMoreOldPosts}
          height={this.state.windowHeight - (this.state.windowWidth < 400 ? 80 : 34)}
          loader={
            <div className={styles.loadingSpinnerContainer}>
              <LoadingSpinner />
            </div>
          }
          endMessage={
            <p style={{ fontFamily: "HK Grotesk", textAlign: "center" }}>
              <b>Toto bola posledná správa.</b>
            </p>
          }
        >
          {posts.map(item => (
            <PostItem key={item.id} post={item} />
          ))}
        </InfiniteScroll>
        <button
          onClick={() => {
            this.scrollToTop();
          }}
          className={`${styles.scrollButton} ${
            this.state.scrolledToTop ? styles.hideButton : ""
          }`}
        >
          <i className="fas fa-angle-double-up"></i>
        </button>
      </div>
    );
  }
}
