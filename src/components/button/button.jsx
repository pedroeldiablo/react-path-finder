import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        const {visualizeDijkstra} = this.props;
        return (
            <button onClick={visualizeDijkstra}>
            Visualize Dijkstra's Algorithm
          </button>
        )
    }
}
