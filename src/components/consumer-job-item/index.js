import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import { List, Icon, Row, Col, Modal } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BathroomNoBorder } from "../bath-icon";
import { BedIconNoBorder } from "../bed-icon";
import moment from "moment";
import { bound } from "class-bind";
import "./styles.scss";
import DefaultIcon from "../../assets/images/default-listing-image.png";
import TrashIcon from "react-icons/lib/fa/trash-o";
import { translate } from "../../utilities/locale";
import { NAME, JOB_TYPE } from "../../../core/api-transform/jobs";
import { JOB_OPEN } from "../../../core/constants/jobs";
import EditJobTitle from "../../components/edit-job-title";
import ConsumerJobDeleteConfirmation from "../../components/consumer-job-delete-confirmation";
import { url } from "../../routes/myNobul";

class ConsumerJobItem extends Component {
  state = {
    jobTitle: "",
    editModalVisible: false,
    resetTitleInput: false,
    confirmationModalVisible: false
  };

  static propTypes = {
    job: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    deleteJob: PropTypes.func.isRequired,
    updateJob: PropTypes.func.isRequired
  };

  @bound
  editTitle(event) {
    event.preventDefault();
    this.setState({
      editModalVisible: true,
      resetTitleInput: false
    });
  }

  @bound
  handleTitleSubmit({ newTitle }) {
    this.closeEditModal();
    const jobData = {
      [JOB_TYPE]: this.props.job.jobType,
      [NAME]: newTitle[NAME]
    };
    this.props.updateJob({ jobData, jobId: this.props.id });
  }

  @bound
  closeEditModal() {
    this.setState({
      editModalVisible: false,
      resetTitleInput: true
    });
  }

  @bound
  deleteJobModalHandle(event) {
    event.preventDefault();
    this.setState({
      confirmationModalVisible: true
    });
  }

  @bound
  closeConfirmationModal() {
    this.setState({
      confirmationModalVisible: false
    });
  }

  render() {
    const { job, intl, id } = this.props;
    const title = job.name ? job.name : translate(intl, "defaultTitle");
    const description = job.status === JOB_OPEN && job.description;
    const date = moment(job.createdAt).format("LL");
    const bath = job.bathrooms || 0;
    const bed = job.bedrooms || 0;
    const location = job.regions[Object.keys(job.regions)[0]].name;
    const imageSource = DefaultIcon;
    const propertyType = translate(intl, job.propertyType);
    const offerCount = !job.offerCount ? 0 : job.offerCount;
    const jobType = job.jobType;

    return (
      <div className="job">
        <Modal
          title={translate(intl, "editPostingTitle")}
          visible={this.state.editModalVisible}
          footer={null}
          onCancel={this.closeEditModal}
        >
          <EditJobTitle
            intl={this.props.intl}
            submitNewTitle={this.handleTitleSubmit}
            closeModal={this.closeEditModal}
            title={title}
            resetTitle={this.state.resetTitleInput}
          />
        </Modal>
        <Modal
          title={translate(intl, "offer.confirmation")}
          visible={this.state.confirmationModalVisible}
          footer={null}
          onCancel={this.closeConfirmationModal}
        >
          <ConsumerJobDeleteConfirmation
            intl={this.props.intl}
            closeModal={this.closeConfirmationModal}
            deleteJob={this.props.deleteJob}
            jobType={this.props.job.jobType}
            jobId={this.props.id}
          />
        </Modal>
        <Link to={`${url.partialConsumerJobDetails}/${jobType}/${id}`}>
          <List.Item>
            <Row>
              <Col span={4} className="job-picture">
                <img src={imageSource} />
              </Col>
              <Col span={8}>
                <Row className="job-first">
                  <Col span={6}>
                    <Col span={10}>
                      <strong>
                        <p className="job-first-title">{title}</p>
                      </strong>
                      <p className="job-first-propertyType">
                        <small>{propertyType}</small>
                      </p>
                    </Col>
                    <Col span={2}>
                      <Icon onClick={this.editTitle} type="edit" />
                    </Col>
                  </Col>
                  <Col span={3}>
                    <p className="job-first-job-date">
                      <small>{date}</small>
                    </p>
                  </Col>
                  <Col span={3}>
                    <p className="job-first-closed">{job.status}</p>
                  </Col>
                </Row>
                <Row className="job-second">
                  <Col span={12}>
                    <Col span={12}>
                      <p className="job-second-description">{description}</p>
                    </Col>
                  </Col>
                </Row>
                <Row className="job-third">
                  <Col span={12}>
                    <Col span={4}>
                      <Icon type="compass" /> {location}
                    </Col>
                    <Col span={5}>
                      {"$"}
                      {job.priceRangeLow} - {"$"}
                      {job.priceRangeHigh}
                    </Col>
                    <Col span={2}>
                      <BathroomNoBorder />
                      <span className="job-third-bathCount">{bath}</span>
                      <BedIconNoBorder />
                      <span className="job-third-bedCount">{bed}</span>
                    </Col>
                    <Col span={1}>
                      <TrashIcon
                        size={16}
                        onClick={this.deleteJobModalHandle}
                      />
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Col
              span={2}
              style={{ textAlign: "center" }}
              className="job-fourth"
            >
              <h2>{offerCount}</h2>
              <p>{translate(intl, "proposals")}</p>
            </Col>
          </List.Item>
        </Link>
      </div>
    );
  }
}

export default injectIntl(ConsumerJobItem);
