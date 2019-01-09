import React, { PureComponent } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { intlShape } from "react-intl";
import { translate } from "../../utilities/locale";
import { NAME } from "../../../core/api-transform/jobs";
import "./styles.scss";
import CharacterCounter from "../character-counter";

const FormItem = Form.Item;

class EditJobTitle extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    submitNewTitle: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    resetTitle: PropTypes.bool.isRequired,
    form: PropTypes.object
  };

  static defaultProps = {
    form: {}
  };

  state = {
    titleLength: 0
  };

  @bound
  handleSubmit(event) {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newTitle = !values[NAME] ? this.props.title : values;
        this.props.submitNewTitle({ newTitle });
      }
    });
  }

  @bound
  handleCancel() {
    this.props.closeModal();
  }

  @bound
  resetTitleValue() {
    this.props.form.resetFields([NAME]);
  }

  @bound
  editJobTitle(value) {
    this.props.form.setFieldsValue({ [NAME]: value });
  }

  @bound
  validateJobTitle(_, value, callback) {
    this.setState({
      titleLength: value.length
    });
    if (!value || value.length === 0) {
      callback(translate(this.props.intl, "error.titleIsRequired"));
    } else if (value.length > 30) {
      callback(translate(this.props.intl, "error.titleMaxCharacters"));
    } else {
      callback();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetTitle !== this.props.resetTitle) {
      this.resetTitleValue();
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="job-title-form">
          <FormItem className="job-title-form-input">
            {this.props.form.getFieldDecorator(NAME, {
              rules: [{ validator: this.validateJobTitle }],
              initialValue: this.props.title
            })(<Input onChange={this.editJobTitle} />)}
          </FormItem>
          <CharacterCounter limit={30} length={this.state.titleLength} />
          <FormItem>
            <div className="job-title-form-buttons">
              <Button type="secondary" onClick={this.handleCancel}>
                {translate(this.props.intl, "button.cancel")}
              </Button>
              <Button type="primary" htmlType="submit">
                {translate(this.props.intl, "button.submit")}
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(EditJobTitle);
