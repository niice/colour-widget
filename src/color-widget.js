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
            img, thief, colours;

        this.insertStyles();

        img = document.querySelector(opts.selector);

        imagesLoaded(img, function() {
            colours = self.getColours(img, opts.number_of_colours);

            self.renderColours(img, colours);
        });

        return this;
    };


    /*
     *  Inserts widget styling to the document
     */
    NiiceColourWidget.prototype.insertStyles = function() {
        var styles = document.createElement('style');
        styles.innerHTML = ".niice-colour-palette .colours-box{ display:flex; align-items: center; justify-content: center; width:100%; height: 25px; padding:0; } .niice-colour-palette .colours-box a{ text-indent: -100000px; flex:1; }";
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
