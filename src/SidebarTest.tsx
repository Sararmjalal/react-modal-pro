import { Fragment } from "react";
import Dialog from "./components/modals/dialog";

const SidebarTest = () => {
  return (
    <Fragment>
      <Dialog
        canDismiss={true}
        modalKey="dialog"
        TriggerElement={<button>Open Dialog</button>}>
        Hey
      </Dialog>
    </Fragment>
  );
};

export default SidebarTest;
