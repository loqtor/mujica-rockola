import Ember from 'ember';

const {
  Route,
  RSVP: {
    hash,
  },
} = Ember;

export default Route.extend({
  model() {
    return hash({
      quotes: [
        {
          title: 'No sea nabo',
          shortDescription: 'Mujica insultó a periodista porque quiso (así que no estoy seguro si es noticia o no).',
          longDescription: 'Mujica insultó a periodista porque quiso (así que no estoy seguro si es noticia o no). Y repetimos, y repetimos, y repetimos, y repetimos, y repetimos, y repetimos, y repetimos, y repetimos, y repetimos.',
          media: {
            title: 'No sea nabo',
            type: 'audio',
            src: 'assets/audio/test.mp3',
          },
        },
      ],
    });
  },
});
