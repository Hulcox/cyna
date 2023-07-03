"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuDrawer = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      <li>
        <Link
          className={`text-lg font-bold ${pathname == "/" ? "active" : null}`}
          href={"/"}
        >
          Statistiques
        </Link>
      </li>
      <li className="mt-8">
        <h2 className="menu-title text-lg">{"Outils d'attaque"}</h2>
        <ul>
          <li>
            <Link
              className={`text-md font-bold ${
                pathname == "/create" ? "active" : null
              }`}
              href={"/create"}
            >
              Outils1
            </Link>
          </li>
          <li>
            <Link
              className={`text-md font-bold ${
                pathname == "/machine" ? "active" : null
              }`}
              href={"/machine"}
            >
              Outils2
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default MenuDrawer;
