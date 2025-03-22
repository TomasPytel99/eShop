import React, { useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import '../Styles/UserDashboard.css'
import api from '../api'
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const UserDashboard = () => {
    const gridOptions = {};
    const data = [{meno: 'Jano', rola: 'Uzivatel', gitary: true}]
    const columnDefs = [
        { headerName: 'Meno', field: 'meno', sortable: true, flex: 1},
        { headerName: 'Priezvisko', field: 'priezvisko', sortable: true, flex:1.2},
        { headerName: 'Email', field: 'email', sortable: true, flex: 1},
        { headerName: 'Rola', field: 'rola', sortable: true, flex: 1.3, 
                            cellEditor: 'agSelectCellEditor',
                            cellEditorParams: {
                                values: ['Admin', 'Spravca kategorie', 'Uzivatel'],
                            },
                            editable: true},
        { headerName: 'Gitary', field: 'gitary', sortable: true, flex: 1, cellEditor: "agCheckboxCellEditor", editable: true},
        { headerName: 'Husle', field: 'husle', sortable: true, flex: 1, cellEditor: "agCheckboxCellEditor",},
        { headerName: 'Klávesy', field: 'klavesy', sortable: true, flex: 1, cellEditor: "agCheckboxCellEditor",},
        { headerName: 'Bicie', field: 'bicie', sortable: true, flex: 1, cellEditor: "agCheckboxCellEditor",},
        { headerName: 'Harfy', field: 'harfy', sortable: true, flex: 1,cellEditor: "agCheckboxCellEditor",editable: true},
        { headerName: 'Dychy', field: 'dychy', sortable: true, flex: 1},
        { headerName: 'Akordeóny', field: 'akordeony', sortable: true, flex: 1.2},
        { headerName: 'Príslušenstvo', field: 'prislusenstvo', sortable: true, flex: 1.4},
      ];

      useEffect(()=> {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/getUsers',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                data = response.data;
            } catch(error) {
                alert('nigga');
            }
        }
        fetchUsers();
      }, [])
    
    return (  
        <div className="col-12 statsWrapper">
            <div className='mt-3 mb-3 headerWrapper'>
                <h2 className='ms-5 mb-3'>Správa užívateľov</h2>
            </div>
            <div className="d-flex mx-5 col-11 align-items-start tableContainer">
                <div className="ag-theme-alpine" style={{ height: '97%', width: '100%' }}>
                    <AgGridReact
                        key={data?.length || 0}
                        columnDefs={columnDefs}
                        rowData={data}
                        noRowsOverlayComponent={() => <div>No data available</div>}
                    />
                </div>
            </div>
        </div>
    );
}
 
export default UserDashboard;