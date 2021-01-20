import React, { Component } from 'react'


export default class Reapir extends Component {

  render() {
    return (
      <ul className="repair-list">
        {this.props.repairs.map(repair => (
          <li key={repair.id} className={repair.completed ? "completed" : ""} id={repair.id}>
            <div className="view">
              <input
                onClick={(e) => this.props.check(e)}
                className="toggle"
                type="checkbox"
                readOnly
              />
              <label>{repair.task}</label>
              <button className="destroy" onClick={() => this.props.delete(repair)}></button>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}
