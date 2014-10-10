    //
    describe("Test require object", function() {
        var cfg = require_config;

        it("Check basic properties", function() {
            expect(typeof(cfg)).toBe('object');
            expect(typeof(cfg.paths)).toBe('object');
            expect(typeof(cfg.shim)).toBe('object');
            expect(cfg.deps instanceof Array).toBe(true);
            expect(typeof(cfg.buildUrl)).toBe('undefined');
        });

        it("Test processRequireConfig", function () {
            var processRequireConfig = cfg.processRequireConfig;
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

        it("Test angular shim", function () {
            var shim = cfg.shim;
            expect(typeof(shim)).toBe('object');
            expect(typeof(shim["angular-ui-router"])).toBe('object');
            expect(shim["angular-ui-router"].deps.length).toBe(1);
            expect(shim["angular-ui-router"].deps[0]).toBe("angular");
        });

        it("Test require paths", function (done) {
            var paths = cfg.paths;
            expect(typeof(paths)).toBe('object');
            var all = [];
            for (name in paths) {
                if (paths.hasOwnProperty(name))
                    all.push(name)
            }
            expect(all.length > 0).toBe(true);
            require(all, function () {
                done();
            });
        });
    });