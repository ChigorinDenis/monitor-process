import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import  TaskTooltip  from '../Tooltip';
import './GanntTable.scss';
import store from "../../store";
import { selectTask, selectOperationId } from "../../reducers/uiReducer";
import ContexMenu from "../ContexMenu";
import apiRoutes from '../../routes';
const cols = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


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

  const handleContextMenu = (id) => (event) => {
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
    dispatch(selectOperationId(id))
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const hoursToMinutes = (time) => {
    const [hours, minutes] = time.split('.').map(Number);
    return hours * 60 + minutes;
  }
  
  const calcProgress = (duration, progress) => ((hoursToMinutes(progress) / hoursToMinutes(duration)) * 100);

  const minuteToFormat = (minutes) => {
    const mins = minutes % 60;
    const hours = (minutes - mins) / 60;
    return [hours, mins]
  }
  
  const buildRow = (data) => {
    return (
      data.map((task) => {
        const {
          id,
          duration,
          timeStart,
          description,
          percent,
          id_history,
        } = task;
        return (
          <tr key={id}>
            <td>{description}</td>
            <td>{timeStart}</td>
            <td>{duration}</td>
            {
            cols.map((z, index) => {
              return buildCol(timeStart, duration, percent, index, id, id_history);
            })
            }
          </tr>
        )
      })   
    )
  }
  
  const buildCol = (timeStart, duration, percent, i, id, id_history) => {
    const [hourStart, minuteStart] = minuteToFormat(timeStart)
    if (hourStart!= i ) {
      return (
        <td key={i}></td>
      );
    } 
    return (
      <td key={`col${i}`} style={{position:'relative'}}>
        {buildTask(duration, minuteStart, Number(percent.toFixed(2)), id, id_history)}
      </td>
    );
  }

  const runTask = (id) => () => {
    store.dispatch(selectTask({ id }));
  };
  
  const buildTask = (duration, minuteStart, percent, id, id_history) => {
    const [hourDuration, minuteDuration] = minuteToFormat(duration);
    const minuteDurationPer = `${((minuteDuration / 60) * 100) + (hourDuration * 100)}%`;
    const num = `${hourDuration - 1}px`;
    const width = `calc(${minuteDurationPer} + ${num})`;
    const leftHint = `calc(${minuteDurationPer} + ${num + 5})`;
    const overWidth =`${((minuteDuration / 60) * percent) + (hourDuration * percent)}%`
    const left = `${(minuteStart / 60) * 100}%`;
    return (
      <TaskTooltip>
        <>
          {percent > 100 && <div className="over__task"  style={{width: overWidth, left}}></div>}
          <div
            key={`task${id}`}
            className="task"
            style={{width, left}}
            onContextMenu={handleContextMenu(id_history)}
            onMo
          >
            <div className="task__progress" style={{width: `${percent}%`}}></div>
            <span className="task__badge">{`${percent < 100 ? percent : 100 }%`}</span>
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
              <th className="sticky" style={{width: '200px'}}>Операция</th>
              <th style={{width: '100px'}}>Время начала</th>
              <th style={{width: '100px'}}>Длительность</th>
              <th>00.00</th>
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
              <th>23.00</th>
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