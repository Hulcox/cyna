"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuDrawer = () => {
  const pathname = usePathname();

  const tools = [
    { name: "Open VAS - Scan de vulnérabilité", url: "openvas" },
    { name: "Infection Monkey - BAS", url: "infectionMonkey" },
    {
      name: "Metasploit",
      url: "metasploit",
    },
  ];

  return (
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      <li>
        <Link
          className={`text-lg font-bold ${pathname === "/" ? "active" : null}`}
          href={"/"}
        >
          Statistiques
        </Link>
      </li>
      <li className="mt-8">
        <h2 className="menu-title text-lg">
          <div className="flex gap-2">
            <Image
              src="/images/amber_laser.png"
              alt="laser saber"
              width={80}
              height={45}
            />
            <div>{"Outils d'attaque"}</div>
          </div>
        </h2>
        <ul>
          {tools.map(({ name, url }, key) => (
            <li key={key} className="my-4">
              <Link
                className={`text-md font-bold ${
                  pathname === `/tools/${url}` ? "active" : null
                }`}
                href={`/tools/${url}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default MenuDrawer;
