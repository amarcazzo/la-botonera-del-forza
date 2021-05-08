import Link from 'next/link';
import Layout from '../../components/layout';
import { Picker, Emoji, EmojiData } from 'emoji-mart';
import { Key } from '../../interfaces';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

const specialCharactersRegexp = /([A-Z])|([a-z])|([0-9])|(\-)|(\_)|\./;

const removeWhiteSpaces = (str: string) =>
  str
    .split('')
    .filter((char) => specialCharactersRegexp.test(char))
    .join('');

const AddKey = () => {
  const router = useRouter();
  const [newKey, setNewKey] = useState<Key>({
    title: '',
    asset: '',
    emoji: 'smiley'
  });
  const [filename, setFilename] = useState('la-botonera-del-forza.mp3');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [fileLoading, setFileLoading] = useState<boolean>(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setSubmitting(true);

    fetch('/api/key', {
      body: JSON.stringify(newKey),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then((_) => router.push('/'))
      .catch(console.error);
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setNewKey({
      ...newKey,
      [name]: value
    });
  };

  const handleFileChange = async (event: any) => {
    setFileLoading(true);

    const file = event.target.files[0];
    setFilename(file.name);

    const body = new FormData();
    body.append('file', file);

    const res = await fetch('/api/asset', {
      body,
      method: 'POST'
    });

    const [
      {
        storage: { apiEndpoint }
      },
      { name, bucket }
    ] = await res.json();

    setNewKey({
      ...newKey,
      asset: `${apiEndpoint}/${bucket}/${removeWhiteSpaces(name)}`
    });
    setFileLoading(false);
  };

  const handleEmojiSelect = (emoji: EmojiData) => {
    setNewKey({
      ...newKey,
      emoji: emoji.colons!
    });
  };

  const isDisabled = () => {
    return (
      !newKey.asset ||
      !newKey.asset.length ||
      !newKey.emoji ||
      !newKey.emoji.length ||
      !newKey.title ||
      !newKey.title.length ||
      submitting ||
      fileLoading
    );
  };

  return (
    <Layout>
      <section className="form-container p-4">
        <form className="form">
          <div className="field">
            <label className="label" htmlFor="title">
              Titulo
            </label>
            <div className="control">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Anda a lavarte el orto!"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="lastName">
              Audio
            </label>

            <div className="file has-name is-fullwidth">
              <label className="file-label">
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="ri-upload-2-line"></i>
                  </span>
                  <span className="file-label">Elegí tu archivo</span>
                </span>
                <span className="file-name">{filename}</span>
                <input
                  className="file-input hidden"
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="email">
              Emoji
            </label>
            <div className="control">
              <Picker
                theme="light"
                title="Elegí el emoji"
                onSelect={handleEmojiSelect}
                emoji={newKey.emoji}
              />

              <button
                data-tooltip={newKey.title}
                className="button is-info is-light key key-preview"
                onClick={(ev) => ev.preventDefault()}
              >
                <Emoji emoji={newKey.emoji} size={32} />
              </button>
            </div>
          </div>

          <div className="field is-grouped">
            <div className={`control ${submitting ? 'is-loading' : null}`}>
              <button
                className="button is-info"
                onClick={handleSubmit}
                disabled={isDisabled()}
              >
                Agregar
              </button>
            </div>
            <div className="control">
              <Link href="/">
                <button className="button is-secondary">Cancelar</button>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default AddKey;
