import React, { Component } from "react";
import { Form, Modal } from "antd";
import { bound } from "class-bind";
import PropTypes from "prop-types";
import { intlShape } from "react-intl";

import { translate } from "../../../../../utilities/locale";
import {
  toggleSelectedNeighborhoodsHelper,
  allNeighborhoodsSelected
} from "../../../../city-select-checkbox/utilities";
import CreatePolygonMap from "../../../../../components/create-polygon-map";
import { ALL } from "../../../../../../core/constants/shared";

import "./styles.scss";

@Form.create({})
class EditRegions extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    provinceOrState: PropTypes.string,
    intl: intlShape.isRequired,
    displayMap: PropTypes.bool,
    showSelectCity: PropTypes.bool,
    notAgentProvinceOrStateError: PropTypes.bool,
    polygons: PropTypes.object.isRequired,
    selectedPolygons: PropTypes.object,
    handleLocationInputChange: PropTypes.func,
    onPolygonClick: PropTypes.func,
    setMapData: PropTypes.func.isRequired,
    onRemoveRegion: PropTypes.func,
    discardLocationChanges: PropTypes.func.isRequired,
    updateLocations: PropTypes.func.isRequired,
    setSelectedPolygons: PropTypes.func.isRequired,
    handlePolygonMouseOver: PropTypes.func,
    isPolygonSelected: PropTypes.bool
  };

  static defaultProps = {
    selectedPolygons: {},
    provinceOrState: "",
    displayMap: false,
    showSelectCity: false,
    isPolygonSelected: false,
    notAgentProvinceOrStateError: false
  };

  @bound
  toggleNeighborhoods(e) {
    const selectAll = e.currentTarget.checked;
    const mapPolygons = this.getPolygonLayers();

    toggleSelectedNeighborhoodsHelper({
      selectAll,
      mapPolygons,
      currentPolygons: this.props.selectedPolygons,
      setPolygons: this.props.setSelectedPolygons
    });
  }

  @bound
  isCityCheckboxChecked() {
    // No need to do anything if we can't see the checkbox.
    if (!this.props.showSelectCity) {
      return false;
    }
    const mapPolygons = this.getPolygonLayers();

    return allNeighborhoodsSelected({
      mapPolygons,
      currentPolygons: this.props.selectedPolygons
    });
  }

  @bound
  getPolygonLayers() {
    return this.props.provinceOrState
      ? this.props.polygons.boundaries[this.props.provinceOrState]
      : {};
  }

  render() {
    return (
      <Modal
        title={translate(this.props.intl, "offerSettings.editRegionsTitle")}
        visible={this.props.displayMap}
        onCancel={this.props.discardLocationChanges}
        width="100%"
        footer={null}
        className="edit-regions"
        centered
      >
        <div className="edit-regions__container">
          <CreatePolygonMap
            form={this.props.form}
            jobType={ALL}
            intl={this.props.intl}
            polygons={this.props.polygons}
            selectedPolygons={this.props.selectedPolygons}
            onPolygonClick={this.props.onPolygonClick}
            setMapData={this.props.setMapData}
            provinceOrState={this.props.provinceOrState}
            onRemoveRegion={this.props.onRemoveRegion}
            setSelectedPolygons={this.props.setSelectedPolygons}
            showSelectCity={this.props.showSelectCity}
            handlePolygonMouseOver={this.props.handlePolygonMouseOver}
            isPolygonSelected={this.props.isPolygonSelected}
            handleLocationInputChange={this.props.handleLocationInputChange}
            handleSubmit={this.props.updateLocations}
            polygonLayers={this.getPolygonLayers()}
            toggleNeighborhoods={this.toggleNeighborhoods}
            hidePreviousStepButton
            isCityCheckboxChecked={this.isCityCheckboxChecked()}
            autosize
            isAgentSettingButton
            notAgentProvinceOrStateError={
              this.props.notAgentProvinceOrStateError
            }
          />
        </div>
      </Modal>
    );
  }
}

export default EditRegions;
