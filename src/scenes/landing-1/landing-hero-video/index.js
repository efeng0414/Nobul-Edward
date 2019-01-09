import React, { Component } from "react";
import YouTube from "react-youtube";
import { bound } from "class-bind";
import {
  VIDEO_START_LANDING_01,
  VIDEO_HALF_WAY_LANDING_01,
  VIDEO_END_LANDING_01
} from "../../../utilities/google-tag-variable";
import {
  videoOptions,
  videoStartGtmEvent,
  videoHalfWayGtmEvent,
  videoEndGtmEvent
} from "./utilities";

class LandingHeroVideo extends Component {
  trackPlayInterval = null;

  @bound
  onPlay(event) {
    this.trackPlayInterval = setInterval(() => {
      if (
        event.target.getCurrentTime() > event.target.getDuration() / 2 &&
        !this.halfWayEventSent
      ) {
        videoHalfWayGtmEvent({ name: VIDEO_HALF_WAY_LANDING_01 });
      }
    }, 1000);
    videoStartGtmEvent({ name: VIDEO_START_LANDING_01 });
  }

  @bound
  onEnd() {
    this.trackPlayInterval && clearInterval(this.trackPlayInterval);
    videoEndGtmEvent({ name: VIDEO_END_LANDING_01 });
  }

  @bound
  onPause() {
    this.trackPlayInterval && clearInterval(this.trackPlayInterval);
  }

  render() {
    return (
      <div className="landing__hero__video">
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
