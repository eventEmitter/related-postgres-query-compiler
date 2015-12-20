(function() {
    'use strict';

    let path = require('path');
    let Class = require('ee-class');
    let type = require('ee-types');
    let log = require('ee-log');
    let QueryCompiler = require('related-query-compiler');




    

    module.exports = new Class({
        inherits: QueryCompiler






        /**
         * load a compiler from the filesystem, on demand loader
         * should be pretty secure since allowed filenames can only
         * contain [a-zA-Z].
         * 
         * @param {string} compilerName 
         *
         * @returns {promise}
         */
        , loadVendorCompiler: function(compilerName) {

            // try to get the local version
            let Compiler = this.loadFile(path.join(__dirname, 'compilers', compilerName[0].toUpperCase()+compilerName.substr(1)));

            // return the compiler if it exists
            return Promise.resolve(Compiler);
        }







        /**
         * escapes an id
         *
         * ported from: https://github.com/brianc/node-postgres/blob/f50f5ce7e811f229e55101323a1f68cb883606ad/lib/client.js#L247
         *
         * @param {string} input the string to escape
         *
         * @returns {string} the escaped id
         */
        , escapeId: function(input) {
            return `"${input.replace(/"/gi, '""')}"`;
        }







        /**
         * escapes a literal
         *
         * ported from: https://github.com/brianc/node-postgres/blob/f50f5ce7e811f229e55101323a1f68cb883606ad/lib/client.js#L266
         *
         * @param {string} input the string to escape
         *
         * @returns {string} the escaped literal
         */
        , escape: function(input) {
            return `${/\\/.test(input) ? ' E' : ''}'${input.replace(/'/gi, `''`).replace(/\\/gi, `\\\\`)}'`;
        }
    });
})();
