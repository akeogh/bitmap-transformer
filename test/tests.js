'use strict';

var expect = require('chai').expect;

describe('the test function', function() {
  it('should send back a greeting by name', function() {
    expect('hello').to.eql('hello');
  });
});
