/*
 *  Niice Colour Widget
 *
 *  Retrieves dominant colours from an image and links to niice.co colour search
 *
 *  @author twitter.com/peteyhawkins
 */
(function(win, document) {
    "use strict";

    var NiiceColourWidget = function(options) {
        // Default options
        if ( ! is(options, "object")) options = {};
        if ( ! is(options.selector, "string")) options.selector = "img";
        if ( ! is(options.number_of_colours, "number")) options.number_of_colours = 5;
        if ( ! is(options.disable_styles, "boolean")) options.disable_styles = false;

        this.options = options;

        this.initialize();
    };


    /*
     *  Initial setup
     */
    NiiceColourWidget.prototype.initialize = function() {
        var imgs = document.querySelectorAll(this.options.selector);

        if ( ! this.options.disable_styles) this.insertStyles();

        Array.prototype.slice.call(imgs).forEach(function(img) {
            var mem_image = document.createElement('img'),
                self = this;

            // Ensure the image is loadded
            mem_image.onload = function() {
                var colours = self.getColours(img, self.options.number_of_colours);

                self.renderColours(img, colours);
            };

            mem_image.src = img.src;

        }, this);

        return this;
    };


    /*
     *  Inserts widget styling to the document
     */
    NiiceColourWidget.prototype.insertStyles = function() {
        var styles = document.createElement('style');
        styles.innerHTML = ".niice-colours-box a { border-radius: 100%; display: inline-block; width: 36px; max-width: 36px; height: 36px; margin-left: 5px; } span.niice-powered-by { font-family: 'helvetica neue', helvetica, arial, sans-serif; font-size: 12px; font-style: italic; color: #b8b8b8; letter-spacing: 1px; display: block; width: 75px; text-align: right; line-height: 20px; } span.niice-powered-by a { display: block; background: url(img/niice-logo.png) no-repeat center center; height: 18px; width: 42px; text-indent: 99em; float: right; margin-right: 2px; }ul.niice-colours-box { list-style-type: none; padding: 0; margin: 0; } ul.niice-colours-box li { display: inline-block; } ul.niice-colours-box li a { margin: 0px; margin-right: 5px; padding: 0px; text-indent: -9999em; position: relative; overflow: hidden; } ul.niice-colours-box li a:before { content:''; display: block; width: 30px; height: 30px; border: 10px solid rgba(255,255,255,0); border-radius: 100%; left: -7px; top: -7px; position: relative; -webkit-transition: all 0.2s; } ul.niice-colours-box li a:hover:before { border: 10px solid rgba(255,255,255,.5); } ul.niice-colours-box li.niice-powered-by { position: relative; top: -13px; left: 5px; } ul.niice-colours-box li.niice-powered-by a { text-indent: 0; overflow: visible; width: auto; height: auto; text-transform: capitalize; } ul.niice-colours-box li.niice-powered-by a:before { content: none; }";
        document.body.appendChild(styles);
    };


    /*
     *  Returns an array of dominant colours in the provided image
     */
    NiiceColourWidget.prototype.getColours = function(img, number_of_colours) {
        var thief = new ColorThief(),
            rgb_values, colours;

        try {
            rgb_values = thief.getPalette(img, number_of_colours);

            // Return the colours and convert to an array of hex values
            return rgb_values.map(function(colour) {
                return this._rgbToHex(colour);
            }, this);
        }
        catch (e) {
            console.error("ColorThief error:", e);
            return [];
        }
    };


    /*
     *  Renders the colours template
     */
    NiiceColourWidget.prototype.renderColours = function(img, colours) {
        var colours_template = this.buildColourTemplate(colours),
            wrapper = document.createElement('div');

        wrapper.className = 'niice-colour-palette';
        wrapper.innerHTML = '<ul class="niice-colours-box">'+ colours_template +'<li class="niice-powered-by">Powered by <a target="_blank" href="http://niice.co">Niice.co</a></li></ul>';

        img.parentNode.insertBefore(wrapper, img);
        img.remove();

        wrapper.insertBefore(img, wrapper.querySelector('.niice-colours-box'));
    };


    /*
     *  Builds the colour template for each colour and returns an HTML string
     */
    NiiceColourWidget.prototype.buildColourTemplate = function(colours) {
        var html = "";

        colours.forEach(function(hex_colour) {
            html += '<li><a target="_blank" href="http://niice.co/?search='+ encodeURIComponent(hex_colour) +'" style="background: '+ hex_colour +';">'+ hex_colour +'</a></li>';
        });

        return html;
    };


    /*
     *  ------------------------------------------------------------------------
     *  Helper methods
     *  ------------------------------------------------------------------------
     */


    NiiceColourWidget.prototype._rgbToHex = function(rgb) {
        return '#'+ rgb.map(function(val) {
            return this._componentToHex(val);
        }, this).join('');
    };


    NiiceColourWidget.prototype._componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };


    // Export to global
    win.NiiceColourWidget = NiiceColourWidget;

})(window, document);
