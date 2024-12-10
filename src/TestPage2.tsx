import { useState } from "react";
import Drawer from "./components/drawer";

const TestPage2 = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>open drawer</button>
      <Drawer
        direction={"bottom"}
        open={open}
        willBeClosed={false}
        handleClose={() => setOpen(false)}
      >
        <div>drawer children</div>
      </Drawer>
    </>
  );
};

export default TestPage2;
