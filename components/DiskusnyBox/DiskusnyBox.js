import React from "react";
import PropTypes from "prop-types";
import styles from "./DiskusnyBox.module.scss";

export default class DiskusnyBox extends React.Component {
  static propTypes = {
    discourseUrl: PropTypes.string.isRequired,
    discourseEmbedUrl: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.postMessageReceived = this.postMessageReceived.bind(this);
  }

  componentDidMount() {
    this.DiscourseEmbed = {
      discourseUrl: this.props.discourseUrl,
      discourseEmbedUrl: this.props.discourseEmbedUrl
    };
    window.addEventListener("message", this.postMessageReceived, false);
/*
    let cssLink = document.createElement("link");
    cssLink.href = "/styles/iframestyle.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    /*
    var iframe = document.getElementsByTagName("discourse-embed-frame");
    iframe.addEventListener("load", function() {
       the JS equivalent of the answer
       *
       * var node = document.createElement('style');
       * node.appendChild(document.createTextNode('body { background: #fff; }'));
       * window.frames[0].document.head.appendChild(node);
       

      // the cleaner and simpler way
      window.frames[0].document.body.style.backgroundColor = "#d45f44";
    });*/
    /*
    console.log(iframee);
    var inside = iframee.contentDocument || this.iframe.contentWindow.document;
    console.log(inside);
    console.log("before");
    console.log(inside.head);
    inside.head.appendChild(cssLink);
    console.log("after");
    console.log(inside.head);*/
/*
    var iframee = document.getElementById("discourse-embed-frame");
    var iframe = document.getElementById("discourse-embed-frame");
    var elmnt = (iframee.contentDocument || iframee.contentWindow.document).getElementsByTagName("html")[0];
        elmnt.style.display = "none";

/*
var iframe = document.getElementById('discourse-embed-frame');
var style = document.createElement('style');
style.textContent =
  '.cals {' +
  '  color: white;' +
  '}' 
;
iframe.contentDocument.head.appendChild(style);
*/
/*
    if (iframee.attachEvent) {
      iframee.attachEvent("onload", function() {
        var elmnt = iframe.contentWindow.document.getElementsByTagName("html")[0];
        elmnt.style.display = "none";
        /*console.log(iframee);
        var inside = iframee.contentDocument || iframee.contentWindow.document;
        inside.head.appendChild(cssLink);

        window.frames[0].document.body.style.backgroundColor = "#d45f44";
        inside.body.style.backgroundColor = "#d45f45";

        inside.getElementById("body").style.background = "#4db520";*/
        //document.getElementById('discourse-embed-frame').contentWindow.document.getElementById('header').style.background = "#4db585";
 /*     });
    } else {
      iframee.onload = function() {
        var elmnt = iframe.contentWindow.document.getElementsByTagName("html")[0];
    elmnt.style.display = "none";
        /*console.log(iframee);
        var inside = iframee.contentDocument || iframee.contentWindow.document;
        inside.head.appendChild(cssLink);
        window.frames[0].document.body.style.backgroundColor = "#d45f44";
        inside.body.style.backgroundColor = "#d45f48";
        inside.getElementById("body").style.background = "#4db521";*/
    /* };
    }*/

    //document.getElementById("discourse-embed-frame").html.head.appendChild(cssLink);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.postMessageReceived);
  }

  getIframeSource() {
    const { discourseUrl, discourseEmbedUrl, discourseUserName } = this.props;
    const queryParams = {};

    if (discourseEmbedUrl) {
      if (discourseEmbedUrl.indexOf("/") === 0) {
        console.error(
          "discourseEmbedUrl must be a full URL, not a relative path"
        );
      }

      queryParams.embed_url = encodeURIComponent(discourseEmbedUrl);
    }

    if (discourseUserName) {
      queryParams.discourse_username = discourseUserName;
    }

    let src = discourseUrl + "embed/comments";
    const keys = Object.keys(queryParams);
    if (keys.length > 0) {
      src += "?";

      for (let i = 0; i < keys.length; i++) {
        if (i > 0) {
          src += "&";
        }

        const k = keys[i];
        src += k + "=" + queryParams[k];
      }
    }

    return src;
  }

  postMessageReceived(e) {
    if (!e) {
      return;
    }

    const iframe = this.iframe;
    const { discourseUrl } = this.props;

    var elmnt = (iframe.contentDocument || iframe.contentWindow.document).getElementsByTagName("html")[0];
    elmnt.style.display = "none";

    if (normalizeUrl(discourseUrl).indexOf(normalizeUrl(e.origin)) === -1) {
      return;
    }

    if (e.data) {
      if (e.data.type === "discourse-resize" && e.data.height) {
        iframe.height = e.data.height + "px";
      }

      if (e.data.type === "discourse-scroll" && e.data.top) {
        // find iframe offset
        const destY = findPosY(iframe) + e.data.top;
        window.scrollTo(0, destY);
      }
    }
  }

  render() {
    return (
      <div className={`discussion-box-container ${styles.box}`}>
        <iframe
          title="discussion box"
          ref={el => {
            this.iframe = el;
          }}
          src={this.getIframeSource()}
          id="discourse-embed-frame"
          width="100%"
          frameBorder="0"
        />
      </div>
    );
  }
}

function normalizeUrl(url) {
  return url.toLowerCase().replace(/^https?(\:\/\/)?/, "");
}

function findPosY(obj) {
  let top = 0;
  if (obj.offsetParent) {
    while (1) {
      top += obj.offsetTop;
      if (!obj.offsetParent) {
        break;
      }
      obj = obj.offsetParent;
    }
  } else if (obj.y) {
    top += obj.y;
  }
  return top;
}
