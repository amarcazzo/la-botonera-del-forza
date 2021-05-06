import { useRef, useState } from "react";
import Head from "next/head";
import { Key } from "../interfaces";
import ReactPlayer from "react-player";

const config = {
  BUCKET_URL: "https://storage.cloud.google.com/la-botonera-del-forza",
};

const items = [
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
    title: "No te dejes engañar",
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
  }
] as Key[];

const IndexPage = () => {
  const [key, setKey] = useState<Key>(items[0]);
  const [playing, setPlaying] = useState<boolean>(true);
  const player = useRef(null);

  const handleClick = (idx: number) => {
    console.log(player);
    setKey(items[idx]);
  };

  return (
    <div>
      <Head>
        <title>#LaBotoneraDelForza</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <section className="hero is-white is-fullheight p-6">
        <div className="hero-head">
          <div className="container has-text-centered">
            <p className="title">#LaBotoneraDelForza</p>
          </div>
        </div>

        <div className="hero-body">
          <div className="columns">
            {items.map((item, i) => (
              <div className="column" key={item.id}>
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
        </div>

        <div className="hero-foot h-10">
          <h3>Reproduciendo: {key?.title}</h3>
          {playing ? (
            <button onClick={() => setPlaying(false)}>Pause</button>
          ) : (
            <button onClick={() => setPlaying(true)}>Play</button>
          )}
          <div className="container has-text-centered">
            <ReactPlayer
              light={true}
              url={key.asset}
              playing={playing}
              width={"100%"}
              height={"100%"}
              ref={player}
              config={{ file: {} }}
              controls
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
