import React from "react";
import { useSelector } from "react-redux";
import WorkPanel from "../WorkPanel/WorkPanel";
import GanntTable from "../GanntTable/GanntTable";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import WorkSpaceEngeneer from "../WorkSpaceEngeneer";

const WorkSpace = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <>
      <WorkPanel />
      {user.post === 'главный конструктор' ? (<GanntTable />) : (<WorkSpaceEngeneer />)}
      <DetailsDrawer />    
    </>
  )
}

export default WorkSpace;