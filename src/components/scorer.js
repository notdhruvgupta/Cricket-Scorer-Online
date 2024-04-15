import React, { useState, useEffect } from 'react';
import Button from './runs';
import undo from '../assets/undo.svg'
import WinModal from './winModal';
import ConfettiExplosion from 'react-confetti-explosion';


const runs = [
  {
    name: 0
  },
  {
    name: 1
  },
  {
    name: 2
  },
  {
    name: 3
  },
  {
    name: 4
  },
  {
    name: 6
  }
]

const umpire = [
  {
    name: 'OUT'
  },
  {
    name: 'WIDE'
  },
  {
    name: 'NO BALL'
  },
]

export default function Scorer({win, setWin, team, setBattingTeam, teamTwoScore, teamOneScore, battingTeam, setTeamOneScore, setTeamTwoScore }) {

  const [score, setScore] = useState(parseInt(sessionStorage.getItem('score')) || 0);
  const [wik, setWik] = useState(parseInt(sessionStorage.getItem('wik')) || 0);
  const [overs, setOvers] = useState(parseInt(sessionStorage.getItem('overs')) || 0);
  const [balls, setBalls] = useState(parseInt(sessionStorage.getItem('balls')) || 0);
  const [scoreDefenders, setScoreDefenders] = useState(parseInt(sessionStorage.getItem('scoreDefenders'))||0);
  const [striker, setStriker] = useState(parseInt(sessionStorage.getItem('striker')) || 0);
  const [nonStriker, setNonStriker] = useState(parseInt(sessionStorage.getItem('nonStriker')) || 1);
  const [batting, setBatting] = useState(parseInt(sessionStorage.getItem('balls')) || 0);

  // batting 0 - striker
  // batting 1 - non-striker


  useEffect(() => {
    sessionStorage.setItem('score', score);
    sessionStorage.setItem('wik', wik);
    sessionStorage.setItem('overs', overs);
    sessionStorage.setItem('balls', balls);
    sessionStorage.setItem('striker', striker);
    sessionStorage.setItem('nonStriker', nonStriker);
    sessionStorage.setItem('scoreDefenders', scoreDefenders);
  }, [score, wik, overs, balls, nonStriker, striker, scoreDefenders]);

  const updateScore = (run) => {
    if (run % 2 !== 0) {
      if (batting === 1) {
        setBatting(0);
      } else {
        setBatting(1);
      }
    }
    if (battingTeam === 1) {
      if (batting === 0) {
        teamOneScore[striker] += run;
      } else {
        teamOneScore[nonStriker] += run;
      }
    } else {
      if (batting === 0) {
        teamTwoScore[striker] += run;
      } else {
        teamTwoScore[nonStriker] += run;
      }
    }
    let liveScore = score + run;
    setScore(liveScore);
    setBalls((balls + 1) % 6);
    setOvers((balls + 1) % 6 === 0 ? overs + 1 : overs + 0);
    console.log(score + run, scoreDefenders);
    if(scoreDefenders !== 0 && score + run > scoreDefenders) {
      setWin(1);
    }
  }

  const updateWicket = () => {
    if (team.length === 0) {
      if(battingTeam === 1) {
        setTeamOneScore([...teamOneScore, 0])
      } else {
        setTeamTwoScore([...teamTwoScore, 0])
      }
      if (wik > 9) {
        endInnings();
        return;
      }
    } else if (wik >= team.length - 2) {
      endInnings();
      return
    }
    console.log(wik + 2);
    if (batting === 0) {
      setStriker(wik + 2);
    } else {
      setNonStriker(wik + 2);
    }
    setWik(wik + 1);
    setBalls((balls + 1) % 6);
    setOvers((balls + 1) % 6 === 0 ? overs + 1 : overs + 0);
  }

  function umpireCalls(e) {
    if (e === 'OUT') {
      updateWicket();
    } else if (e === 'WIDE') {
      setScore(score + 1)
    } else if (e === 'NO BALL') {
      setScore(score + 1)
    }
  }

  function endInnings() {
    const iningsScore = score + 1;
    setScoreDefenders(iningsScore);
    if(battingTeam === 1) {
      setBattingTeam(2);
    } else {
      setBattingTeam(1);
    }
    setScore(0);
    setWik(0);
    setBalls(0);
    setOvers(0);
    setStriker(0);
    setNonStriker(1);
  }

  function beautifyText(str) {
    if (str === '' || str === undefined) {
      return '';
    } else {
      const words = str.split(' ');
      const capitalizedWords = words.map(word => {
        if (word.length === 0) {
          return '';
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      return capitalizedWords.join(' ');
    }
  }

  return (
    <div className={`flex flex-col justify-center items-center border-2 ${win ? 'opacity-20 pointer-events-none' : 'none'}`}>
      {battingTeam === 1 ? <p className='font-bold bg-[#8CABFF] px-2 py-1 rounded-md text-white'>Team One</p> : <p className='font-bold bg-[#ff707e] px-2 py-1 rounded-md text-white'>Team Two</p>}
      <div className=' relative'>
        <div className='flex items-end'>
          <p className='text-[5em] font-bold text-[#EEEEEE]'>{score}/{wik}</p>
          <p className='text-[2em] font-semibold text-[#5d636e] ml-4 mb-4'>{overs}.{balls}</p>
        </div>
        <img role='button' src={undo} className='absolute top-3 left-[100%] w-8 p-[0.2em] bg-[#DDE6ED]  flex rounded-full' />
      </div>

      {scoreDefenders !== 0 &&
        <div className='text-[1.5em] font-semibold flex gap-3 text-white'>
          {!win ? <p className=''>To Win: {scoreDefenders - score}</p> : <p>You Win</p>}
        </div>
      }

      <div className='w-[75%]'>
        <div className='flex'>
          <div className='flex-1 my-2 py-2 px-3 font-semibold  border rounded-l-md text-[#fff]'>
            {batting === 0 && <p className='text-[0.8em] opacity-45'>Batting</p>}
            {team[striker] !== undefined ? <p className='truncate'>{beautifyText(team[striker])}</p> : <p className='truncate'>Player {striker}</p>}
          </div>
          <div className='flex justify-center items-center my-2 py-2 px-3 font-semibold text-[#fff] border rounded-r-md'>
            <p className='truncate'>{battingTeam === 1 ? teamOneScore[striker] : teamTwoScore[striker]} <span className='text-sm opacity-50'>(0)</span></p>
          </div>
        </div>
        <div className='flex'>
          <div className='flex-1 my-2 py-2 px-3 font-semibold  border rounded-l-md text-[#fff]'>
            {batting !== 0 && <p className='text-[0.8em] opacity-45'>Batting</p>}
            {team[nonStriker] !== undefined ? <p className='truncate'>{beautifyText(team[nonStriker])}</p> : <p className='truncate'>Player {nonStriker}</p>}

          </div>
          <div className='flex justify-center items-center my-2 py-2 px-3 font-semibold text-[#fff] border rounded-r-md'>
            <p className='truncate'>{battingTeam === 1 ? teamOneScore[nonStriker] : teamTwoScore[nonStriker]}<span className='text-sm opacity-50'>(0)</span></p>
          </div>
        </div>
      </div>

      <div className='gap-4 text-[2em] grid grid-cols-3 mt-5'>
        {runs.map((run, index) => (
          <Button key={index} name={run.name} updateScore={updateScore} updateWicket={updateWicket} />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4 mt-5'>
        {umpire.map((ump, index) => (
          <div
            role='button'
            key={index}
            className={`font-bold text-[1.1em] rounded-md px-3 py-2 flex justify-center items-center ${ump.name === 'OUT' ? 'bg-red-400 text-white' : 'none'} ${ump.name === 'WIDE' ? 'bg-white text-black' : 'none'} ${ump.name === 'NO BALL' ? 'bg-[#F05941] text-white' : 'none'}`}
            onClick={() => umpireCalls(ump.name)}
          >
            {ump.name}
          </div>
        ))}
      </div>

      <div role='button' onClick={endInnings} className='border-2 m-4 py-2 px-4 flex justify-center rounded-lg bg-black font-bold text-white'>
        END INNINGS
      </div>
    </div>
  );
}