! function(t) {
    "use strict";

    function e(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t
    }

    function i(t, i) {
        this.options = e({}, this.options), e(this.options, i), this.init(t)
    }

    function n(t) {
        classie.add(t, "layer"), t.setAttribute("data-depth", .7)
    }

    function o(t, e) {
        var i = 1 === t.nodeType ? t : document.querySelector(t),
            n = [].filter.call(i.children, function(t) {
                return "SCRIPT" !== t.nodeName
            }),
            o = n[0],
            l = {},
            p = function(t, e) {
                n[t] && (d("deactivate", f(o, e)), o = n[t], d("activate", f(o, e)))
            },
            c = function(t, e) {
                return arguments.length ? void(d("slide", f(n[t], e)) && p(t, e)) : n.indexOf(o)
            },
            u = function(t, e) {
                var i = n.indexOf(o) + t;
                d(t > 0 ? "next" : "prev", f(o, e)) && p(i, e)
            },
            h = function(t, e) {
                return (l[t] || (l[t] = [])).push(e),
                    function() {
                        l[t] = l[t].filter(function(t) {
                            return t !== e
                        })
                    }
            },
            d = function(t, e) {
                return (l[t] || []).reduce(function(t, i) {
                    return t && i(e) !== !1
                }, !0)
            },
            f = function(t, e) {
                return e = e || {}, e.index = n.indexOf(t), e.slide = t, e
            },
            v = {
                on: h,
                fire: d,
                slide: c,
                next: u.bind(null, 1),
                prev: u.bind(null, -1),
                parent: i,
                slides: n
            };
        return s(v), a(v), r(v), p(e), v
    }

    function s(t) {
        var e = "bee3D-",
            i = function(t, i) {
                classie.add(t, e + i)
            },
            n = function(t, i) {
                t.className = t.className.replace(new RegExp(e + i + "(\\s|$)", "g"), " ").trim()
            },
            o = function(e, o) {
                var s = t.slides[t.slide()],
                    a = o - t.slide(),
                    r = a > 0 ? "after" : "before";
                ["before(-\\d+)?", "after(-\\d+)?", "active", "inactive"].map(n.bind(null, e)), e !== s && ["inactive", r, r + "-" + Math.abs(a)].map(i.bind(null, e))
            };
        i(t.parent, "parent"), t.slides.map(function(t) {
            i(t, "slide")
        }), t.on("activate", function(e) {
            t.slides.map(o), i(e.slide, "active"), n(e.slide, "inactive")
        })
    }

    function a(t) {
        var e = !0;
        document.addEventListener("keydown", function(i) {
            (34 == i.which || 32 == i.which || e && 39 == i.which || !e && 40 == i.which) && t.next(), (33 == i.which || e && 37 == i.which || !e && 38 == i.which) && t.prev()
        })
    }

    function r(t) {
        var e, i, n = "X";
        t.parent.addEventListener("touchstart", function(t) {
            1 == t.touches.length && (e = t.touches[0]["page" + n], i = 0)
        }), t.parent.addEventListener("touchmove", function(t) {
            1 == t.touches.length && (t.preventDefault(), i = t.touches[0]["page" + n] - e)
        }), t.parent.addEventListener("touchend", function() {
            Math.abs(i) > 50 && t[i > 0 ? "prev" : "next"]()
        })
    }
    i.prototype.options = {
        wrapper: document.body,
        effect: "coverflow",
        focus: 0,
        clickSlides: !1,
        mousewheel: !1,
        mousedrag: !1,
        autoplay: !1,
        playSpeed: 5e3,
        pauseHover: !1,
        infinite: !1,
        parallax: !1,
        shadows: !1,
        onInit: function() {
            return !1
        },
        onDestroy: function() {
            return !1
        }
    }, i.prototype.init = function(t) {
        this.el = o(t, this.options.focus), classie.add(this.options.wrapper, this.options.effect), this._initEvents(), this.options.onInit()
    }, i.prototype.destroy = function() {
        classie.remove(this.options.wrapper, this.options.effect);
        var t = "bee3D";
        this.el.slides.forEach(function(e) {
            e.className = e.className.replace(new RegExp(t + "-(.*)", "g"), "").trim()
        }), this.options.parallax && this.para.disable(), this.options.autoplay && this._pauseAutoplay(), this.options.onDestroy()
    }, i.prototype._initEvents = function() {
        this._listeners(), this._initArrows()
    }, i.prototype._listeners = function() {
        this.options.shadows && this._drawShadows(), this.options.clickSlides && this._clickSlides(), this.options.mousewheel && this._initMousewheel(), this.options.mousedrag && this._initDraggable(), this.options.infinite && this._initInfiniteLoop(), this.options.parallax && this._initParallax(), this.options.autoplay && this._initAutoplay()
    }, i.prototype._initInfiniteLoop = function() {
        var t = this;
        this.el.on("next", function(e) {
            e.index === t.el.slides.length - 1 && t.el.slide(0)
        }), this.el.on("prev", function(e) {
            0 === e.index && t.el.slide(t.el.slides.length - 1)
        })
    }, i.prototype._initParallax = function() {
        return "undefined" == typeof Parallax ? console.error("You must have parallax library loaded in order to use parallax!") : (this._prepParallax(), void(this.para = new Parallax(this.el.parent, {
            relativeInput: !0,
            clipRelativeInput: !0,
            calibrateX: !0,
            calibrateY: !0,
            scalarX: 4,
            scalarY: 5,
            frictionX: .1,
            frictionY: .1
        })))
    }, i.prototype._prepParallax = function() {
        var t = this;
        this.el.slides.forEach(function(e) {
            n(e.children[0]), t.options.shadows && n(e.querySelector(".shadow"))
        })
    }, i.prototype._drawShadows = function() {
        var t = ['<div class="shadow-box">', '<div class="shadow">', "<span></span>", "</div>", "</div>"].join("");
        return this.el.slides.forEach(function(e) {
            var i = !1;
            e.querySelector(".shadow-box") && (i = !0), i || (e.innerHTML += t)
        })
    }, i.prototype._initAutoplay = function() {
        var t = this;
        this._startAutoplay(), t.options.pauseHover && this.el.on("activate", function(e) {
            t._pauseOnHover(e.slide)
        })
    }, i.prototype._startAutoplay = function() {
        var t = this;
        this.timer = setInterval(function() {
            t.el.next()
        }, this.options.playSpeed)
    }, i.prototype._pauseOnHover = function(t) {
        var e = this;
        t.addEventListener("mouseover", function() {
            e.timer = e._pauseAutoplay()
        }), t.addEventListener("mouseout", function() {
            e._pauseAutoplay(), e._startAutoplay()
        })
    }, i.prototype._pauseAutoplay = function() {
        return clearInterval(this.timer)
    }, i.prototype._initArrows = function() {
        var t = [].slice.call(this.options.wrapper.querySelectorAll(".navigate")),
            e = this;
        t.forEach(function(t) {
            t.addEventListener("click", function(i) {
                i.preventDefault(), e._clickArrow(t)
            }), e.options.autoplay && e.options.pauseHover && e._pauseOnHover(t)
        })
    }, i.prototype._clickArrow = function(t) {
        var e = classie.has(t, "prev") ? !0 : !1;
        return e ? this.el.prev() : this.el.next()
    }, i.prototype._clickSlides = function() {
        var t = this;
        this.el.slides.forEach(function(e, i) {
            e.addEventListener("click", function(e) {
                e.preventDefault();
                var n = t.el.slide();
                return i == n ? !1 : t.el.slide(i)
            })
        })
    }, i.prototype._initMousewheel = function() {
        var t = this;
        this.options.wrapper.addEventListener("mousewheel", function(e) {
            e.wheelDelta < 0 ? t.el.next() : t.el.prev()
        })
    }, i.prototype._initDraggable = function() {
        var t, e, i = this,
            n = this.el.parent;
        classie.add(n, "dragger"), n.addEventListener("mousedown", function(i) {
            t = e = i.x
        }), n.addEventListener("mousemove", function(t) {
            e = t.x
        }), n.addEventListener("mouseup", function() {
            if (t !== e) {
                var n, o = Math.ceil((e - t) / 100);
                for (n = 0; n < Math.abs(o); n++) 0 > o ? i.el.next() : i.el.prev()
            }
        })
    }, t.Bee3D = i
}(window);