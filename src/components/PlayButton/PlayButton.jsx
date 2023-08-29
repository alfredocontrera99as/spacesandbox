import { AiFillPlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
const PlayButton = ({ changeFunction, condition, title, altDescription }) => {
    const changeState = () => {
        changeFunction((val) => !val);
    }
    return (
        <div onClick={changeState} className="text-info   m-1" title={condition ? title : altDescription}>
            <div className='h-100 d-flex justify-content-center align-items-center ' style={{}}>
                {

                    condition === false ?
                        <AiFillPlayCircle className="mt-1" size={28} />
                        :
                        <AiOutlinePauseCircle className="mt-1" size={28} />
                }
            </div>
        </div>)
}

export default PlayButton