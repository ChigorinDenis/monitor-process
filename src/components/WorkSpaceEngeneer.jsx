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
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import apiRoutes from '../routes';
import { minuteToFormatStr } from '../utils/utils';
import { renderChipStatus } from '../utils/utils';



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
    <TableContainer component={Paper} sx={{fontSize: '8px'}}>
        <Table sx={{fontSize: '8px'}}>
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
                  percent
                } = historyOperation;
                return (
                  <TableRow key={id_history}>
                    <TableCell>{description}</TableCell>
                    <TableCell>{minuteToFormatStr(timeStart)}</TableCell>
                    <TableCell>{minuteToFormatStr(duration)}</TableCell>
                    <TableCell>{renderChipStatus(status)}</TableCell>
                    <TableCell>
                      {`${percent.toFixed(2)}%`}
                      {status === 'INPROGRESS' && <CircularProgress  value={percent} size={10} sx={{ml: 1}} color="info" />}
                      </TableCell>
                    <TableCell>
                      <PlayArrowIcon
                      sx={{mr:2, cursor: 'pointer',}}
                      color='error'
                      onClick={handleRunOperation(id_history)}
                    />
                      <StopCircleIcon
                        sx={{ cursor: 'pointer'}}
                        color='secondary'
                        onClick={handleStopOperation(id_history)}
                      />
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

