import { useState } from "react";
const txml = require('txml');

const App = () => {
  const [name, setName] = useState(0);
  const [selectedFile, setSelectedFile] = useState("");
  let data;
  let fileReader;

  const handleFileRead = () => {
    const content = fileReader.result;
    data = txml.parse(content)
    console.log(data);
  };

  const handleUpload = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          value={selectedFile}
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </form>
      <div>

      </div>
    </div>
  );
};

export default App;
