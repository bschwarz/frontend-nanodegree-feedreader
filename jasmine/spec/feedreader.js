/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 
         *This tests to make sure every feed has a URL defined
         * and that the URL is not empty
         */
         //http://blog.bandzarewicz.com/blog/2012/03/08/jasmine-cheat-sheet/
        it('have a URL defined', function() {

            allFeeds.forEach( function(val) {
                expect(val.url).toBeTruthy();
            });

        });

        /* This tests to make sure every feed has a name defined
        * and that the URL is not empty
        */
        it('have a name defined', function() {

            allFeeds.forEach( function(val) {
                expect(val.name).toBeTruthy();
            });

        });
    });

    /*
     * Test suite for the menu
     */
    describe('The menu', function() {

        /* 
         * tests to make sure the menu is hidden by default
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* 
         * tests the menu visibility when the menu item is clicked
         */
        it('changes visibility when menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    /*
     * Test suite for the initial entries
     */
    describe('Initial Entries', function() {

        /*
         * load the feed before hand with "done" so that the tests
         * occur after the async call is complete
         */
        beforeEach(function(done) {
            loadFeed(0, function() {done();});
        });

        /*
         * tests to make sure there is at least one entry in the feed
         */
        it('have at least a single .entry element within .feed', function(done) {
            expect($('.feed').find('.entry').length).toBeTruthy();
            done();
        });

    });
    
    /*
     * Test suite for the new feed selection
     */
    describe('New Feed Selection', function() {

        var initialContent = '', 
             secondContent = '';

        /*
         * load the feeds before hand with "done" so that the tests
         * occur after the async call is complete
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialContent = ('.feed').innerHTML;
                done();
            });
            loadFeed(1, function(done) {
                secondContent = ('.feed').innerHTML;
                done();
            });
        });

        /*
         * tests that the content changes when a feed is loaded
         * We test this by loading 2 different feeds (above)
         * and then comparing the content
         */
        it('should have new content', function(done) {
            expect(initialContent).not.toEqual(secondContent);
            done();
        });
    });
}());
