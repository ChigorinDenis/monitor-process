import  React, {useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Tabs from '../Tabs';
import Button from '@mui/material/Button';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { renderChipStatus } from '../../utils/utils';
import { minuteToFormatStr } from '../../utils/utils';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function DetailsDrawer(props) {

  const { dialogs: { detail }, selectedOperationId} = useSelector(state => state.ui);
  const historyOperations  = useSelector(state => state.historyOperation);
  const operation = historyOperations.find((historyOperation) => historyOperation.id_history === selectedOperationId);
  const { handleClose, handleOpen } = props;
  const [operationErrors, setOperationErrors] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:8081/operations/get-operation-errors/by-history/${selectedOperationId}`   
        const response = await axios.get(url);
        setOperationErrors(response.data);
      } catch(err) {    
        console.log(err);
      }
    }
   fetchData();
  }, [ operationErrors]);


  const list = (anchor) => (
    <Box
      sx={{ width: 600 }}
      role="presentation"
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <Container>
        <Typography
            variant='h5'
            sx={{ mt: 2, color: 'grey'}}
          >
          Детальная информация
        </Typography>
        <Box
          sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',   mb: 2, mt:1}}
        >
          <Typography
            variant='body2'
          >
            Операция {selectedOperationId}
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            {renderChipStatus(operation?.status)}
            <Typography>
            
            </Typography>
          </Box>
          
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            columnGap: 2,
            alignItems: 'center',
            mt: 2,
          
          }}
        > 
          <Tooltip title="Время начала">
            <Chip 
              avatar={<AccessTimeIcon style={{color: '#10B981'}}/>} 
              label={minuteToFormatStr(operation?.timeStart)}
              variant="outlined" 
              sx={{ border: 'none', fontWeight: 'bold'}}
            />
          </Tooltip>
          <Tooltip title="Длительность">
            <Chip
              avatar={<AccessTimeIcon style={{color: '#10B981'}}/>}
              label={minuteToFormatStr(operation?.duration)}
              variant="outlined" 
              sx={{ border: 'none', fontWeight: 'bold'}}
            />
          </Tooltip>
          <Tooltip title="Задержка">
            <Chip
              avatar={<TimelapseIcon style={{color: '#f44336'}}/>} 
              label={`${(operation?.delay / 60).toFixed(0)} мин.`}
              variant="outlined" 
              sx={{ border: 'none', fontWeight: 'bold'}}
            />
          </Tooltip>
        </Box>
        
        <Typography
            variant='h6'
            sx={{ mt: 2, color: 'grey'}}
          >
          Описание
        </Typography>
        <Typography
            variant='subtitle2'
            sx={{ mt:1, mb: 2, color: 'grey'}}
          >
          {operation?.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            columnGap: 2,
            alignItems: 'center',
            mt: 3,
  
          }}>
            <Typography
              variant='subtitle1'
              sx={{ color: 'grey'}}
            >
              Отказы операции
            </Typography>
          </Box>
        
        {operationErrors.length === 0 ? (<Box
         sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 20,
          gap: 2
         }}
        >
          <ErrorOutlineIcon  sx={{ color: '#e0e0e0'}}/>
          <Typography
              variant='h5'
              sx={{ color: '#e0e0e0'}}
            >
            Нет ошибок по операции
          </Typography>
        </Box>) :
        <Tabs  data={operationErrors} />}
        {/* <Button variant="contained" fullWidth sx={{background: '#039be5', mt: 50}}>Продолжить выполнение</Button> */}
      </Container>
  
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={handleOpen}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={detail.open}
            onClose={handleClose}
            onOpen={handleOpen}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
