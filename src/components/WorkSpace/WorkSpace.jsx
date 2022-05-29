import React from "react";
import { useSelector } from "react-redux";
import WorkPanel from "../WorkPanel/WorkPanel";
import GanntTable from "../GanntTable/GanntTable";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import WorkSpaceEngeneer from "../WorkSpaceEngeneer";
import LaunchSpace from "../LaunchSpace";

const renderLaunchWork = () => {
  const isHasLaunch = true;
  return (!isHasLaunch ? <LaunchSpace /> : <GanntTable />)
}
const WorkSpace = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <>
      <WorkPanel />
      {user.post != 'главный конструктор' ? renderLaunchWork() : (<WorkSpaceEngeneer />)}
      <DetailsDrawer />    
    </>
  )
}

export default WorkSpace;