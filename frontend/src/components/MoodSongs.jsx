import React from 'react'
import { useState } from 'react'
import './MoodSongs.css'

const MoodSongs = ({ Songs }) => {

    const [isPlaying, setIsPlaying] = useState(null);

    const handlePlayPause = (index) => {
        if (isPlaying === index) {
            setIsPlaying(null);
        } else {
            setIsPlaying(index);
        }
    };

    const getMoodIcon = (index) => {
        const icons = ['🎵', '🎶', '🎼', '🎤', '🎧', '🎸', '🎹', '🥁'];
        return icons[index % icons.length];
    };

    if (!Songs || Songs.length === 0) {
        return (
            <div className='mood-songs'>
                <h2>Recommended Songs</h2>
                <div className="no-songs">
                    <h3>🎭 Ready to discover your mood?</h3>
                    <p>Click "Detect My Mood" to get personalized song recommendations!</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mood-songs'>
            <h2>Recommended Songs</h2>
            <div className="songs-container">
                {Songs.map((song, index) => (
                    <div className='song' key={index}>
                        <div className="song-info">
                            <div className="song-icon">
                                {getMoodIcon(index)}
                            </div>
                            <div className="title">
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                            </div>
                        </div>
                        
                        <div className="play-pause-button">
                            {isPlaying === index && (
                                <>
                                    <audio
                                        src={song.audio}
                                        style={{ display: 'none' }}
                                        autoPlay={isPlaying === index}
                                    />
                                    <div className="playing-indicator"></div>
                                </>
                            )}
                            <button 
                                className="play-button"
                                onClick={() => handlePlayPause(index)}
                            >
                                {isPlaying === index ? 
                                    <i className="ri-pause-line"></i> : 
                                    <i className="ri-play-circle-fill"></i>
                                }
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MoodSongs