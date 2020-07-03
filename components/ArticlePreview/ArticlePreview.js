import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "./ArticlePreview.module.scss";
import getImagePreview from "../../utils/getImagePreview.js";

export default class ArticlePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://wpadmin.f1online.sk/wp-json/wp/v2/posts/${this.props.postID}`
      )
      .then(res =>
        this.setState({
          post: res.data,
          isLoaded: true
        })
      );
  }

  render() {
    if (this.state.isLoaded) {
      const { id, slug, title, better_featured_image } = this.state.post;
      return (
        <div className={`${styles.container}`}>
        <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a>
          <div className={styles.imgContainer}>
            {getImagePreview({
              imgData: better_featured_image,
              imgSize: "medium"
            })}
          </div>
        </a>
      </Link>
      <Link href={`/clanky/[id]/[slug]`} as={`/clanky/${id}/${slug}`}>
        <a className={`${styles.titleContainer} ${styles.blackBotGradient}`}>
          <h3
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: title.rendered }}
          />
          {/*<h3 className={styles.title}>{title.rendered}</h3>*/}
        </a>
        </Link>
      </div>
        /*
        <div className={`${styles.container} zoomImageContainer`}>
          <a
            href={`https://f1online.sk/clanky/${id}/${slug}`}
            target="_blank"
            className="noOutline"
          >
            {getImagePreview({
              imgData: better_featured_image,
              imgSize: "medium_large"
            })}
            <div className={`${styles.titleContainer}`}>
              <h3
                className={`blackBotGradient ${styles.title}`}
                dangerouslySetInnerHTML={{ __html: title.rendered }}
              />
            </div>
          </a>
        </div>*/
      );
    } else return null;
  }
}
