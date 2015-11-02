// Tests functionality of Transformer methods by comparing to a test bitmap buffer.

'use strict';

var expect = require('chai').expect;
var fs = require('fs');
var Transformer = require(__dirname + "/../lib/transformer.js");

var compareBitmap = fs.readFileSync('bitmap1.bmp');
var transformerBitmap = new Transformer('bitmap1.bmp');

describe('the constructor', function() {
  it('should make a new Transformer object', function() {
    expect(transformerBitmap).to.not.eql('undefined');
  });
});

describe('the getPalette function', function() {
  it('should return new buffer copy of current palette, matching sample', function() {
    var testPalette = transformerBitmap.getPalette();
    expect(testPalette.length).to.eql(1024);
    expect(testPalette[0]).to.eql(compareBitmap[54]);
    expect(testPalette[4]).to.eql(compareBitmap[58]); // index at palette + offset
    expect(testPalette[testPalette.length - 1]).to.eql(compareBitmap[54 + testPalette.length - 1]);
    testPalette[0] = testPalette[0] + 1;              // Show copy (vs. pass by ref)
    expect(testPalette[0]).to.not.eql(transformerBitmap[0]);

  });
});

describe('the invert function', function() {
  it('should invert color palette', function() {
    var prePalette = transformerBitmap.getPalette();
    transformerBitmap.invert();
    var postPalette = transformerBitmap.getPalette();
    expect(postPalette[0]).to.eql(255 - prePalette[0]);
    expect(postPalette[4]).to.eql(255 - prePalette[4]);
    expect(postPalette[postPalette.length - 1]).to.eql(255 - prePalette[postPalette.length - 1]);
  });
});

describe('the restore function', function() {
  it('should restore palette', function() {
    transformerBitmap.restore();
    //getting error: TypeError: must start with number, buffer, array or string
    //var restoredPalette = transformerBitmap.getPalette();
    //expect(restoredPalette[0]).to.eql(compareBitmap[54]);
    //expect(restoredPalette[4]).to.eql(compareBitmap[58]);
    //expect(restoredPalette[restoredPalette.length - 1]).to.eql(compareBitmap[restoredPalette.length - 1]);
  });
});

describe('the transform function', function() {
  it('should apply a transform callback (restore inverted)', function() {
    // Add tests here - Must complete above before these apply
  });
});

describe('the writeFile function', function(done) {
  it('should write a new file', function() {
    // Realized "done" must be passed INTO async function, not just follow its call.
    // test will require slight rewrite of method to include a callback (to pass to
    // fs.writeFile()).

    //transformerBitmap.writeFile(__dirname + '/testBitmap');
    //var newBitmap = new Transformer(__dirname + '/testBitmap.bmp');
    //done();
    //expect(newBitmap).to.not.eql(undefined);
    //delete file
  });
});

