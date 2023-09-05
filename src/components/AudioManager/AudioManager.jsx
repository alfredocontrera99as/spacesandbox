import { useRef, useState } from "react"
import ReactHowler from "react-howler"
import COLORS from "../../lib/colors"
const AudioManager = ({ play, index, setIndex, list, length, changeFunction }) => {
    const soundRef = useRef(null)
    if (list.length < 1 || !list[index]) {
        return null;
    }

    const handleEnd = () => {
        setIndex((i) => i + 1)
    }
    return (
        <ReactHowler
            playing={play}
            ref={soundRef}
            src={COLORS[list[index]]}
            onEnd={handleEnd}
        >

        </ReactHowler>
    )
}

export default AudioManager