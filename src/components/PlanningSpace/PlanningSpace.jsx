import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import { Button, Box } from "@mui/material";
import { removeEditedTask } from '../../reducers/taskEditedReducer';
import AddOperationForm from '../AddOperationForm';


export default function BasicTable() {
  const rows = useSelector((state) => state.tasksEdited);
  const dispatch = useDispatch();
  const handleRemove = (id) => () => {
    dispatch(removeEditedTask({id}));
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          mb: 5,
        }}
      >
        <Typography
          variant='h5'
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          Технологический график
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddCircleOutlineIcon />}
          size='small'
          color='secondary'
          sx={{color: '#fff', boxShadow: 'none'}}
          onClick={handleClickOpen}
        >
          Добавить
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Номер</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Время Начала</TableCell>
              <TableCell>Длительность</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.operation}</TableCell>
                <TableCell>{row.timeStart}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" size='small' sx={{ '&:hover': {color: '#10B981'}}} >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size='small'
                    sx={{ '&:hover': {color: '#f44336'}}}
                    onClick={handleRemove(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddOperationForm 
        open={open}
        onClose={handleClose} 
      />
    </>
  );
}
