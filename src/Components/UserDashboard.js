import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const UserDashboard = () => {

    const columnDefs = [
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'Role', field: 'role', sortable: true, filter: true },
      ];
    
      const gridOptions = {
        paginationPageSize: 10,
        domLayout: 'autoHeight',
      };

      const data = [
        { name: 'John Doe', role: 'Admin' },
        { name: 'Jane Smith', role: 'User' },
        { name: 'Sam Wilson', role: 'Moderator' },
      ];

    return (  
        <div className="col-12 statsWrapper">
            <div className='mt-3 mb-3 headerWrapper'>
                <h2 className='offset-1 mb-3'>Správa užívateľov</h2>
            </div>
            <div className="d-flex offset-1 col-10 align-items-center">
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={data}
                        gridOptions={gridOptions}
                    />
                </div>
            </div>
        </div>
    );
}
 
export default UserDashboard;