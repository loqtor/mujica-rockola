import Ember from 'ember';

const {
  Component,
  computed,
  get,
  getProperties,
  inject: {
    service,
  },
  run: {
    next,
  },
  String: {
    dasherize,
  },
} = Ember;

// Look at this if this does not work: https://github.com/nypublicradio/ember-hifi
let PlayerComponent = Component.extend({
  audio: service(),

  buttonLabel: 'Play',

  mediaAlias: computed('media', function () {
    let title = get(this, 'media.title');
    return dasherize(title);
  }),

  init() {
    this._super(...arguments);

    next(() => {
      let media = get(this, 'media');

      if (media) {
        let src = get(media, 'src');
        let { audio, mediaAlias } = getProperties(this, [
          'audio',
          'mediaAlias',
        ]);

        audio.load(src).asSound(mediaAlias);
      }
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
