import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
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
import { removeUser} from '../../reducers/authReducer';
import AddPersonForm from "../AddPersonForm";
import apiRoutes from '../../routes';

const PersonalSpace = () => {
  const rows = useSelector(ui => ui.auth).users;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {   
  //       const response = await axios.get(apiRoutes['getBlocks']());    
  //       console.log(response.data);
  //     } catch(err) {    
  //       console.log(err);
  //     }
  //   }
  //  fetchData();
  // }, []);
  const dispatch = useDispatch();
  const handleRemove = (id) => () => {
    dispatch(removeUser({id}));
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const renderChip = (name) => {
    if (name === 'админ') {
      return (
        <Chip label={name} color="error" variant="outlined" />
      );
    }
    if (name === 'пользователь') {
      return (
        <Chip label={name} color="secondary" variant="outlined" />
        
      );
    }
    return (
      <Chip label={name} sx={{color: '#0288d1', borderColor: '#0288d1'}} variant="outlined" />
    );
  }
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
          Персонал
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
              <TableCell>ФИО</TableCell>
              <TableCell>Имя Пользователя</TableCell>
              <TableCell>Должность</TableCell>
              
              <TableCell>Роли</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.fio}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.post}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {row.roles.map(renderChip)}
                  </Stack>
                </TableCell>
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
      <AddPersonForm
        open={open}
        onClose={handleClose}
      />
    </>
    
  )
}

export default PersonalSpace;