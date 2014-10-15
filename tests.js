    //
    describe("Test require object", function() {

        it("Check basic properties", function() {
            expect(typeof(rcfg)).toBe('object');
            expect(typeof(rcfg.paths)).toBe('object');
            expect(typeof(rcfg.shim)).toBe('object');
            expect(rcfg.deps instanceof Array).toBe(true);
            expect(typeof(rcfg.buildUrl)).toBe('undefined');
        });

        it("Test process", function () {
            var process = rcfg.process;
            expect(typeof(process)).toBe('function');
            var r = process(
                {
                    minify: true,
                    paths: {
                        test1: {url: 'this_should_not_be_processsed'}
                    }
                });
            expect(r.minify).toBe(true);
            expect(typeof(r.process)).toBe('function');
            expect(typeof(r.min)).toBe('function');
            expect(r.paths.test1).toBe('this_should_not_be_processsed');
        });

        it("Test angular shim", function () {
            var shim = rcfg.shim;
            expect(typeof(shim)).toBe('object');
            expect(typeof(shim["angular-ui-router"])).toBe('object');
            expect(shim["angular-ui-router"].deps.length).toBe(1);
            expect(shim["angular-ui-router"].deps[0]).toBe("angular");
        });

        it("Test require paths", function (done) {
            var paths = rcfg.paths;
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

        it("Test google-analytics", function (done) {
            require(['google-analytics'], function (ga) {
                expect(typeof(ga)).toBe('function');
                done();
            });
        })
    });