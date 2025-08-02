import React, { useState, useMemo, useCallback } from 'react';
import type { User } from '../../types';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import Modal from '../Shared/Modal';


interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = useCallback((user: User) => {
    setOpen(true);
    setSelectedUser(user);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);


  const columns: GridColDef[] = useMemo(() => [
    { field: 'name', headerName: 'Name', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1, sortable: true },
    { field: 'phone', headerName: 'Phone', flex: 1, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Button
          variant="text"
          aria-label="View Details"
          color="secondary"
          onClick={() => handleClickOpen(params.row)}
        >
          View Details
        </Button>
      ),
    },
  ], [handleClickOpen]);

  return (
    <Box role="grid" sx={{
      display: 'table',
      flexDirection: 'column',
      tableLayout:"fixed",
      height: '70vh',
      maxHeight: '70vh',
      width: '100%',
      maxWidth: '100%',
      mx: 'auto',
      overflow: 'hidden',
      
    }} >
  
    <DataGrid
    className='h-[70vh] max-h-[70vh] w-[100%] max-w-[100%]'
      rows={users}
      columns={columns}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      getRowId={(row) => row.id}
      onRowClick={(params) => handleClickOpen(params.row)}
      
      aria-label="User Table"
      aria-readonly="true"
      aria-colcount={columns.length}
      aria-rowcount={users.length}
    />
    <Modal open={open}  handleClose={handleClose} user={selectedUser as User} />
    </Box>
  );
};

export default UserTable;
