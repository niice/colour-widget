(function() {

    /*
     *   typeOf()
     *
     *   Improved typeOf method, more reliable than JavaScripts
     */
    var typeOf = function(value) {
        var Klass = Object.prototype.toString.call(value).slice(8, -1);

        // Add better resiliance for harsh environments
        if (value === null) { return 'null'; }
        if (value === undefined) { return 'undefined'; }

        return Klass.toLowerCase();
    }


    /*
     *   is()
     *
     *   Used for comparison of type
     */
    var is = function(value, type) {
        if (typeOf(type) !== "string") throw new Error("is(value, type) expects type to be a string");

        return typeOf(value) === type.toLowerCase();
    }


    // Export methods
    this.typeOf = typeOf;
    this.is = is;

}).call(this);
