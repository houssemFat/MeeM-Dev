function timeUpdatePlugin(options) {
    this.on('timeupdate', function(e) {
        //alert (options.scope.me);
        if (options.fn) {
            options.fn.call(options.scope, this.currentTime, this.duration);
        }
    });
}
// register
videojs.plugin('timeUpdatePlugin', timeUpdatePlugin);