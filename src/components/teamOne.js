import React, { useEffect } from 'react'
import { useState } from 'react';

export default function TeamOne({teamOne, setTeamOne, teamOneScore, setTeamOneScore}) {
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState('');

    console.log(teamOneScore)

    // Adding player in the team
    const addPlayer = (event) => {
        event.preventDefault();
        if (teamOne.length > 11) {
            setInputText('');
            setError('Team Size cannot exceed 11')
            return;
        }
        if (inputText.trim() === '') {
            setError('Input field cannot be empty');
            return;
        }
        setTeamOne([...teamOne, inputText]);
        setTeamOneScore([...teamOneScore, 0])
        setInputText('');
        setError('');
    }

    // handling keyboard press
    const handleKeyPress = (e) => {
        if (e.code === "Enter") {
            addPlayer(e);
        }
    };

    // handling inputbox text
    const handleChange = (event) => {
        setInputText(event.target.value);
    };

    // beautifying the player names
    function beautifyText(str) {
        const words = str.split(' ');
        const capitalizedWords = words.map(word => {
            if (word.length === 0) {
                return '';
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(' ');
    }


    return (
        <div className='hidden lg:block border-2 border-[#8CABFF] rounded-lg p-4 m-5'>
            <p className='text-[2em] text-center font-bold text-[#8CABFF]'>Team One</p>
            <div className='py-3 gap-3 flex justify-center items-center mx-[05%]'>
                <input value={inputText} onKeyDown={handleKeyPress} onChange={handleChange} className='py-1 px-3 rounded-md flex-1' placeholder='Name'></input>
                <div role='button' onClick={addPlayer} className='bg-[#4477CE] flex justify-center items-center px-3 py-1 rounded-md font-semibold text-[#fff]'>Add</div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className='flex flex-col justify-center items-center'>
                {teamOne.map((player, index) => (
                    <div key={index} className='flex justify-center items-center min-w-[92%] max-w-[92%]'>
                        <div className={`min-w-[79%] max-w-[79%] my-2 py-2 px-3 font-semibold  border rounded-l-md text-[#8CABFF]`}>
                            <p className=' truncate'>{beautifyText(player)}</p>
                        </div>
                        <div className='my-2 py-2 px-3 font-semibold text-[#8CABFF] border rounded-r-md'>
                            <p className=' truncate'>{teamOneScore[index]}<span className='text-sm opacity-50'>(0)</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
