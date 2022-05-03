import React from "react";
import WorkPanel from "../WorkPanel/WorkPanel";
import GanntTable from "../GanntTable/GanntTable";
import StopTaskDrawer from "../StopTaskDrawer/StopTaskDrawer";

const WorkSpace = () => {
  return (
    <>
      <WorkPanel />
      <GanntTable />    
    </>
  )
}

export default WorkSpace;