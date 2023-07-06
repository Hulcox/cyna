"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MenuDrawer = () => {
  const pathname = usePathname()

  const tools = [
    {
      name: "Scan de vulnérabilité",
      url: "/tools/openvas",
      type: "reconnaissance",
    },
    {
      name: "Simulation de brèche",
      url: "https://localhost:5000",
      type: "simulation",
    },
    {
      name: "Vunérabilité",
      url: "/tools/metasploit",
      type: "reconnaissance",
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
            <div>{"Reconnaissance"}</div>
          </div>
        </h2>
        <ul>
          {tools
            .filter((elm) => elm.type === "reconnaissance")
            .map(({ name, url }, key) => (
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
            />
            <div>{"Simulation Ransomware"}</div>
          </div>
        </h2>
        <ul>
          {tools
            .filter((elm) => elm.type === "simulation")
            .map(({ name, url }, key) => (
              <li key={key} className="my-4">
                <Link className={`text-md font-bold`} href={url}>
                  {name}
                </Link>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  )
}

export default MenuDrawer
