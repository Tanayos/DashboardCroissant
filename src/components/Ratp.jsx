import React, { useState, useEffect } from 'react';

const Ratp = () => {
    const URL = 'https://api-ratp.pierre-grimaud.fr/v4/traffic'
    const [ratpData, setRatpData] = useState({
        metros: [],
        rer: [],
        tramway: []

    })
    async function fetchAPIratp() {
        const resp = await fetch(URL);
        const data = await resp.json();
        let metros = data.result.metros;
        let rers = data.result.rers;
        let tramways = data.result.tramways;

        const metroProblem = [];
        const rersProblem = [];
        const tramProblem = [];
        // eslint-disable-next-line
        tramways.map((tramway) => {

            if (tramway.slug !== 'normal' && tramway.slug !== 'normal_trav') {
                tramProblem.push(tramway)
            }
        })
        // eslint-disable-next-line
        rers.map((rer) => {
            if (rer.slug !== 'normal' && rer.slug !== 'normal_trav') {
                rersProblem.push(rer)
            }
        })
        // eslint-disable-next-line
        metros.map((metro) => {
            if (metro.slug !== 'normal' && metro.slug !== 'normal_trav') {
                metroProblem.push(metro)

            }
        })
        setRatpData({ ...ratpData, metros: metroProblem, rer: rersProblem, tramway: tramProblem })
    }
    useEffect(() => {
        fetchAPIratp()
        setInterval(() => {

            fetchAPIratp()
        }, 60000)
    }, []);
    const ratpLive = (
        <div>
            {ratpData.metros.map((metro) => {
                return (
                    <div className="ratp-wrap-w" key={metro.line}>
                        <span className="ratp-left">
                            <span className={`metro ligne${metro.line}`}></span>
                        </span>
                        <span className="ratp-right">{metro.title}</span>
                        <span className='ratp-bottom'>{metro.message}</span>
                    </div>
                )
            })}
            {ratpData.rer.map((rer) => {

                return (
                    <div className="ratp-wrap-w" key={rer.line}>
                        <span className="ratp-left">
                            <span className={`rer ligne${rer.line}`}></span>
                        </span>
                        <span className="ratp-right">{rer.title}</span>
                        <span className='ratp-bottom'>{rer.message}</span>
                    </div>
                )
            })}
            {ratpData.tramway.map((tramways) => {

                return (
                    <div className="ratp-wrap-w" key={tramways.line}>
                        <span className="ratp-left">
                            <span className={`tram ligne${tramways.line}`}></span>
                        </span>
                        <span className="ratp-right">{tramways.title}</span>
                        <span className='ratp-bottom'>{tramways.message}</span>
                    </div>
                )
            })}
        </div>
    )
    console.log('toot', ratpData)
    return (
        <div className='wrap-ratp'>
            <h2 className="title-trafic">Trafic</h2>
            {ratpLive}

        </div>
    )
}

export default Ratp