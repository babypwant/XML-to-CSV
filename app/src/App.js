import { useState } from "react";
function App() {
  const [file, setFile] = ({ });
  const getData = () => {
    console.log("here")
  };

  return (
    <div>
      <h1>Hello from App</h1>
      <input
        onChange={getData}
        type="file">
      </input>
    </div>
  );
}

export default App;
