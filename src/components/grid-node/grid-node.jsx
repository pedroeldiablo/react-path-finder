import React, { useState} from 'react';

import './grid-node.css';

export default function GridNode(props) {
    const [isWall, updateIsWall] = useState(false)
    const [isWorking, willWork] = useState("worked")
    const { isFinish, isStart, row , col, isVisited} = props;
    const extraClassName =  isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

    // debugger

    function handleMouseEnter() {
      // debugger
      if (!props.mouseIsPressed) return;
      updateIsWall(!isWall);
      

      // const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      // this.setState({grid: newGrid});
    }

  // render() {
  //   const {
  //     col,
  //     isFinish,
  //     isStart,
  //     isWall,
  //     row
  //     // onMouseDown,
  //     // onMouseEnter,
  //     // onMouseUp,
    
  //   } = this.props;
  //   

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseEnter={() => handleMouseEnter()}

        
        >

        {/* onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}> */}
          
        </div>
    );
  // }
}
