import React, { Component } from 'react';

export default class ReadOnlyInput extends Component {
  render() {
    const { label, value, color } = this.props;
    return (
      <div style={{ marginTop: '1.2rem' }}>
        <label>
          <span>{label}</span>
          <input
            type="text"
            readOnly
            disabled
            value={value}
            style={{ color, fontWeight: 'bold' }}
          ></input>
        </label>
      </div>
    );
  }
}
