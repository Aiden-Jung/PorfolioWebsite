import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import list from './assets/music/index';
import GlobalStyle from './GlobalStyle';
import Background from './components/Background';
import Loading from './pages/Loading';
import Pages from './pages/index';
import Player from './components/Music/Player';

let frequencyArray = [];
let analyser;
let source;

function App() {
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [song, setSong] = useState(0);
  const [audio] = useState(new Audio(list[song]));
  const [check, setCheck] = useState(false);
  const context = new (window.AudioContext || window.webkitAudioContext)();

  useEffect(() => {
    initAudio();
    setCheck(true);
    return () => {
      analyser.disconnect();
      source.disconnect();
    };
  }, []);

  useEffect(() => {
    const whenFocus = () => {
      if (playing) {
        audio.play();
      }
    };

    const whenBlur = () => {
      if (playing) {
        audio.pause();
      }
    };

    window.addEventListener('focus', whenFocus);
    window.addEventListener('blur', whenBlur);

    return () => {
      window.removeEventListener('focus', whenFocus);
      window.removeEventListener('blur', whenBlur);
    };
  }, [playing]);

  const initAudio = () => {
    audio.crossOrigin = 'anonymous';
    audio.load();

    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(context.destination);

    frequencyArray = new Uint8Array(analyser.frequencyBinCount);
  };

  return (
    <>
      <GlobalStyle />
      <Loading loading={loading} setLoading={setLoading} context={context} />
      <Background song={song} />
      <Player
        playing={playing}
        list={list}
        song={song}
        audio={audio}
        setSong={setSong}
        setPlaying={setPlaying}
      />
      <Router>
        <Pages
          audio={audio}
          song={song}
          analyser={analyser}
          frequencyArray={frequencyArray}
          check={check}
        />
      </Router>
    </>
  );
}

export default App;
