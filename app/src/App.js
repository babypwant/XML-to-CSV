import { useState } from "react";
const txml = require('txml');

const App = () => {
  const [name, setName] = useState("");
  let data = [['property_id', 'account_number', 'name', 'address1', 'city', 'state_prov', 'postal_code', 'primary_contact_id ']];
  let xmlFile;
  let fileReader;

  //I want to make data an array with all info inside of the array
  const handleFileRead = () => {
    const content = fileReader.result;
    xmlFile = txml.simplify(txml.parse(content))
    xmlFile.Table_Facility.T_Facility.forEach((facility) => {
      let metadata = [];
      facility.Facility_ID ? metadata.push(facility.Facility_ID) : metadata.push("none");
      facility.Facility_Account_Number ? metadata.push(facility.Facility_Account_Number) : metadata.push("none");
      facility.Facility_Name ? metadata.push(facility.Facility_Name) : metadata.push("none");
      facility.Service_Address_Full ? metadata.push(facility.Service_Address_Full) : metadata.push("none");
      facility.Service_Address_City ? metadata.push(facility.Service_Address_City) : metadata.push("none");
      facility.Service_Address_State ? metadata.push(facility.Service_Address_State) : metadata.push("none");
      facility.Service_Address_Zip_Code ? metadata.push(facility.Service_Address_Zip_Code) : metadata.push("none");
      facility.Facility_Contact_Mgr_ID ? metadata.push(facility.Facility_Contact_Mgr_ID) : metadata.push("none");
      data.push(metadata);
    });
    let csvContent = ""
      + data.map(e => e.join(",")).join("\n");
    console.log(csvContent)

    let csvData = new Blob([csvContent], { type: 'text/csv' });
    let csvUrl = URL.createObjectURL(csvData);
    let link = document.createElement('a');
    link.href = csvUrl;
    link.target = '_blank';
    link.download = "converted" + '.csv';
    link.click();

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
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </form>
      <div>

      </div>
    </div>
  );
};

export default App;
