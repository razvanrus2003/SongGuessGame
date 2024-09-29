import React, { useState } from 'react';
import database from '../static/songs_database.json'
import artists from '../static/artists_database.json'

export default function MyForm({artist, song, setArtist, setSong, handleSubmit}) {  
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   alert(`The ${label} you entered was: ${answer}`);
    // }
    return (
      // <form onSubmit={handleSubmit}>
        <div className="formBody">
          <div className="formInput">
            <div className="labelInputPair">
            <input className="answer"
              type="text" 
              id="artist"
              list="artists"
              autocomplete="off"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <datalist id="artists">
              {artists.sort().map((a) => (<option value={a}/>))}
            </datalist>
            <label for="artist" className="answerLabel">Artist:</label>
            </div> 

            <div className="labelInputPair">
            <input className="answer"
              type="text" 
              id="song"
              list="songs"
              autocomplete="off"
              value={song}
              onChange={(e) => setSong(e.target.value)}
            />
            <datalist id="songs">
              {database.options.filter((option) => (option.artist == artist || artist == '')).map((o) => o.title).sort().map((t) => (<option value={t}/>))}
            </datalist>
            <label for="song" className="answerLabel">Song:</label>
            </div>
          </div>

          <button className="submitButton" onClick={handleSubmit}> Submit </button>
        </div>
      // </form>
    );
  }