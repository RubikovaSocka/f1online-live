import React, { Component } from "react";
import DiskusnyBox from "../components/DiskusnyBox";

export default class Diskusia extends Component {
  render() {
    return (
      <DiskusnyBox
        discourseUrl="https://discourse.f1online.sk/"
        discourseEmbedUrl="https:/live.f1online.sk/diskusia"
      />
    );
  }
}
