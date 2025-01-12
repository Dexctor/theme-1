'use client'
import { useState, useRef } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed top-4 left-4 bg-black p-4 rounded-lg shadow-lg flex items-center text-white space-x-4 z-[9999]">
      <button onClick={togglePlayPause} className="focus:outline-none">
        {isPlaying ? (
          <PauseIcon className="w-6 h-6 text-white" />
        ) : (
          <PlayIcon className="w-6 h-6 text-white" />
        )}
      </button>
      <div 
        className="flex items-center space-x-2" 
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <SpeakerWaveIcon className="w-5 h-5 text-white cursor-pointer" />
        <div className={`transition-all duration-300 overflow-hidden ${showVolume ? 'w-24' : 'w-0'}`}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <audio ref={audioRef} src="/audio/Music.mp3" loop />
    </div>
  );
};

export default AudioPlayer;