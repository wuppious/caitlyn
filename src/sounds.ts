import { Howl } from 'howler';

const sounds = {
  cow: {
    moo: new Howl({ src: ['assets/audio/moo.ogg'] }),
    hurt: new Howl({ src: ['assets/audio/hurt.ogg'] }),
  },
  environment: {
    gravel: new Howl({ src: ['assets/audio/gravel.ogg'] }),
    wob: new Howl({ src: ['assets/audio/wob.wav'] }),
  },
};

export default sounds;
