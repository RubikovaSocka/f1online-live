import React, { Component } from "react";
import DiskusnyBox from "../../components/DiskusnyBox/DiskusnyBox";
import Head from "next/head";

export default class Article extends Component {
  static getInitialProps ({ query: { id } }) {
    return { articleID: id }
  }

  render() {
    return (
      <>
      <Head><title key="meta_title">{`F1online.sk Live ${this.props.articleID}`}</title></Head>
        {/*<div id="discourse-comments"></div>*/}
        <DiskusnyBox
          discourseUrl="https://discourse.f1online.sk/"
          discourseEmbedUrl={`https://live.f1online.sk/clanky/${this.props.articleID}`}
        />
      </>
    );
  }
}
