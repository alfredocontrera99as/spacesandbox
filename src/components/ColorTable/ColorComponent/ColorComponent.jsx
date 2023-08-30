const ColorComponent = ({ color, changeColor }) => {
    const change = () => {
        changeColor(color)
    }
    return (
        <div onClick={change} className="rounded" style={{ backgroundColor: color, minHeight: "40px", minWidth: "40px" }}>

        </div>)
}

export default ColorComponent