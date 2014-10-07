    //
    describe("Test require object", function() {

        it("Check basic properties", function() {
            expect(typeof(require)).toBe('object');
            expect(typeof(require.paths)).toBe('object');
            expect(typeof(require.shim)).toBe('object');
            expect(require.deps instanceof Array).toBe(true);
            expect(typeof(require.buildUrl)).toBe('undefined');
        });

        it("Test processRequireConfig", function () {
            var processRequireConfig = require.processRequireConfig;
            expect(typeof(processRequireConfig)).toBe('function');
            var r = processRequireConfig(
                {
                    minify: true,
                    paths: {
                        test1: {url: 'this_should_not_be_processsed'}
                    }
                });
            expect(r.minify).toBe(true);
            expect(r.paths.test1).toBe('this_should_not_be_processsed');
        });
    });