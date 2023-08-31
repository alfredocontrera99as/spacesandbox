import MenuButton from "../MenuButtton/MenuButton"
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
const ZIndexInput = ({bringBack, bringForward, index}) => {
  if(index === -1){
    return null
  }
  return (
    <div className="d-flex flex-row gap-3 justify-content-center w-100">
        <MenuButton onClick={bringBack} selected={true}>
            <AiFillCaretDown size={40}/>
        </MenuButton>
        <div className="h1 text-dark d-flex flex-row justify-content-center " style={{minWidth: "100px"}}>
            {index}
        </div>
        <MenuButton onClick={bringForward} selected={true}>
            <AiFillCaretUp size={40}/>
        </MenuButton>
    </div>
  )
}

export default ZIndexInput