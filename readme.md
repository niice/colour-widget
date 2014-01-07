# Niice colour widget

Retrieve colours for images and links them to colour searches on [niice.co](http://niice.co).

## Usage

```js
// Include the niice colour widget script
<script type="text/javascript" src="js/niice-color-widget.js"></script>

// Somewhere in the document after the niice script include this:
<script type="text/javascript">
    new NiiceColourWidget({
        selector: 'img', // Any valid CSS selector e.g. .main-image img
        number_of_colours: 6
    });
</script>
```

## Attribution

* [colour-theif](https://github.com/lokesh/color-thief)

## MIT License

Copyright (C) 2013 Pete Hawkins

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
