import React, { useEffect, useState } from 'react'
import Scorer from './scorer';
import TeamOne from './teamOne';
import TeamTwo from './teamTwo';
import TossModal from './tossModal';
import WinModal from './winModal';
import ConfettiExplosion from 'react-confetti-explosion';

export default function Start() {
    const [modal, setModal] = useState(parseInt(sessionStorage.getItem('modal')) || 0);
    const [battingTeam, setBattingTeam] = useState(parseInt(sessionStorage.getItem('battingTeam')) || 1)
    const [teamOne, setTeamOne] = useState(JSON.parse(sessionStorage.getItem('teamOne')) || []);
    const [teamTwo, setTeamTwo] = useState(JSON.parse(sessionStorage.getItem('teamTwo')) || []);
    const [teamOneScore, setTeamOneScore] = useState(JSON.parse(sessionStorage.getItem('teamOneScore')) || [0, 0]);
    const [teamTwoScore, setTeamTwoScore] = useState(JSON.parse(sessionStorage.getItem('teamTwoScore')) || [0, 0]);
    const [win, setWin] = useState(parseInt(sessionStorage.getItem('win')) || 0);

    useEffect(() => {
        sessionStorage.setItem('modal', modal)
        sessionStorage.setItem('win', win)
        sessionStorage.setItem('battingTeam', battingTeam)
        sessionStorage.setItem('teamOne', JSON.stringify(teamOne))
        sessionStorage.setItem('teamTwo', JSON.stringify(teamTwo))
        sessionStorage.setItem('teamOneScore', JSON.stringify(teamOneScore))
        sessionStorage.setItem('teamTwoScore', JSON.stringify(teamTwoScore))
    }, [modal, battingTeam, win, teamOne, teamTwo, teamOneScore, teamTwoScore]);

    function restart() {
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            {modal === 0 && <TossModal setModal={setModal} setBattingTeam={setBattingTeam} />}
            {win === 1 &&
                <div className={`text-3xl flex-col z-10 right-0 left-0 top-0 bottom-0 m-auto h-[200px] w-[350px] rounded-[10px] shadow-[0px_0px_5px_1px_#4A5568] flex p-[2em] justify-center items-center absolute border-2 bg-[#393E46] ${battingTeam === 1 ? 'border-[#8CABFF]' : 'border-[#ff707e]'}`}>
                    {battingTeam === 1 ? <p className=' font-semibold text-[#8CABFF]'>Team One Won</p> : <p className='font-semibold text-[#ff707e]'>Team Two Won</p>}
                    <ConfettiExplosion />
                    <div role='button' onClick={restart} className='text-white text-xl font-semibold border p-2 mt-4 rounded-lg hover:bg-white hover:text-black'>
                        Restart
                    </div>
                </div>}
            <div className={`grid md:grid-cols-3 min-h-screen ${modal === 0 ? 'opacity-15' : 'none'}`}>
                <TeamOne teamOne={teamOne} setTeamOne={setTeamOne} teamOneScore={teamOneScore} setTeamOneScore={setTeamOneScore} />
                <Scorer win={win} setWin={setWin} battingTeam={battingTeam} teamOneScore={teamOneScore} teamTwoScore={teamTwoScore} setTeamOneScore={setTeamOneScore} setTeamTwoScore={setTeamTwoScore} setBattingTeam={setBattingTeam} team={battingTeam === 1 ? teamOne : teamTwo} />
                <TeamTwo teamTwo={teamTwo} setTeamTwo={setTeamTwo} teamTwoScore={teamTwoScore} setTeamTwoScore={setTeamTwoScore} />
            </div>
        </div>
    )
}
