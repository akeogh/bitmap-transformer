'use strict';

var fs = require('fs');

function Transformer(bitmap) {

  bitmap = fs.readFileSync(bitmap);

  var width = bitmap.readUInt32LE(18);
  var height = bitmap.readUInt32LE(22);
  var numColors = bitmap.readUInt32LE(46);
  var pixelStart = bitmap.readUInt32LE(10);

  var colorPalette = new Buffer(pixelStart - 54); //TODO?: replace with header size
  bitmap.copy(colorPalette, 0, 54);

  this.invert = function() {
    Array.prototype.forEach.call(colorPalette, function(byte, index) {
      colorPalette.writeUInt8(255 - byte, index);
    });
  };

  this.restore = function() {
    colorPalette = bitmap.copy(colorPalette, 0, 54);
  };

  // Takes a function to run as callback to transform the array's color palette.
  this.transform = function(transformF) {
    Array.prototype.forEach.call(colorPalette, function(byte, index) {
      colorPalette.writeUInt8(transformF(byte), index);
    });
  };

  this.writeFile = function(fileName, palette) {
    fileName = fileName ? fileName + '.bmp' : 'newBitmap.bmp';
    palette = palette ? palette : colorPalette;

    var newFile = new Buffer(bitmap.length);
    bitmap.copy(newFile, 0, 0);
    Array.prototype.forEach.call(colorPalette, function(byte, index) {
      newFile.writeUInt8(byte, index + 54);
    });
    fs.writeFile(fileName, newFile, function(err) {
      if (err) throw err;
    });
  };

  this.getMetadata = function() {
    return "width: " + width +
     "\nheight: " + height +
     "\nNumber of Colors: " + numColors +
     "\npixelStart: " + pixelStart;
  };

}

exports = module.exports = Transformer;
