import { Fragment } from "react";
import Sidebar from "./components/modals/sidebar";

const SidebarTest = () => {
  return (
    <Fragment>
      <Sidebar
        canDismiss={true}
        modalKey="sidebar"
        direction="right"
        backdropClassName="mysidebarbackdrop"
        sheetClassName="mysidebar"
        swipeToOpen={true}
        swipeToClose={true}
        TriggerElement={<button>Open Sidebar</button>}
      >
        Hey
      </Sidebar>
    </Fragment>
  );
};

export default SidebarTest;
