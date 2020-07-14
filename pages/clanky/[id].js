import React, { Component } from "react";
import DiskusnyBox from "../../components/DiskusnyBox";

export default class Article extends Component {
  static getInitialProps ({ query: { id } }) {
    return { articleID: id }
  }

  componentDidMount() {
    /*let DiscourseEmbed = {
      discourseUrl: "https://discourse.f1online.sk/",
      topicId: 300
    };

    let d = document.createElement("script");
    d.type = "text/javascript";
    d.async = true;
    d.src = DiscourseEmbed.discourseUrl + "javascripts/embed.js";
    console.log(d.src);
    (
      document.getElementsByTagName("head")[0] ||
      document.getElementsByTagName("body")[0]
    ).appendChild(d);*/
    //console.log(this.props.articleID);
  }

  render() {
    return (
      <>
        {/*<div id="discourse-comments"></div>*/}
        <DiskusnyBox
          discourseUrl="https://discourse.f1online.sk/"
          discourseEmbedUrl={`https://live.f1online.sk/clanky/${this.props.articleID}`}
        />
      </>
    );
  }
}
