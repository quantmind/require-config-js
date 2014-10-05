    //
    describe("Test require object", function() {

        it("Check basic properties", function() {
            expect(typeof(require)).toBe('object');
            expect(typeof(require.paths)).toBe('object');
            expect(typeof(require.shim)).toBe('object');
            expect(require.deps instanceof Array).toBe(true);
            expect(typeof(require.buildUrl)).toBe('undefined');
        });
    });