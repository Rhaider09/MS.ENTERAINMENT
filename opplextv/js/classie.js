! function(s) {
    "use strict";

    function e(s) {
        return new RegExp("(^|\\s+)" + s + "(\\s+|$)")
    }

    function n(s, e) {
        var n = t(s, e) ? c : a;
        n(s, e)
    }
    var t, a, c;
    "classList" in document.documentElement ? (t = function(s, e) {
        return s.classList.contains(e)
    }, a = function(s, e) {
        s.classList.add(e)
    }, c = function(s, e) {
        s.classList.remove(e)
    }) : (t = function(s, n) {
        return e(n).test(s.className)
    }, a = function(s, e) {
        t(s, e) || (s.className = s.className + " " + e)
    }, c = function(s, n) {
        s.className = s.className.replace(e(n), " ")
    });
    var o = {
        hasClass: t,
        addClass: a,
        removeClass: c,
        toggleClass: n,
        has: t,
        add: a,
        remove: c,
        toggle: n
    };
    "function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o : s.classie = o
}(window);