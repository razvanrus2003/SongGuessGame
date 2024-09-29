import React, { useEffect, useState } from 'react';
import Player from './Player';

export function App(props) {

    const [rightArtist, setRightArtist] = useState('');
    const [rightSong, setRightSong] = useState('');
    const [source, setSource] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/sotd')
            .then(response => response.json())
            .then(data => {
                    setRightArtist(data.artist);
                    setRightSong(data.title);
                    setSource('assets/' + data.file);
                }
            );
    }, [])
    
    if (source != '') {
        return (<div className="App">
            <Player rightArtist={rightArtist} rightSong={rightSong} source={source}/>
        </div>);
    } else {
        return (<div className="App">
            <p>Loading...</p>
        </div>);
    }
}