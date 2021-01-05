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
  const [playing, setPlaying] = useState(true);
  const [focus, setFocus] = useState(true);
  const [song, setSong] = useState(0);
  const [audio] = useState(new Audio(list[song]));
  const [check, setCheck] = useState(false);
  //const context = new (window.AudioContext || window.webkitAudioContext)();

  const [context, setContext] = useState(null);
  /*
  useEffect(() => {
    initAudio();
    setCheck(true);
    return () => {
      analyser.disconnect();
      source.disconnect();
    };
  }, []);
  */

  useEffect(() => {
    const whenFocus = () => {
      if (audio.paused && !playing && !focus) {
        audio.play();
        setFocus(true);
      }
    };

    const whenBlur = () => {
      if (!audio.paused && playing && focus) {
        audio.pause();
        setFocus(false);
      }
    };

    window.addEventListener('focus', whenFocus);
    window.addEventListener('blur', whenBlur);

    return () => {
      window.removeEventListener('focus', whenFocus);
      window.removeEventListener('blur', whenBlur);
    };
  }, [playing]);

  useEffect(() => {
    if (!loading) {
      setContext(new (window.AudioContext || window.webkitAudioContext)());
    }
  }, [loading]);

  useEffect(() => {
    if (context) {
      initAudio();
      setCheck(true);
      audio.play();
    }
    return () => {
      if (context) {
        analyser.disconnect();
        source.disconnect();
      }
    };
  }, [context]);

  const initAudio = () => {
    //audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';
    audio.onplaying = () => {
      setPlaying(true);
    };
    audio.onpause = () => {
      setPlaying(false);
    };
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
      <Loading loading={loading} setLoading={setLoading} />
      <Background song={song} />
      <Player
        playing={playing}
        list={list}
        song={song}
        audio={audio}
        setSong={setSong}
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
