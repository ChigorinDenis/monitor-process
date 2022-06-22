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
  const { dialogs, selectedOperation } = useSelector(state => state.ui);
  const { operation } = dialogs;
  const { guide } = props;

  const handleClose = () => {
    dispatch(closeDialog({dialogName: 'guides' }));
  };

  const handleSubmit = (operationDialog) => async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      name: data.get('name'),
      info: data.get('info'),
      solution: data.get('solution'),
      detectionTime: 234,
      id_ho: selectedOperation.id_history
    };
    const url = apiRoutes('addNewOperationError');
    try {
      const response = await axios.post(url, newData);
      alert('Добавлена ошибка')
    } catch (e) {
      alert(e);
    }
    handleClose();
  };
  return (

          <Box component="form" noValidate onSubmit={handleSubmit(operation)} sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  autoFocus
                  multiline
                  maxRows={4}
                  minRows={2}
                  placeholder="Название ошибки"
                  defaultValue={guide.manifestation}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="info"
                  required
                  fullWidth
                  placeholder="Описание ошибки"
                  multiline
                  maxRows={4}
                  minRows={2}
                  defaultValue={guide.search}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={2}
                  placeholder="Решение"
                  name="solution"
                  defaultValue={guide.removal}
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
              Добавить
            </Button>
          </Box>
        
  );
}

export default AddErrorForm;



