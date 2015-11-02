// Amanda Keogh
// November 1, 2015
// Code Fellows SEA-D45 Javascript

Bitmap Transformer
==================

The Bitmap Transformer module modifies windows bitmap files. It comes packaged
with its own transforming methods, but the user is also invited to apply their
own transformations.

Table of Contents
-----------------
* `Constructor(bitmapFile)`
* `invert()`
* `transform(transformF)`
* `restore()`
* `writeFile([filename[, palette]])`
* `getMetadata()`

Transformer
-----------

* Constructor(bitmapFile)

  To work with a new bitmap, create a `Transformer` object. Functions may be
  called on this object using dot notation. The constructor takes one argument,
  the name of the file (including file path, if needed), as a string.

  Example:

    `var newTransformer = new Transformer('bitmap.bmp');`

* invert()

  Invert the colors of the bitmap as it is currently stored. Note this may be
  applied whether or not previous transformations have been applied (so, for
  instance, applying it twice to the same `Transformer` object will result in
  an image identical to the original). The file will not be written (see:
  `writeFile`). Example:

    `var bitmap = new Transformer('bitmap.bmp');
    bitmap.invert();`

* transform(transformF)

  Supply a custom transformation as a callback function. The callback is passed
  each individual byte from the bitmap palette. The file will not be written
  (see: `writeFile`). Example:

    `bitmap.transform(function(byte) {
      return Math.floor(byte / 3);
    });`

* restore()

  Restore the color palette to its original state. The file will not be written
  (see: `writeFile`). Example:

    `bitmap.restore();`

* writeFile([filename[, palette]])

  Write out the file with the current, transformed palette. Optional arguments
  include a custom filename without extension (will default to 'newBitmap.bmp'
  if no name is supplied); and a user-supplied palette. Neither is necessary,
  but to supply a custom palette, a filename must be offered. Example:

    `bitmap.writeFile('myBitmap', newPalette);
        // Saves 'myBitmap.bmp' with custom palette.

    bitmap.writeFile('myBitmap');
        // Saves 'myBitmap.bmp' with current palette.

    bitmap.writeFile();
        // Saves 'newBitmap.bmp' with current palette.`

* getMetadata()

  Returns a string of basic information about the bitmap, including width, height,
  number of colors, and the offset of the pixel map. Example:

    `bitmap.getMetadata();

    // Returns:

    // Width: 100
    // Height: 100
    // Number of Colors: 256
    // PixelStart: 1078`

In Development
--------------
* getPalette - Save the current palette (as Buffer type)

* Compatibility with additional bitmap types

