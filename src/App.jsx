import { useState } from "react";
import "./App.css";
import { useRef } from "react";
import clickSound from "./ClickSound.m4a";
import success from "./success.m4a";

function App() {

  const [turn, setTurn] = useState("X");
  const [winner,setWinner] = useState(false)
  let count = useRef(0);
  const [matrix, setMatrix] = useState([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

const audio_click = new Audio(clickSound);
const audio_success = new Audio(success);

  function handler(r, c) {
    audio_click.play();
    let temMat = [...matrix];
    temMat[r][c] = turn;
    setMatrix(temMat);
    setTurn((t) => (t === "X" ? "O" : "X"));
    count.current += 1;
    checkWin();
  }

  function checkWin() {
    for (let i = 0; i < 3; i++) {
      let j = 0;
      if ( matrix[i][j] === matrix[i][j + 1] && matrix[i][j + 1] === matrix[i][j + 2]) {
       console.log("same in row",);
       setWinner(matrix[i][j]);
       audio_success.play();
       return
      }
      if (matrix[j][i] === matrix[j + 1][i] &&matrix[j + 1][i] === matrix[j + 2][i]) {
        console.log("same in column");
        setWinner(matrix[j][i])
        audio_success.play();
        return
      }
    }
    if ((matrix[0][0] === matrix[1][1] &&matrix[1][1] === matrix[2][2])||(matrix[0][2] === matrix[1][1] &&matrix[1][1] === matrix[2][0])) {
      console.log("same in cross");
      setWinner(matrix[1][1])
      audio_success.play();
      return
    }
    if(count.current === 9) {
      audio_success.play();
      setWinner("daw")
      }
  }

  function reset() {
    count.current = 0;
    console.clear();
    setWinner(false);
    setTurn("X")
    setMatrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  }
  return (
    <div className="app">
      {!winner?<>
        <h1>Now <span>{turn}</span> turn</h1>
        <div className="box">
          {matrix.map((row, rindex) => (
            <div className="row">
              {row.map((c, cindex) => (
                <div
                  className={`cell ${matrix[rindex][cindex] > 0 && "cell-hov"}`}
                  onClick={ matrix[rindex][cindex] > 0? () => handler(rindex, cindex): null}
                >
                  {matrix[rindex][cindex] > 0 ? "" : c}
                </div>
              ))}
            </div>
          ))}
        </div>
      </>:winner==="daw"?<h1>Match is Draw</h1>:<h1>Winner is {winner}</h1>

      }
      

      <h1 className="clicked">Total clicked : {count.current}</h1>
      <button onClick={reset}>Reset</button>
      <p>Developed by chandru</p>
    </div>
  );
}

export default App;
