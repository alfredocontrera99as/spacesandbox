
const MenuButton = ({onClick, selected, children}) => {
    let textClass = ` ${ selected ? 'bg-dark' : ' bg-white ' }  border-0 ${ selected ? 'text-white' : ' text-dark ' } rounded  p-2 `
    return (
        <button onClick={onClick} className={textClass} style={{ maxHeight: "60px" }}>
            {children}
        </button>
    )
}

export default MenuButton