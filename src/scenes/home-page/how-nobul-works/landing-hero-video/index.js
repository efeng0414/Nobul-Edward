import React, { Component } from "react";
import YouTube from "react-youtube";
import { bound } from "class-bind";
import {
  HOME_PAGE_VIDEO_PLAY,
  HOME_PAGE_VIDEO_PAUSE,
  HOME_PAGE_VIDEO_50,
  HOME_PAGE_VIDEO_100
} from "../../../../utilities/google-tag-variable";
import { videoOptions, videoHalfWayGtmEvent } from "./utilities";
import { gtmEvent } from "../../../../utilities/gtm-event";

class LandingHeroVideo extends Component {
  trackPlayInterval = null;

  @bound
  onPlay(event) {
    gtmEvent({ name: HOME_PAGE_VIDEO_PLAY });
    this.trackPlayInterval = setInterval(() => {
      if (
        event.target.getCurrentTime() > event.target.getDuration() / 2 &&
        !this.halfWayEventSent
      ) {
        videoHalfWayGtmEvent({ name: HOME_PAGE_VIDEO_50 });
      }
    }, 1000);
  }

  @bound
  onEnd() {
    this.trackPlayInterval && clearInterval(this.trackPlayInterval);
    gtmEvent({ name: HOME_PAGE_VIDEO_100 });
  }

  @bound
  onPause() {
    gtmEvent({ name: HOME_PAGE_VIDEO_PAUSE });
    this.trackPlayInterval && clearInterval(this.trackPlayInterval);
  }

  render() {
    return (
      <div className="how-it-works__video">
        <YouTube
          videoId="7SWK40-8drw"
          opts={videoOptions}
          onPlay={this.onPlay}
          onEnd={this.onEnd}
          onPause={this.onPause}
        />
      </div>
    );
  }
}

export default LandingHeroVideo;
