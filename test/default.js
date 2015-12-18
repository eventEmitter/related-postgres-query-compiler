(function() {
    'use strict';


    let Class = require('ee-class');
    let log = require('ee-log');
    let assert = require('assert');
    let QueryContext = require('related-query-context');





    let QueryCompiler = require('../');





    describe('The QueryCompiler', function() {
        it('should not crash when instantiated', function() {
            new QueryCompiler();
        });

        it('should compile a simple query', function(done) {
            let context = new QueryContext({ast: {
                  kind: 'selectQuery'
                , select: {
                      kind: 'select'
                    , selection: ['*', '""']
                }
                , from: {
                      kind: 'from'
                    , entity: {
                          kind: 'function'
                        , name: 'doSomethingUseful'
                        , parameters: [`'EE\\`, 1]
                    }
                }
            }});

            new QueryCompiler().compile(context).then(() => {
                assert.equal(`SELECT "*", """""" FROM "doSomethingUseful"( E'''EE\\\\', '1');`, context.sql);
                done();
            }).catch(done);
        });

        it('should escape ids correctly', function() {
            assert.equal(new QueryCompiler().escapeId(`"",. 2'''\"\\'''""`), `""""",. 2'''""\\'''"""""`);
        });


        it('should escape literals correctly', function() {
            assert.equal(new QueryCompiler().escape(`dsfsdf'''\\ \''' "" E`), ` E'dsfsdf''''''\\\\ '''''' "" E'`);
        });
    });  
})();
