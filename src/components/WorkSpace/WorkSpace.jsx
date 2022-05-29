import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import WorkPanel from "../WorkPanel/WorkPanel";
import GanntTable from "../GanntTable/GanntTable";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import WorkSpaceEngeneer from "../WorkSpaceEngeneer";
import LaunchSpace from "../LaunchSpace";
import apiRoutes from '../../routes';
import { addHistoryOperations } from "../../reducers/historyOperationReducer";


const WorkSpace = () => {
  const { user } = useSelector(state => state.auth);
  const tasks = useSelector((state) => state.historyOperation);
  const dispatch = useDispatch();

  const renderLaunchWork = () => {
    const isHasLaunch = true;
    return (!isHasLaunch ? <LaunchSpace /> : <GanntTable  data={tasks} />)
  }

  useEffect(() => {
    const delta = 1000;
    let hasFetched = false;
    const fetchData = async () => {
      try {   
        const url = apiRoutes('getHistoryOperationsByBlock');
        const response = await axios.get(url);
        dispatch(addHistoryOperations(response.data));
      } catch(err) {    
        console.log(err);
      }
    }
    
    setInterval(() => {
      fetchData();
    }, delta);
  }, []);
 

  return (
    <>
      <WorkPanel />
      {user.post != 'главный конструктор' ? renderLaunchWork() : (<WorkSpaceEngeneer />)}
      <DetailsDrawer />    
    </>
  )
}

export default WorkSpace;