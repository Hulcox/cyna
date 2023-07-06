"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuDrawer = () => {
  const pathname = usePathname();

  const tools = [
    {
      name: "Scan de vulnérabilité",
      url: "/tools/openvas",
    },
    // {
    //   name: "Simulation de brèche",
    //   url: "/tools/infectionmonkey",
    // },
    {
      name: "Exploitation de Vunérabilité",
      url: "/tools/metasploit",
    },
  ];

  return (
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      <li className="mt-8">
        <h2 className="menu-title text-lg">
          <div className="flex gap-2">
            <Image
              src="/images/amber_laser.png"
              alt="laser saber"
              width={80}
              height={45}
              className={"object-scale-down"}
            />
            <div>{"Lancement des scans"}</div>
          </div>
        </h2>
        <ul>
          {tools.map(({ name, url }, key) => (
            <li key={key} className="my-4">
              <Link className={`text-md font-bold`} href={url}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li>
        <h2 className="menu-title text-lg">
          <div className="flex gap-2">
            <Image
              src="/images/amber_laser.png"
              alt="laser saber"
              width={80}
              height={45}
              className={"object-scale-down"}
            />
            <div>{"Résultat"}</div>
          </div>
        </h2>
        <ul>
          <li className="my-4">
            <Link className={`text-md font-bold`} href={"/"}>
              Statistiques
            </Link>
          </li>
          <li className="my-4">
            <Link className={`text-md font-bold`} href={"/schema"}>
              Schema des riques Cyber
            </Link>
          </li>
          <li className="my-4">
            <Link className={`text-md font-bold`} href={"/"}>
              Recommandation
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default MenuDrawer;
