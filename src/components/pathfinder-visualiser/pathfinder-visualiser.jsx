import React, { useState} from 'react';
import GridNode from '../grid-node/grid-node';
import Button from '../button/button';
import {dijkstra, getNodesInShortestPathOrder} from '../../algorithms/dijkstra';

import './pathfinder-visualiser.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

//   export default function PathfinderVisualiser() {
//     // Declare a new state variable, which we'll call "count"
//     const [count, setCount] = useState(0);
//     const [isToggled, toggleMe ] =useState(false);
  
//     return (
//       <div>
//         <p>You clicked {count} times</p>
//         <button onClick={() => setCount(count + 1)}>
//           Add me
//         </button>
//         <button onClick={() => setCount(count - 1)}>
//           Deduct me
//         </button>
//         <button onClick={() => toggleMe(!isToggled)}>
//          I am {isToggled}
//         </button>
//       </div>
//     );
//   }

  export default function PathfinderVisualiser() {
      const [grid, updateGrid] = useState(getInitialGrid());
      const [mouseIsPressed, updateMouseIsPressed] = useState(false)

    //   function handleMouseDown(row, col) {
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({grid: newGrid, mouseIsPressed: true});
    //   }
    
    //   function handleMouseEnter(row, col) {
    //     if (!this.state.mouseIsPressed) return;
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({grid: newGrid});
    //   }
    
    //   function handleMouseUp() {
    //     this.setState({mouseIsPressed: false});
    //   }
    
      function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
      function animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }
    
      function visualizeDijkstra() {
          console.log('Do i exist?', grid)
        // const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }
    //   const [mouseIsPressed, updateMouseIsPressed] = useState(false);
      return (
        <>
          <Button 
          visualizeDijkstra={() => visualizeDijkstra()}
          >
          </Button>
          <div className="grid" 
          onMouseDown={() => updateMouseIsPressed(true)} 
          onMouseUp={() => updateMouseIsPressed(false)}
          >
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx} className={`row row-${rowIdx}`}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <GridNode 
                        key={nodeIdx}
                        row={row}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        // isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        // onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        // onMouseEnter={(row, col) =>
                        //   this.handleMouseEnter(row, col)
                        // }
                        // onMouseUp={() => this.handleMouseUp()}
                        ></GridNode >
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      );

  }

// export default class PathfinderVisualiser extends Component {
//   constructor() {
//     super();
//     this.state = {
//       grid: [],
//       mouseIsPressed: false,
//     };
//   }

//   componentDidMount() {
//     const grid = getInitialGrid();
//     this.setState({grid});
//   }

  

//   render() {
//     const {grid, mouseIsPressed} = this.state;

//     return (
//         <>
//         </>

//     );
//       <>
//         <Button 
//         visualizeDijkstra={() => this.visualizeDijkstra()}
//         >
//         </Button>
//         <div className="grid">
//           {grid.map((row, rowIdx) => {
//             return (
//               <div key={rowIdx} className={`row row-${rowIdx}`}>
//                 {row.map((node, nodeIdx) => {
//                   const {row, col, isFinish, isStart, isWall} = node;
//                   return (
//                     <GridNode 
//                       key={nodeIdx}
//                       row={row}
//                       col={col}
//                       isFinish={isFinish}
//                       isStart={isStart}
//                       isWall={isWall}
//                       mouseIsPressed={mouseIsPressed}
//                       onMouseDown={(row, col) => this.handleMouseDown(row, col)}
//                       onMouseEnter={(row, col) =>
//                         this.handleMouseEnter(row, col)
//                       }
//                       onMouseUp={() => this.handleMouseUp()}
//                       ></GridNode >
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </div>
//       </>
//     );
//   }
// }
