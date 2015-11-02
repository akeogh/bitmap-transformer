'use strict';

var Transformer = require(__dirname + '/lib/transformer');
var fs = require('fs');

var firstBitmap = new Transformer('bitmap1.bmp');

console.log('bitmap transform!!');
console.log(firstBitmap.getMetadata());
console.log(' ');
firstBitmap.transform(function(byte) { // Demonstrate callback transform
  return 255 - byte;
});
console.log("writing file: " + '1-inverted');
firstBitmap.writeFile('1-inverted');
firstBitmap.invert();
console.log("writing file: " + '2-normal');
firstBitmap.writeFile('2-normal');
firstBitmap.invert();
console.log("writing file: " + '3-inverted');
firstBitmap.writeFile('3-inverted');
firstBitmap.restore();
console.log("writing file: " + '4-normalforsuremaybe');
firstBitmap.writeFile('4-normal');
