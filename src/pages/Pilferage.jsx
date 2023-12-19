// import { ColumnDirective, ColumnsDirective, KanbanComponent } from '@syncfusion/ej2-react-kanban';
// import React from 'react';

// import { Header } from '../components';
// import { kanbanData, kanbanGrid } from '../data/dummy';

// const Pilferage = () => (
//   <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
//     <Header category="App" title="Kanban" />
//     <KanbanComponent
//       id="kanban"
//       keyField="Status"
//       dataSource={kanbanData}
//       cardSettings={{ contentField: 'Summary', headerField: 'Id' }}
//     >
//       <ColumnsDirective>
//         {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//         {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
//       </ColumnsDirective>
//     </KanbanComponent>
//   </div>
// );

// export default Pilferage;


import { get, ref, set } from 'firebase/database';
import Papa from 'papaparse';
import React, { useState } from 'react';
import { database } from '../firebaseConfig';

const Pilferage = () => {
  const [file, setFile] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      const reader = new FileReader();
      reader.onload = async (event) => {
        const csvData = event.target.result;
        const parsedData = Papa.parse(csvData, { header: true }).data;

        try {
          const response = await fetch('http://127.0.0.1:5000/pilferage', {
            method: 'POST',
            body: JSON.stringify(parsedData),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
          if (response.ok) {
            const responseData = await response.json();
            setApiResponse(responseData);
            const frudsRef = ref(database, 'frudsDetects');
            const frudsSnapshot = await get(frudsRef);
            const currentCount = frudsSnapshot.val() || 0;
        
            // Update Firebase with the incremented count
            set(frudsRef, currentCount + pilferageCount);
        
          } else {
            console.error('Failed to fetch data');
            
            // Retrieve current count from Firebase
              }
        } catch (error) {
          console.error('Error:', error);
        }
        

        setIsLoading(false);
      };

      reader.readAsText(file);
    } else {
      console.error('No file selected');
    }
  };

  const renderColumns = () => {
    if (apiResponse) {
      return Object.keys(apiResponse).map((key) => (
        <div className="column" key={key}>
          <h4>{key}</h4>
          <pre>{JSON.stringify(apiResponse[key], null, 2)}</pre>
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="container">
      <div className="upload-section">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </div>

      <div className="response-section">
        <h3>API Response:</h3>
        <div className="columns-container" style={{ display: 'flex' }}>
          {renderColumns()}
        </div>
      </div>
    </div>
  );
};

export default Pilferage;
