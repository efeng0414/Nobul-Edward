import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import { translate } from "../../../utilities/locale";

import Testimonial from "../../../components/testimonial";
import TestimonialBuyer from "../../../assets/images/testimonial-buyer.svg";
import TestimonialSeller from "../../../assets/images/testimonial-seller.svg";
import TestimonialAgent from "../../../assets/images/testimonial-agent.svg";
import "./styles.scss";
import { bound } from "class-bind";

@injectIntl
class WhyPeopleLoveNobul extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired
  };

  testimonialImageMap = {
    0: TestimonialBuyer,
    1: TestimonialSeller,
    2: TestimonialAgent
  };

  @bound
  renderTestimonials(_, index) {
    return (
      <Testimonial
        key={index}
        image={this.testimonialImageMap[index]}
        title={translate(this.props.intl, `testimonial-title-${index + 1}`)}
        qualification={translate(
          this.props.intl,
          `testimonial-qualification-${index + 1}`
        )}
        description={translate(
          this.props.intl,
          `testimonial-description-${index + 1}`
        )}
      />
    );
  }

  render() {
    return (
      <div className="love-nobul">
        <div className="love-nobul__wrapper">
          <div className="love-nobul__content">
            <h1>
              {translate(
                this.props.intl,
                "home-page.whatPeopleAreSayingAboutNobul"
              )}
            </h1>
            <div className="love-nobul__testimonials">
              {Array.apply(null, Array(3)).map(this.renderTestimonials)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhyPeopleLoveNobul;
