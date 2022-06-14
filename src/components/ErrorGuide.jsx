import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import apiRoutes from '../routes';
import Container from '@mui/material/Container';
import { closeDialog } from '../reducers/uiReducer';
import AddErrorForm from './AddErrorForm';


function ErrorGuide() {
  const dispatch = useDispatch()
  const [guideErrors, setGuideErrors] = React.useState([]);
  const { selectedOperation } = useSelector(state => state.ui);
  const { dialogs } = useSelector(state => state.ui);
  const { guides } = dialogs;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

 

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const url = apiRoutes('getErrorGuide')(selectedOperation.id);   
        const response = await axios.get(url);
        setGuideErrors(response.data);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, [selectedOperation]);
  
  const handleClose = () => {
    dispatch(closeDialog({dialogName: 'guides' }));
  };

  return (
    <Dialog onClose={handleClose} open={guides.open} sx={{p: '20px'}}>
      <DialogTitle>Ошибка операции</DialogTitle>
      <Container component="main" maxWidth="xs">
      <Typography sx={{ color: 'text.secondary', mb:2 }}>Возможные неисправности</Typography>
      <Box
        sx={{mb:5}}
      >
      {
        guideErrors.map((row) => {
          const {
            id,
            manifestation,
            search,
            removal,
            control
        } = row;
          return (
            <Accordion expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)} key={id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <ErrorOutlineIcon color='error' variant='outlined'/>
                <Typography sx={{ml:1, flexShrink: 0 }}>
                  {`${manifestation.slice(0, 30)}...`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{manifestation}</Alert>
                <Alert severity="info">{search}</Alert>
                <Alert severity="warning">{removal}</Alert>
                <Alert severity="success">{control}</Alert>
            </Stack>
              </AccordionDetails>
            </Accordion>
          )
        })
      }
      </Box>
      <AddErrorForm  />
      </Container>
    </Dialog>
  );
}

export default ErrorGuide;



