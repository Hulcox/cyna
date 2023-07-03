import MenuDrawer from "@/components/menuDrawer";

const layoutCyna = ({ children }) => {
  return (
    <div>
      <div className="navbar bg-base-100 z-10">
        <div className="flex-1">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <div>Cyna Box</div>
        </div>
      </div>
      <div className="drawer lg:drawer-open  h-[calc(100vh-4rem)]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-300">{children}</div>
        <div className="drawer-side h-[calc(100vh-4rem)]">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <MenuDrawer />
        </div>
      </div>
    </div>
  );
};

export default layoutCyna;
