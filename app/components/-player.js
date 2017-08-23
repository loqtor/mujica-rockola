import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  computed,
  computed: {
    notEmpty,
  },
  get,
  getProperties,
  inject: {
    service,
  },
  run: {
    next,
  },
  set,
  String: {
    dasherize,
  },
} = Ember;

// Look at this if this does not work: https://github.com/nypublicradio/ember-hifi
let PlayerComponent = Component.extend({
  audio: service(),

  buttonLabel: 'Play',
  sound: null,

  hasAudio: notEmpty('sound'),

  mediaAlias: computed('media', function () {
    let title = get(this, 'media.title');
    return dasherize(title);
  }),

  taskLoadAudio: task(function* () {
    let media = get(this, 'media');

    if (media) {
      let src = get(media, 'src');
      let { audio, mediaAlias } = getProperties(this, [
        'audio',
        'mediaAlias',
      ]);

      let sound = yield audio.load(src).asSound(mediaAlias);

      if (sound) {
        set(this, 'sound', sound);
      }
    }
  }),

  init() {
    this._super(...arguments);

    next(() => {
      get(this, 'taskLoadAudio').perform();
    });
  },

  actions: {
    play() {
      let mediaAlias = get(this, 'mediaAlias');
      get(this, 'audio').getSound(mediaAlias).play();
    },
  },
});

PlayerComponent.reopenClass({
  positionalParams: ['media'],
});

export default PlayerComponent;
