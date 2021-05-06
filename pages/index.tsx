import { useState } from "react";
import Head from "next/head";
import Image from 'next/image';
import { Key, ReactPlayerState } from "../interfaces";
import ReactPlayer from "react-player";
import Player from "../components/Player";

const config = {
  BUCKET_URL: "https://storage.googleapis.com/la-botonera-del-forza",
};

const test = [
  {
    id: 1,
    title: "No se de que me hablas, hermano",
    emoji: "🤷‍♂️",
    asset: `${config.BUCKET_URL}/no-se-de-que-me-hablas.m4a`,
  },
  {
    id: 2,
    emoji: "⏰",
    title: "Alarma",
    asset: `${config.BUCKET_URL}/alarma.mp3`,
  },
  {
    id: 3,
    emoji: "💘",
    title: "Si el camino tiene corazon, es bueno",
    asset: `${config.BUCKET_URL}/camino-corazon.mp3`,
  },
  {
    id: 4,
    emoji: "👨‍🦯",
    title: "No te dejes engañar, gordo!",
    asset: `${config.BUCKET_URL}/no-te-dejes-enganar.mp3`,
  },
  {
    id: 5,
    emoji: "🙏",
    title: "Yo no tengo drama en pedir perdon",
    asset: `${config.BUCKET_URL}/pedir-perdon.mp3`,
  },
  {
    id: 6,
    emoji: "😁",
    title: "Risita",
    asset: `${config.BUCKET_URL}/risita.m4a`,
  },
  {
    id: 7,
    emoji: "👦🏿",
    title: "Negro hijo de puta!",
    asset: `${config.BUCKET_URL}/negro-hijo-de-puta.mp3`,
  },
  {
    id: 8,
    emoji: "😗",
    title: "Silbido",
    asset: `${config.BUCKET_URL}/silbido.m4a`,
  },
  {
    id: 9,
    emoji: "🤪",
    title: "Sos un tarado",
    asset: `${config.BUCKET_URL}/sos-un-tarado.m4a`,
  },
  {
    id: 10,
    emoji: "🤯",
    title: "Tengo la cabeza en cualquier lado",
    asset: `${config.BUCKET_URL}/tengo-la-cabeza-en-cualquier-lado.mp3`,
  },
] as Key[];

const IndexPage = () => {
  const [items] = useState<Array<Key>>(test);
  const [key, setKey] = useState<Key>(items[0]);
  const [playing, setPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [playtime, setPlaytime] = useState<number>(0);

  const handleClick = (idx: number) => {
    setPlaying(true);
    setKey(items[idx]);
  };

  const handleSkipBack = () => {
    key.id > 1 ? setKey(items[key.id - 1]) : null;
    setPlaying(true);
  };

  const handleSkipForward = () => {
    key.id < items.length ? setKey(items[key.id + 1]) : null;
    setPlaying(true);
  };

  const handleProgress = ({
    loadedSeconds,
    playedSeconds,
  }: ReactPlayerState) => {
    setDuration(loadedSeconds);
    setPlaytime(playedSeconds);
  };

  return (
    <div>
      <Head>
        <title>#LaBotoneraDelForza</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <section>
        <div className="header has-text-centered p-4">
          <p className="title m-0">#LaBotoneraDelForza</p>
          <Image src='/assets/forza.png' alt="#ElForza" width="98" height="98" />
        </div>

        <section className="main p-4">
          <div className="grid">
            {items.map((item, i) => (
              <div key={item.id}>
                <button
                  data-tooltip={item.title}
                  className="button is-info is-light key"
                  onClick={() => handleClick(i)}
                >
                  <span>{item.emoji}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="footer has-text-centered p-4">
          <Player
            playing={playing}
            handleSkipBack={handleSkipBack}
            handleSkipForward={handleSkipForward}
            setPlaying={setPlaying}
            nowPlaying={key.title}
            duration={duration}
            playtime={playtime}
          />

          <ReactPlayer
            url={key.asset}
            playing={playing}
            onEnded={() => setPlaying(false)}
            onProgress={(state) => handleProgress(state)}
            width={"100%"}
            height={"100%"}
          />
        </section>
      </section>
    </div>
  );
};

export default IndexPage;
