import Sidebar from "./components/modals/sidebar";

const TestPage = () => {
  return (
    <Sidebar
      sidebarDirection="left"
      modalKey="sidebar"
      TriggerElement={<button>open sidebar</button>}
    >
      hey
    </Sidebar>
  );
};

export default TestPage;
