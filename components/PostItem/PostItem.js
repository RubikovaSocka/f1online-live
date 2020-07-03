import React, { Component } from "react";
import { formatDateToTime } from "../../utils/DateFormatter.js";
import EmbedContainer from "react-oembed-container";

import styles from "./PostItem.module.scss";

export default class PostItem extends Component {
  render() {
    const { post } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.postTime}>
            <span>{formatDateToTime(post.date)}</span>
          </div>
          <div className={`${styles.postTextContent} ${styles.text}`}>
            {post.acf.sprava}
          </div>
        </div>
        {post.acf.embed ? (
          <EmbedContainer markup={post.acf.embed} className={styles.embed}>
            <div
              dangerouslySetInnerHTML={{
                __html: post.acf.embed
              }}
            />
          </EmbedContainer>
        ) : (
          ""
        )}
        {post.acf.foto ? (
          <img className={styles.img} src={post.acf.foto}></img>
        ) : (
          ""
        )}
      </div>
    );
  }
}
