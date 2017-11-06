// Import with an underscore in front to prevent jQuery from trying to reach out to a browser instead of our instance of it
import _$ from 'jquery';
// So we can use JSX
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// Emulation of the DOM and HTML at the command line
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
// For specs trying to render connected components: CommentBox, & CommentList.
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

// Set up testing environment to run like a browser in the command line
// Create fake HTML document--equivalent to window.document in the browser
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// Use the fake browser document above and make a fake browser window too
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
// Our instance of jQuery
const $ = _$(window);

// Set up chai-jquery, by calling the imported function with our jQuery instance
chaiJquery(chai, chai.util, $);

// Build helper that should render a given react class that's passed a built component, its props, & app state
function renderComponent(ComponentClass, props = {}, state = {}) {
  // Spin off a rendered copy of the component class
  // Connected components will need access to the redux store
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  // Produce HTML to get access to the actual DOM for the component instance--"renderIntoDocument" requires this access
  // It is wrapped in jQuery so chai jQuery can access it in the DOM with its jQuery helpers
  return $(ReactDOM.findDOMNode(componentInstance));
}

// Build helper for simulating events
// Every jQuery instance you create will have access to "simulate" function
// fn literally refers to the jquery prototype--with its availability to hook your own functionality into jQuery.
// jquery will be the parent scope to your function, so "this" will refer to the jquery object
$.fn.simulate = function(eventName, value) {
  if (value) {
    // Set the value of an HTML input
    this.val(value);
  }
  // Instead of hardwiring the type of event like .click, we pass the event name to be used, & on the first that's found
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect };
