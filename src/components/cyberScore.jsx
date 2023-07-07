import classNames from "classnames"
import { indexes, colors } from "@/components/cyberColors"

const CyberScore = (props) => {
  const { cyberScore } = props

  return (
    <div className="flex gap-5 items-center">
      <h1>
        Votre CyberScore :
      </h1>
      <div className="flex text-lg items-center">
        {indexes.map((index, key) => (
          <div
            key={key}
            className={classNames(
              index === "A" && "rounded-l-lg",
              index === "E" && "rounded-r-lg",
              colors[index]["bg"],
              colors[index]["text"],
              cyberScore === index && "rounded-lg text-3xl border-2 border-white font-bold", "p-2"
            )}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CyberScore