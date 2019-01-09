import React, { PureComponent } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { bound } from "class-bind";
import { translate } from "../../utilities/locale";
import { DESCRIPTION } from "../../../core/constants/shared";
import "./styles.scss";

const FormItem = Form.Item;
const { TextArea } = Input;
class PropertyDescription extends PureComponent {
  static propTypes = {
    intl: PropTypes.any,
    submitPostingJob: PropTypes.func.isRequired,
    closeModal: PropTypes.func,
    form: PropTypes.object
  };

  static defaultProps = {
    closeModal: () => {},
    form: {}
  };

  @bound
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitPostingJob({ text: values });
      }
    });
  }

  @bound
  handleCancel() {
    this.props.closeModal();
  }

  @bound
  setDescription(value) {
    this.props.form.setFieldsValue({ [DESCRIPTION]: value });
  }

  render() {
    const { intl } = this.props;

    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          className="property-description-form"
        >
          <FormItem className="property-description-form-textarea">
            {this.props.form.getFieldDecorator(DESCRIPTION, {})(
              <TextArea
                onChange={this.setDescription}
                rows={7}
                placeholder={translate(intl, "sellDescriptionPlaceholder")}
              />
            )}
          </FormItem>
          <FormItem>
            <div className="property-description-form-buttons">
              <Button type="secondary" onClick={this.handleCancel}>
                {translate(intl, "button.cancel")}
              </Button>
              <Button type="primary" htmlType="submit">
                {translate(intl, "button.submit")}
              </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(PropertyDescription);
