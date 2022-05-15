import React from "react";
import WorkPanel from "../WorkPanel/WorkPanel";
import GanntTable from "../GanntTable/GanntTable";
import DetailsDrawer from "../DetailsDrawer/DetailsDrawer";

const WorkSpace = () => {
  return (
    <>
      <WorkPanel />
      <GanntTable />
      <DetailsDrawer />    
    </>
  )
}

export default WorkSpace;