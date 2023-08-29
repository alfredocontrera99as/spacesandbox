import { AiOutlineCloseCircle, AiOutlineTool } from 'react-icons/ai'

/*
Props
changeFunction: is a function that is executed when you clicked the buttons
condition: verified the state and change the icons
Icon: is the alt icon
title: is a brief description of his function
altDescription: is alternative description
*/
const OpenButton = ({ changeFunction, condition = true, Icon, AltIcon = AiOutlineCloseCircle, title, altDescription }) => {
    const changeState = () => {
        changeFunction();
    }
    return (
        <div onClick={changeState} className="text-white  p-2" title={condition ? title : altDescription }>
            <div className='h-100 d-flex justify-content-center  align-items-center' style={{ maxWidth: "60px", height: "30px" }}>
                {

                    condition === true ?
                        <AltIcon size={40} />
                        :
                        <Icon size={40} />
                }
            </div>
        </div>
    )
}

export default OpenButton