import React, { Component } from "react";
import ArticlePreview from "../ArticlePreview/ArticlePreview";
import styles from "./ArticlesPanel.module.scss";
import LoadingSpinner from "../LoadingSpinner";

class ArticlesPanel extends Component {
  render() {
    let articles;
    const { posts } = this.props;
    if (posts) {
      if (posts.length === 0) {
        articles = (
          <div className={styles.noneFoundPanel}>
            <img alt="logo"></img>
            <span>Nenašli sme žiadne články</span>
          </div>
        );
      } else {
        articles = (
          <>
            {posts.map((post, index) => (
              <div key={index} className={styles.item}>
                <ArticlePreview postID={post} />
              </div>
            ))}
            <i aria-hidden="true"></i>
            <i aria-hidden="true"></i>
          </>
        );
      }
    } else {
      articles = <LoadingSpinner />;
    }
    return (
      <div className={styles.container}>
        <div className={styles.articlesTitle}>
          <h2>Neprehliadnite</h2>
          <span>
            Nestihli ste v posledných dňoch sledovať dianie vo Formule 1? Dali
            sme pre vás dokopy tie najdôležitejšie články, ktoré vás dostanú do
            obrazu:
          </span>
        </div>
        {articles}
      </div>
    );
  }
}
export default ArticlesPanel;
