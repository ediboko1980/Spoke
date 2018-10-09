import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Vector3Input.scss";
import classNames from "classnames";
import NumericInput from "./NumericInput";

export default class Vector3Input extends Component {
  static propTypes = {
    uniformScaling: PropTypes.bool,
    value: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
    }),
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: { x: 0, y: 0, z: 0 },
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      uniformEnabled: props.uniformScaling
    };
  }

  onToggleUniform = e => {
    e.preventDefault();
    this.setState({ uniformEnabled: !this.state.uniformEnabled });
  };

  onChange = (field, fieldValue) => {
    const value = this.props.value;

    let newValue;

    if (this.state.uniformEnabled) {
      newValue = {
        x: fieldValue,
        y: fieldValue,
        z: fieldValue
      };
    } else {
      const x = value ? value.x : 0;
      const y = value ? value.y : 0;
      const z = value ? value.z : 0;

      newValue = {
        x: field === "x" ? fieldValue : x,
        y: field === "y" ? fieldValue : y,
        z: field === "z" ? fieldValue : z
      };
    }

    this.props.onChange(newValue);
  };

  onChangeX = x => this.onChange("x", x);

  onChangeY = y => this.onChange("y", y);

  onChangeZ = z => this.onChange("z", z);

  render() {
    const { uniformScaling, value } = this.props;
    const { uniformEnabled } = this.state;
    const vx = value ? value.x : 0;
    const vy = value ? value.y : 0;
    const vz = value ? value.z : 0;

    const uniformClassName = classNames(styles.uniformButton, uniformEnabled ? styles.uniformEnabled : undefined);

    return (
      <div className={styles.inputGroup}>
        {uniformScaling && <i className={uniformClassName} onClick={this.onToggleUniform} />}
        <div className={styles.label}>X:</div>
        <NumericInput value={vx} onChange={this.onChangeX} />
        <div className={styles.label}>Y:</div>
        <NumericInput value={vy} onChange={this.onChangeY} />
        <div className={styles.label}>Z:</div>
        <NumericInput value={vz} onChange={this.onChangeZ} />
      </div>
    );
  }
}
