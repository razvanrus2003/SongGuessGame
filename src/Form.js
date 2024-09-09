import React, { useState } from 'react';

export default function MyForm({artist, song, setArtist, setSong, handleSubmit}) {  
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   alert(`The ${label} you entered was: ${answer}`);
    // }
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="formBody">
          <div className="formInput">
            <div className="labelInputPair">
            <input className="answer"
              type="text" 
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <label for="artist" className="answerLabel">Artist:</label>
            </div> 

            <div className="labelInputPair">
            <input className="answer"
              type="text" 
              id="song"
              value={song}
              onChange={(e) => setSong(e.target.value)}
            />
            <label for="song" className="answerLabel">Song:</label>
            </div>
          </div>

          <input className="answer" type="submit" value="Submit"/>
        </div>
      </form>
    );
  }