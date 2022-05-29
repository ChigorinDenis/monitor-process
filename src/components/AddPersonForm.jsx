import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SelectChip from '../components/SelectChip';
import { addPerson } from '../reducers/personReducer';
import { addRoles } from '../reducers/roleReducer';
import apiRoutes from '../routes';

function AddPersonForm(props) {
  const dispatch = useDispatch();
  const rolesData  = useSelector(state => state.roles);
  useEffect(() => {
    const fetchData = async () => {
      const url = apiRoutes('getRoles');
      try {
        const response = await axios.get(url);
        dispatch(addRoles(response.data));
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const { onClose, open } = props;
  const [post, setPost] = React.useState('');
  const [roles, setRoles] = React.useState([]);

  const handleChange = (event) => {
    setPost(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      fio: data.get('fio'),
      username: data.get('username'),
      password:  data.get('password'),
      passwordConfirm:  data.get('passwordConfirm'),
      post,
      roles: roles.map((name) => ({ name }))
    };
    const url = apiRoutes('addNewUser');
    try {
      const response = await axios.post(url, user);
      dispatch(addPerson(user));
    } catch (err) {
      console.log(err);
    }
    onClose();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Добавить Пользователя</DialogTitle>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ФИО"
                  name="fio"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Имя пользователя"
                  name="username"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="add-post-select-label">Должность</InputLabel>
                  <Select
                    labelId="add-post-select-label"
                    id="add-post-select"
                    value={post}
                    label="Должность"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Инженер'}>Инженер</MenuItem>
                    <MenuItem value={'Главный конструктор'}>Главный конструктор</MenuItem>
                    <MenuItem value={'Руководитель работ'}>Руководитель работ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type='password'
                  required
                  fullWidth
                  label="Пароль"
                  name="password"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type='password'
                  required
                  fullWidth
                  label="Подтверждение пароля"
                  name="passwordConfirm"
                />
              </Grid>
              <Grid item xs={12}>
                <SelectChip
                  item={roles}
                  data={rolesData}
                  setItem={setRoles}
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

export default AddPersonForm;



