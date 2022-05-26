import React from "react";
import WorkPanel from "../WorkPanel/WorkPanel";
import GanntTable from "../GanntTable/GanntTable";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";
import WorkSpaceEngeneer from "../WorkSpaceEngeneer";

const WorkSpace = () => {
  return (
    <>
      <WorkPanel />
      <GanntTable />
      {/* <WorkSpaceEngeneer /> */}
      <DetailsDrawer />    
    </>
  )
}

export default WorkSpace;