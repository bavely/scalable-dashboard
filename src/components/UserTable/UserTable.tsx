import React from 'react';
import type { User } from '../../types';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';


interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {

  console.log(users, 'users in table')

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1, sortable: true },
    { field: 'phone', headerName: 'Phone', flex: 1, sortable: true },
    { field: 'website', headerName: 'Website', flex: 1, sortable: true },
    { 
      field: 'city', 
      headerName: 'City', 
      valueGetter: (_value, row) => row.address?.city, 
      flex: 1, 
      sortable: true 
    },
    { 
      field: 'street', 
      headerName: 'Street', 
      valueGetter: (_value, row) => row.address?.street, 
      flex: 1, 
      sortable: true 
    },
    { 
      field: 'suite', 
      headerName: 'Suite', 
      valueGetter: (_value, row) => row.address?.suite, 
      flex: 1, 
      sortable: true 
    },
    { 
      field: 'zipcode', 
      headerName: 'Zipcode', 
      valueGetter: (_value, row) => row.address?.zipcode, 
      flex: 1, 
      sortable: true 
    },
    { 
      field: 'lat', 
      headerName: 'Latitude', 
      valueGetter: (_value, row) => row.address?.geo?.lat, 
      flex: 1, 
      sortable: true 
    },
    { 
      field: 'lng', 
      headerName: 'Longitude', 
      valueGetter: (_value, row) => row.address?.geo?.lng, 
      flex: 1, 
      sortable: true 
    },
    { 
      field: 'company.name', 
      headerName: 'Company Name', 
      valueGetter: (_value, row) => row.company?.name, 
      flex: 1, 
      sortable: true 
    },
   {
    field: 'company.catchPhrase',
    headerName: 'Catch Phrase',
    valueGetter: (_value, row) => row.company?.catchPhrase,
    flex: 1,
    sortable: true
   }
  ]

  return (
    <div role="grid" className="h-[70vh] mx-auto">
    <DataGrid
    className='h-full w-full'
      rows={users}
      columns={columns}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      getRowId={(row) => row.id}
      aria-label="User Table"   
      aria-readonly="true"
      aria-colcount={columns.length}
      aria-rowcount={users.length}
      aria-rowindex={0}
      aria-colindex={0}
      aria-rowspan={1}
    />
    </div>
  );
};

export default UserTable;
