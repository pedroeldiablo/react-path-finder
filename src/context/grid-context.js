import React from 'react'

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

const GridContext = React.createContext()

    function useGrid() {
    const context = React.useContext(GridContext)
    if (!context) {
        throw new Error(`useGrid must be used within a GridProvider`)
    }
    return context
    }

    function GridProvider(props) {
        const [grid, updateGrid] = React.useState(getInitialGrid());
        // const [mouseIsPressed, updateMouseIsPressed] = useState(false)
        // const [count, setCount] = React.useState(0)
        const value = React.useMemo(() => [grid, updateGrid], [grid])
        return <GridContext.Provider value={value} {...props} />
      }

      export {GridProvider, useGrid}
