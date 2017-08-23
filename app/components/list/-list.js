import Ember from 'ember';

const {
  Component,
} = Ember;

let ListComponent = Component.extend({
  tagName: 'menu',
  itemComponent: 'list/-item',
});

ListComponent.reopenClass({
  positionalParams: ['items'],
});

export default ListComponent;
