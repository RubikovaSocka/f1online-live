import "../styles/global.css";
import HeaderMeta from "./HeaderMeta";
import ReactGA from "react-ga";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageviewInSeconds: 45
    };
  }

  componentDidMount() {
    const trackingId = "UA-166048655-1";
    ReactGA.initialize(trackingId);

    this.analyticsInterval = setTimeout(
      () => ReactGA.pageview("https://f1online.sk/live"),
      this.state.pageviewInSeconds * 1000
    );
  }

  componentWillUnmount() {
    clearTimeout(this.analyticsInterval);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <HeaderMeta />
        <Component {...pageProps} />
      </>
    );
  }
}
