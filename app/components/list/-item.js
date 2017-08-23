import Ember from 'ember';

const {
  Component,
} = Ember;

let ItemComponent = Component.extend({
  tagName: 'li',
  item: null,
});

ItemComponent.reopenClass({
  positionalParams: ['item'],
});

export default ItemComponent;
