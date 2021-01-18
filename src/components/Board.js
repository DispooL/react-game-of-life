import React from 'react'

export default class Board extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ctx: null,
            grid: null,
            columns: null,
            rows: null
        }
        this.canvas = React.createRef();
    }

    componentDidMount(){
        this.drawCanvas();
    }

    componentDidUpdate(prevProps){
        if (!prevProps.running && this.props.running){
            console.log("update");
            this.runIteration();
        }
        if (prevProps.gameHeight != this.props.gameHeight){
            this.drawCanvas();
        }
    }

    runIteration = () => {
        if (this.props.running){
            const newGrid = this.nextGen();
            this.setState({
                grid: newGrid
            }, () => {
                // После того как обновили сетку, рисуем её
                this.drawGrid();
                setTimeout(this.runIteration, this.props.speed);
            });
        }
    }

    nextGen = () => {
        const grid = this.state.grid;
        const rows = this.state.rows;
        const columns = this.state.columns;

        const newGrid = grid.map(arr => [...arr]);

        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
              const cell = grid[col][row];
              let numNeighbours = 0;
              for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                  if (i === 0 && j === 0) {
                    continue;
                  }
                  const x_cell = col + i;
                  const y_cell = row + j;
        
                  if (x_cell >= 0 && y_cell >= 0 && x_cell < columns && y_cell < rows) {
                    const currentNeighbour = grid[col + i][row + j];
                    numNeighbours += currentNeighbour;
                  }
                }
              }
        
              // Правила
              if (cell === 1 && numNeighbours < 2) {
                newGrid[col][row] = 0;
              } else if (cell === 1 && numNeighbours > 3) {
                newGrid[col][row] = 0;
              } else if (cell === 0 && numNeighbours === 3) {
                newGrid[col][row] = 1;
              }
            }
          }
        return newGrid;
    }

    drawCanvas = () => {
      // Создаем canvas
      this.state.ctx = this.canvas.current.getContext("2d");
      this.canvas.current.width = this.props.gameWidth;
      this.canvas.current.height = this.props.gameHeight;

      // Создаем первоначальную разметку
      const rows = this.props.gameHeight / this.props.resolution;
      const columns = this.props.gameWidth / this.props.resolution;
      this.setState({
          columns: columns,
          rows: rows,
          grid: new Array(columns).fill(null)
          .map(() => new Array(rows).fill(null)
          .map(() => Math.floor(Math.random() * 2)))
      }, () => {
          this.drawGrid();
      });
    }

    drawGrid = () => {
        const resolution = this.props.resolution;
        const ctx = this.state.ctx;
        const grid = this.state.grid;

        for (let col = 0; col < grid.length; col++) {
            for (let row = 0; row < grid[col].length; row++) {
              const cell = grid[col][row];
        
              ctx.beginPath();
              ctx.rect(col * resolution, row * resolution, resolution, resolution);
              ctx.fillStyle = cell ? 'black' : 'white';
              ctx.fill();
              if (this.props.drawGrid){
                ctx.stroke();
              }
            }
        }
    }

    render(){
        return (
            <canvas ref={this.canvas}></canvas>
        );
    }
}