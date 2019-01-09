import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import {
  SUBMIT_TYPE,
  PREFILL_TYPE,
  LOADED
} from "../../../core/constants/shared";
import "./styles.scss";

class PDFViewer extends Component {
  // React events
  componentDidMount = () => {
    window.addEventListener("message", this.receiveMessage, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener("message", this.receiveMessage);
    this.pdfEditor.removeEventListener("load", this.initializePDF);
  };

  // Set reference
  setPDFEditorRef = element => {
    this.pdfEditor = element || this.pdfEditor;
    this.pdfEditor.addEventListener("load", this.initializePDF);
  };

  initializePDF = () => {
    const { prefillData } = this.props;
    this.prefill(prefillData);
  };

  // messaging events
  receiveMessage = message => {
    const { onSubmit } = this.props;
    const { data } = message;
    const { messageType, messageData } = data;

    switch (messageType) {
      case SUBMIT_TYPE:
        onSubmit(messageData.formData, messageData.pdfBlob);
        break;
      case LOADED:
        this.initializePDF();
        break;
    }
  };

  sendMessageToEditor = (messageType, messageData) => {
    const message = {
      messageType,
      messageData
    };

    this.pdfEditor.contentWindow.postMessage(message, "*");
  };

  prefill = prefillData => {
    this.sendMessageToEditor(PREFILL_TYPE, prefillData);
  };

  submitPDF = () => {
    this.sendMessageToEditor(SUBMIT_TYPE);
  };

  render() {
    const { source, buttonText } = this.props;
    const viewerPath = `${
      process.env.PDF_VIEWER_LOCATION // eslint-disable-line
    }/?source=${encodeURIComponent(source)}`;

    return (
      <div className="pdf-holder">
        <div className="pdf-holder-tools">
          <Button onClick={this.submitPDF} type="primary">
            {buttonText}
          </Button>
        </div>
        <iframe
          style={{ height: "100%", width: "100%" }}
          src={viewerPath}
          ref={this.setPDFEditorRef}
        />
      </div>
    );
  }
}

PDFViewer.propTypes = {
  buttonText: PropTypes.string,
  source: PropTypes.string, // Path to PDF
  prefillData: PropTypes.object, // Object to prefill PDF form
  onSubmit: PropTypes.func // WHat to do once submitted,
};
export default PDFViewer;
