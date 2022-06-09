import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import WorkPanel from "../WorkPanel/WorkPanel";
import GanntTable from "../GanntTable/GanntTable";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import WorkSpaceEngeneer from "../WorkSpaceEngeneer";
import AddErrorForm from "../AddErrorForm";
import LaunchSpace from "../LaunchSpace";
import apiRoutes from '../../routes';
import { addHistoryOperations } from "../../reducers/historyOperationReducer";
import { closeDialog, openDialog } from '../../reducers/uiReducer';
import groupBy from "lodash.groupby";
import ErrorGuide from "../ErrorGuide";


const WorkSpace = () => {
  const { user } = useSelector(state => state.auth);
  const historyOperation = useSelector((state) => state.historyOperation);
  const { startedLaunch } = useSelector((state) => state.ui);
  const { idBlockActive } = useSelector((state) => state.blocks);
  const dispatch = useDispatch();

  const renderGanntTables = () => {
    const groupedHistoryOperation  = groupBy(historyOperation, (item) => (item.id_block))
    return (
      Object.entries(groupedHistoryOperation).map(([id_block, operations]) => { 
        return (
            Number(id_block) === idBlockActive && <GanntTable data={operations} />
        )
      })
    )
  }
  const renderTables = () => {
    const groupedHistoryOperation  = groupBy(historyOperation, (item) => (item.id_block))
    return (
      Object.entries(groupedHistoryOperation).map(([id_block, operations]) => { 
        return (
            Number(id_block) === idBlockActive && <WorkSpaceEngeneer data={operations} />
        )
      })
    )
  }

  const renderLaunchWork = () => {
    const { start } = startedLaunch;
    if (!start) {
      return <LaunchSpace />
    }
    return (
      user.post === 'главный конструктор' ? renderGanntTables() : renderTables()
    )
  }

  // useEffect(() => {
  //   const delta = 1000;
  //   const fetchData = async () => {
  //     try {   
  //       const url = apiRoutes('getHistoryOperationsByBlock')(3, 1);
  //       const response = await axios.get(url);
  //       dispatch(addHistoryOperations(response.data));
  //     } catch(err) {    
  //       console.log(err);
  //     }
  //   }
    
  //   setInterval(() => {
  //     fetchData();
  //   }, delta);
  // }, []);

  const handleClose = (dialogName, mode = '', data = '') => () => {
    dispatch(closeDialog({
      dialogName,
      mode,
      data
    }))
  }

  const handleOpen = (dialogName, mode = '', data = '') => () => {
    dispatch(openDialog({
      dialogName,
      mode,
      data
    }))
  }

  return (
    <>
      <WorkPanel startedLaunch={startedLaunch}/>
      {/* {user.post === 'главный конструктор' ? renderLaunchWork() : (<WorkSpaceEngeneer />)} */}
      {renderLaunchWork()}
      {user.post === 'главный конструктор' && <DetailsDrawer
         handleClose={handleClose('detail')}
         handleOpen={handleOpen('detail')}
       />
      }
      <AddErrorForm /> 
      <ErrorGuide />   
    </>
  )
}

export default WorkSpace;