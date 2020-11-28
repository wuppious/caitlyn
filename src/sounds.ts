import { Howl } from 'howler';

const sounds = {
  cow: {
    moo: new Howl({ src: ['assets/audio/moo.ogg'] }),
    hurt: new Howl({ src: ['assets/audio/hurt.ogg'] }),
  },
};

export default sounds;
