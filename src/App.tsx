import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const onDecrease = () => {
    if (count > 0) {
      setCount((prev) => (prev -= 1));
    }
  };

  const onIncrease = () => {
    setCount((prev) => (prev += 1));
  };

  const onReset = () => {
    setCount(0);
  };

  return (
    <div id="app">
      <h1 className="title">counter</h1>
      <span data-cy="count" id="value">
        {count}
      </span>
      <div>
        <button data-cy="decrease" onClick={onDecrease}>
          -
        </button>
        <button data-cy="reset" onClick={onReset}>
          Reset
        </button>
        <button data-cy="increase" onClick={onIncrease}>
          +
        </button>
      </div>
    </div>
  );
}

export default App;
