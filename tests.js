    //
    describe("Test extension object", function() {

        it("Check basic properties", function() {
            expect(typeof(require)).toBe('object');
            expect(typeof(require.paths)).toBe('object');
        });
    });