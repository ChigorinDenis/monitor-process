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

function AddErrorGuides(props) {
  const dispatch = useDispatch()
  const { dialogs } = useSelector(state => state.ui);
  
  const handleClose = () => {
    dispatch(closeDialog({dialogName: 'errorGuides' }));
  };

  const handleSubmit  = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = {
      manifestation: data.get('manifestation'),
      search: data.get('search'),
      removal: data.get('removal'),
      control: data.get('control'),
    };
    const url = apiRoutes('addNewErrorGuide')(dialogs?.errorGuides?.data?.id_operation);
    try {
      const response = await axios.post(url, newData);
      alert('Добавлена ошибка')
    } catch (e) {
      alert(e);
    }
    handleClose();
  };
  return (
    <Dialog onClose={handleClose} open={dialogs.errorGuides.open}>
      <DialogTitle>Руководство по ошибкам</DialogTitle>
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="manifestation"
                  required
                  fullWidth
                  label="Проявление ошибки"
                  maxRows={4}
                  minRows={2}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="search"
                  required
                  fullWidth
                  label="Способ отыскания"
                  multiline
                  maxRows={4}
                  minRows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={2}
                  label="Способ устранения"
                  name="removal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={2}
                  label="Контроль"
                  name="control"
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
        </Box>
      </Container>
    </Dialog>
  );
}

export default AddErrorGuides;



