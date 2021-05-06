const formatSeconds = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
};

type Props = {
  playing: boolean;
  nowPlaying: string;
  duration: number;
  playtime: number;
  handleSkipBack: Function;
  setPlaying: Function;
  handleSkipForward: Function;
};

const Player = ({
  playing,
  nowPlaying,
  duration,
  playtime,
  handleSkipBack,
  handleSkipForward,
  setPlaying,
}: Props) => (
  <div>
    <h3>
      Reproduciendo: <em>"{nowPlaying}"</em>
    </h3>
    <button
      className="button is-secondary m-1"
      onClick={() => handleSkipBack()}
    >
      <i className="ri-skip-back-line"></i>
    </button>
    {playing ? (
      <button
        className="button is-secondary m-1"
        onClick={() => setPlaying(false)}
      >
        <i className="ri-pause-line"></i>
      </button>
    ) : (
      <button
        className="button is-secondary m-1"
        onClick={() => setPlaying(true)}
      >
        <i className="ri-play-line"></i>
      </button>
    )}
    <button
      className="button is-secondary m-1"
      onClick={() => handleSkipForward()}
    >
      <i className="ri-skip-forward-line"></i>
    </button>
    <div>
      <span className="mr-2">{formatSeconds(playtime)}</span>
      <progress
        id="player"
        className="is-fullwidth"
        value={playtime}
        max={duration}
      ></progress>
      <span className="ml-2">{formatSeconds(duration)}</span>
    </div>
  </div>
);

export default Player;
