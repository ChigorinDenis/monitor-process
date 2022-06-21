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
  const { user, isAuth } = useSelector(state => state.auth);
  const roles = isAuth ? user.roles.map((role) => (role.name)) : [];
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
      roles.includes('CONSTRUCTOR') ||  roles.includes('MANAGER')  ? renderGanntTables() : renderTables()
    )
  }

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
      {/* {user.post === 'Главный конструктор' ? renderLaunchWork() : (<WorkSpaceEngeneer />)} */}
      {renderLaunchWork()}
      {(roles.includes('CONSTRUCTOR') || roles.includes('MANAGER')) && <DetailsDrawer 
         handleClose={handleClose('detail')}
         handleOpen={handleOpen('detail')}
       />
      }
      {/* <AllErrorsGuideTable /> */}
      <ErrorGuide />   
    </>
  )
}

export default WorkSpace;