// tailrec.js by Nathan Faubion
// A little decorator to automatically trampoline tail recursive functions.

(function (window, module) {
  // Exploit Javascript's single threaded nature by having a flag for when
  // we are in the middle of a tail recursive set of calls. Tailrec decorated
  // functions behave differently depending on if this is true or not. Having
  // this global state lets all tailrec functions call each other.
  var running = false;

  // This structure represents the next call frame in the computation. Tailrec
  // functions don't actually call the function when in the middle of a
  // computation, they just look like they do. Calling the function in the
  // middle of a computation just returns a new instance of `More`.
  function More (fn, context, args) {
    this.fn = fn;
    this.context = context;
    this.args = args;
  }

  window.tailrec = module.exports = function (fn) {
    return function () {
      var ret = new More(fn, this, arguments);
      if (running) return ret;
      running = true;
      while (ret instanceof More)
        ret = ret.fn.apply(ret.context, ret.args);
      running = false;
      return ret;
    };
  };

})(
  typeof window !== 'undefined' ? window : {},
  typeof module !== 'undefined' ? module : {}
);
