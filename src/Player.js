import React, { useEffect, useState } from 'react'; 

import useSound from "use-sound"; // for handling the sound
import sotd from "../assets/song1.mp3"; // importing the music

import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'; // icons for play and pause
import { IconContext } from 'react-icons'; // for customazing the icons

import ProgressBar from './ProgressBar';
import MyForm from './Form';
import Guess from './Guess';

export default function Player() {
    const targets = [0.1, 0.5, 2, 4, 8, 15, 30];
    const [target, setTarget] = useState(targets[0]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, duration, sound }] = useSound(sotd);
    
    const [seconds, setSeconds] = useState(0);

    function playingButton() {
        if (isPlaying) {
          pause(); // this will pause the audio
          setIsPlaying(false);
        } else {
          if (target <= sound.seek([])) {
            sound.seek([0]);
          }
          play(); // this will play the audio
          setIsPlaying(true);
          setSeconds(sound.seek([]));
        }
    };
    
    function skipButton() {
      
      let isTarget = (element) => element == target;
      if (target <= 15) {
        cacheAnswer('skipped', '');
      }
      if (target != 30) {
        setTarget(targets[targets.findIndex(isTarget) + 1]);
      }
      if (!isPlaying && (target <= sound.seek([]))) {
        play(); // this will play the audio
        setIsPlaying(true);
        setSeconds(sound.seek([]));
      }

      // console.log(answersState);
    };
    
    useEffect(() => {
      const interval = setInterval(() => {
        if (isPlaying) {
          let sec = sound.seek([]);
          if (isNaN(sec))
            sec = 0;
          // console.log("sec:%f", sec);
          if (sec >= target) {
            playingButton();
            setSeconds(target);
            // sound.seek([0]);
          } else {
            setSeconds(sec); // setting the seconds state with the current state
          }
        }
      }, 1);
      return () => clearInterval(interval);
    });
    
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');

    const [artistAnswer, setArtistAnswer] = useState('');
    const [songAnswer, setSongAnswer] = useState('');

    const rightArtist = "Guns N' Roses";
    const rightSong = "Knocking On Heavens Door";

    const handleSubmit = (event) => {
      event.preventDefault();

      let isTarget = (element) => element == target;
      if (target != 30) {
        setTarget(targets[targets.findIndex(isTarget) + 1]);
      }

      if (songAnswer != '' && artistAnswer != '' && songAnswer == rightSong && artistAnswer == rightArtist) {
        setArtist(rightArtist);
        setSong(rightSong);
        cacheAnswer('right', rightSong + ' - ' + rightArtist);

        setArtistAnswer(rightArtist);
        setSongAnswer(rightSong);   
      } else if (songAnswer != '' && artistAnswer != '' && songAnswer != rightSong && artistAnswer != rightArtist) { 
        cacheAnswer('wrong', songAnswer + ' - ' + artistAnswer);
        setArtistAnswer('');
        setSongAnswer(''); 
      } else {
        if (artistAnswer != '' && artist == '') {
          if (artistAnswer == rightArtist) {
            setArtist(rightArtist);
            cacheAnswer('right', rightArtist);
            setArtistAnswer(rightArtist);
          } else {
            cacheAnswer('wrong', artistAnswer);
            setArtistAnswer('');
          }
        } else if (songAnswer != '' && song == '') {
          if (songAnswer == rightSong) {
            setSong(rightSong);
            cacheAnswer('right', rightSong);
            setSongAnswer(rightSong);   
          } else {
            cacheAnswer('wrong', songAnswer);
            setSongAnswer(''); 
          }
        }
      }   

      
    }
    
    const [trys, setTrys] = useState(0);
    useEffect(() => {
      if (artist != '' && song != '') {
        setTarget(30);
        if (!isPlaying) {
          playingButton();
        }
      } else if (trys == 6 && (artist == '' || song == '')) {
        setArtist(rightArtist);
        setSong(rightSong);
      }
    }, [trys, artist, song]);

    const [answersState, setAnswersState] = useState(['no answer', 'no answer', 'no answer', 'no answer', 'no answer', 'no answer']);
    const [answersCache, setAnswersCache] = useState([]);


    function cacheAnswer(state, answer) {
      let newStates = [];
      let newCache = [];
      for (let i=0; i < 6; i++) {
        if (i == trys) {
          newStates.push(state);
          newCache.push(answer);
        } else {
          newStates.push(answersState[i]);
          newCache.push(answersCache[i]);
        }
      }
      setAnswersCache(newCache);
      setAnswersState(newStates);
      setTrys(trys + 1);
    }

    return (
        <div className="component">          
          <div>
            <h3 className="song">-{song}-</h3>
            <p className="artist">-{artist}-</p>
          </div>


          <div>
            {!isPlaying ? (
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </button>
            ) : (
              <button className="playButton" onClick={playingButton}>
                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                  <AiFillPauseCircle />
                </IconContext.Provider>
              </button>
            )}
          </div>


          <ProgressBar completed={Math.floor((seconds * 100)/30)}/>
          <p>{target} seconds</p>
          <button className="skipButton" onClick={skipButton}>
             Skip 
          </button>


          <div>
            <MyForm artist={artistAnswer} song={songAnswer} setSong={setSongAnswer} setArtist={setArtistAnswer} handleSubmit={handleSubmit}/>
          </div>


          <div className="answerCache">
            <Guess state={answersState[0]} answer={answersCache[0]} />
            <Guess state={answersState[1]} answer={answersCache[1]} />
            <Guess state={answersState[2]} answer={answersCache[2]} />
            <Guess state={answersState[3]} answer={answersCache[3]} />
            <Guess state={answersState[4]} answer={answersCache[4]} />
            <Guess state={answersState[5]} answer={answersCache[5]} />
          </div>
        </div>        
      );    
}
