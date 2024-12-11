import React from "react";
import Sidebar from "./components/modals/sidebar";

const SidebarTest = () => {
  return (
    <Sidebar
      canDismiss={false}
      modalKey="sidebar"
      sidebarDirection="right"
      TriggerElement={<button>Open Sidebar</button>}
    >
      Hey
    </Sidebar>
  );
};

export default SidebarTest;
