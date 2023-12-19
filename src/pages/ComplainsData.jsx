import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { database } from '../firebaseConfig';

const ComplainsData = () => {
  const [firebaseData, setFirebaseData] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, 'Complains');
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(([id, data]) => ({ id, ...data }));
          setFirebaseData(userArray);
        } else {
          console.log("No Data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = firebaseData.length > 0 ? Object.keys(firebaseData[0]) : [];

  const imageTemplate = (props) => {
    return (
      <div>
        {props.imageBase64 && (
          <img
            src={props.imageBase64}
            alt="Preview"
            style={{ width: '50px', height: 'auto', cursor: 'pointer' }}
            onClick={() => window.open(props.imageBase64, '_blank')}
          />
        )}
      </div>
    );
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={firebaseData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={{ persistSelection: true }}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        allowSorting
      >
        <ColumnsDirective>
          {columns.map((column, index) => (
            <ColumnDirective
              key={index}
              field={column}
              headerText={column}
              template={column === 'imageBase64' ? imageTemplate : undefined}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default ComplainsData;
