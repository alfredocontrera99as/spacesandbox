import { useRef, useState } from "react"
import ReactHowler from "react-howler"
import COLORS from "../../lib/colors"
const AudioManager = ({ play, list, length, changeFunction }) => {
    const [index, setIndex] = useState(0)
    const soundRef = useRef(null)

    console.log(length, "lista")
    if (list.length < 1 || !list[index]) {
        return null;
    }
    const testPlay= () => {
        // console.log("play")
    }
    const testEnd=() => {
        console.log(length, "longitud")
        if(index + 1 == length){
            setIndex(0);
            changeFunction(false);
        }
        setIndex((i) => i +1)
    }
    return (
        <ReactHowler
            playing={play}
            ref={soundRef}
            src={COLORS[list[index]]}
            onPlay={testPlay}
            onEnd={testEnd}
        >

        </ReactHowler>
    )
}

export default AudioManager