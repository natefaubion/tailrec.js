tailrec.js
==========

Dead simple auto-trampolining for Javascript.

```js
// Write a tail-recursive function...
var recfun = function (x) {
  return x === 0 ? 0 : recfun(x - 1);
};

recfun(100000000); // Maximum call stack size exceeded!

// But wrap it with tailrec...
recfun = tailrec(recfun);

recfun(100000000); // Works!
```

### Obligatory Factorial Example

```js
function factorial (num) {
  var fac = tailrec(function (x, acc) {
    return x === 0 ? acc : fac(x - 1, x * acc);
  });
  return fac(num, 1);
}
```
