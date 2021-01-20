import React, { Component } from 'react';

export default class RepairForm extends Component {
  render() {
    return ( 
      <form  onSubmit={(e) => this.props.add(e)} >
        <input
          name="repairInput"
          className="new-repair"
          placeholder="What needs to be repaired?"
          autoFocus=""
          value={this.props.value}
          onChange={(e) => this.props.update(e)}
        />
      </form>
    )
  }
}
