import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { addOperation, updateOperation } from '../reducers/operationReducer';
import { closeDialog } from '../reducers/uiReducer';
import apiRoutes from '../routes';

function AddErrorForm(props) {
  const dispatch = useDispatch()
  const { dialogs } = useSelector(state => state.ui);
  const { operation } = dialogs;
  const { onClose, open } = props;

  const handleClose = () => {
    dispatch(closeDialog({dialogName: 'operation' }));
  };

  const handleSubmit = (operationDialog) => async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      name: data.get('name'),
      info: data.get('info'),
      solution: data.get('solution'),
      detectionTime: 234,
      id_ho:1
    };
    const url = apiRoutes('addNewOperationError');
    // const operation = operationDialog.mode === 'add' ? newData : { id: operationDialog.data.id, ...newData};
    try {
      const response = await axios.post(url, newData);
      alert('Добавлена ошибка')
    //   operationDialog.mode === 'add' ? dispatch(addOperation(operation)) : dispatch(updateOperation(operation));
    } catch (e) {
      alert(e);
    }
    handleClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{operation.mode === 'add' ? 'Добавить операцию': ' Редактировать операцию'}</DialogTitle>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit(operation)} sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  defaultValue={operation.mode === 'edit' ? operation.data.timeStart : ''}
                  label="Название ошибки"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="info"
                  required
                  fullWidth
                  label="Описание ошибки"
                  multiline
                  maxRows={4}
                  minRows={2}
                  defaultValue={operation.mode === 'edit' ? operation.data.duration : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  defaultValue={operation.mode === 'edit' ? operation.data.description : ''}
                  maxRows={4}
                  minRows={2}
                  label="Решение"
                  name="solution"
                  sx={{mb: 2}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='secondary'
              sx={{ mt: 3, mb: 2, color: '#fff', boxShadow: 'none' }} 
            >
              {operation.mode === 'add' ? 'Добавить': ' Редактировать'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
}

export default AddErrorForm;


