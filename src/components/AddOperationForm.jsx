import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {addEditedTask} from '../reducers/taskEditedReducer';

function AddOperationForm(props) {
  const dispatch = useDispatch()
  const tasksEdited = useSelector(state => state.tasksEdited);
  const { length } = tasksEdited;
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const editedTask = {
      timeStart: data.get('timeStart'),
      duration: data.get('duration'),
      operation: data.get('operation'),
      id:length + 1
    };
    dispatch(addEditedTask(editedTask));
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Добавить Операцию</DialogTitle>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='time'
                  autoComplete="given-name"
                  name="timeStart"
                  required
                  fullWidth
                  label="Время Начала"
                  defaultValue={'00:00'}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type='time'
                  required
                  fullWidth
                  label="Длительность"
                  defaultValue={'00:00'}
                  name="duration"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  minRows={2}
                  label="Описание Операции "
                  name="operation"
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

export default AddOperationForm;



