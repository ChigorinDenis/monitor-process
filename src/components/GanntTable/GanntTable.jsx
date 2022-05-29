import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import  TaskTooltip  from '../Tooltip';
import './GanntTable.scss';
import store from "../../store";
import engine from "../../fakeEngine";
import { addTask } from "../../reducers/historyOperationReducer";
import { selectTask } from "../../reducers/uiReducer";
import ContexMenu from "../ContexMenu";
import apiRoutes from '../../routes';
const cols = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];


const GanntTable = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.historyOperation);
  useEffect(() => {
    engine.run();
    const data = engine.getTasks();
    data.map((task) => (dispatch(addTask(task))));
    const url = apiRoutes('getHistoryOperationsByBlock');
    
    try {
      
    } catch (error) {
      
    }
  },[]);

  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
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
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const hoursToMinutes = (time) => {
    const [hours, minutes] = time.split('.').map(Number);
    return hours * 60 + minutes;
  }
  
  const calcProgress = (duration, progress) => ((hoursToMinutes(progress) / hoursToMinutes(duration)) * 100);
  
  const buildRow = (data) => {
    return (
      data.map((task) => {
        const {
          id,
          duration,
          timeStart,
          operation,
          progress
        } = task;
        return (
          <>
            <tr key={id}>
              <td>{operation}</td>
              <td>{timeStart}</td>
              <td>{duration}</td>
              {
              cols.map((z, index) => {
                return buildCol(timeStart, duration, progress, index, id);
              })
              }
            </tr>
          </>
        )
      })   
    )
  }
  const buildCol = (timeStart, duration, progress, i, id) => {
    const [hourStart, minuteStart] = timeStart.split('.').map(Number);
    if (hourStart!= i ) {
      return (
        <td key={i}></td>
      );
    } 
    const progressWidth = Math.round(calcProgress(duration, progress));
    return (
      <td key={`col${i}`} style={{position:'relative'}}>
        {buildTask(duration, minuteStart, `${progressWidth}%`, id)}
      </td>
    );
  }

  const runTask = (id) => () => {
    store.dispatch(selectTask({ id }));
  };
  
  const buildTask = (duration, minuteStart, progress, id) => {
    const [hourDuration, minuteDuration] = duration.split('.').map(Number);
    const minuteDurationPer = `${((minuteDuration / 60) * 100) + (hourDuration * 100)}%`;
    const num = `${hourDuration - 1}px`;
    const width = `calc(${minuteDurationPer} + ${num})`;
    const overWidth = `calc(${minuteDurationPer} + ${num} + 25px)`;
    const left = `${(minuteStart / 60) * 100}%`;
    return (
      <TaskTooltip>
        <>
          {/* <div className="over__task"  style={{width: overWidth, left}}></div> */}
          <div
            key={`task${id}`}
            className="task"
            style={{width, left}}
            onClick={runTask(id)}
            onContextMenu={handleContextMenu}
          >
            <div className="task__progress" style={{width: progress}}></div>
            <span className="task__badge">{progress}</span>
          </div>   
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
            </tr>
          </thead>
          <tbody>
            {buildRow(tasks)}
          </tbody>
        </table>
      </div>
      <ContexMenu contextMenu={contextMenu} handleClose={handleClose} />
    </>
    
  )
}

export default GanntTable;