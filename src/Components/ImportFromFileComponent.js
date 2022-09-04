import { Button } from '@mui/material';
import { React, useState, useEffect } from 'react';

function ImportFromFileComponent() {
  const [selectedFile, setSelectedFile] = useState({});
  const [csvContent, setCsvContent] = useState("");

  useEffect(() => {
    if (selectedFile && selectedFile.name) {
      var reader = new FileReader();

        reader.onload = function(e)
        {
            setCsvContent(e.target.result);
        };

        reader.readAsBinaryString(selectedFile);
      
    }
  }, [selectedFile]);

  useEffect(() => {
    if (csvContent.length > 0) {
      console.log(csvJSON(csvContent));
    }
  }, [csvContent]);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

  const savePointValues = () => {
    console.log('Save');
  };

  function csvJSON(csv){

    var lines=csv.split("\n");
  
    var result = [];

    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
    }
  
    return JSON.stringify(result); //JSON
  }

  return (
    <div>
      <input type="file" name="fileInput" onChange={changeHandler} />
      <Button variant='contained'
        sx={{
          width: '30%',
          margin: 'auto',
          marginTop: '2%',
        }}
        onClick={savePointValues}>
        Save data from file
      </Button>
    </div>
  );
}

export default ImportFromFileComponent;