import React, { Component } from "react";
import styles from "./Chat.module.scss";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBlock: ""
    };
  }

  componentDidMount() {
    this.setState({
      chatBlock: (
        /*<span>chat</span>*/
       <iframe
          className={`${styles.chatFrame}`}
          width="100%"
          height="100%"
          src="https://chat.f1online.sk/channel/chatf1online?layout=embedded"
          frameBorder="0"
        ></iframe>
      )
    });
  }

  render() {
    return this.state.chatBlock;
  }
}

