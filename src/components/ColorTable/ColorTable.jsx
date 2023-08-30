import ColorComponent from "./ColorComponent/ColorComponent"

const ColorTable = ({changeColor}) => {
  return (
    <div className="d-flex flex-row  gap-2 flex-wrap">

      <ColorComponent changeColor={changeColor} color="#00f"/>
      <ColorComponent changeColor={changeColor} color="#0f0"/>
      <ColorComponent changeColor={changeColor} color="#f00"/>
      <ColorComponent color="#f00"/>
      <ColorComponent color="#f00"/>
      <ColorComponent color="#f00"/>
      <ColorComponent color="#f00"/>
      <ColorComponent color="#f00"/>
      <ColorComponent color="#f00"/>
    </div>
  )
}

export default ColorTable