import MenuDrawer from "@/components/menuDrawer";
import Image from "next/image";
import Link from "next/link";

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
          <Link href="/" className="flex items-center btn btn-ghost">
            <Image
              src="/images/baby_yoda.png"
              alt="logo cyna"
              width={45}
              height={45}
            />
            <span className="normal-case text-xl">Cyna Box</span>
          </Link>
        </div>
      </div>
      <div className="drawer lg:drawer-open  h-[calc(100vh-4rem)]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-base-300">{children}</div>
        <div className="drawer-side h-[calc(100vh-4rem)] relative">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <MenuDrawer />
        </div>
      </div>
    </div>
  );
};

export default layoutCyna;
