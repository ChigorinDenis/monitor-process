import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import  TaskTooltip  from '../Tooltip';
import './GanntTable.scss';
import store from "../../store";
import { selectTask, selectOperationId, selectOperation } from "../../reducers/uiReducer";
import ErrorIcon from '@mui/icons-material/Error';
import ContexMenu from "../ContexMenu";
import apiRoutes from '../../routes';

const cols = Array(100).fill(0);


const GanntTable = ({ data }) => {

  const [contextMenu, setContextMenu] = React.useState(null);
  const dispatch = useDispatch();
  const { selectedOperationId } = useSelector(state => state.ui);

  const handleRunOperation = async () => {
    const url = apiRoutes('startHistoryOperation')(selectedOperationId);
    try {
      const response = await axios.post(url);
      alert(`Запущена операция ${selectedOperationId}`)
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  const handleStopOperation = async () => {
    const url = apiRoutes('stopHistoryOperation')(selectedOperationId);
    const data = {
      note: 'Операция остановлена по такой-то причине'
    }
    try {
      const response = await axios.post(url, data);
      alert(`Остановлена операция ${selectedOperationId}`)
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  const handleContextMenu = (id, historyOperation) => (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : 
          null,
    );
    dispatch(selectOperationId(id));
    dispatch(selectOperation(historyOperation));
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const hoursToMinutes = (time) => {
    const [hours, minutes] = time.split('.').map(Number);
    return hours * 60 + minutes;
  }
  
  // const calcProgress = (duration, progress) => ((hoursToMinutes(progress) / hoursToMinutes(duration)) * 100);

  const minuteToFormat = (minutes) => {
    const mins = minutes % 60;
    const hours = (minutes - mins) / 60;
    return [hours, mins]
  }
  
  const buildRow = (data) => {
    return (
      data.map((task) => {
        const {
          id_operation,
          duration,
          timeStart,
          description,
          percent,
          id_history,
          delay,
          active,
          delta,
          status
        } = task;
        return (
          <tr key={id_operation}>
            <td>{description}</td>
            <td>{timeStart}</td>
            <td>{duration}</td>
            {
            cols.map((z, index) => {
              return buildCol(timeStart, duration, percent, index, id_operation, id_history, delay, active, delta, status, description);
            })
            }
          </tr>
        )
      })   
    )
  }
  
  const buildCol = (timeStart, duration, percent, i, id, id_history, delay, active, delta, status, description) => {
    const [hourStart, minuteStart] = minuteToFormat(timeStart)
    if (hourStart!= i ) {
      return (
        <td key={i}></td>
      );
    } 
    return (
      <td key={`col${i}`} style={{position:'relative'}}>
        {buildTask(duration, minuteStart, Number(percent.toFixed(1)), id, id_history, delay, active, delta, status, description)}
      </td>
    );
  }

   
  const buildTask = (duration, minuteStart, percent, id, id_history, delay, active, delta, status, description) => {
    const [hourDuration, minuteDuration] = minuteToFormat(duration);
    const minuteDurationPer = ((minuteDuration / 60) * 100) + (hourDuration * 100);
    const secInMin = 3600;
    const delayPer = (delay / secInMin) * 100;
    const num = `${hourDuration - 1}px`;
    const width = `calc(${minuteDurationPer}% + ${num})`;
    const delayWidth = `calc(${minuteDurationPer + delayPer}% + ${num})`;

    // const delayWidth = `${((120/60 * 100) + (minuteDuration / 60) * 100 + hourDuration * 100)}%`
    const left = `${((minuteStart + delta / 60) / 60) * 100}%`;
    const leftOrigin = `${((minuteStart) / 60) * 100}%`;
    const widthOrigin = `${minuteDurationPer + (delta / secInMin) * 100}%`
    const bgColorTask  = status === "ABORTED" ? '#ef5350' : '#039be5';
    return (
      <TaskTooltip>
        <>
          <div className="origin__task"  style={{width: `${minuteDurationPer}%`, leftOrigin}}></div>
          <div className="over__task"  style={{width: delayWidth, left}}></div>
          <div
            key={`task${id}`}
            className="task"
            style={{width, left , background: bgColorTask  }}
            onContextMenu={handleContextMenu(id_history, { id, id_history, delay, active })}
            title={`${description.slice(0, 100)}...`}
    
          > 
            {status != 'ABORTED' && <div className="task__progress" style={{width: `${percent}%`, background: percent < 100  ? '#0277bd' : '#8bc34a'}}></div>}

            {delay > 0 && <span className="task__error" title="Были ошибки на блоке">
              <ErrorIcon  sx={{color: '#ffee58'}} />
            </span>}
            {duration > 30 && <span className="task__badge">{`${percent < 100 ? percent : 100 }%`}</span>}
          </div> 
          {/* <span className="task__hint" style={{left: leftHint}}></span>  */}
        </>
      </TaskTooltip>
    );
  }
  
  return (
    <>
      <div className="gannt__wrapper">
        <table className="gannt__table">
          <thead>
            <tr>
              <th className="sticky" style={{width: '300px'}}>Операция</th>
              <th style={{width: '100px'}}>Время начала</th>
              <th style={{width: '100px'}}>Длительность</th>
              {
                cols.map((item, index) => {
                  return (
                    <th>{index < 10 ? `0${index}.00`: `${index}.00`}</th>
                  )
                })
              }
              {/* <th>00.00</th>
              <th>01.00</th>
              <th>02.00</th>
              <th>03.00</th>
              <th>04.00</th>
              <th>05.00</th>
              <th>06.00</th>
              <th>07.00</th>
              <th>08.00</th>
              <th>09.00</th>
              <th>10.00</th>
              <th>11.00</th>
              <th>12.00</th>
              <th>14.00</th>
              <th>15.00</th>
              <th>16.00</th>
              <th>17.00</th>
              <th>18.00</th>
              <th>19.00</th>
              <th>20.00</th>
              <th>21.00</th>
              <th>22.00</th>
              <th>23.00</th> */}
            </tr>
          </thead>
          <tbody>
            {buildRow(data)}
          </tbody>
        </table>
      </div>
      <ContexMenu
        contextMenu={contextMenu}
        handleClose={handleClose}
        handleRunOperation={handleRunOperation}
        handleStopOperation={handleStopOperation}
      />
    </>
    
  )
}

export default GanntTable;