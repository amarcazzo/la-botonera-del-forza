import { useState } from 'react';
import { Key, ReactPlayerState } from '../interfaces';
import ReactPlayer from 'react-player';
import Player from '../components/player';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getAll } from '../lib/key';
import Layout from '../components/layout';
import Link from 'next/link';
import { Emoji } from 'emoji-mart';

type Props = {
  keys: Array<Key>;
};

const IndexPage = ({ keys }: Props) => {
  const [key, setKey] = useState<Key>(
    keys[Math.floor(Math.random() * keys.length)]
  );
  const [playing, setPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [playtime, setPlaytime] = useState<number>(0);

  const handleClick = (idx: number) => {
    setPlaying(true);
    setKey(keys[idx]);
  };

  const handleSkipBack = () => {
    const idx = keys.findIndex((_key) => _key.id === key.id!);
    idx > 0 ? setKey(keys[idx - 1]) : null;
    setPlaying(true);
  };

  const handleSkipForward = () => {
    const idx = keys.findIndex((_key) => _key.id === key.id!);
    idx < keys.length - 1 ? setKey(keys[idx + 1]) : null;
    setPlaying(true);
  };

  const handleProgress = ({
    loadedSeconds,
    playedSeconds
  }: ReactPlayerState) => {
    setDuration(loadedSeconds);
    setPlaytime(playedSeconds);
  };

  return (
    <Layout>
      <section>
        <section className="main p-4">
          <div className="grid">
            {keys.map((item, i) => (
              <div className="has-text-centered" key={item.id}>
                <span
                  data-tooltip={item.title}
                  className="button is-info is-light key"
                  onClick={() => handleClick(i)}
                >
                  <Emoji emoji={item.emoji} size={32} />
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="footer has-text-centered p-4">
          <Link href="key/add">
            <span className="button is-info m-6">Agregar boton</span>
          </Link>

          <Player
            playing={playing}
            handleSkipBack={handleSkipBack}
            handleSkipForward={handleSkipForward}
            setPlaying={setPlaying}
            nowPlaying={key?.title}
            duration={duration}
            playtime={playtime}
          />

          <ReactPlayer
            url={key?.asset}
            playing={playing}
            onEnded={() => setPlaying(false)}
            onProgress={(state) => handleProgress(state)}
            width={'100%'}
            height={'100%'}
          />
        </section>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(
  _context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<any>> {
  const keys = await getAll();

  return {
    props: {
      keys
    }
  };
}

export default IndexPage;
