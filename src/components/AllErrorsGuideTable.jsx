import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';


function  AllErrorsGuideTable(props) {
  const { open, setOpen } = props;

  const [errorGuides, setErrorGuides] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [value, setValue ] = React.useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {   
        const response = await axios.get('http://localhost:8081/constructor/get-error-guides-for-all-operations');
        setErrorGuides(response.data);
        setFiltered(response.data);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, []);
  
  const handleChange = (event) => {
    setValue(event.target.value);
    if (value ==='') {
      setFiltered(errorGuides);
      return;
    }
    const filtered = errorGuides.filter((error) => {
      const regPhrase = new RegExp(value, 'i');
      return regPhrase.test(error.manifestation);
    });
    setFiltered(filtered);
  }
  

  return (
    <Dialog  open={open} onClose={() => {setOpen(false)}} fullWidth maxWidth='lg' >
      <DialogTitle>Справочник ошибок</DialogTitle>
      <Container component="main">
      <TextField
        label="Поиск"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={handleChange}
        color='secondary'
        size="small"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <CssBaseline />
      <TableContainer component={Paper} sx={{fontSize: '6px', minHeight: '900px' }}>
        <Table sx={{fontSize: '8px' }}>
          <TableHead>
            <TableRow>
              <TableCell><b>Операция</b></TableCell>
              <TableCell><b>Проявление ошибки</b></TableCell>
              <TableCell><b>Метод поиска</b></TableCell>
              <TableCell><b>Способ устранения</b></TableCell>
              <TableCell><b>Контроль</b></TableCell>
            </TableRow>
          </TableHead> 
          <TableBody>
            {
              filtered.map((row) => {
                const {
                  id,
                  manifestation,
                  search,
                  removal,
                  control,
                  operation
                } = row
                return (
                  <TableRow key={id}>
                    <TableCell>{operation?.description}</TableCell>
                    <TableCell>
                      <Alert severity="error">{manifestation}</Alert>
                    </TableCell>
                    <TableCell>
                      <Alert severity="warning">{search}</Alert>
                    </TableCell>
                    <TableCell>
                      <Alert severity="info">{removal}</Alert>
                    </TableCell>
                    <TableCell>
                      <Alert severity="success">{control}</Alert>
                    </TableCell> 
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      </Dialog>
  );
}

export default AllErrorsGuideTable;



