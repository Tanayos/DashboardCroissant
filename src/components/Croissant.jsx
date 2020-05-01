import React, { useState, useEffect, useRef } from 'react'

const Croissant = () => {
    const [countCroissant, setCountCroissant] = useState({
        participant: ["Mohamed M", "Mohamed Z", "Mohammed B", "Barathan", "Charles H"],
        days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    });
    const [count, setCount] = useState(0);
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest function.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    const croissantDay = () => {
        Date.prototype.getDayName = function () {
            return countCroissant.days[this.getDay()];
        };
        let now = new Date();
        if (now.getDayName() === 'Vendredi') {
            setCount(count + 1)

            console.log('ici', count)
            if (count === countCroissant.participant.length - 1) {
                setCount(0)
            }
        }
    }
    useInterval(() => {

        croissantDay()
    }, 10000)
    const CroissantLive = (
        <div>

            <p className="Participant_1">{countCroissant.participant[count - 1]}</p>
            <p className="Participant">🥐{countCroissant.participant[count]}🥐</p>
            <p className="Participant_P1">{countCroissant.participant[count + 1]}</p>
        </div>
    )



    return (
        <div className="Croissant-wrap">
            <h2 className="title-trafic">Croissant day</h2>
            {CroissantLive}
        </div>
    )

}

export default Croissant