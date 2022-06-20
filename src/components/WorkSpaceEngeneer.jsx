import * as React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { selectOperationId } from "../reducers/uiReducer";
import apiRoutes from '../routes';
import { minuteToFormatStr } from '../utils/utils';
import { renderChipStatus } from '../utils/utils';
import { openDialog } from '../reducers/uiReducer';



const WorkSpaceEngeneer = ({data}) => {
  const dispatch = useDispatch();
  // const historyOperations = useSelector(state => state.historyOperation);

  const handleRunOperation = (id) => async () => {
    const url = apiRoutes('startHistoryOperation')(id);
    try {
      const response = await axios.post(url);
      alert(`Запущена операция ${id}`)
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  const handleStopOperation = (id) => async () => {
    const url = apiRoutes('stopHistoryOperation')(id);
    const data = {
      note: 'Операция остановлена по такой-то причине'
    }
    try {
      const response = await axios.post(url, data);
      alert(`Остановлена операция ${id}`)
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  return (
    <TableContainer component={Paper} sx={{fontSize: '8px', maxHeight: '700px', minHeight: '700px'}}>
        <Table sx={{fontSize: '8px'}} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Операция</TableCell>
              <TableCell>Время начала</TableCell>
              <TableCell>Длительность</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Прогресс</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
            
          <TableBody>
            {
              data.map((historyOperation) => {
                const {
                  id_history,
                  description,
                  timeStart,
                  duration,
                  status,
                  percent,
                  active,
                  delay
                } = historyOperation;
                return (
                  <TableRow key={id_history}>
                    <TableCell style={{ width: '500px'}}>{description}</TableCell>
                    <TableCell>{minuteToFormatStr(timeStart)}</TableCell>
                    <TableCell>{minuteToFormatStr(duration)}</TableCell>
                    <TableCell>{renderChipStatus(status)}</TableCell>
                    <TableCell>
                      {`${percent.toFixed(2)}%`}
                      {status === 'INPROGRESS' && <CircularProgress  value={percent} size={10} sx={{ml: 1}} color="info" />}
                      </TableCell>
                    <TableCell>
                      
                      <Button
                        color='secondary'
                        startIcon={<PlayCircleIcon />}
                        variant='outlined'
                        onClick={handleRunOperation(id_history)}
                        disabled={!active || status === 'STOPPED' || status === 'ABORTED'}
                        sx={{ mr: 2}}
                        size="small"
                      >
                        Запуск
                      </Button>
                      <Button
                        color='error'
                        startIcon={<StopCircleIcon/>}
                        variant='outlined'
                        onClick={() => {
                          handleStopOperation(id_history)();
                          dispatch(selectOperationId(id_history));
                          dispatch(openDialog({ dialogName: 'guides'}))
                        }}
                        disabled={!active || status === 'CREATED' || status === 'STOPPED' || status === 'ABORTED'}
                        size="small"
                      >
                        Стоп
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          
      
        
       
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default WorkSpaceEngeneer;

