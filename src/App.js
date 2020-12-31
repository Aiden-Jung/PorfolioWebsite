import {useState} from 'react';
import {useSpring} from 'react-spring';
import Loading from './pages/Loading';
import Player from './components/Player';
import {spring, summer, fall, winter, special} from './assets/music/index';
import Pages from './pages/index';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import GlobalFonts from './assets/fonts/fonts';

function App() {

  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const list = [special, spring, summer, fall, winter];
  const [song, setSong] = useState(0);
  const [audio] = useState(new Audio(list[song]));

  return (
    loading ?
    <Loading setLoading={setLoading}/>
    :
    <>
    <GlobalFonts/>
    <Player playing={playing} list={list} song={song} audio={audio} setSong={setSong} setPlaying={setPlaying}/>
    <Router>
    <Pages audio={audio} song={song}/>
    </Router>
    </>
  );
}

export default App;
