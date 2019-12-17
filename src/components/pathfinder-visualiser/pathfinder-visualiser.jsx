import React, { useState} from 'react';
import GridNode from '../grid-node/grid-node';
import Button from '../button/button';
import {dijkstra, getNodesInShortestPathOrder} from '../../algorithms/dijkstra';
import  {GridProvider, useGrid} from '../../context/grid-context'

import './pathfinder-visualiser.css';

function DrawGrid() {
    const [grid, updateGrid] = useGrid()
    return  <div className="grid" 
    //   onMouseDown={() => updateMouseIsPressed(true)} 
    //   onMouseUp={() => updateMouseIsPressed(false)}
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
                    // mouseIsPressed={mouseIsPressed}
                    ></GridNode >
                );
              })}
            </div>
          );
        })}
      </div>
  }



  export default function PathfinderVisualiser() {
    //   const [grid, updateGrid] = useState(getInitialGrid());
    //   const [mouseIsPressed, updateMouseIsPressed] = useState(false)

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
    
    //   function visualizeDijkstra() {
    //       console.log('Do i exist?', grid)
    //     // const {grid} = this.state;
    //     const startNode = grid[START_NODE_ROW][START_NODE_COL];
    //     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //     const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    //     const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    //     animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    //   }
    //   const [mouseIsPressed, updateMouseIsPressed] = useState(false);
      return (
        <>
          <Button 

        //   visualizeDijkstra={() => visualizeDijkstra()}
          >
          </Button>
          <GridProvider>
              <DrawGrid />
          </GridProvider>
        </>
      );

  }
