/*
 *  Niice Colour Widget
 *
 *  Retrieves dominant colours from an image and links to niice.co colour search
 *
 *  @author twitter.com/peteyhawkins
 */
(function(win, document) {
    "use strict";

    var NiiceColourWidget = function(opts) {
        this.initialize(opts);
    };


    /*
     *  Initial setup
     */
    NiiceColourWidget.prototype.initialize = function(opts) {
        var self = this,
            mem_image = document.createElement('img'),
            img, thief, colours;

        this.insertStyles();

        img = document.querySelector(opts.selector);

        // Ensure the image is loadded
        mem_image.onload = function() {
            colours = self.getColours(img, opts.number_of_colours)+1;
            self.renderColours(img, colours);
        };
        mem_image.src = img.src;

        return this;
    };


    /*
     *  Inserts widget styling to the document
     */
    NiiceColourWidget.prototype.insertStyles = function() {
        var styles = document.createElement('style');
        styles.innerHTML = ".colours-box a { border-radius: 100%; display: inline-block; width: 36px; max-width: 36px; height: 36px; margin-left: 5px; } span.powered-by { font-family: "helvetica neue", helvetica, arial, sans-serif; font-size: 12px; font-style: italic; color: #b8b8b8; letter-spacing: 1px; display: block; width: 75px; text-align: right; line-height: 20px; } span.powered-by a { display: block; background: url(img/niice-logo.png) no-repeat center center; height: 18px; width: 42px; text-indent: 99em; float: right; margin-right: 2px; }";
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
        wrapper.innerHTML = '<div class="colours-box">'+ colours_template +'</div><span class="powered-by">Powered by <a href="http://niice.co">niice.co</a></span>';

        img.parentNode.insertBefore(wrapper, img);
        img.remove();

        wrapper.insertBefore(img, wrapper.querySelector('.colours-box'));
    };


    /*
     *  Builds the colour template for each colour and returns an HTML string
     */
    NiiceColourWidget.prototype.buildColourTemplate = function(colours) {
        var html = "";

        colours.forEach(function(hex_colour) {
            html += '<a href="http://niice.co/?search='+ encodeURIComponent(hex_colour) +'" style="background: '+ hex_colour +';">'+ hex_colour +'</a>';
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
