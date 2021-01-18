import "./App.css";
import React from "react";
import Slider from "react-input-slider";
import Board from "./components/Board";

const grids = [
  { gameWidth: 200, gameHeight: 200 },
  { gameWidth: 400, gameHeight: 400 },
  { gameWidth: 800, gameHeight: 800 },
];

export default class App extends React.Component {
  state = {
    gameSize: 2,
    gameWidth: grids[2]["gameWidth"],
    gameHeight: grids[2]["gameHeight"],
    speed: 1000,
    resolution: 10,
    running: false,
    drawGrid: false,
  };

  start = () => {
    this.setState({
      running: true,
    });
  };

  checkboxChange = (e) => {
    this.setState({
      drawGrid: e.target.checked ?? false,
    });
  };

  selectChange = (e) => {
    this.setState({
      gameSize: parseInt(e.target.value),
      gameWidth: grids[parseInt(e.target.value)]["gameWidth"],
      gameHeight: grids[parseInt(e.target.value)]["gameHeight"],
    });
  };

  render() {
    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="settings">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <label htmlFor="checkbox">Сетка</label>
                <input
                  id="checkbox"
                  type="checkbox"
                  value={this.state.drawGrid}
                  onChange={this.checkboxChange}
                />
              </div>
              <select value={this.state.gameSize} onChange={this.selectChange}>
                <option value={0}>Small</option>
                <option value={1}>Medium</option>
                <option value={2}>Large</option>
              </select>
              <button onClick={this.start} className="btn btn-primary">
                Start
              </button>
            </div>
            <label htmlFor="slider">Скорость от низкой к высокой</label>
            <Slider
              id="slider"
              axis="x"
              xstep={10}
              xmin={0}
              xmax={1000}
              x={this.state.speed}
              onChange={({ x }) =>
                this.setState({ speed: parseFloat(x.toFixed(2)) })
              }
            />
          </div>
          <div
            className="board"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Board
              gameWidth={this.state.gameWidth}
              gameHeight={this.state.gameHeight}
              speed={this.state.speed}
              resolution={this.state.resolution}
              running={this.state.running}
              drawGrid={this.state.drawGrid}
            />
          </div>
        </div>
      </div>
    );
  }
}
