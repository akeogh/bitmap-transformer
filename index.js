// Intended to demonstrate the current methods for the bitmap transformer
// module, as of 11-2-15.

'use strict';

var Transformer = require(__dirname + '/lib/transformer');
var fs = require('fs');

var firstBitmap = new Transformer('bitmap1.bmp');
var origPalette = firstBitmap.getPalette();
console.log('test Palette at index 4 ' + origPalette[4]);

console.log('bitmap transform!!');
console.log(firstBitmap.getMetadata());
console.log(' ');

firstBitmap.transform(function(byte) { // Demonstrate callback transform
  return 255 - byte;
});
console.log("writing file: " + '1-inverted');
firstBitmap.writeFile('1-inverted');
console.log('Palette change? ' + origPalette[4]);
var invertedPalette = firstBitmap.getPalette();
console.log('New palette object, shows inversion: ' + invertedPalette[4]);
firstBitmap.invert();
console.log("writing file: " + '2-normal');
firstBitmap.writeFile('2-normal');

firstBitmap.invert();
console.log("writing file: " + '3-inverted');
firstBitmap.writeFile('3-inverted');

firstBitmap.restore();
console.log("writing file: " + '4-normal');
firstBitmap.writeFile('4-normal');

console.log('writing file: 5-inverted-custom-palette');
firstBitmap.writeFile('5-inverted-custom-palette', invertedPalette);

console.log('writing file: 6-normal-unaffected-by-custom');
firstBitmap.writeFile('6-normal-unaffected-by-custom');
