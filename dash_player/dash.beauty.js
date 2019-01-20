function X2JS(a, b, c) {
    function d(a) {
        var b = a.localName;
        return null == b && (b = a.baseName), (null == b || "" == b) && (b = a.nodeName), b
    }

    function e(a) {
        return a.prefix
    }

    function f(a) {
        return "string" == typeof a ? a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : a
    }

    function g(a) {
        return a.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/")
    }

    function h(f) {
        if (f.nodeType == u.DOCUMENT_NODE) {
            var i, j, k, l = f.firstChild;
            for (j = 0, k = f.childNodes.length; k > j; j += 1)
                if (f.childNodes[j].nodeType !== u.COMMENT_NODE) {
                    l = f.childNodes[j];
                    break
                }
            if (c) i = h(l);
            else {
                i = {};
                var m = d(l);
                i[m] = h(l)
            }
            return i
        }
        if (f.nodeType == u.ELEMENT_NODE) {
            var i = new Object;
            i.__cnt = 0;
            for (var n = f.childNodes, o = 0; o < n.length; o++) {
                var l = n.item(o),
                    m = d(l);
                if (i.__cnt++, null == i[m]) i[m] = h(l), i[m + "_asArray"] = new Array(1), i[m + "_asArray"][0] = i[m];
                else {
                    if (null != i[m] && !(i[m] instanceof Array)) {
                        var p = i[m];
                        i[m] = new Array, i[m][0] = p, i[m + "_asArray"] = i[m]
                    }
                    for (var q = 0; null != i[m][q];) q++;
                    i[m][q] = h(l)
                }
            }
            for (var r = 0; r < f.attributes.length; r++) {
                var s = f.attributes.item(r);
                i.__cnt++;
                for (var v = s.value, w = 0, x = a.length; x > w; w++) {
                    var y = a[w];
                    y.test.call(this, s.value) && (v = y.converter.call(this, s.value))
                }
                i[b + s.name] = v
            }
            var z = e(f);
            return null != z && "" != z && (i.__cnt++, i.__prefix = z), 1 == i.__cnt && null != i["#text"] && (i = i["#text"]), null != i["#text"] && (i.__text = i["#text"], t && (i.__text = g(i.__text)), delete i["#text"], delete i["#text_asArray"]), null != i["#cdata-section"] && (i.__cdata = i["#cdata-section"], delete i["#cdata-section"], delete i["#cdata-section_asArray"]), (null != i.__text || null != i.__cdata) && (i.toString = function() {
                return (null != this.__text ? this.__text : "") + (null != this.__cdata ? this.__cdata : "")
            }), i
        }
        return f.nodeType == u.TEXT_NODE || f.nodeType == u.CDATA_SECTION_NODE ? f.nodeValue : f.nodeType == u.COMMENT_NODE ? null : void 0
    }

    function i(a, b, c, d) {
        var e = "<" + (null != a && null != a.__prefix ? a.__prefix + ":" : "") + b;
        if (null != c)
            for (var f = 0; f < c.length; f++) {
                var g = c[f],
                    h = a[g];
                e += " " + g.substr(1) + "='" + h + "'"
            }
        return e += d ? "/>" : ">"
    }

    function j(a, b) {
        return "</" + (null != a.__prefix ? a.__prefix + ":" : "") + b + ">"
    }

    function k(a, b) {
        return -1 !== a.indexOf(b, a.length - b.length)
    }

    function l(a, b) {
        return k(b.toString(), "_asArray") || 0 == b.toString().indexOf("_") || a[b] instanceof Function ? !0 : !1
    }

    function m(a) {
        var b = 0;
        if (a instanceof Object)
            for (var c in a) l(a, c) || b++;
        return b
    }

    function n(a) {
        var b = [];
        if (a instanceof Object)
            for (var c in a) - 1 == c.toString().indexOf("__") && 0 == c.toString().indexOf("_") && b.push(c);
        return b
    }

    function o(a) {
        var b = "";
        return null != a.__cdata && (b += "<![CDATA[" + a.__cdata + "]]>"), null != a.__text && (b += t ? f(a.__text) : a.__text), b
    }

    function p(a) {
        var b = "";
        return a instanceof Object ? b += o(a) : null != a && (b += t ? f(a) : a), b
    }

    function q(a, b, c) {
        var d = "";
        if (0 == a.length) d += i(a, b, c, !0);
        else
            for (var e = 0; e < a.length; e++) d += i(a[e], b, n(a[e]), !1), d += r(a[e]), d += j(a[e], b);
        return d
    }

    function r(a) {
        var b = "",
            c = m(a);
        if (c > 0)
            for (var d in a)
                if (!l(a, d)) {
                    var e = a[d],
                        f = n(e);
                    if (null == e || void 0 == e) b += i(e, d, f, !0);
                    else if (e instanceof Object)
                        if (e instanceof Array) b += q(e, d, f);
                        else {
                            var g = m(e);
                            g > 0 || null != e.__text || null != e.__cdata ? (b += i(e, d, f, !1), b += r(e), b += j(e, d)) : b += i(e, d, f, !0)
                        }
                    else b += i(e, d, f, !1), b += p(e), b += j(e, d)
                }
        return b += p(a)
    }(null === b || void 0 === b) && (b = "_"), (null === c || void 0 === c) && (c = !1);
    var s = "1.0.11",
        t = !1,
        u = {
            ELEMENT_NODE: 1,
            TEXT_NODE: 3,
            CDATA_SECTION_NODE: 4,
            COMMENT_NODE: 8,
            DOCUMENT_NODE: 9
        };
    this.parseXmlString = function(a) {
        var b;
        if (window.DOMParser) {
            var c = new window.DOMParser;
            b = c.parseFromString(a, "text/xml")
        } else 0 == a.indexOf("<?") && (a = a.substr(a.indexOf("?>") + 2)), b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a);
        return b
    }, this.xml2json = function(a) {
        return h(a)
    }, this.xml_str2json = function(a) {
        var b = this.parseXmlString(a);
        return this.xml2json(b)
    }, this.json2xml_str = function(a) {
        return r(a)
    }, this.json2xml = function(a) {
        var b = this.json2xml_str(a);
        return this.parseXmlString(b)
    }, this.getVersion = function() {
        return s
    }, this.escapeMode = function(a) {
        t = a
    }
}

function ObjectIron(a) {
    var b;
    for (b = [], i = 0, len = a.length; i < len; i += 1) a[i].isRoot ? b.push("root") : b.push(a[i].name);
    var c = function(a, b) {
            var c;
            if (null !== a && null !== b)
                for (c in a) a.hasOwnProperty(c) && (b.hasOwnProperty(c) || (b[c] = a[c]))
        },
        d = function(a, b, d) {
            var e, f, g, h, i;
            if (null !== a && 0 !== a.length)
                for (e = 0, f = a.length; f > e; e += 1) g = a[e], b.hasOwnProperty(g.name) && (d.hasOwnProperty(g.name) ? g.merge && (h = b[g.name], i = d[g.name], "object" == typeof h && "object" == typeof i ? c(h, i) : null != g.mergeFunction ? d[g.name] = g.mergeFunction(h, i) : d[g.name] = h + i) : d[g.name] = b[g.name])
        },
        e = function(a, b) {
            var c, f, g, h, i, j, k, l = a;
            if (null !== l.children && 0 !== l.children.length)
                for (c = 0, f = l.children.length; f > c; c += 1)
                    if (j = l.children[c], b.hasOwnProperty(j.name))
                        if (j.isArray)
                            for (i = b[j.name + "_asArray"], g = 0, h = i.length; h > g; g += 1) k = i[g], d(l.properties, b, k), e(j, k);
                        else k = b[j.name], d(l.properties, b, k), e(j, k)
        },
        f = function(c) {
            var d, g, h, i, j, k, l;
            if (null === c) return c;
            if ("object" != typeof c) return c;
            for (d = 0, g = b.length; g > d; d += 1) "root" === b[d] && (j = a[d], k = c, e(j, k));
            for (i in c)
                if (c.hasOwnProperty(i)) {
                    if (h = b.indexOf(i), -1 !== h)
                        if (j = a[h], j.isArray)
                            for (l = c[i + "_asArray"], d = 0, g = l.length; g > d; d += 1) k = l[d], e(j, k);
                        else k = c[i], e(j, k);
                    f(c[i])
                }
            return c
        };
    return {
        run: f
    }
}
if (function(a) {
        Q = a()
    }(function() {
        "use strict";

        function a(a) {
            var b = Function.call;
            return function() {
                return b.apply(a, arguments)
            }
        }

        function b(a) {
            return "[object StopIteration]" === ha(a) || a instanceof _
        }

        function c(a, b) {
            b.stack && "object" == typeof a && null !== a && a.stack && -1 === a.stack.indexOf(ia) && (a.stack = d(a.stack) + "\n" + ia + "\n" + d(b.stack))
        }

        function d(a) {
            for (var b = a.split("\n"), c = [], d = 0; d < b.length; ++d) {
                var g = b[d];
                f(g) || e(g) || c.push(g)
            }
            return c.join("\n")
        }

        function e(a) {
            return -1 !== a.indexOf("(module.js:") || -1 !== a.indexOf("(node.js:")
        }

        function f(a) {
            var b = /at .+ \((.*):(\d+):\d+\)/.exec(a);
            if (!b) return !1;
            var c = b[1],
                d = b[2];
            return c === X && d >= Z && na >= d
        }

        function g() {
            if (Error.captureStackTrace) {
                var a, b, c = Error.prepareStackTrace;
                return Error.prepareStackTrace = function(c, d) {
                    a = d[1].getFileName(), b = d[1].getLineNumber()
                }, (new Error).stack, Error.prepareStackTrace = c, X = a, b
            }
        }

        function h(a) {
            return u(a)
        }

        function i() {
            function a(a) {
                c && (b = u(a), ba(c, function(a, c) {
                    Y(function() {
                        b.promiseDispatch.apply(b, c)
                    })
                }, void 0), c = void 0, d = void 0)
            }
            var b, c = [],
                d = [],
                e = ea(i.prototype),
                f = ea(k.prototype);
            return f.promiseDispatch = function(a, e, f) {
                var g = aa(arguments);
                c ? (c.push(g), "when" === e && f[1] && d.push(f[1])) : Y(function() {
                    b.promiseDispatch.apply(b, g)
                })
            }, f.valueOf = function() {
                return c ? f : b = l(b)
            }, Error.captureStackTrace && h.longStackJumpLimit > 0 && (Error.captureStackTrace(f, i), f.stack = f.stack.substring(f.stack.indexOf("\n") + 1)), e.promise = f, e.resolve = a, e.fulfill = function(b) {
                a(t(b))
            }, e.reject = function(b) {
                a(s(b))
            }, e.notify = function(a) {
                c && ba(d, function(b, c) {
                    Y(function() {
                        c(a)
                    })
                }, void 0)
            }, e
        }

        function j(a) {
            var b = i();
            return G(a, b.resolve, b.reject, b.notify).fail(b.reject), b.promise
        }

        function k(a, b, c, d, e) {
            void 0 === b && (b = function(a) {
                return s(new Error("Promise does not support operation: " + a))
            });
            var f = ea(k.prototype);
            return f.promiseDispatch = function(c, d, e) {
                var g;
                try {
                    g = a[d] ? a[d].apply(f, e) : b.call(f, d, e)
                } catch (h) {
                    g = s(h)
                }
                c && c(g)
            }, c && (f.valueOf = c), e && (f.exception = d), f
        }

        function l(a) {
            return m(a) ? a.valueOf() : a
        }

        function m(a) {
            return a && "function" == typeof a.promiseDispatch
        }

        function n(a) {
            return a && "function" == typeof a.then
        }

        function o(a) {
            return !p(a) && !q(a)
        }

        function p(a) {
            return !n(l(a))
        }

        function q(a) {
            return a = l(a), m(a) && "exception" in a
        }

        function r() {
            ja || "undefined" == typeof window || window.Touch || !window.console || console.log("Should be empty:", la), ja = !0
        }

        function s(a) {
            var b = k({
                when: function(b) {
                    if (b) {
                        var c = ca(ka, this); - 1 !== c && (la.splice(c, 1), ka.splice(c, 1))
                    }
                    return b ? b(a) : this
                }
            }, function() {
                return s(a)
            }, function() {
                return this
            }, a, !0);
            return r(), ka.push(b), la.push(a), b
        }

        function t(a) {
            return k({
                when: function() {
                    return a
                },
                get: function(b) {
                    return a[b]
                },
                set: function(b, c) {
                    a[b] = c
                },
                "delete": function(b) {
                    delete a[b]
                },
                post: function(b, c) {
                    return null == b ? a.apply(void 0, c) : a[b].apply(a, c)
                },
                apply: function(b, c) {
                    return a.apply(b, c)
                },
                keys: function() {
                    return ga(a)
                }
            }, void 0, function() {
                return a
            })
        }

        function u(a) {
            return m(a) ? a : (a = l(a), n(a) ? v(a) : t(a))
        }

        function v(a) {
            var b = i();
            return Y(function() {
                try {
                    a.then(b.resolve, b.reject, b.notify)
                } catch (c) {
                    b.reject(c)
                }
            }), b.promise
        }

        function w(a) {
            return k({
                isDef: function() {}
            }, function(b, c) {
                return C(a, b, c)
            }, function() {
                return l(a)
            })
        }

        function x(a, b, d, e) {
            function f(a) {
                try {
                    return "function" == typeof b ? b(a) : a
                } catch (c) {
                    return s(c)
                }
            }

            function g(a) {
                if ("function" == typeof d) {
                    c(a, m);
                    try {
                        return d(a)
                    } catch (b) {
                        return s(b)
                    }
                }
                return s(a)
            }

            function j(a) {
                return "function" == typeof e ? e(a) : a
            }
            var k = i(),
                l = !1,
                m = u(a);
            return Y(function() {
                m.promiseDispatch(function(a) {
                    l || (l = !0, k.resolve(f(a)))
                }, "when", [function(a) {
                    l || (l = !0, k.resolve(g(a)))
                }])
            }), m.promiseDispatch(void 0, "when", [void 0, function(a) {
                var b, c = !1;
                try {
                    b = j(a)
                } catch (d) {
                    if (c = !0, !h.onerror) throw d;
                    h.onerror(d)
                }
                c || k.notify(b)
            }]), k.promise
        }

        function y(a, b, c) {
            return x(a, function(a) {
                return I(a).then(function(a) {
                    return b.apply(void 0, a)
                }, c)
            }, c)
        }

        function z(a) {
            return function() {
                function c(a, c) {
                    var g;
                    try {
                        g = d[a](c)
                    } catch (h) {
                        return b(h) ? h.value : s(h)
                    }
                    return x(g, e, f)
                }
                var d = a.apply(this, arguments),
                    e = c.bind(c, "send"),
                    f = c.bind(c, "throw");
                return e()
            }
        }

        function A(a) {
            throw new _(a)
        }

        function B(a) {
            return function() {
                return y([this, I(arguments)], function(b, c) {
                    return a.apply(b, c)
                })
            }
        }

        function C(a, b, c) {
            var d = i();
            return Y(function() {
                u(a).promiseDispatch(d.resolve, b, c)
            }), d.promise
        }

        function D(a) {
            return function(b) {
                var c = aa(arguments, 1);
                return C(b, a, c)
            }
        }

        function E(a, b) {
            var c = aa(arguments, 2);
            return ma(a, b, c)
        }

        function F(a, b) {
            return C(a, "apply", [void 0, b])
        }

        function G(a) {
            var b = aa(arguments, 1);
            return F(a, b)
        }

        function H(a) {
            var b = aa(arguments, 1);
            return function() {
                var c = b.concat(aa(arguments));
                return C(a, "apply", [this, c])
            }
        }

        function I(a) {
            return x(a, function(a) {
                var b = a.length;
                if (0 === b) return u(a);
                var c = i();
                return ba(a, function(d, e, f) {
                    p(e) ? (a[f] = l(e), 0 === --b && c.resolve(a)) : x(e, function(d) {
                        a[f] = d, 0 === --b && c.resolve(a)
                    }).fail(c.reject)
                }, void 0), c.promise
            })
        }

        function J(a) {
            return x(a, function(a) {
                return a = da(a, u), x(I(da(a, function(a) {
                    return x(a, $, $)
                })), function() {
                    return a
                })
            })
        }

        function K(a, b) {
            return x(a, void 0, b)
        }

        function L(a, b) {
            return x(a, void 0, void 0, b)
        }

        function M(a, b) {
            return x(a, function(a) {
                return x(b(), function() {
                    return a
                })
            }, function(a) {
                return x(b(), function() {
                    return s(a)
                })
            })
        }

        function N(a, b, d, e) {
            var f = function(b) {
                    Y(function() {
                        if (c(b, a), !h.onerror) throw b;
                        h.onerror(b)
                    })
                },
                g = b || d || e ? x(a, b, d, e) : a;
            "object" == typeof process && process && process.domain && (f = process.domain.bind(f)), K(g, f)
        }

        function O(a, b) {
            var c = i(),
                d = setTimeout(function() {
                    c.reject(new Error("Timed out after " + b + " ms"))
                }, b);
            return x(a, function(a) {
                clearTimeout(d), c.resolve(a)
            }, function(a) {
                clearTimeout(d), c.reject(a)
            }), c.promise
        }

        function P(a, b) {
            void 0 === b && (b = a, a = void 0);
            var c = i();
            return setTimeout(function() {
                c.resolve(a)
            }, b), c.promise
        }

        function Q(a, b) {
            var c = aa(b),
                d = i();
            return c.push(d.makeNodeResolver()), F(a, c).fail(d.reject), d.promise
        }

        function R(a) {
            var b = aa(arguments, 1),
                c = i();
            return b.push(c.makeNodeResolver()), F(a, b).fail(c.reject), c.promise
        }

        function S(a) {
            var b = aa(arguments, 1);
            return function() {
                var c = b.concat(aa(arguments)),
                    d = i();
                return c.push(d.makeNodeResolver()), F(a, c).fail(d.reject), d.promise
            }
        }

        function T(a) {
            var b = aa(arguments, 1);
            return function() {
                function c() {
                    return a.apply(f, arguments)
                }
                var d = b.concat(aa(arguments)),
                    e = i();
                d.push(e.makeNodeResolver());
                var f = this;
                return F(c, d).fail(e.reject), e.promise
            }
        }

        function U(a, b, c) {
            var d = aa(c || []),
                e = i();
            return d.push(e.makeNodeResolver()), ma(a, b, d).fail(e.reject), e.promise
        }

        function V(a, b) {
            var c = aa(arguments, 2),
                d = i();
            return c.push(d.makeNodeResolver()), ma(a, b, c).fail(d.reject), d.promise
        }

        function W(a, b) {
            return b ? void a.then(function(a) {
                Y(function() {
                    b(null, a)
                })
            }, function(a) {
                Y(function() {
                    b(a)
                })
            }) : a
        }
        var X, Y, Z = g(),
            $ = function() {};
        "undefined" != typeof process ? Y = process.nextTick : "function" == typeof setImmediate ? Y = "undefined" != typeof window ? setImmediate.bind(window) : setImmediate : ! function() {
            function a() {
                if (--f, ++h >= e) {
                    h = 0, e *= 4;
                    for (var a = g && Math.min(g - 1, e); a > f;) ++f, b()
                }
                for (; g;) {
                    --g, c = c.next;
                    var d = c.task;
                    c.task = void 0, d()
                }
                h = 0
            }
            var b, c = {
                    task: void 0,
                    next: null
                },
                d = c,
                e = 2,
                f = 0,
                g = 0,
                h = 0;
            if (Y = function(a) {
                    d = d.next = {
                        task: a,
                        next: null
                    }, f < ++g && e > f && (++f, b())
                }, "undefined" != typeof MessageChannel) {
                var i = new MessageChannel;
                i.port1.onmessage = a, b = function() {
                    i.port2.postMessage(0)
                }
            } else b = function() {
                setTimeout(a, 0)
            }
        }();
        var _, aa = a(Array.prototype.slice),
            ba = a(Array.prototype.reduce || function(a, b) {
                var c = 0,
                    d = this.length;
                if (1 === arguments.length)
                    for (;;) {
                        if (c in this) {
                            b = this[c++];
                            break
                        }
                        if (++c >= d) throw new TypeError
                    }
                for (; d > c; c++) c in this && (b = a(b, this[c], c));
                return b
            }),
            ca = a(Array.prototype.indexOf || function(a) {
                for (var b = 0; b < this.length; b++)
                    if (this[b] === a) return b;
                return -1
            }),
            da = a(Array.prototype.map || function(a, b) {
                var c = this,
                    d = [];
                return ba(c, function(e, f, g) {
                    d.push(a.call(b, f, g, c))
                }, void 0), d
            }),
            ea = Object.create || function(a) {
                function b() {}
                return b.prototype = a, new b
            },
            fa = a(Object.prototype.hasOwnProperty),
            ga = Object.keys || function(a) {
                var b = [];
                for (var c in a) fa(a, c) && b.push(c);
                return b
            },
            ha = a(Object.prototype.toString);
        _ = "undefined" != typeof ReturnValue ? ReturnValue : function(a) {
            this.value = a
        }, h.longStackJumpLimit = 1;
        var ia = "From previous event:";
        h.nextTick = Y, h.defer = i, i.prototype.makeNodeResolver = function() {
            var a = this;
            return function(b, c) {
                b ? a.reject(b) : arguments.length > 2 ? a.resolve(aa(arguments, 1)) : a.resolve(c)
            }
        }, h.promise = j, h.makePromise = k, k.prototype.then = function(a, b, c) {
            return x(this, a, b, c)
        }, k.prototype.thenResolve = function(a) {
            return x(this, function() {
                return a
            })
        }, ba(["isFulfilled", "isRejected", "isPending", "dispatch", "when", "spread", "get", "put", "set", "del", "delete", "post", "send", "invoke", "keys", "fapply", "fcall", "fbind", "all", "allResolved", "timeout", "delay", "catch", "finally", "fail", "fin", "progress", "done", "nfcall", "nfapply", "nfbind", "denodeify", "nbind", "ncall", "napply", "nbind", "npost", "nsend", "ninvoke", "nodeify"], function(a, b) {
            k.prototype[b] = function() {
                return h[b].apply(h, [this].concat(aa(arguments)))
            }
        }, void 0), k.prototype.toSource = function() {
            return this.toString()
        }, k.prototype.toString = function() {
            return "[object Promise]"
        }, h.nearer = l, h.isPromise = m, h.isPromiseAlike = n, h.isPending = o, h.isFulfilled = p, h.isRejected = q;
        var ja, ka = [],
            la = [];
        "undefined" != typeof process && process.on && process.on("exit", function() {
            for (var a = 0; a < la.length; a++) {
                var b = la[a];
                b && "undefined" != typeof b.stack ? console.warn("Unhandled rejected promise:", b.stack) : console.warn("Unhandled rejected promise (no stack):", b)
            }
        }), h.reject = s, h.fulfill = t, h.resolve = u, h.master = w, h.when = x, h.spread = y, h.async = z, h["return"] = A, h.promised = B, h.dispatch = C, h.dispatcher = D, h.get = D("get"), h.set = D("set"), h["delete"] = h.del = D("delete");
        var ma = h.post = D("post");
        h.send = E, h.invoke = E, h.fapply = F, h["try"] = G, h.fcall = G, h.fbind = H, h.keys = D("keys"), h.all = I, h.allResolved = J, h["catch"] = h.fail = K, h.progress = L, h["finally"] = h.fin = M, h.done = N, h.timeout = O, h.delay = P, h.nfapply = Q, h.nfcall = R, h.nfbind = S, h.denodeify = h.nfbind, h.nbind = T, h.npost = U, h.nsend = V, h.ninvoke = h.nsend, h.nodeify = W;
        var na = g();
        return h
    }), function(a) {
        "use strict";
        var b = {
            VERSION: "0.5.3"
        };
        b.System = function() {
            this._mappings = {}, this._outlets = {}, this._handlers = {}, this.strictInjections = !0, this.autoMapOutlets = !1, this.postInjectionHook = "setup"
        }, b.System.prototype = {
            _createAndSetupInstance: function(a, b) {
                var c = new b;
                return this.injectInto(c, a), c
            },
            _retrieveFromCacheOrCreate: function(a, b) {
                "undefined" == typeof b && (b = !1);
                var c;
                if (!this._mappings.hasOwnProperty(a)) throw new Error(1e3);
                var d = this._mappings[a];
                return !b && d.isSingleton ? (null == d.object && (d.object = this._createAndSetupInstance(a, d.clazz)), c = d.object) : c = d.clazz ? this._createAndSetupInstance(a, d.clazz) : d.object, c
            },
            mapOutlet: function(a, b, c) {
                if ("undefined" == typeof a) throw new Error(1010);
                return b = b || "global", c = c || a, this._outlets.hasOwnProperty(b) || (this._outlets[b] = {}), this._outlets[b][c] = a, this
            },
            getObject: function(a) {
                if ("undefined" == typeof a) throw new Error(1020);
                return this._retrieveFromCacheOrCreate(a)
            },
            mapValue: function(a, b) {
                if ("undefined" == typeof a) throw new Error(1030);
                return this._mappings[a] = {
                    clazz: null,
                    object: b,
                    isSingleton: !0
                }, this.autoMapOutlets && this.mapOutlet(a), this.hasMapping(a) && this.injectInto(b, a), this
            },
            hasMapping: function(a) {
                if ("undefined" == typeof a) throw new Error(1040);
                return this._mappings.hasOwnProperty(a)
            },
            mapClass: function(a, b) {
                if ("undefined" == typeof a) throw new Error(1050);
                if ("undefined" == typeof b) throw new Error(1051);
                return this._mappings[a] = {
                    clazz: b,
                    object: null,
                    isSingleton: !1
                }, this.autoMapOutlets && this.mapOutlet(a), this
            },
            mapSingleton: function(a, b) {
                if ("undefined" == typeof a) throw new Error(1060);
                if ("undefined" == typeof b) throw new Error(1061);
                return this._mappings[a] = {
                    clazz: b,
                    object: null,
                    isSingleton: !0
                }, this.autoMapOutlets && this.mapOutlet(a), this
            },
            instantiate: function(a) {
                if ("undefined" == typeof a) throw new Error(1070);
                return this._retrieveFromCacheOrCreate(a, !0)
            },
            injectInto: function(a, b) {
                if ("undefined" == typeof a) throw new Error(1080);
                if ("object" == typeof a) {
                    var c = [];
                    this._outlets.hasOwnProperty("global") && c.push(this._outlets.global), "undefined" != typeof b && this._outlets.hasOwnProperty(b) && c.push(this._outlets[b]);
                    for (var d in c) {
                        var e = c[d];
                        for (var f in e) {
                            var g = e[f];
                            (!this.strictInjections || f in a) && (a[f] = this.getObject(g))
                        }
                    }
                    "setup" in a && a.setup.call(a)
                }
                return this
            },
            unmap: function(a) {
                if ("undefined" == typeof a) throw new Error(1090);
                return delete this._mappings[a], this
            },
            unmapOutlet: function(a, b) {
                if ("undefined" == typeof a) throw new Error(1100);
                if ("undefined" == typeof b) throw new Error(1101);
                return delete this._outlets[a][b], this
            },
            mapHandler: function(a, b, c, d, e) {
                if ("undefined" == typeof a) throw new Error(1110);
                return b = b || "global", c = c || a, "undefined" == typeof d && (d = !1), "undefined" == typeof e && (e = !1), this._handlers.hasOwnProperty(a) || (this._handlers[a] = {}), this._handlers[a].hasOwnProperty(b) || (this._handlers[a][b] = []), this._handlers[a][b].push({
                    handler: c,
                    oneShot: d,
                    passEvent: e
                }), this
            },
            unmapHandler: function(a, b, c) {
                if ("undefined" == typeof a) throw new Error(1120);
                if (b = b || "global", c = c || a, this._handlers.hasOwnProperty(a) && this._handlers[a].hasOwnProperty(b)) {
                    var d = this._handlers[a][b];
                    for (var e in d) {
                        var f = d[e];
                        if (f.handler === c) {
                            d.splice(e, 1);
                            break
                        }
                    }
                }
                return this
            },
            notify: function(a) {
                if ("undefined" == typeof a) throw new Error(1130);
                var b = Array.prototype.slice.call(arguments),
                    c = b.slice(1);
                if (this._handlers.hasOwnProperty(a)) {
                    var d = this._handlers[a];
                    for (var e in d) {
                        var f, g = d[e];
                        "global" !== e && (f = this.getObject(e));
                        var h, i, j = [];
                        for (h = 0, i = g.length; i > h; h++) {
                            var k, l = g[h];
                            k = f && "string" == typeof l.handler ? f[l.handler] : l.handler, l.oneShot && j.unshift(h), l.passEvent ? k.apply(f, b) : k.apply(f, c)
                        }
                        for (h = 0, i = j.length; i > h; h++) g.splice(j[h], 1)
                    }
                }
                return this
            }
        }, a.dijon = b
    }(this), "undefined" == typeof utils) var utils = {};
"undefined" == typeof utils.Math && (utils.Math = {}), utils.Math.to64BitNumber = function(a, b) {
    var c, d, e;
    return c = new goog.math.Long(0, b), d = new goog.math.Long(a, 0), e = c.add(d), e.toNumber()
}, goog = {}, goog.math = {}, goog.math.Long = function(a, b) {
    this.low_ = 0 | a, this.high_ = 0 | b
}, goog.math.Long.IntCache_ = {}, goog.math.Long.fromInt = function(a) {
    if (a >= -128 && 128 > a) {
        var b = goog.math.Long.IntCache_[a];
        if (b) return b
    }
    var c = new goog.math.Long(0 | a, 0 > a ? -1 : 0);
    return a >= -128 && 128 > a && (goog.math.Long.IntCache_[a] = c), c
}, goog.math.Long.fromNumber = function(a) {
    return isNaN(a) || !isFinite(a) ? goog.math.Long.ZERO : a <= -goog.math.Long.TWO_PWR_63_DBL_ ? goog.math.Long.MIN_VALUE : a + 1 >= goog.math.Long.TWO_PWR_63_DBL_ ? goog.math.Long.MAX_VALUE : 0 > a ? goog.math.Long.fromNumber(-a).negate() : new goog.math.Long(a % goog.math.Long.TWO_PWR_32_DBL_ | 0, a / goog.math.Long.TWO_PWR_32_DBL_ | 0)
}, goog.math.Long.fromBits = function(a, b) {
    return new goog.math.Long(a, b)
}, goog.math.Long.fromString = function(a, b) {
    if (0 == a.length) throw Error("number format error: empty string");
    var c = b || 10;
    if (2 > c || c > 36) throw Error("radix out of range: " + c);
    if ("-" == a.charAt(0)) return goog.math.Long.fromString(a.substring(1), c).negate();
    if (a.indexOf("-") >= 0) throw Error('number format error: interior "-" character: ' + a);
    for (var d = goog.math.Long.fromNumber(Math.pow(c, 8)), e = goog.math.Long.ZERO, f = 0; f < a.length; f += 8) {
        var g = Math.min(8, a.length - f),
            h = parseInt(a.substring(f, f + g), c);
        if (8 > g) {
            var i = goog.math.Long.fromNumber(Math.pow(c, g));
            e = e.multiply(i).add(goog.math.Long.fromNumber(h))
        } else e = e.multiply(d), e = e.add(goog.math.Long.fromNumber(h))
    }
    return e
}, goog.math.Long.TWO_PWR_16_DBL_ = 65536, goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24, goog.math.Long.TWO_PWR_32_DBL_ = goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_, goog.math.Long.TWO_PWR_31_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ / 2, goog.math.Long.TWO_PWR_48_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_, goog.math.Long.TWO_PWR_64_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_, goog.math.Long.TWO_PWR_63_DBL_ = goog.math.Long.TWO_PWR_64_DBL_ / 2, goog.math.Long.ZERO = goog.math.Long.fromInt(0), goog.math.Long.ONE = goog.math.Long.fromInt(1), goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1), goog.math.Long.MAX_VALUE = goog.math.Long.fromBits(-1, 2147483647), goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, -2147483648), goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24), goog.math.Long.prototype.toInt = function() {
    return this.low_
}, goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned()
}, goog.math.Long.prototype.toString = function(a) {
    var b = a || 10;
    if (2 > b || b > 36) throw Error("radix out of range: " + b);
    if (this.isZero()) return "0";
    if (this.isNegative()) {
        if (this.equals(goog.math.Long.MIN_VALUE)) {
            var c = goog.math.Long.fromNumber(b),
                d = this.div(c),
                e = d.multiply(c).subtract(this);
            return d.toString(b) + e.toInt().toString(b)
        }
        return "-" + this.negate().toString(b)
    }
    for (var f = goog.math.Long.fromNumber(Math.pow(b, 6)), e = this, g = "";;) {
        var h = e.div(f),
            i = e.subtract(h.multiply(f)).toInt(),
            j = i.toString(b);
        if (e = h, e.isZero()) return j + g;
        for (; j.length < 6;) j = "0" + j;
        g = "" + j + g
    }
}, goog.math.Long.prototype.getHighBits = function() {
    return this.high_
}, goog.math.Long.prototype.getLowBits = function() {
    return this.low_
}, goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return this.low_ >= 0 ? this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_
}, goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) return this.equals(goog.math.Long.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
    for (var a = 0 != this.high_ ? this.high_ : this.low_, b = 31; b > 0 && 0 == (a & 1 << b); b--);
    return 0 != this.high_ ? b + 33 : b + 1
}, goog.math.Long.prototype.isZero = function() {
    return 0 == this.high_ && 0 == this.low_
}, goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0
}, goog.math.Long.prototype.isOdd = function() {
    return 1 == (1 & this.low_)
}, goog.math.Long.prototype.equals = function(a) {
    return this.high_ == a.high_ && this.low_ == a.low_
}, goog.math.Long.prototype.notEquals = function(a) {
    return this.high_ != a.high_ || this.low_ != a.low_
}, goog.math.Long.prototype.lessThan = function(a) {
    return this.compare(a) < 0
}, goog.math.Long.prototype.lessThanOrEqual = function(a) {
    return this.compare(a) <= 0
}, goog.math.Long.prototype.greaterThan = function(a) {
    return this.compare(a) > 0
}, goog.math.Long.prototype.greaterThanOrEqual = function(a) {
    return this.compare(a) >= 0
}, goog.math.Long.prototype.compare = function(a) {
    if (this.equals(a)) return 0;
    var b = this.isNegative(),
        c = a.isNegative();
    return b && !c ? -1 : !b && c ? 1 : this.subtract(a).isNegative() ? -1 : 1
}, goog.math.Long.prototype.negate = function() {
    return this.equals(goog.math.Long.MIN_VALUE) ? goog.math.Long.MIN_VALUE : this.not().add(goog.math.Long.ONE)
}, goog.math.Long.prototype.add = function(a) {
    var b = this.high_ >>> 16,
        c = 65535 & this.high_,
        d = this.low_ >>> 16,
        e = 65535 & this.low_,
        f = a.high_ >>> 16,
        g = 65535 & a.high_,
        h = a.low_ >>> 16,
        i = 65535 & a.low_,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
    return m += e + i, l += m >>> 16, m &= 65535, l += d + h, k += l >>> 16, l &= 65535, k += c + g, j += k >>> 16, k &= 65535, j += b + f, j &= 65535, goog.math.Long.fromBits(l << 16 | m, j << 16 | k)
}, goog.math.Long.prototype.subtract = function(a) {
    return this.add(a.negate())
}, goog.math.Long.prototype.multiply = function(a) {
    if (this.isZero()) return goog.math.Long.ZERO;
    if (a.isZero()) return goog.math.Long.ZERO;
    if (this.equals(goog.math.Long.MIN_VALUE)) return a.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    if (a.equals(goog.math.Long.MIN_VALUE)) return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    if (this.isNegative()) return a.isNegative() ? this.negate().multiply(a.negate()) : this.negate().multiply(a).negate();
    if (a.isNegative()) return this.multiply(a.negate()).negate();
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) && a.lessThan(goog.math.Long.TWO_PWR_24_)) return goog.math.Long.fromNumber(this.toNumber() * a.toNumber());
    var b = this.high_ >>> 16,
        c = 65535 & this.high_,
        d = this.low_ >>> 16,
        e = 65535 & this.low_,
        f = a.high_ >>> 16,
        g = 65535 & a.high_,
        h = a.low_ >>> 16,
        i = 65535 & a.low_,
        j = 0,
        k = 0,
        l = 0,
        m = 0;
    return m += e * i, l += m >>> 16, m &= 65535, l += d * i, k += l >>> 16, l &= 65535, l += e * h, k += l >>> 16, l &= 65535, k += c * i, j += k >>> 16, k &= 65535, k += d * h, j += k >>> 16, k &= 65535, k += e * g, j += k >>> 16, k &= 65535, j += b * i + c * h + d * g + e * f, j &= 65535, goog.math.Long.fromBits(l << 16 | m, j << 16 | k)
}, goog.math.Long.prototype.div = function(a) {
    if (a.isZero()) throw Error("division by zero");
    if (this.isZero()) return goog.math.Long.ZERO;
    if (this.equals(goog.math.Long.MIN_VALUE)) {
        if (a.equals(goog.math.Long.ONE) || a.equals(goog.math.Long.NEG_ONE)) return goog.math.Long.MIN_VALUE;
        if (a.equals(goog.math.Long.MIN_VALUE)) return goog.math.Long.ONE;
        var b = this.shiftRight(1),
            c = b.div(a).shiftLeft(1);
        if (c.equals(goog.math.Long.ZERO)) return a.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        var d = this.subtract(a.multiply(c)),
            e = c.add(d.div(a));
        return e
    }
    if (a.equals(goog.math.Long.MIN_VALUE)) return goog.math.Long.ZERO;
    if (this.isNegative()) return a.isNegative() ? this.negate().div(a.negate()) : this.negate().div(a).negate();
    if (a.isNegative()) return this.div(a.negate()).negate();
    for (var f = goog.math.Long.ZERO, d = this; d.greaterThanOrEqual(a);) {
        for (var c = Math.max(1, Math.floor(d.toNumber() / a.toNumber())), g = Math.ceil(Math.log(c) / Math.LN2), h = 48 >= g ? 1 : Math.pow(2, g - 48), i = goog.math.Long.fromNumber(c), j = i.multiply(a); j.isNegative() || j.greaterThan(d);) c -= h, i = goog.math.Long.fromNumber(c), j = i.multiply(a);
        i.isZero() && (i = goog.math.Long.ONE), f = f.add(i), d = d.subtract(j)
    }
    return f
}, goog.math.Long.prototype.modulo = function(a) {
    return this.subtract(this.div(a).multiply(a))
}, goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_)
}, goog.math.Long.prototype.and = function(a) {
    return goog.math.Long.fromBits(this.low_ & a.low_, this.high_ & a.high_)
}, goog.math.Long.prototype.or = function(a) {
    return goog.math.Long.fromBits(this.low_ | a.low_, this.high_ | a.high_)
}, goog.math.Long.prototype.xor = function(a) {
    return goog.math.Long.fromBits(this.low_ ^ a.low_, this.high_ ^ a.high_)
}, goog.math.Long.prototype.shiftLeft = function(a) {
    if (a &= 63, 0 == a) return this;
    var b = this.low_;
    if (32 > a) {
        var c = this.high_;
        return goog.math.Long.fromBits(b << a, c << a | b >>> 32 - a)
    }
    return goog.math.Long.fromBits(0, b << a - 32)
}, goog.math.Long.prototype.shiftRight = function(a) {
    if (a &= 63, 0 == a) return this;
    var b = this.high_;
    if (32 > a) {
        var c = this.low_;
        return goog.math.Long.fromBits(c >>> a | b << 32 - a, b >> a)
    }
    return goog.math.Long.fromBits(b >> a - 32, b >= 0 ? 0 : -1)
}, goog.math.Long.prototype.shiftRightUnsigned = function(a) {
    if (a &= 63, 0 == a) return this;
    var b = this.high_;
    if (32 > a) {
        var c = this.low_;
        return goog.math.Long.fromBits(c >>> a | b << 32 - a, b >>> a)
    }
    return 32 == a ? goog.math.Long.fromBits(b, 0) : goog.math.Long.fromBits(b >>> a - 32, 0)
};
var UTF8 = {};
UTF8.encode = function(a) {
    for (var b = [], c = 0; c < a.length; ++c) {
        var d = a.charCodeAt(c);
        128 > d ? b.push(d) : 2048 > d ? (b.push(192 | d >> 6), b.push(128 | 63 & d)) : 65536 > d ? (b.push(224 | d >> 12), b.push(128 | 63 & d >> 6), b.push(128 | 63 & d)) : (b.push(240 | d >> 18), b.push(128 | 63 & d >> 12), b.push(128 | 63 & d >> 6), b.push(128 | 63 & d))
    }
    return b
}, UTF8.decode = function(a) {
    for (var b = [], c = 0; c < a.length;) {
        var d = a[c++];
        128 > d || (224 > d ? (d = (31 & d) << 6, d |= 63 & a[c++]) : 240 > d ? (d = (15 & d) << 12, d |= (63 & a[c++]) << 6, d |= 63 & a[c++]) : (d = (7 & d) << 18, d |= (63 & a[c++]) << 12, d |= (63 & a[c++]) << 6, d |= 63 & a[c++])), b.push(String.fromCharCode(d))
    }
    return b.join("")
};
var BASE64 = {};
if (function(b) {
        var c = function(a) {
                for (var c = 0, d = [], e = 0 | a.length / 3; 0 < e--;) {
                    var f = (a[c] << 16) + (a[c + 1] << 8) + a[c + 2];
                    c += 3, d.push(b.charAt(63 & f >> 18)), d.push(b.charAt(63 & f >> 12)), d.push(b.charAt(63 & f >> 6)), d.push(b.charAt(63 & f))
                }
                if (2 == a.length - c) {
                    var f = (a[c] << 16) + (a[c + 1] << 8);
                    d.push(b.charAt(63 & f >> 18)), d.push(b.charAt(63 & f >> 12)), d.push(b.charAt(63 & f >> 6)), d.push("=")
                } else if (1 == a.length - c) {
                    var f = a[c] << 16;
                    d.push(b.charAt(63 & f >> 18)), d.push(b.charAt(63 & f >> 12)), d.push("==")
                }
                return d.join("")
            },
            d = function() {
                for (var a = [], c = 0; c < b.length; ++c) a[b.charCodeAt(c)] = c;
                return a["=".charCodeAt(0)] = 0, a
            }(),
            e = function(a) {
                for (var b = 0, c = [], e = 0 | a.length / 4; 0 < e--;) {
                    var f = (d[a.charCodeAt(b)] << 18) + (d[a.charCodeAt(b + 1)] << 12) + (d[a.charCodeAt(b + 2)] << 6) + d[a.charCodeAt(b + 3)];
                    c.push(255 & f >> 16), c.push(255 & f >> 8), c.push(255 & f), b += 4
                }
                return c && ("=" == a.charAt(b - 2) ? (c.pop(), c.pop()) : "=" == a.charAt(b - 1) && c.pop()), c
            },
            f = {};
        f.encode = function(a) {
            for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c));
            return b
        }, f.decode = function(b) {
            for (var c = 0; c < s.length; ++c) a[c] = String.fromCharCode(a[c]);
            return a.join("")
        }, BASE64.decodeArray = function(a) {
            var b = e(a);
            return new Uint8Array(b)
        }, BASE64.encodeASCII = function(a) {
            var b = f.encode(a);
            return c(b)
        }, BASE64.decodeASCII = function(a) {
            var b = e(a);
            return f.decode(b)
        }, BASE64.encode = function(a) {
            var b = UTF8.encode(a);
            return c(b)
        }, BASE64.decode = function(a) {
            var b = e(a);
            return UTF8.decode(b)
        }
    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), void 0 === btoa) var btoa = BASE64.encode;
if (void 0 === atob) var atob = BASE64.decode;
! function(a, b) {
    function c(a) {
        var b = a.length,
            c = ka.type(a);
        return ka.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
    }

    function d(a) {
        var b = za[a] = {};
        return ka.each(a.match(ma) || [], function(a, c) {
            b[c] = !0
        }), b
    }

    function e(a, c, d, e) {
        if (ka.acceptData(a)) {
            var f, g, h = ka.expando,
                i = a.nodeType,
                j = i ? ka.cache : a,
                k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || d !== b || "string" != typeof c) return k || (k = i ? a[h] = ba.pop() || ka.guid++ : h), j[k] || (j[k] = i ? {} : {
                toJSON: ka.noop
            }), ("object" == typeof c || "function" == typeof c) && (e ? j[k] = ka.extend(j[k], c) : j[k].data = ka.extend(j[k].data, c)), g = j[k], e || (g.data || (g.data = {}), g = g.data), d !== b && (g[ka.camelCase(c)] = d), "string" == typeof c ? (f = g[c], null == f && (f = g[ka.camelCase(c)])) : f = g, f
        }
    }

    function f(a, b, c) {
        if (ka.acceptData(a)) {
            var d, e, f = a.nodeType,
                g = f ? ka.cache : a,
                i = f ? a[ka.expando] : ka.expando;
            if (g[i]) {
                if (b && (d = c ? g[i] : g[i].data)) {
                    ka.isArray(b) ? b = b.concat(ka.map(b, ka.camelCase)) : b in d ? b = [b] : (b = ka.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    for (; e--;) delete d[b[e]];
                    if (c ? !h(d) : !ka.isEmptyObject(d)) return
                }(c || (delete g[i].data, h(g[i]))) && (f ? ka.cleanData([a], !0) : ka.support.deleteExpando || g != g.window ? delete g[i] : g[i] = null)
            }
        }
    }

    function g(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(Ba, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : Aa.test(d) ? ka.parseJSON(d) : d
                } catch (f) {}
                ka.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b;
        for (b in a)
            if (("data" !== b || !ka.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function i() {
        return !0
    }

    function j() {
        return !1
    }

    function k() {
        try {
            return Y.activeElement
        } catch (a) {}
    }

    function l(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function m(a, b, c) {
        if (ka.isFunction(b)) return ka.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return ka.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (Qa.test(b)) return ka.filter(b, a, c);
            b = ka.filter(b, a)
        }
        return ka.grep(a, function(a) {
            return ka.inArray(a, b) >= 0 !== c
        })
    }

    function n(a) {
        var b = Ua.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length;) c.createElement(b.pop());
        return c
    }

    function o(a, b) {
        return ka.nodeName(a, "table") && ka.nodeName(1 === b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function p(a) {
        return a.type = (null !== ka.find.attr(a, "type")) + "/" + a.type, a
    }

    function q(a) {
        var b = eb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function r(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) ka._data(c, "globalEval", !b || ka._data(b[d], "globalEval"))
    }

    function s(a, b) {
        if (1 === b.nodeType && ka.hasData(a)) {
            var c, d, e, f = ka._data(a),
                g = ka._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++) ka.event.add(b, c, h[c][d])
            }
            g.data && (g.data = ka.extend({}, g.data))
        }
    }

    function t(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !ka.support.noCloneEvent && b[ka.expando]) {
                e = ka._data(b);
                for (d in e.events) ka.removeEvent(b, d, e.handle);
                b.removeAttribute(ka.expando)
            }
            "script" === c && b.text !== a.text ? (p(b).text = a.text, q(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), ka.support.html5Clone && a.innerHTML && !ka.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && bb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }

    function u(a, c) {
        var d, e, f = 0,
            g = typeof a.getElementsByTagName !== W ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== W ? a.querySelectorAll(c || "*") : b;
        if (!g)
            for (g = [], d = a.childNodes || a; null != (e = d[f]); f++) !c || ka.nodeName(e, c) ? g.push(e) : ka.merge(g, u(e, c));
        return c === b || c && ka.nodeName(a, c) ? ka.merge([a], g) : g
    }

    function v(a) {
        bb.test(a.type) && (a.defaultChecked = a.checked)
    }

    function w(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = yb.length; e--;)
            if (b = yb[e] + c, b in a) return b;
        return d
    }

    function x(a, b) {
        return a = b || a, "none" === ka.css(a, "display") || !ka.contains(a.ownerDocument, a)
    }

    function y(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = ka._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && x(d) && (f[g] = ka._data(d, "olddisplay", C(d.nodeName)))) : f[g] || (e = x(d), (c && "none" !== c || !e) && ka._data(d, "olddisplay", e ? c : ka.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function z(a, b, c) {
        var d = rb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function A(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += ka.css(a, c + xb[f], !0, e)), d ? ("content" === c && (g -= ka.css(a, "padding" + xb[f], !0, e)), "margin" !== c && (g -= ka.css(a, "border" + xb[f] + "Width", !0, e))) : (g += ka.css(a, "padding" + xb[f], !0, e), "padding" !== c && (g += ka.css(a, "border" + xb[f] + "Width", !0, e)));
        return g
    }

    function B(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = kb(a),
            g = ka.support.boxSizing && "border-box" === ka.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = lb(a, b, f), (0 > e || null == e) && (e = a.style[b]), sb.test(e)) return e;
            d = g && (ka.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + A(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function C(a) {
        var b = Y,
            c = ub[a];
        return c || (c = D(a, b), "none" !== c && c || (jb = (jb || ka("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (jb[0].contentWindow || jb[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = D(a, b), jb.detach()), ub[a] = c), c
    }

    function D(a, b) {
        var c = ka(b.createElement(a)).appendTo(b.body),
            d = ka.css(c[0], "display");
        return c.remove(), d
    }

    function E(a, b, c, d) {
        var e;
        if (ka.isArray(b)) ka.each(b, function(b, e) {
            c || Ab.test(a) ? d(a, e) : E(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== ka.type(b)) d(a, b);
        else
            for (e in b) E(a + "[" + e + "]", b[e], c, d)
    }

    function F(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(ma) || [];
            if (ka.isFunction(c))
                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function G(a, c, d, e) {
        function f(i) {
            var j;
            return g[i] = !0, ka.each(a[i] || [], function(a, i) {
                var k = i(c, d, e);
                return "string" != typeof k || h || g[k] ? h ? !(j = k) : b : (c.dataTypes.unshift(k), f(k), !1)
            }), j
        }
        var g = {},
            h = a === Rb;
        return f(c.dataTypes[0]) || !g["*"] && f("*")
    }

    function H(a, c) {
        var d, e, f = ka.ajaxSettings.flatOptions || {};
        for (e in c) c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
        return d && ka.extend(!0, a, d), a
    }

    function I(a, c, d) {
        for (var e, f, g, h, i = a.contents, j = a.dataTypes;
            "*" === j[0];) j.shift(), f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
        if (f)
            for (h in i)
                if (i[h] && i[h].test(f)) {
                    j.unshift(h);
                    break
                }
        if (j[0] in d) g = j[0];
        else {
            for (h in d) {
                if (!j[0] || a.converters[h + " " + j[0]]) {
                    g = h;
                    break
                }
                e || (e = h)
            }
            g = g || e
        }
        return g ? (g !== j[0] && j.unshift(g), d[g]) : b
    }

    function J(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function K() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function L() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function M() {
        return setTimeout(function() {
            $b = b
        }), $b = ka.now()
    }

    function N(a, b, c) {
        for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function O(a, b, c) {
        var d, e, f = 0,
            g = dc.length,
            h = ka.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = $b || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: ka.extend({}, b),
                opts: ka.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: $b || M(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = ka.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (P(k, j.opts.specialEasing); g > f; f++)
            if (d = dc[f].call(j, a, k, j.opts)) return d;
        return ka.map(k, N, j), ka.isFunction(j.opts.start) && j.opts.start.call(a, j), ka.fx.timer(ka.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function P(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = ka.camelCase(c), e = b[d], f = a[c], ka.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ka.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function Q(a, b, c) {
        var d, e, f, g, h, i, j = this,
            k = {},
            l = a.style,
            m = a.nodeType && x(a),
            n = ka._data(a, "fxshow");
        c.queue || (h = ka._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, j.always(function() {
            j.always(function() {
                h.unqueued--, ka.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [l.overflow, l.overflowX, l.overflowY], "inline" === ka.css(a, "display") && "none" === ka.css(a, "float") && (ka.support.inlineBlockNeedsLayout && "inline" !== C(a.nodeName) ? l.zoom = 1 : l.display = "inline-block")), c.overflow && (l.overflow = "hidden", ka.support.shrinkWrapBlocks || j.always(function() {
            l.overflow = c.overflow[0], l.overflowX = c.overflow[1], l.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], ac.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (m ? "hide" : "show")) continue;
                k[d] = n && n[d] || ka.style(a, d)
            }
        if (!ka.isEmptyObject(k)) {
            n ? "hidden" in n && (m = n.hidden) : n = ka._data(a, "fxshow", {}), f && (n.hidden = !m), m ? ka(a).show() : j.done(function() {
                ka(a).hide()
            }), j.done(function() {
                var b;
                ka._removeData(a, "fxshow");
                for (b in k) ka.style(a, b, k[b])
            });
            for (d in k) g = N(m ? n[d] : 0, d, j), d in n || (n[d] = g.start, m && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function R(a, b, c, d, e) {
        return new R.prototype.init(a, b, c, d, e)
    }

    function S(a, b) {
        var c, d = {
                height: a
            },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = xb[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function T(a) {
        return ka.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var U, V, W = typeof b,
        X = a.location,
        Y = a.document,
        Z = Y.documentElement,
        $ = a.jQuery,
        _ = a.$,
        aa = {},
        ba = [],
        ca = "1.10.2",
        da = ba.concat,
        ea = ba.push,
        fa = ba.slice,
        ga = ba.indexOf,
        ha = aa.toString,
        ia = aa.hasOwnProperty,
        ja = ca.trim,
        ka = function(a, b) {
            return new ka.fn.init(a, b, V)
        },
        la = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ma = /\S+/g,
        na = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        oa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        pa = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        qa = /^[\],:{}\s]*$/,
        ra = /(?:^|:|,)(?:\s*\[)+/g,
        sa = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        ta = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        ua = /^-ms-/,
        va = /-([\da-z])/gi,
        wa = function(a, b) {
            return b.toUpperCase()
        },
        xa = function(a) {
            (Y.addEventListener || "load" === a.type || "complete" === Y.readyState) && (ya(), ka.ready())
        },
        ya = function() {
            Y.addEventListener ? (Y.removeEventListener("DOMContentLoaded", xa, !1), a.removeEventListener("load", xa, !1)) : (Y.detachEvent("onreadystatechange", xa), a.detachEvent("onload", xa))
        };
    ka.fn = ka.prototype = {
            jquery: ca,
            constructor: ka,
            init: function(a, c, d) {
                var e, f;
                if (!a) return this;
                if ("string" == typeof a) {
                    if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : oa.exec(a), !e || !e[1] && c) return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                    if (e[1]) {
                        if (c = c instanceof ka ? c[0] : c, ka.merge(this, ka.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : Y, !0)), pa.test(e[1]) && ka.isPlainObject(c))
                            for (e in c) ka.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                        return this
                    }
                    if (f = Y.getElementById(e[2]), f && f.parentNode) {
                        if (f.id !== e[2]) return d.find(a);
                        this.length = 1, this[0] = f
                    }
                    return this.context = Y, this.selector = a, this
                }
                return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ka.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), ka.makeArray(a, this))
            },
            selector: "",
            length: 0,
            toArray: function() {
                return fa.call(this)
            },
            get: function(a) {
                return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
            },
            pushStack: function(a) {
                var b = ka.merge(this.constructor(), a);
                return b.prevObject = this, b.context = this.context, b
            },
            each: function(a, b) {
                return ka.each(this, a, b)
            },
            ready: function(a) {
                return ka.ready.promise().done(a), this
            },
            slice: function() {
                return this.pushStack(fa.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(a) {
                var b = this.length,
                    c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
            },
            map: function(a) {
                return this.pushStack(ka.map(this, function(b, c) {
                    return a.call(b, c, b)
                }))
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: ea,
            sort: [].sort,
            splice: [].splice
        }, ka.fn.init.prototype = ka.fn, ka.extend = ka.fn.extend = function() {
            var a, c, d, e, f, g, h = arguments[0] || {},
                i = 1,
                j = arguments.length,
                k = !1;
            for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || ka.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)
                if (null != (f = arguments[i]))
                    for (e in f) a = h[e], d = f[e], h !== d && (k && d && (ka.isPlainObject(d) || (c = ka.isArray(d))) ? (c ? (c = !1, g = a && ka.isArray(a) ? a : []) : g = a && ka.isPlainObject(a) ? a : {}, h[e] = ka.extend(k, g, d)) : d !== b && (h[e] = d));
            return h
        }, ka.extend({
            expando: "jQuery" + (ca + Math.random()).replace(/\D/g, ""),
            noConflict: function(b) {
                return a.$ === ka && (a.$ = _), b && a.jQuery === ka && (a.jQuery = $), ka
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? ka.readyWait++ : ka.ready(!0)
            },
            ready: function(a) {
                if (a === !0 ? !--ka.readyWait : !ka.isReady) {
                    if (!Y.body) return setTimeout(ka.ready);
                    ka.isReady = !0, a !== !0 && --ka.readyWait > 0 || (U.resolveWith(Y, [ka]), ka.fn.trigger && ka(Y).trigger("ready").off("ready"))
                }
            },
            isFunction: function(a) {
                return "function" === ka.type(a)
            },
            isArray: Array.isArray || function(a) {
                return "array" === ka.type(a)
            },
            isWindow: function(a) {
                return null != a && a == a.window
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            },
            type: function(a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? aa[ha.call(a)] || "object" : typeof a
            },
            isPlainObject: function(a) {
                var c;
                if (!a || "object" !== ka.type(a) || a.nodeType || ka.isWindow(a)) return !1;
                try {
                    if (a.constructor && !ia.call(a, "constructor") && !ia.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (d) {
                    return !1
                }
                if (ka.support.ownLast)
                    for (c in a) return ia.call(a, c);
                for (c in a);
                return c === b || ia.call(a, c)
            },
            isEmptyObject: function(a) {
                var b;
                for (b in a) return !1;
                return !0
            },
            error: function(a) {
                throw Error(a)
            },
            parseHTML: function(a, b, c) {
                if (!a || "string" != typeof a) return null;
                "boolean" == typeof b && (c = b, b = !1), b = b || Y;
                var d = pa.exec(a),
                    e = !c && [];
                return d ? [b.createElement(d[1])] : (d = ka.buildFragment([a], b, e), e && ka(e).remove(), ka.merge([], d.childNodes))
            },
            parseJSON: function(c) {
                return a.JSON && a.JSON.parse ? a.JSON.parse(c) : null === c ? c : "string" == typeof c && (c = ka.trim(c), c && qa.test(c.replace(sa, "@").replace(ta, "]").replace(ra, ""))) ? Function("return " + c)() : (ka.error("Invalid JSON: " + c), b)
            },
            parseXML: function(c) {
                var d, e;
                if (!c || "string" != typeof c) return null;
                try {
                    a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (f) {
                    d = b
                }
                return d && d.documentElement && !d.getElementsByTagName("parsererror").length || ka.error("Invalid XML: " + c), d
            },
            noop: function() {},
            globalEval: function(b) {
                b && ka.trim(b) && (a.execScript || function(b) {
                    a.eval.call(a, b)
                })(b)
            },
            camelCase: function(a) {
                return a.replace(ua, "ms-").replace(va, wa)
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
            },
            each: function(a, b, d) {
                var e, f = 0,
                    g = a.length,
                    h = c(a);
                if (d) {
                    if (h)
                        for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                    else
                        for (f in a)
                            if (e = b.apply(a[f], d), e === !1) break
                } else if (h)
                    for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.call(a[f], f, a[f]), e === !1) break;
                return a
            },
            trim: ja && !ja.call("\ufeff ") ? function(a) {
                return null == a ? "" : ja.call(a)
            } : function(a) {
                return null == a ? "" : (a + "").replace(na, "")
            },
            makeArray: function(a, b) {
                var d = b || [];
                return null != a && (c(Object(a)) ? ka.merge(d, "string" == typeof a ? [a] : a) : ea.call(d, a)), d
            },
            inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (ga) return ga.call(b, a, c);
                    for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                        if (c in b && b[c] === a) return c
                }
                return -1
            },
            merge: function(a, c) {
                var d = c.length,
                    e = a.length,
                    f = 0;
                if ("number" == typeof d)
                    for (; d > f; f++) a[e++] = c[f];
                else
                    for (; c[f] !== b;) a[e++] = c[f++];
                return a.length = e, a
            },
            grep: function(a, b, c) {
                var d, e = [],
                    f = 0,
                    g = a.length;
                for (c = !!c; g > f; f++) d = !!b(a[f], f), c !== d && e.push(a[f]);
                return e
            },
            map: function(a, b, d) {
                var e, f = 0,
                    g = a.length,
                    h = c(a),
                    i = [];
                if (h)
                    for (; g > f; f++) e = b(a[f], f, d), null != e && (i[i.length] = e);
                else
                    for (f in a) e = b(a[f], f, d), null != e && (i[i.length] = e);
                return da.apply([], i)
            },
            guid: 1,
            proxy: function(a, c) {
                var d, e, f;
                return "string" == typeof c && (f = a[c], c = a, a = f), ka.isFunction(a) ? (d = fa.call(arguments, 2), e = function() {
                    return a.apply(c || this, d.concat(fa.call(arguments)))
                }, e.guid = a.guid = a.guid || ka.guid++, e) : b
            },
            access: function(a, c, d, e, f, g, h) {
                var i = 0,
                    j = a.length,
                    k = null == d;
                if ("object" === ka.type(d)) {
                    f = !0;
                    for (i in d) ka.access(a, c, i, d[i], !0, g, h)
                } else if (e !== b && (f = !0, ka.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function(a, b, c) {
                        return k.call(ka(a), c)
                    })), c))
                    for (; j > i; i++) c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
                return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
            },
            now: function() {
                return (new Date).getTime()
            },
            swap: function(a, b, c, d) {
                var e, f, g = {};
                for (f in b) g[f] = a.style[f], a.style[f] = b[f];
                e = c.apply(a, d || []);
                for (f in b) a.style[f] = g[f];
                return e
            }
        }), ka.ready.promise = function(b) {
            if (!U)
                if (U = ka.Deferred(), "complete" === Y.readyState) setTimeout(ka.ready);
                else if (Y.addEventListener) Y.addEventListener("DOMContentLoaded", xa, !1), a.addEventListener("load", xa, !1);
            else {
                Y.attachEvent("onreadystatechange", xa), a.attachEvent("onload", xa);
                var c = !1;
                try {
                    c = null == a.frameElement && Y.documentElement
                } catch (d) {}
                c && c.doScroll && function e() {
                    if (!ka.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (a) {
                            return setTimeout(e, 50)
                        }
                        ya(), ka.ready()
                    }
                }()
            }
            return U.promise(b)
        }, ka.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
            aa["[object " + b + "]"] = b.toLowerCase()
        }), V = ka(Y),
        function(a, b) {
            function c(a, b, c, d) {
                var e, f, g, h, i, j, k, l, o, p;
                if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], !a || "string" != typeof a) return c;
                if (1 !== (h = b.nodeType) && 9 !== h) return [];
                if (I && !d) {
                    if (e = ta.exec(a))
                        if (g = e[1]) {
                            if (9 === h) {
                                if (f = b.getElementById(g), !f || !f.parentNode) return c;
                                if (f.id === g) return c.push(f), c
                            } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                        } else {
                            if (e[2]) return aa.apply(c, b.getElementsByTagName(a)), c;
                            if ((g = e[3]) && x.getElementsByClassName && b.getElementsByClassName) return aa.apply(c, b.getElementsByClassName(g)), c
                        }
                    if (x.qsa && (!J || !J.test(a))) {
                        if (l = k = N, o = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                            for (j = m(a), (k = b.getAttribute("id")) ? l = k.replace(wa, "\\$&") : b.setAttribute("id", l), l = "[id='" + l + "'] ", i = j.length; i--;) j[i] = l + n(j[i]);
                            o = na.test(a) && b.parentNode || b, p = j.join(",")
                        }
                        if (p) try {
                            return aa.apply(c, o.querySelectorAll(p)), c
                        } catch (q) {} finally {
                            k || b.removeAttribute("id")
                        }
                    }
                }
                return v(a.replace(ja, "$1"), b, c, d)
            }

            function d() {
                function a(c, d) {
                    return b.push(c += " ") > z.cacheLength && delete a[b.shift()], a[c] = d
                }
                var b = [];
                return a
            }

            function e(a) {
                return a[N] = !0, a
            }

            function f(a) {
                var b = G.createElement("div");
                try {
                    return !!a(b)
                } catch (c) {
                    return !1
                } finally {
                    b.parentNode && b.parentNode.removeChild(b), b = null
                }
            }

            function g(a, b) {
                for (var c = a.split("|"), d = a.length; d--;) z.attrHandle[c[d]] = b
            }

            function h(a, b) {
                var c = b && a,
                    d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || X) - (~a.sourceIndex || X);
                if (d) return d;
                if (c)
                    for (; c = c.nextSibling;)
                        if (c === b) return -1;
                return a ? 1 : -1
            }

            function i(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return "input" === c && b.type === a
                }
            }

            function j(a) {
                return function(b) {
                    var c = b.nodeName.toLowerCase();
                    return ("input" === c || "button" === c) && b.type === a
                }
            }

            function k(a) {
                return e(function(b) {
                    return b = +b, e(function(c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                    })
                })
            }

            function l() {}

            function m(a, b) {
                var d, e, f, g, h, i, j, k = S[a + " "];
                if (k) return b ? 0 : k.slice(0);
                for (h = a, i = [], j = z.preFilter; h;) {
                    (!d || (e = la.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ma.exec(h)) && (d = e.shift(), f.push({
                        value: d,
                        type: e[0].replace(ja, " ")
                    }), h = h.slice(d.length));
                    for (g in z.filter) !(e = ra[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                        value: d,
                        type: g,
                        matches: e
                    }), h = h.slice(d.length));
                    if (!d) break
                }
                return b ? h.length : h ? c.error(a) : S(a, i).slice(0)
            }

            function n(a) {
                for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
                return d
            }

            function o(a, b, c) {
                var d = b.dir,
                    e = c && "parentNode" === d,
                    f = Q++;
                return b.first ? function(b, c, f) {
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) return a(b, c, f)
                } : function(b, c, g) {
                    var h, i, j, k = P + " " + f;
                    if (g) {
                        for (; b = b[d];)
                            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                    } else
                        for (; b = b[d];)
                            if (1 === b.nodeType || e)
                                if (j = b[N] || (b[N] = {}), (i = j[d]) && i[0] === k) {
                                    if ((h = i[1]) === !0 || h === y) return h === !0
                                } else if (i = j[d] = [k], i[1] = a(b, c, g) || y, i[1] === !0) return !0
                }
            }

            function p(a) {
                return a.length > 1 ? function(b, c, d) {
                    for (var e = a.length; e--;)
                        if (!a[e](b, c, d)) return !1;
                    return !0
                } : a[0]
            }

            function q(a, b, c, d, e) {
                for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
                return g
            }

            function r(a, b, c, d, f, g) {
                return d && !d[N] && (d = r(d)), f && !f[N] && (f = r(f, g)), e(function(e, g, h, i) {
                    var j, k, l, m = [],
                        n = [],
                        o = g.length,
                        p = e || u(b || "*", h.nodeType ? [h] : h, []),
                        r = !a || !e && b ? p : q(p, m, a, h, i),
                        s = c ? f || (e ? a : o || d) ? [] : g : r;
                    if (c && c(r, s, h, i), d)
                        for (j = q(s, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) && (s[n[k]] = !(r[n[k]] = l));
                    if (e) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = s.length; k--;)(l = s[k]) && j.push(r[k] = l);
                                f(null, s = [], j, i)
                            }
                            for (k = s.length; k--;)(l = s[k]) && (j = f ? ca.call(e, l) : m[k]) > -1 && (e[j] = !(g[j] = l))
                        }
                    } else s = q(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : aa.apply(g, s)
                })
            }

            function s(a) {
                for (var b, c, d, e = a.length, f = z.relative[a[0].type], g = f || z.relative[" "], h = f ? 1 : 0, i = o(function(a) {
                        return a === b
                    }, g, !0), j = o(function(a) {
                        return ca.call(b, a) > -1
                    }, g, !0), k = [function(a, c, d) {
                        return !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                    }]; e > h; h++)
                    if (c = z.relative[a[h].type]) k = [o(p(k), c)];
                    else {
                        if (c = z.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                            for (d = ++h; e > d && !z.relative[a[d].type]; d++);
                            return r(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
                                value: " " === a[h - 2].type ? "*" : ""
                            })).replace(ja, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && n(a))
                        }
                        k.push(c)
                    }
                return p(k)
            }

            function t(a, b) {
                var d = 0,
                    f = b.length > 0,
                    g = a.length > 0,
                    h = function(e, h, i, j, k) {
                        var l, m, n, o = [],
                            p = 0,
                            r = "0",
                            s = e && [],
                            t = null != k,
                            u = D,
                            v = e || g && z.find.TAG("*", k && h.parentNode || h),
                            w = P += null == u ? 1 : Math.random() || .1;
                        for (t && (D = h !== G && h, y = d); null != (l = v[r]); r++) {
                            if (g && l) {
                                for (m = 0; n = a[m++];)
                                    if (n(l, h, i)) {
                                        j.push(l);
                                        break
                                    }
                                t && (P = w, y = ++d)
                            }
                            f && ((l = !n && l) && p--, e && s.push(l))
                        }
                        if (p += r, f && r !== p) {
                            for (m = 0; n = b[m++];) n(s, o, h, i);
                            if (e) {
                                if (p > 0)
                                    for (; r--;) s[r] || o[r] || (o[r] = $.call(j));
                                o = q(o)
                            }
                            aa.apply(j, o), t && !e && o.length > 0 && p + b.length > 1 && c.uniqueSort(j)
                        }
                        return t && (P = w, D = u), s
                    };
                return f ? e(h) : h
            }

            function u(a, b, d) {
                for (var e = 0, f = b.length; f > e; e++) c(a, b[e], d);
                return d
            }

            function v(a, b, c, d) {
                var e, f, g, h, i, j = m(a);
                if (!d && 1 === j.length) {
                    if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && x.getById && 9 === b.nodeType && I && z.relative[f[1].type]) {
                        if (b = (z.find.ID(g.matches[0].replace(xa, ya), b) || [])[0], !b) return c;
                        a = a.slice(f.shift().value.length)
                    }
                    for (e = ra.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !z.relative[h = g.type]);)
                        if ((i = z.find[h]) && (d = i(g.matches[0].replace(xa, ya), na.test(f[0].type) && b.parentNode || b))) {
                            if (f.splice(e, 1), a = d.length && n(f), !a) return aa.apply(c, d), c;
                            break
                        }
                }
                return C(a, j)(d, b, !I, c, na.test(a)), c
            }
            var w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + -new Date,
                O = a.document,
                P = 0,
                Q = 0,
                R = d(),
                S = d(),
                T = d(),
                U = !1,
                V = function(a, b) {
                    return a === b ? (U = !0, 0) : 0
                },
                W = typeof b,
                X = 1 << 31,
                Y = {}.hasOwnProperty,
                Z = [],
                $ = Z.pop,
                _ = Z.push,
                aa = Z.push,
                ba = Z.slice,
                ca = Z.indexOf || function(a) {
                    for (var b = 0, c = this.length; c > b; b++)
                        if (this[b] === a) return b;
                    return -1
                },
                da = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ea = "[\\x20\\t\\r\\n\\f]",
                fa = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                ga = fa.replace("w", "w#"),
                ha = "\\[" + ea + "*(" + fa + ")" + ea + "*(?:([*^$|!~]?=)" + ea + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ga + ")|)|)" + ea + "*\\]",
                ia = ":(" + fa + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ha.replace(3, 8) + ")*)|.*)\\)|)",
                ja = RegExp("^" + ea + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ea + "+$", "g"),
                la = RegExp("^" + ea + "*," + ea + "*"),
                ma = RegExp("^" + ea + "*([>+~]|" + ea + ")" + ea + "*"),
                na = RegExp(ea + "*[+~]"),
                oa = RegExp("=" + ea + "*([^\\]'\"]*)" + ea + "*\\]", "g"),
                pa = RegExp(ia),
                qa = RegExp("^" + ga + "$"),
                ra = {
                    ID: RegExp("^#(" + fa + ")"),
                    CLASS: RegExp("^\\.(" + fa + ")"),
                    TAG: RegExp("^(" + fa.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + ha),
                    PSEUDO: RegExp("^" + ia),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ea + "*(even|odd|(([+-]|)(\\d*)n|)" + ea + "*(?:([+-]|)" + ea + "*(\\d+)|))" + ea + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + da + ")$", "i"),
                    needsContext: RegExp("^" + ea + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ea + "*((?:-\\d)?\\d*)" + ea + "*\\)|)(?=[^-]|$)", "i")
                },
                sa = /^[^{]+\{\s*\[native \w/,
                ta = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ua = /^(?:input|select|textarea|button)$/i,
                va = /^h\d$/i,
                wa = /'|\\/g,
                xa = RegExp("\\\\([\\da-f]{1,6}" + ea + "?|(" + ea + ")|.)", "ig"),
                ya = function(a, b, c) {
                    var d = "0x" + b - 65536;
                    return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(55296 | d >> 10, 56320 | 1023 & d)
                };
            try {
                aa.apply(Z = ba.call(O.childNodes), O.childNodes), Z[O.childNodes.length].nodeType
            } catch (za) {
                aa = {
                    apply: Z.length ? function(a, b) {
                        _.apply(a, ba.call(b))
                    } : function(a, b) {
                        for (var c = a.length, d = 0; a[c++] = b[d++];);
                        a.length = c - 1
                    }
                }
            }
            B = c.isXML = function(a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1
            }, x = c.support = {}, F = c.setDocument = function(a) {
                var c = a ? a.ownerDocument || a : O,
                    d = c.defaultView;
                return c !== G && 9 === c.nodeType && c.documentElement ? (G = c, H = c.documentElement, I = !B(c), d && d.attachEvent && d !== d.top && d.attachEvent("onbeforeunload", function() {
                    F()
                }), x.attributes = f(function(a) {
                    return a.className = "i", !a.getAttribute("className")
                }), x.getElementsByTagName = f(function(a) {
                    return a.appendChild(c.createComment("")), !a.getElementsByTagName("*").length
                }), x.getElementsByClassName = f(function(a) {
                    return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
                }), x.getById = f(function(a) {
                    return H.appendChild(a).id = N, !c.getElementsByName || !c.getElementsByName(N).length
                }), x.getById ? (z.find.ID = function(a, b) {
                    if (typeof b.getElementById !== W && I) {
                        var c = b.getElementById(a);
                        return c && c.parentNode ? [c] : []
                    }
                }, z.filter.ID = function(a) {
                    var b = a.replace(xa, ya);
                    return function(a) {
                        return a.getAttribute("id") === b
                    }
                }) : (delete z.find.ID, z.filter.ID = function(a) {
                    var b = a.replace(xa, ya);
                    return function(a) {
                        var c = typeof a.getAttributeNode !== W && a.getAttributeNode("id");
                        return c && c.value === b
                    }
                }), z.find.TAG = x.getElementsByTagName ? function(a, c) {
                    return typeof c.getElementsByTagName !== W ? c.getElementsByTagName(a) : b
                } : function(a, b) {
                    var c, d = [],
                        e = 0,
                        f = b.getElementsByTagName(a);
                    if ("*" === a) {
                        for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                        return d
                    }
                    return f
                }, z.find.CLASS = x.getElementsByClassName && function(a, c) {
                    return typeof c.getElementsByClassName !== W && I ? c.getElementsByClassName(a) : b
                }, K = [], J = [], (x.qsa = sa.test(c.querySelectorAll)) && (f(function(a) {
                    a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || J.push("\\[" + ea + "*(?:value|" + da + ")"), a.querySelectorAll(":checked").length || J.push(":checked")
                }), f(function(a) {
                    var b = c.createElement("input");
                    b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("t", ""), a.querySelectorAll("[t^='']").length && J.push("[*^$]=" + ea + "*(?:''|\"\")"), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
                })), (x.matchesSelector = sa.test(L = H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && f(function(a) {
                    x.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ia)
                }), J = J.length && RegExp(J.join("|")), K = K.length && RegExp(K.join("|")), M = sa.test(H.contains) || H.compareDocumentPosition ? function(a, b) {
                    var c = 9 === a.nodeType ? a.documentElement : a,
                        d = b && b.parentNode;
                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                } : function(a, b) {
                    if (b)
                        for (; b = b.parentNode;)
                            if (b === a) return !0;
                    return !1
                }, V = H.compareDocumentPosition ? function(a, b) {
                    if (a === b) return U = !0, 0;
                    var d = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                    return d ? 1 & d || !x.sortDetached && b.compareDocumentPosition(a) === d ? a === c || M(O, a) ? -1 : b === c || M(O, b) ? 1 : E ? ca.call(E, a) - ca.call(E, b) : 0 : 4 & d ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
                } : function(a, b) {
                    var d, e = 0,
                        f = a.parentNode,
                        g = b.parentNode,
                        i = [a],
                        j = [b];
                    if (a === b) return U = !0, 0;
                    if (!f || !g) return a === c ? -1 : b === c ? 1 : f ? -1 : g ? 1 : E ? ca.call(E, a) - ca.call(E, b) : 0;
                    if (f === g) return h(a, b);
                    for (d = a; d = d.parentNode;) i.unshift(d);
                    for (d = b; d = d.parentNode;) j.unshift(d);
                    for (; i[e] === j[e];) e++;
                    return e ? h(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
                }, c) : G
            }, c.matches = function(a, b) {
                return c(a, null, null, b)
            }, c.matchesSelector = function(a, b) {
                if ((a.ownerDocument || a) !== G && F(a), b = b.replace(oa, "='$1']"), !(!x.matchesSelector || !I || K && K.test(b) || J && J.test(b))) try {
                    var d = L.call(a, b);
                    if (d || x.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
                } catch (e) {}
                return c(b, G, null, [a]).length > 0
            }, c.contains = function(a, b) {
                return (a.ownerDocument || a) !== G && F(a), M(a, b)
            }, c.attr = function(a, c) {
                (a.ownerDocument || a) !== G && F(a);
                var d = z.attrHandle[c.toLowerCase()],
                    e = d && Y.call(z.attrHandle, c.toLowerCase()) ? d(a, c, !I) : b;
                return e === b ? x.attributes || !I ? a.getAttribute(c) : (e = a.getAttributeNode(c)) && e.specified ? e.value : null : e
            }, c.error = function(a) {
                throw Error("Syntax error, unrecognized expression: " + a)
            }, c.uniqueSort = function(a) {
                var b, c = [],
                    d = 0,
                    e = 0;
                if (U = !x.detectDuplicates, E = !x.sortStable && a.slice(0), a.sort(V), U) {
                    for (; b = a[e++];) b === a[e] && (d = c.push(e));
                    for (; d--;) a.splice(c[d], 1)
                }
                return a
            }, A = c.getText = function(a) {
                var b, c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += A(a)
                    } else if (3 === e || 4 === e) return a.nodeValue
                } else
                    for (; b = a[d]; d++) c += A(b);
                return c
            }, z = c.selectors = {
                cacheLength: 50,
                createPseudo: e,
                match: ra,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(a) {
                        return a[1] = a[1].replace(xa, ya), a[3] = (a[4] || a[5] || "").replace(xa, ya), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                    },
                    CHILD: function(a) {
                        return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || c.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && c.error(a[0]), a
                    },
                    PSEUDO: function(a) {
                        var c, d = !a[5] && a[2];
                        return ra.CHILD.test(a[0]) ? null : (a[3] && a[4] !== b ? a[2] = a[4] : d && pa.test(d) && (c = m(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (a[0] = a[0].slice(0, c), a[2] = d.slice(0, c)), a.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(a) {
                        var b = a.replace(xa, ya).toLowerCase();
                        return "*" === a ? function() {
                            return !0
                        } : function(a) {
                            return a.nodeName && a.nodeName.toLowerCase() === b
                        }
                    },
                    CLASS: function(a) {
                        var b = R[a + " "];
                        return b || (b = RegExp("(^|" + ea + ")" + a + "(" + ea + "|$)")) && R(a, function(a) {
                            return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== W && a.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(a, b, d) {
                        return function(e) {
                            var f = c.attr(e, a);
                            return null == f ? "!=" === b : b ? (f += "", "=" === b ? f === d : "!=" === b ? f !== d : "^=" === b ? d && 0 === f.indexOf(d) : "*=" === b ? d && f.indexOf(d) > -1 : "$=" === b ? d && f.slice(-d.length) === d : "~=" === b ? (" " + f + " ").indexOf(d) > -1 : "|=" === b ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                        }
                    },
                    CHILD: function(a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e ? function(a) {
                            return !!a.parentNode
                        } : function(b, c, i) {
                            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                                q = b.parentNode,
                                r = h && b.nodeName.toLowerCase(),
                                s = !i && !h;
                            if (q) {
                                if (f) {
                                    for (; p;) {
                                        for (l = b; l = l[p];)
                                            if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                        o = p = "only" === a && !o && "nextSibling"
                                    }
                                    return !0
                                }
                                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                    for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                        if (1 === l.nodeType && ++m && l === b) {
                                            k[a] = [P, n, m];
                                            break
                                        }
                                } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                else
                                    for (;
                                        (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                                return m -= e, m === d || 0 === m % d && m / d >= 0
                            }
                        }
                    },
                    PSEUDO: function(a, b) {
                        var d, f = z.pseudos[a] || z.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
                        return f[N] ? f(b) : f.length > 1 ? (d = [a, a, "", b], z.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function(a, c) {
                            for (var d, e = f(a, b), g = e.length; g--;) d = ca.call(a, e[g]), a[d] = !(c[d] = e[g])
                        }) : function(a) {
                            return f(a, 0, d)
                        }) : f
                    }
                },
                pseudos: {
                    not: e(function(a) {
                        var b = [],
                            c = [],
                            d = C(a.replace(ja, "$1"));
                        return d[N] ? e(function(a, b, c, e) {
                            for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                        }) : function(a, e, f) {
                            return b[0] = a, d(b, null, f, c), !c.pop()
                        }
                    }),
                    has: e(function(a) {
                        return function(b) {
                            return c(a, b).length > 0
                        }
                    }),
                    contains: e(function(a) {
                        return function(b) {
                            return (b.textContent || b.innerText || A(b)).indexOf(a) > -1
                        }
                    }),
                    lang: e(function(a) {
                        return qa.test(a || "") || c.error("unsupported lang: " + a), a = a.replace(xa, ya).toLowerCase(),
                            function(b) {
                                var c;
                                do
                                    if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1
                            }
                    }),
                    target: function(b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id
                    },
                    root: function(a) {
                        return a === H
                    },
                    focus: function(a) {
                        return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                    },
                    enabled: function(a) {
                        return a.disabled === !1
                    },
                    disabled: function(a) {
                        return a.disabled === !0
                    },
                    checked: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && !!a.checked || "option" === b && !!a.selected
                    },
                    selected: function(a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    empty: function(a) {
                        for (a = a.firstChild; a; a = a.nextSibling)
                            if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType) return !1;
                        return !0
                    },
                    parent: function(a) {
                        return !z.pseudos.empty(a)
                    },
                    header: function(a) {
                        return va.test(a.nodeName)
                    },
                    input: function(a) {
                        return ua.test(a.nodeName)
                    },
                    button: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return "input" === b && "button" === a.type || "button" === b
                    },
                    text: function(a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                    },
                    first: k(function() {
                        return [0]
                    }),
                    last: k(function(a, b) {
                        return [b - 1]
                    }),
                    eq: k(function(a, b, c) {
                        return [0 > c ? c + b : c]
                    }),
                    even: k(function(a, b) {
                        for (var c = 0; b > c; c += 2) a.push(c);
                        return a
                    }),
                    odd: k(function(a, b) {
                        for (var c = 1; b > c; c += 2) a.push(c);
                        return a
                    }),
                    lt: k(function(a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                        return a
                    }),
                    gt: k(function(a, b, c) {
                        for (var d = 0 > c ? c + b : c; b > ++d;) a.push(d);
                        return a
                    })
                }
            }, z.pseudos.nth = z.pseudos.eq;
            for (w in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) z.pseudos[w] = i(w);
            for (w in {
                    submit: !0,
                    reset: !0
                }) z.pseudos[w] = j(w);
            l.prototype = z.filters = z.pseudos, z.setFilters = new l, C = c.compile = function(a, b) {
                var c, d = [],
                    e = [],
                    f = T[a + " "];
                if (!f) {
                    for (b || (b = m(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                    f = T(a, t(e, d))
                }
                return f
            }, x.sortStable = N.split("").sort(V).join("") === N, x.detectDuplicates = U, F(), x.sortDetached = f(function(a) {
                return 1 & a.compareDocumentPosition(G.createElement("div"))
            }), f(function(a) {
                return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
            }) || g("type|href|height|width", function(a, c, d) {
                return d ? b : a.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2)
            }), x.attributes && f(function(a) {
                return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }) || g("value", function(a, c, d) {
                return d || "input" !== a.nodeName.toLowerCase() ? b : a.defaultValue
            }), f(function(a) {
                return null == a.getAttribute("disabled")
            }) || g(da, function(a, c, d) {
                var e;
                return d ? b : (e = a.getAttributeNode(c)) && e.specified ? e.value : a[c] === !0 ? c.toLowerCase() : null
            }), ka.find = c, ka.expr = c.selectors, ka.expr[":"] = ka.expr.pseudos, ka.unique = c.uniqueSort, ka.text = c.getText, ka.isXMLDoc = c.isXML, ka.contains = c.contains
        }(a);
    var za = {};
    ka.Callbacks = function(a) {
        a = "string" == typeof a ? za[a] || d(a) : ka.extend({}, a);
        var c, e, f, g, h, i, j = [],
            k = !a.once && [],
            l = function(b) {
                for (e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++)
                    if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                        e = !1;
                        break
                    }
                c = !1, j && (k ? k.length && l(k.shift()) : e ? j = [] : m.disable())
            },
            m = {
                add: function() {
                    if (j) {
                        var b = j.length;
                        ! function d(b) {
                            ka.each(b, function(b, c) {
                                var e = ka.type(c);
                                "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
                            })
                        }(arguments), c ? g = j.length : e && (i = b, l(e))
                    }
                    return this
                },
                remove: function() {
                    return j && ka.each(arguments, function(a, b) {
                        for (var d;
                            (d = ka.inArray(b, j, d)) > -1;) j.splice(d, 1), c && (g >= d && g--, h >= d && h--)
                    }), this
                },
                has: function(a) {
                    return a ? ka.inArray(a, j) > -1 : !(!j || !j.length)
                },
                empty: function() {
                    return j = [], g = 0, this
                },
                disable: function() {
                    return j = k = e = b, this
                },
                disabled: function() {
                    return !j
                },
                lock: function() {
                    return k = b, e || m.disable(), this
                },
                locked: function() {
                    return !k
                },
                fireWith: function(a, b) {
                    return !j || f && !k || (b = b || [], b = [a, b.slice ? b.slice() : b], c ? k.push(b) : l(b)), this
                },
                fire: function() {
                    return m.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!f
                }
            };
        return m
    }, ka.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", ka.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", ka.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", ka.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return ka.Deferred(function(c) {
                            ka.each(b, function(b, f) {
                                var g = f[0],
                                    h = ka.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = h && h.apply(this, arguments);
                                    a && ka.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? ka.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, ka.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b, c, d, e = 0,
                f = fa.call(arguments),
                g = f.length,
                h = 1 !== g || a && ka.isFunction(a.promise) ? g : 0,
                i = 1 === h ? a : ka.Deferred(),
                j = function(a, c, d) {
                    return function(e) {
                        c[a] = this, d[a] = arguments.length > 1 ? fa.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                    }
                };
            if (g > 1)
                for (b = Array(g), c = Array(g), d = Array(g); g > e; e++) f[e] && ka.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    }), ka.support = function(b) {
        var c, d, e, f, g, h, i, j, k, l = Y.createElement("div");
        if (l.setAttribute("className", "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = l.getElementsByTagName("*") || [], d = l.getElementsByTagName("a")[0], !d || !d.style || !c.length) return b;
        f = Y.createElement("select"), h = f.appendChild(Y.createElement("option")), e = l.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b.getSetAttribute = "t" !== l.className, b.leadingWhitespace = 3 === l.firstChild.nodeType, b.tbody = !l.getElementsByTagName("tbody").length, b.htmlSerialize = !!l.getElementsByTagName("link").length, b.style = /top/.test(d.getAttribute("style")), b.hrefNormalized = "/a" === d.getAttribute("href"), b.opacity = /^0.5/.test(d.style.opacity), b.cssFloat = !!d.style.cssFloat, b.checkOn = !!e.value, b.optSelected = h.selected, b.enctype = !!Y.createElement("form").enctype, b.html5Clone = "<:nav></:nav>" !== Y.createElement("nav").cloneNode(!0).outerHTML, b.inlineBlockNeedsLayout = !1, b.shrinkWrapBlocks = !1, b.pixelPosition = !1, b.deleteExpando = !0, b.noCloneEvent = !0, b.reliableMarginRight = !0, b.boxSizingReliable = !0, e.checked = !0, b.noCloneChecked = e.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete l.test
        } catch (m) {
            b.deleteExpando = !1
        }
        e = Y.createElement("input"), e.setAttribute("value", ""), b.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), b.radioValue = "t" === e.value, e.setAttribute("checked", "t"), e.setAttribute("name", "t"), g = Y.createDocumentFragment(), g.appendChild(e), b.appendChecked = e.checked, b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked, l.attachEvent && (l.attachEvent("onclick", function() {
            b.noCloneEvent = !1
        }), l.cloneNode(!0).click());
        for (k in {
                submit: !0,
                change: !0,
                focusin: !0
            }) l.setAttribute(i = "on" + k, "t"), b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1;
        l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = "content-box" === l.style.backgroundClip;
        for (k in ka(b)) break;
        return b.ownLast = "0" !== k, ka(function() {
            var c, d, e, f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                g = Y.getElementsByTagName("body")[0];
            g && (c = Y.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(c).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = l.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", j = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ka.swap(g, null != g.style.zoom ? {
                zoom: 1
            } : {}, function() {
                b.boxSizing = 4 === l.offsetWidth
            }), a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {
                width: "4px"
            }).width, d = l.appendChild(Y.createElement("div")), d.style.cssText = l.style.cssText = f, d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), typeof l.style.zoom !== W && (l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (g.style.zoom = 1)), g.removeChild(c), c = l = e = d = null)
        }), c = f = g = h = d = e = null, b
    }({});
    var Aa = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        Ba = /([A-Z])/g;
    ka.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? ka.cache[a[ka.expando]] : a[ka.expando], !!a && !h(a)
        },
        data: function(a, b, c) {
            return e(a, b, c)
        },
        removeData: function(a, b) {
            return f(a, b)
        },
        _data: function(a, b, c) {
            return e(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return f(a, b, !0)
        },
        acceptData: function(a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
            var b = a.nodeName && ka.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b
        }
    }), ka.fn.extend({
        data: function(a, c) {
            var d, e, f = null,
                h = 0,
                i = this[0];
            if (a === b) {
                if (this.length && (f = ka.data(i), 1 === i.nodeType && !ka._data(i, "parsedAttrs"))) {
                    for (d = i.attributes; d.length > h; h++) e = d[h].name, 0 === e.indexOf("data-") && (e = ka.camelCase(e.slice(5)), g(i, e, f[e]));
                    ka._data(i, "parsedAttrs", !0)
                }
                return f
            }
            return "object" == typeof a ? this.each(function() {
                ka.data(this, a)
            }) : arguments.length > 1 ? this.each(function() {
                ka.data(this, a, c)
            }) : i ? g(i, a, ka.data(i, a)) : null
        },
        removeData: function(a) {
            return this.each(function() {
                ka.removeData(this, a)
            })
        }
    }), ka.extend({
        queue: function(a, c, d) {
            var e;
            return a ? (c = (c || "fx") + "queue", e = ka._data(a, c), d && (!e || ka.isArray(d) ? e = ka._data(a, c, ka.makeArray(d)) : e.push(d)), e || []) : b
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = ka.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = ka._queueHooks(a, b),
                g = function() {
                    ka.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ka._data(a, c) || ka._data(a, c, {
                empty: ka.Callbacks("once memory").add(function() {
                    ka._removeData(a, b + "queue"), ka._removeData(a, c)
                })
            })
        }
    }), ka.fn.extend({
        queue: function(a, c) {
            var d = 2;
            return "string" != typeof a && (c = a, a = "fx", d--), d > arguments.length ? ka.queue(this[0], a) : c === b ? this : this.each(function() {
                var b = ka.queue(this, a, c);
                ka._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && ka.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                ka.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = ka.fx ? ka.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            var d, e = 1,
                f = ka.Deferred(),
                g = this,
                h = this.length,
                i = function() {
                    --e || f.resolveWith(g, [g])
                };
            for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;) d = ka._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
            return i(), f.promise(c)
        }
    });
    var Ca, Da, Ea = /[\t\r\n\f]/g,
        Fa = /\r/g,
        Ga = /^(?:input|select|textarea|button|object)$/i,
        Ha = /^(?:a|area)$/i,
        Ia = /^(?:checked|selected)$/i,
        Ja = ka.support.getSetAttribute,
        Ka = ka.support.input;
    ka.fn.extend({
        attr: function(a, b) {
            return ka.access(this, ka.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                ka.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return ka.access(this, ka.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = ka.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, f, g = 0,
                h = this.length,
                i = "string" == typeof a && a;
            if (ka.isFunction(a)) return this.each(function(b) {
                ka(this).addClass(a.call(this, b, this.className))
            });
            if (i)
                for (b = (a || "").match(ma) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ea, " ") : " ")) {
                        for (f = 0; e = b[f++];) 0 > d.indexOf(" " + e + " ") && (d += e + " ");
                        c.className = ka.trim(d)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g = 0,
                h = this.length,
                i = 0 === arguments.length || "string" == typeof a && a;
            if (ka.isFunction(a)) return this.each(function(b) {
                ka(this).removeClass(a.call(this, b, this.className))
            });
            if (i)
                for (b = (a || "").match(ma) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Ea, " ") : "")) {
                        for (f = 0; e = b[f++];)
                            for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                        c.className = a ? ka.trim(d) : ""
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : ka.isFunction(a) ? this.each(function(c) {
                ka(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if ("string" === c)
                    for (var b, d = 0, e = ka(this), f = a.match(ma) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else(c === W || "boolean" === c) && (this.className && ka._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ka._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Ea, " ").indexOf(b) >= 0) return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, f = this[0];
            return arguments.length ? (e = ka.isFunction(a), this.each(function(c) {
                var f;
                1 === this.nodeType && (f = e ? a.call(this, c, ka(this).val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : ka.isArray(f) && (f = ka.map(f, function(a) {
                    return null == a ? "" : a + ""
                })), d = ka.valHooks[this.type] || ka.valHooks[this.nodeName.toLowerCase()], d && "set" in d && d.set(this, f, "value") !== b || (this.value = f))
            })) : f ? (d = ka.valHooks[f.type] || ka.valHooks[f.nodeName.toLowerCase()], d && "get" in d && (c = d.get(f, "value")) !== b ? c : (c = f.value, "string" == typeof c ? c.replace(Fa, "") : null == c ? "" : c)) : void 0
        }
    }), ka.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = ka.find.attr(a, "value");
                    return null != b ? b : a.text
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (ka.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ka.nodeName(c.parentNode, "optgroup"))) {
                            if (b = ka(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = ka.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = ka.inArray(ka(d).val(), f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        },
        attr: function(a, c, d) {
            var e, f, g = a.nodeType;
            return a && 3 !== g && 8 !== g && 2 !== g ? typeof a.getAttribute === W ? ka.prop(a, c, d) : (1 === g && ka.isXMLDoc(a) || (c = c.toLowerCase(), e = ka.attrHooks[c] || (ka.expr.match.bool.test(c) ? Da : Ca)), d === b ? e && "get" in e && null !== (f = e.get(a, c)) ? f : (f = ka.find.attr(a, c), null == f ? b : f) : null !== d ? e && "set" in e && (f = e.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""), d) : (ka.removeAttr(a, c), b)) : void 0
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(ma);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];) d = ka.propFix[c] || c, ka.expr.match.bool.test(c) ? Ka && Ja || !Ia.test(c) ? a[d] = !1 : a[ka.camelCase("default-" + c)] = a[d] = !1 : ka.attr(a, c, ""), a.removeAttribute(Ja ? c : d)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!ka.support.radioValue && "radio" === b && ka.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            return a && 3 !== h && 8 !== h && 2 !== h ? (g = 1 !== h || !ka.isXMLDoc(a), g && (c = ka.propFix[c] || c, f = ka.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = ka.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : Ga.test(a.nodeName) || Ha.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }), Da = {
        set: function(a, b, c) {
            return b === !1 ? ka.removeAttr(a, c) : Ka && Ja || !Ia.test(c) ? a.setAttribute(!Ja && ka.propFix[c] || c, c) : a[ka.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, ka.each(ka.expr.match.bool.source.match(/\w+/g), function(a, c) {
        var d = ka.expr.attrHandle[c] || ka.find.attr;
        ka.expr.attrHandle[c] = Ka && Ja || !Ia.test(c) ? function(a, c, e) {
            var f = ka.expr.attrHandle[c],
                g = e ? b : (ka.expr.attrHandle[c] = b) != d(a, c, e) ? c.toLowerCase() : null;
            return ka.expr.attrHandle[c] = f, g
        } : function(a, c, d) {
            return d ? b : a[ka.camelCase("default-" + c)] ? c.toLowerCase() : null
        }
    }), Ka && Ja || (ka.attrHooks.value = {
        set: function(a, c, d) {
            return ka.nodeName(a, "input") ? (a.defaultValue = c, b) : Ca && Ca.set(a, c, d)
        }
    }), Ja || (Ca = {
        set: function(a, c, d) {
            var e = a.getAttributeNode(d);
            return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", "value" === d || c === a.getAttribute(d) ? c : b
        }
    }, ka.expr.attrHandle.id = ka.expr.attrHandle.name = ka.expr.attrHandle.coords = function(a, c, d) {
        var e;
        return d ? b : (e = a.getAttributeNode(c)) && "" !== e.value ? e.value : null
    }, ka.valHooks.button = {
        get: function(a, c) {
            var d = a.getAttributeNode(c);
            return d && d.specified ? d.value : b
        },
        set: Ca.set
    }, ka.attrHooks.contenteditable = {
        set: function(a, b, c) {
            Ca.set(a, "" === b ? !1 : b, c)
        }
    }, ka.each(["width", "height"], function(a, c) {
        ka.attrHooks[c] = {
            set: function(a, d) {
                return "" === d ? (a.setAttribute(c, "auto"), d) : b
            }
        }
    })), ka.support.hrefNormalized || ka.each(["href", "src"], function(a, b) {
        ka.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }), ka.support.style || (ka.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || b
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    }), ka.support.optSelected || (ka.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }), ka.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ka.propFix[this.toLowerCase()] = this
    }), ka.support.enctype || (ka.propFix.enctype = "encoding"), ka.each(["radio", "checkbox"], function() {
        ka.valHooks[this] = {
            set: function(a, c) {
                return ka.isArray(c) ? a.checked = ka.inArray(ka(a).val(), c) >= 0 : b
            }
        }, ka.support.checkOn || (ka.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var La = /^(?:input|select|textarea)$/i,
        Ma = /^key/,
        Na = /^(?:mouse|contextmenu)|click/,
        Oa = /^(?:focusinfocus|focusoutblur)$/,
        Pa = /^([^.]*)(?:\.(.+)|)$/;
    ka.event = {
        global: {},
        add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q, r = ka._data(a);
            if (r) {
                for (d.handler && (j = d, d = j.handler, f = j.selector), d.guid || (d.guid = ka.guid++), (h = r.events) || (h = r.events = {}), (l = r.handle) || (l = r.handle = function(a) {
                        return typeof ka === W || a && ka.event.triggered === a.type ? b : ka.event.dispatch.apply(l.elem, arguments)
                    }, l.elem = a), c = (c || "").match(ma) || [""], i = c.length; i--;) g = Pa.exec(c[i]) || [], o = q = g[1], p = (g[2] || "").split(".").sort(), o && (k = ka.event.special[o] || {}, o = (f ? k.delegateType : k.bindType) || o, k = ka.event.special[o] || {}, m = ka.extend({
                    type: o,
                    origType: q,
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && ka.expr.match.needsContext.test(f),
                    namespace: p.join(".")
                }, j), (n = h[o]) || (n = h[o] = [], n.delegateCount = 0, k.setup && k.setup.call(a, e, p, l) !== !1 || (a.addEventListener ? a.addEventListener(o, l, !1) : a.attachEvent && a.attachEvent("on" + o, l))), k.add && (k.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, m) : n.push(m), ka.event.global[o] = !0);
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ka.hasData(a) && ka._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(ma) || [""], j = b.length; j--;)
                    if (h = Pa.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = ka.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ka.removeEvent(a, n, q.handle), delete k[n])
                    } else
                        for (n in k) ka.event.remove(a, n + b[j], c, d, !0);
                ka.isEmptyObject(k) && (delete q.handle, ka._removeData(a, "events"))
            }
        },
        trigger: function(c, d, e, f) {
            var g, h, i, j, k, l, m, n = [e || Y],
                o = ia.call(c, "type") ? c.type : c,
                p = ia.call(c, "namespace") ? c.namespace.split(".") : [];
            if (i = l = e = e || Y, 3 !== e.nodeType && 8 !== e.nodeType && !Oa.test(o + ka.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), o = p.shift(), p.sort()), h = 0 > o.indexOf(":") && "on" + o, c = c[ka.expando] ? c : new ka.Event(o, "object" == typeof c && c), c.isTrigger = f ? 2 : 3, c.namespace = p.join("."), c.namespace_re = c.namespace ? RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = null == d ? [c] : ka.makeArray(d, [c]), k = ka.event.special[o] || {}, f || !k.trigger || k.trigger.apply(e, d) !== !1)) {
                if (!f && !k.noBubble && !ka.isWindow(e)) {
                    for (j = k.delegateType || o, Oa.test(j + o) || (i = i.parentNode); i; i = i.parentNode) n.push(i), l = i;
                    l === (e.ownerDocument || Y) && n.push(l.defaultView || l.parentWindow || a)
                }
                for (m = 0;
                    (i = n[m++]) && !c.isPropagationStopped();) c.type = m > 1 ? j : k.bindType || o, g = (ka._data(i, "events") || {})[c.type] && ka._data(i, "handle"), g && g.apply(i, d), g = h && i[h], g && ka.acceptData(i) && g.apply && g.apply(i, d) === !1 && c.preventDefault();
                if (c.type = o, !f && !c.isDefaultPrevented() && (!k._default || k._default.apply(n.pop(), d) === !1) && ka.acceptData(e) && h && e[o] && !ka.isWindow(e)) {
                    l = e[h], l && (e[h] = null), ka.event.triggered = o;
                    try {
                        e[o]()
                    } catch (q) {}
                    ka.event.triggered = b, l && (e[h] = l)
                }
                return c.result
            }
        },
        dispatch: function(a) {
            a = ka.event.fix(a);
            var c, d, e, f, g, h = [],
                i = fa.call(arguments),
                j = (ka._data(this, "events") || {})[a.type] || [],
                k = ka.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                for (h = ka.event.handlers.call(this, a, j), c = 0;
                    (f = h[c++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = f.elem, g = 0;
                        (e = f.handlers[g++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, d = ((ka.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), d !== b && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, c) {
            var d, e, f, g, h = [],
                i = c.delegateCount,
                j = a.target;
            if (i && j.nodeType && (!a.button || "click" !== a.type))
                for (; j != this; j = j.parentNode || this)
                    if (1 === j.nodeType && (j.disabled !== !0 || "click" !== a.type)) {
                        for (f = [], g = 0; i > g; g++) e = c[g], d = e.selector + " ", f[d] === b && (f[d] = e.needsContext ? ka(d, this).index(j) >= 0 : ka.find(d, this, null, [j]).length), f[d] && f.push(e);
                        f.length && h.push({
                            elem: j,
                            handlers: f
                        })
                    }
            return c.length > i && h.push({
                elem: this,
                handlers: c.slice(i)
            }), h
        },
        fix: function(a) {
            if (a[ka.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Na.test(e) ? this.mouseHooks : Ma.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ka.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || Y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, c) {
                var d, e, f, g = c.button,
                    h = c.fromElement;
                return null == a.pageX && null != c.clientX && (e = a.target.ownerDocument || Y, f = e.documentElement, d = e.body, a.pageX = c.clientX + (f && f.scrollLeft || d && d.scrollLeft || 0) - (f && f.clientLeft || d && d.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || d && d.scrollTop || 0) - (f && f.clientTop || d && d.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== k() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === k() && this.blur ? (this.blur(), !1) : b
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ka.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : b
                },
                _default: function(a) {
                    return ka.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    a.result !== b && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = ka.extend(new ka.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? ka.event.trigger(e, null, b) : ka.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, ka.removeEvent = Y.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === W && (a[d] = null), a.detachEvent(d, c))
    }, ka.Event = function(a, c) {
        return this instanceof ka.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? i : j) : this.type = a, c && ka.extend(this, c), this.timeStamp = a && a.timeStamp || ka.now(), this[ka.expando] = !0, b) : new ka.Event(a, c)
    }, ka.Event.prototype = {
        isDefaultPrevented: j,
        isPropagationStopped: j,
        isImmediatePropagationStopped: j,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = i, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = i, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = i, this.stopPropagation()
        }
    }, ka.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        ka.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !ka.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), ka.support.submitBubbles || (ka.event.special.submit = {
        setup: function() {
            return ka.nodeName(this, "form") ? !1 : (ka.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target,
                    d = ka.nodeName(c, "input") || ka.nodeName(c, "button") ? c.form : b;
                d && !ka._data(d, "submitBubbles") && (ka.event.add(d, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }), ka._data(d, "submitBubbles", !0))
            }), b)
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ka.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return ka.nodeName(this, "form") ? !1 : (ka.event.remove(this, "._submit"), b)
        }
    }), ka.support.changeBubbles || (ka.event.special.change = {
        setup: function() {
            return La.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ka.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), ka.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), ka.event.simulate("change", this, a, !0)
            })), !1) : (ka.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                La.test(b.nodeName) && !ka._data(b, "changeBubbles") && (ka.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || ka.event.simulate("change", this.parentNode, a, !0)
                }), ka._data(b, "changeBubbles", !0))
            }), b)
        },
        handle: function(a) {
            var c = a.target;
            return this !== c || a.isSimulated || a.isTrigger || "radio" !== c.type && "checkbox" !== c.type ? a.handleObj.handler.apply(this, arguments) : b
        },
        teardown: function() {
            return ka.event.remove(this, "._change"), !La.test(this.nodeName)
        }
    }), ka.support.focusinBubbles || ka.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = 0,
            d = function(a) {
                ka.event.simulate(b, a.target, ka.event.fix(a), !0)
            };
        ka.event.special[b] = {
            setup: function() {
                0 === c++ && Y.addEventListener(a, d, !0)
            },
            teardown: function() {
                0 === --c && Y.removeEventListener(a, d, !0)
            }
        }
    }), ka.fn.extend({
        on: function(a, c, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof c && (d = d || c, c = b);
                for (g in a) this.on(g, c, d, a[g], f);
                return this
            }
            if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1) e = j;
            else if (!e) return this;
            return 1 === f && (h = e, e = function(a) {
                return ka().off(a), h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = ka.guid++)), this.each(function() {
                ka.event.add(this, a, e, d, c)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, c, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj) return e = a.handleObj, ka(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (f in a) this.off(f, c, a[f]);
                return this
            }
            return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = j), this.each(function() {
                ka.event.remove(this, a, d, c)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                ka.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, c) {
            var d = this[0];
            return d ? ka.event.trigger(a, c, d, !0) : b
        }
    });
    var Qa = /^.[^:#\[\.,]*$/,
        Ra = /^(?:parents|prev(?:Until|All))/,
        Sa = ka.expr.match.needsContext,
        Ta = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ka.fn.extend({
        find: function(a) {
            var b, c = [],
                d = this,
                e = d.length;
            if ("string" != typeof a) return this.pushStack(ka(a).filter(function() {
                for (b = 0; e > b; b++)
                    if (ka.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) ka.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? ka.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        },
        has: function(a) {
            var b, c = ka(a, this),
                d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (ka.contains(this, c[b])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(m(this, a || [], !0))
        },
        filter: function(a) {
            return this.pushStack(m(this, a || [], !1))
        },
        is: function(a) {
            return !!m(this, "string" == typeof a && Sa.test(a) ? ka(a) : a || [], !1).length
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = Sa.test(a) || "string" != typeof a ? ka(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (11 > c.nodeType && (g ? g.index(c) > -1 : 1 === c.nodeType && ka.find.matchesSelector(c, a))) {
                        c = f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? ka.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? ka.inArray(this[0], ka(a)) : ka.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            var c = "string" == typeof a ? ka(a, b) : ka.makeArray(a && a.nodeType ? [a] : a),
                d = ka.merge(this.get(), c);
            return this.pushStack(ka.unique(d))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), ka.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return ka.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return ka.dir(a, "parentNode", c)
        },
        next: function(a) {
            return l(a, "nextSibling")
        },
        prev: function(a) {
            return l(a, "previousSibling")
        },
        nextAll: function(a) {
            return ka.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return ka.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return ka.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return ka.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return ka.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return ka.sibling(a.firstChild)
        },
        contents: function(a) {
            return ka.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ka.merge([], a.childNodes)
        }
    }, function(a, b) {
        ka.fn[a] = function(c, d) {
            var e = ka.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ka.filter(d, e)), this.length > 1 && (Ta[a] || (e = ka.unique(e)), Ra.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    }), ka.extend({
        filter: function(a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ka.find.matchesSelector(d, a) ? [d] : [] : ka.find.matches(a, ka.grep(b, function(a) {
                return 1 === a.nodeType
            }))
        },
        dir: function(a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !ka(f).is(d));) 1 === f.nodeType && e.push(f), f = f[c];
            return e
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var Ua = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Va = / jQuery\d+="(?:null|\d+)"/g,
        Wa = RegExp("<(?:" + Ua + ")[\\s/>]", "i"),
        Xa = /^\s+/,
        Ya = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Za = /<([\w:]+)/,
        $a = /<tbody/i,
        _a = /<|&#?\w+;/,
        ab = /<(?:script|style|link)/i,
        bb = /^(?:checkbox|radio)$/i,
        cb = /checked\s*(?:[^=]|=\s*.checked.)/i,
        db = /^$|\/(?:java|ecma)script/i,
        eb = /^true\/(.*)/,
        fb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        gb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ka.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        hb = n(Y),
        ib = hb.appendChild(Y.createElement("div"));
    gb.optgroup = gb.option, gb.tbody = gb.tfoot = gb.colgroup = gb.caption = gb.thead, gb.th = gb.td, ka.fn.extend({
        text: function(a) {
            return ka.access(this, function(a) {
                return a === b ? ka.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Y).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = o(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = o(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? ka.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || ka.cleanData(u(c)), c.parentNode && (b && ka.contains(c.ownerDocument, c) && r(u(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && ka.cleanData(u(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                a.options && ka.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return ka.clone(this, a, b)
            })
        },
        html: function(a) {
            return ka.access(this, function(a) {
                var c = this[0] || {},
                    d = 0,
                    e = this.length;
                if (a === b) return 1 === c.nodeType ? c.innerHTML.replace(Va, "") : b;
                if (!("string" != typeof a || ab.test(a) || !ka.support.htmlSerialize && Wa.test(a) || !ka.support.leadingWhitespace && Xa.test(a) || gb[(Za.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Ya, "<$1></$2>");
                    try {
                        for (; e > d; d++) c = this[d] || {}, 1 === c.nodeType && (ka.cleanData(u(c, !1)), c.innerHTML = a);
                        c = 0
                    } catch (f) {}
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = ka.map(this, function(a) {
                    return [a.nextSibling, a.parentNode]
                }),
                b = 0;
            return this.domManip(arguments, function(c) {
                var d = a[b++],
                    e = a[b++];
                e && (d && d.parentNode !== e && (d = this.nextSibling), ka(this).remove(), e.insertBefore(c, d))
            }, !0), b ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b, c) {
            a = da.apply([], a);
            var d, e, f, g, h, i, j = 0,
                k = this.length,
                l = this,
                m = k - 1,
                n = a[0],
                o = ka.isFunction(n);
            if (o || !(1 >= k || "string" != typeof n || ka.support.checkClone) && cb.test(n)) return this.each(function(d) {
                var e = l.eq(d);
                o && (a[0] = n.call(this, d, e.html())), e.domManip(a, b, c)
            });
            if (k && (i = ka.buildFragment(a, this[0].ownerDocument, !1, !c && this), d = i.firstChild, 1 === i.childNodes.length && (i = d), d)) {
                for (g = ka.map(u(i, "script"), p), f = g.length; k > j; j++) e = i, j !== m && (e = ka.clone(e, !0, !0), f && ka.merge(g, u(e, "script"))), b.call(this[j], e, j);
                if (f)
                    for (h = g[g.length - 1].ownerDocument, ka.map(g, q), j = 0; f > j; j++) e = g[j], db.test(e.type || "") && !ka._data(e, "globalEval") && ka.contains(h, e) && (e.src ? ka._evalUrl(e.src) : ka.globalEval((e.text || e.textContent || e.innerHTML || "").replace(fb, "")));
                i = d = null
            }
            return this
        }
    }), ka.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        ka.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = ka(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), ka(f[d])[b](c), ea.apply(e, c.get());
            return this.pushStack(e)
        }
    }), ka.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = ka.contains(a.ownerDocument, a);
            if (ka.support.html5Clone || ka.isXMLDoc(a) || !Wa.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ib.innerHTML = a.outerHTML, ib.removeChild(f = ib.firstChild)), !(ka.support.noCloneEvent && ka.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ka.isXMLDoc(a)))
                for (d = u(f), h = u(a), g = 0; null != (e = h[g]); ++g) d[g] && t(e, d[g]);
            if (b)
                if (c)
                    for (h = h || u(a), d = d || u(f), g = 0; null != (e = h[g]); g++) s(e, d[g]);
                else s(a, f);
            return d = u(f, "script"), d.length > 0 && r(d, !i && u(a, "script")), d = h = e = null, f
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, m = n(b), o = [], p = 0; l > p; p++)
                if (f = a[p], f || 0 === f)
                    if ("object" === ka.type(f)) ka.merge(o, f.nodeType ? [f] : f);
                    else if (_a.test(f)) {
                for (h = h || m.appendChild(b.createElement("div")), i = (Za.exec(f) || ["", ""])[1].toLowerCase(), k = gb[i] || gb._default, h.innerHTML = k[1] + f.replace(Ya, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild;
                if (!ka.support.leadingWhitespace && Xa.test(f) && o.push(b.createTextNode(Xa.exec(f)[0])), !ka.support.tbody)
                    for (f = "table" !== i || $a.test(f) ? "<table>" !== k[1] || $a.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;) ka.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                for (ka.merge(o, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                h = m.lastChild
            } else o.push(b.createTextNode(f));
            for (h && m.removeChild(h), ka.support.appendChecked || ka.grep(u(o, "input"), v), p = 0; f = o[p++];)
                if ((!d || -1 === ka.inArray(f, d)) && (g = ka.contains(f.ownerDocument, f), h = u(m.appendChild(f), "script"), g && r(h), c))
                    for (e = 0; f = h[e++];) db.test(f.type || "") && c.push(f);
            return h = null, m
        },
        cleanData: function(a, b) {
            for (var c, d, e, f, g = 0, h = ka.expando, i = ka.cache, j = ka.support.deleteExpando, k = ka.event.special; null != (c = a[g]); g++)
                if ((b || ka.acceptData(c)) && (e = c[h], f = e && i[e])) {
                    if (f.events)
                        for (d in f.events) k[d] ? ka.event.remove(c, d) : ka.removeEvent(c, d, f.handle);
                    i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== W ? c.removeAttribute(h) : c[h] = null, ba.push(e))
                }
        },
        _evalUrl: function(a) {
            return ka.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }), ka.fn.extend({
        wrapAll: function(a) {
            if (ka.isFunction(a)) return this.each(function(b) {
                ka(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = ka(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return ka.isFunction(a) ? this.each(function(b) {
                ka(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = ka(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = ka.isFunction(a);
            return this.each(function(c) {
                ka(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ka.nodeName(this, "body") || ka(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var jb, kb, lb, mb = /alpha\([^)]*\)/i,
        nb = /opacity\s*=\s*([^)]*)/,
        ob = /^(top|right|bottom|left)$/,
        pb = /^(none|table(?!-c[ea]).+)/,
        qb = /^margin/,
        rb = RegExp("^(" + la + ")(.*)$", "i"),
        sb = RegExp("^(" + la + ")(?!px)[a-z%]+$", "i"),
        tb = RegExp("^([+-])=(" + la + ")", "i"),
        ub = {
            BODY: "block"
        },
        vb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        wb = {
            letterSpacing: 0,
            fontWeight: 400
        },
        xb = ["Top", "Right", "Bottom", "Left"],
        yb = ["Webkit", "O", "Moz", "ms"];
    ka.fn.extend({
        css: function(a, c) {
            return ka.access(this, function(a, c, d) {
                var e, f, g = {},
                    h = 0;
                if (ka.isArray(c)) {
                    for (f = kb(a), e = c.length; e > h; h++) g[c[h]] = ka.css(a, c[h], !1, f);
                    return g
                }
                return d !== b ? ka.style(a, c, d) : ka.css(a, c)
            }, a, c, arguments.length > 1)
        },
        show: function() {
            return y(this, !0)
        },
        hide: function() {
            return y(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                x(this) ? ka(this).show() : ka(this).hide()
            })
        }
    }), ka.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = lb(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ka.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, i = ka.camelCase(c),
                    j = a.style;
                if (c = ka.cssProps[i] || (ka.cssProps[i] = w(j, i)), h = ka.cssHooks[c] || ka.cssHooks[i], d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                if (g = typeof d, "string" === g && (f = tb.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(ka.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || ka.cssNumber[i] || (d += "px"), ka.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), h && "set" in h && (d = h.set(a, d, e)) === b))) try {
                    j[c] = d
                } catch (k) {}
            }
        },
        css: function(a, c, d, e) {
            var f, g, h, i = ka.camelCase(c);
            return c = ka.cssProps[i] || (ka.cssProps[i] = w(a.style, i)), h = ka.cssHooks[c] || ka.cssHooks[i], h && "get" in h && (g = h.get(a, !0, d)), g === b && (g = lb(a, c, e)), "normal" === g && c in wb && (g = wb[c]), "" === d || d ? (f = parseFloat(g), d === !0 || ka.isNumeric(f) ? f || 0 : g) : g
        }
    }), a.getComputedStyle ? (kb = function(b) {
        return a.getComputedStyle(b, null)
    }, lb = function(a, c, d) {
        var e, f, g, h = d || kb(a),
            i = h ? h.getPropertyValue(c) || h[c] : b,
            j = a.style;
        return h && ("" !== i || ka.contains(a.ownerDocument, a) || (i = ka.style(a, c)), sb.test(i) && qb.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i
    }) : Y.documentElement.currentStyle && (kb = function(a) {
        return a.currentStyle
    }, lb = function(a, c, d) {
        var e, f, g, h = d || kb(a),
            i = h ? h[c] : b,
            j = a.style;
        return null == i && j && j[c] && (i = j[c]), sb.test(i) && !ob.test(c) && (e = j.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = "fontSize" === c ? "1em" : i, i = j.pixelLeft + "px", j.left = e, g && (f.left = g)), "" === i ? "auto" : i
    }), ka.each(["height", "width"], function(a, c) {
        ka.cssHooks[c] = {
            get: function(a, d, e) {
                return d ? 0 === a.offsetWidth && pb.test(ka.css(a, "display")) ? ka.swap(a, vb, function() {
                    return B(a, c, e)
                }) : B(a, c, e) : b
            },
            set: function(a, b, d) {
                var e = d && kb(a);
                return z(a, b, d ? A(a, c, d, ka.support.boxSizing && "border-box" === ka.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), ka.support.opacity || (ka.cssHooks.opacity = {
        get: function(a, b) {
            return nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = ka.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === ka.trim(f.replace(mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = mb.test(f) ? f.replace(mb, e) : f + " " + e)
        }
    }), ka(function() {
        ka.support.reliableMarginRight || (ka.cssHooks.marginRight = {
            get: function(a, c) {
                return c ? ka.swap(a, {
                    display: "inline-block"
                }, lb, [a, "marginRight"]) : b
            }
        }), !ka.support.pixelPosition && ka.fn.position && ka.each(["top", "left"], function(a, c) {
            ka.cssHooks[c] = {
                get: function(a, d) {
                    return d ? (d = lb(a, c), sb.test(d) ? ka(a).position()[c] + "px" : d) : b
                }
            }
        })
    }), ka.expr && ka.expr.filters && (ka.expr.filters.hidden = function(a) {
        return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !ka.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || ka.css(a, "display"))
    }, ka.expr.filters.visible = function(a) {
        return !ka.expr.filters.hidden(a)
    }), ka.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        ka.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + xb[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, qb.test(a) || (ka.cssHooks[a + b].set = z)
    });
    var zb = /%20/g,
        Ab = /\[\]$/,
        Bb = /\r?\n/g,
        Cb = /^(?:submit|button|image|reset|file)$/i,
        Db = /^(?:input|select|textarea|keygen)/i;
    ka.fn.extend({
        serialize: function() {
            return ka.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = ka.prop(this, "elements");
                return a ? ka.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !ka(this).is(":disabled") && Db.test(this.nodeName) && !Cb.test(a) && (this.checked || !bb.test(a))
            }).map(function(a, b) {
                var c = ka(this).val();
                return null == c ? null : ka.isArray(c) ? ka.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Bb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Bb, "\r\n")
                }
            }).get()
        }
    }), ka.param = function(a, c) {
        var d, e = [],
            f = function(a, b) {
                b = ka.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (c === b && (c = ka.ajaxSettings && ka.ajaxSettings.traditional), ka.isArray(a) || a.jquery && !ka.isPlainObject(a)) ka.each(a, function() {
            f(this.name, this.value)
        });
        else
            for (d in a) E(d, a[d], c, f);
        return e.join("&").replace(zb, "+")
    }, ka.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        ka.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), ka.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var Eb, Fb, Gb = ka.now(),
        Hb = /\?/,
        Ib = /#.*$/,
        Jb = /([?&])_=[^&]*/,
        Kb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Lb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Mb = /^(?:GET|HEAD)$/,
        Nb = /^\/\//,
        Ob = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Pb = ka.fn.load,
        Qb = {},
        Rb = {},
        Sb = "*/".concat("*");
    try {
        Fb = X.href
    } catch (Tb) {
        Fb = Y.createElement("a"), Fb.href = "", Fb = Fb.href
    }
    Eb = Ob.exec(Fb.toLowerCase()) || [], ka.fn.load = function(a, c, d) {
        if ("string" != typeof a && Pb) return Pb.apply(this, arguments);
        var e, f, g, h = this,
            i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), ka.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (g = "POST"), h.length > 0 && ka.ajax({
            url: a,
            type: g,
            dataType: "html",
            data: c
        }).done(function(a) {
            f = arguments, h.html(e ? ka("<div>").append(ka.parseHTML(a)).find(e) : a)
        }).complete(d && function(a, b) {
            h.each(d, f || [a.responseText, b, a])
        }), this
    }, ka.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        ka.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), ka.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Fb,
            type: "GET",
            isLocal: Lb.test(Eb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ka.parseJSON,
                "text xml": ka.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? H(H(a, ka.ajaxSettings), b) : H(ka.ajaxSettings, a)
        },
        ajaxPrefilter: F(Qb),
        ajaxTransport: F(Rb),
        ajax: function(a, c) {
            function d(a, c, d, e) {
                var f, l, s, t, v, x = c;
                2 !== u && (u = 2, i && clearTimeout(i), k = b, h = e || "", w.readyState = a > 0 ? 4 : 0, f = a >= 200 && 300 > a || 304 === a, d && (t = I(m, w, d)), t = J(m, t, w, f), f ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (ka.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (ka.etag[g] = v)), 204 === a || "HEAD" === m.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = t.state, l = t.data, s = t.error, f = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]), q.fireWith(n, [w, x]), j && (o.trigger("ajaxComplete", [w, m]), --ka.active || ka.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (c = a, a = b), c = c || {};
            var e, f, g, h, i, j, k, l, m = ka.ajaxSetup({}, c),
                n = m.context || m,
                o = m.context && (n.nodeType || n.jquery) ? ka(n) : ka.event,
                p = ka.Deferred(),
                q = ka.Callbacks("once memory"),
                r = m.statusCode || {},
                s = {},
                t = {},
                u = 0,
                v = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === u) {
                            if (!l)
                                for (l = {}; b = Kb.exec(h);) l[b[1].toLowerCase()] = b[2];
                            b = l[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === u ? h : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return u || (a = t[c] = t[c] || a, s[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return u || (m.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > u)
                                for (b in a) r[b] = [r[b], a[b]];
                            else w.always(a[w.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || v;
                        return k && k.abort(b), d(0, b), this
                    }
                };
            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || Fb) + "").replace(Ib, "").replace(Nb, Eb[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = ka.trim(m.dataType || "*").toLowerCase().match(ma) || [""], null == m.crossDomain && (e = Ob.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === Eb[1] && e[2] === Eb[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (Eb[3] || ("http:" === Eb[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = ka.param(m.data, m.traditional)), G(Qb, m, c, w), 2 === u) return w;
            j = m.global, j && 0 === ka.active++ && ka.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Mb.test(m.type), g = m.url, m.hasContent || (m.data && (g = m.url += (Hb.test(g) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = Jb.test(g) ? g.replace(Jb, "$1_=" + Gb++) : g + (Hb.test(g) ? "&" : "?") + "_=" + Gb++)), m.ifModified && (ka.lastModified[g] && w.setRequestHeader("If-Modified-Since", ka.lastModified[g]), ka.etag[g] && w.setRequestHeader("If-None-Match", ka.etag[g])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Sb + "; q=0.01" : "") : m.accepts["*"]);
            for (f in m.headers) w.setRequestHeader(f, m.headers[f]);
            if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u)) return w.abort();
            v = "abort";
            for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[f](m[f]);
            if (k = G(Rb, m, c, w)) {
                w.readyState = 1, j && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function() {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    u = 1, k.send(s, d)
                } catch (x) {
                    if (!(2 > u)) throw x;
                    d(-1, x)
                }
            } else d(-1, "No Transport");
            return w
        },
        getJSON: function(a, b, c) {
            return ka.get(a, b, c, "json")
        },
        getScript: function(a, c) {
            return ka.get(a, b, c, "script")
        }
    }), ka.each(["get", "post"], function(a, c) {
        ka[c] = function(a, d, e, f) {
            return ka.isFunction(d) && (f = f || e, e = d, d = b), ka.ajax({
                url: a,
                type: c,
                dataType: f,
                data: d,
                success: e
            })
        }
    }), ka.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return ka.globalEval(a), a
            }
        }
    }), ka.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), ka.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, d = Y.head || ka("head")[0] || Y.documentElement;
            return {
                send: function(b, e) {
                    c = Y.createElement("script"), c.async = !0, a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function(a, b) {
                        (b || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success"))
                    }, d.insertBefore(c, d.firstChild)
                },
                abort: function() {
                    c && c.onload(b, !0)
                }
            }
        }
    });
    var Ub = [],
        Vb = /(=)\?(?=&|$)|\?\?/;
    ka.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Ub.pop() || ka.expando + "_" + Gb++;
            return this[a] = !0, a
        }
    }), ka.ajaxPrefilter("json jsonp", function(c, d, e) {
        var f, g, h, i = c.jsonp !== !1 && (Vb.test(c.url) ? "url" : "string" == typeof c.data && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Vb.test(c.data) && "data");
        return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = ka.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(Vb, "$1" + f) : c.jsonp !== !1 && (c.url += (Hb.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function() {
            return h || ka.error(f + " was not called"), h[0]
        }, c.dataTypes[0] = "json", g = a[f], a[f] = function() {
            h = arguments
        }, e.always(function() {
            a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Ub.push(f)), h && ka.isFunction(g) && g(h[0]), h = g = b
        }), "script") : b
    });
    var Wb, Xb, Yb = 0,
        Zb = a.ActiveXObject && function() {
            var a;
            for (a in Wb) Wb[a](b, !0)
        };
    ka.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && K() || L()
    } : K, Xb = ka.ajaxSettings.xhr(), ka.support.cors = !!Xb && "withCredentials" in Xb, Xb = ka.support.ajax = !!Xb, Xb && ka.ajaxTransport(function(c) {
        if (!c.crossDomain || ka.support.cors) {
            var d;
            return {
                send: function(e, f) {
                    var g, h, i = c.xhr();
                    if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields)
                        for (h in c.xhrFields) i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e) i.setRequestHeader(h, e[h])
                    } catch (j) {}
                    i.send(c.hasContent && c.data || null), d = function(a, e) {
                        var h, j, k, l;
                        try {
                            if (d && (e || 4 === i.readyState))
                                if (d = b, g && (i.onreadystatechange = ka.noop, Zb && delete Wb[g]), e) 4 !== i.readyState && i.abort();
                                else {
                                    l = {}, h = i.status, j = i.getAllResponseHeaders(), "string" == typeof i.responseText && (l.text = i.responseText);
                                    try {
                                        k = i.statusText
                                    } catch (m) {
                                        k = ""
                                    }
                                    h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                                }
                        } catch (n) {
                            e || f(-1, n)
                        }
                        l && f(h, k, l, j)
                    }, c.async ? 4 === i.readyState ? setTimeout(d) : (g = ++Yb, Zb && (Wb || (Wb = {}, ka(a).unload(Zb)), Wb[g] = d), i.onreadystatechange = d) : d()
                },
                abort: function() {
                    d && d(b, !0)
                }
            }
        }
    });
    var $b, _b, ac = /^(?:toggle|show|hide)$/,
        bc = RegExp("^(?:([+-])=|)(" + la + ")([a-z%]*)$", "i"),
        cc = /queueHooks$/,
        dc = [Q],
        ec = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = bc.exec(b),
                    f = e && e[3] || (ka.cssNumber[a] ? "" : "px"),
                    g = (ka.cssNumber[a] || "px" !== f && +d) && bc.exec(ka.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, ka.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };
    ka.Animation = ka.extend(O, {
        tweener: function(a, b) {
            ka.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? dc.unshift(a) : dc.push(a)
        }
    }), ka.Tween = R, R.prototype = {
        constructor: R,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ka.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = R.propHooks[this.prop];
            return a && a.get ? a.get(this) : R.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = R.propHooks[this.prop];
            return this.pos = b = this.options.duration ? ka.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : R.propHooks._default.set(this), this
        }
    }, R.prototype.init.prototype = R.prototype, R.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = ka.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                ka.fx.step[a.prop] ? ka.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ka.cssProps[a.prop]] || ka.cssHooks[a.prop]) ? ka.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, ka.each(["toggle", "show", "hide"], function(a, b) {
        var c = ka.fn[b];
        ka.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(S(b, !0), a, d, e)
        }
    }), ka.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(x).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = ka.isEmptyObject(a),
                f = ka.speed(b, c, d),
                g = function() {
                    var b = O(this, ka.extend({}, a), f);
                    (e || ka._data(this, "finish")) && b.stop(!0)
                };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, c, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop, b(d)
            };
            return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                var b = !0,
                    c = null != a && a + "queueHooks",
                    f = ka.timers,
                    g = ka._data(this);
                if (c) g[c] && g[c].stop && e(g[c]);
                else
                    for (c in g) g[c] && g[c].stop && cc.test(c) && e(g[c]);
                for (c = f.length; c--;) f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                (b || !d) && ka.dequeue(this, a)
            })
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"), this.each(function() {
                var b, c = ka._data(this),
                    d = c[a + "queue"],
                    e = c[a + "queueHooks"],
                    f = ka.timers,
                    g = d ? d.length : 0;
                for (c.finish = !0, ka.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), ka.each({
        slideDown: S("show"),
        slideUp: S("hide"),
        slideToggle: S("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        ka.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), ka.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? ka.extend({}, a) : {
            complete: c || !c && b || ka.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !ka.isFunction(b) && b
        };
        return d.duration = ka.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ka.fx.speeds ? ka.fx.speeds[d.duration] : ka.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            ka.isFunction(d.old) && d.old.call(this), d.queue && ka.dequeue(this, d.queue)
        }, d
    }, ka.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, ka.timers = [], ka.fx = R.prototype.init, ka.fx.tick = function() {
        var a, c = ka.timers,
            d = 0;
        for ($b = ka.now(); c.length > d; d++) a = c[d], a() || c[d] !== a || c.splice(d--, 1);
        c.length || ka.fx.stop(), $b = b
    }, ka.fx.timer = function(a) {
        a() && ka.timers.push(a) && ka.fx.start()
    }, ka.fx.interval = 13, ka.fx.start = function() {
        _b || (_b = setInterval(ka.fx.tick, ka.fx.interval))
    }, ka.fx.stop = function() {
        clearInterval(_b), _b = null
    }, ka.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ka.fx.step = {}, ka.expr && ka.expr.filters && (ka.expr.filters.animated = function(a) {
        return ka.grep(ka.timers, function(b) {
            return a === b.elem
        }).length
    }), ka.fn.offset = function(a) {
        if (arguments.length) return a === b ? this : this.each(function(b) {
            ka.offset.setOffset(this, a, b)
        });
        var c, d, e = {
                top: 0,
                left: 0
            },
            f = this[0],
            g = f && f.ownerDocument;
        return g ? (c = g.documentElement, ka.contains(c, f) ? (typeof f.getBoundingClientRect !== W && (e = f.getBoundingClientRect()), d = T(g), {
            top: e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
            left: e.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
        }) : e) : void 0
    }, ka.offset = {
        setOffset: function(a, b, c) {
            var d = ka.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var e, f, g = ka(a),
                h = g.offset(),
                i = ka.css(a, "top"),
                j = ka.css(a, "left"),
                k = ("absolute" === d || "fixed" === d) && ka.inArray("auto", [i, j]) > -1,
                l = {},
                m = {};
            k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), ka.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using" in b ? b.using.call(a, l) : g.css(l)
        }
    }, ka.fn.extend({
        position: function() {
            if (this[0]) {
                var a, b, c = {
                        top: 0,
                        left: 0
                    },
                    d = this[0];
                return "fixed" === ka.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ka.nodeName(a[0], "html") || (c = a.offset()), c.top += ka.css(a[0], "borderTopWidth", !0), c.left += ka.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - ka.css(d, "marginTop", !0),
                    left: b.left - c.left - ka.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || Z; a && !ka.nodeName(a, "html") && "static" === ka.css(a, "position");) a = a.offsetParent;
                return a || Z
            })
        }
    }), ka.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var d = /Y/.test(c);
        ka.fn[a] = function(e) {
            return ka.access(this, function(a, e, f) {
                var g = T(a);
                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? ka(g).scrollLeft() : f, d ? f : ka(g).scrollTop()) : a[e] = f, b)
            }, a, e, arguments.length, null)
        }
    }), ka.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        ka.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        }, function(d, e) {
            ka.fn[e] = function(e, f) {
                var g = arguments.length && (d || "boolean" != typeof e),
                    h = d || (e === !0 || f === !0 ? "margin" : "border");
                return ka.access(this, function(c, d, e) {
                    var f;
                    return ka.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? ka.css(c, d, h) : ka.style(c, d, e, h)
                }, c, g ? e : b, g, null)
            }
        })
    }), ka.fn.size = function() {
        return this.length
    }, ka.fn.andSelf = ka.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ka : (a.jQuery = a.$ = ka, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ka
    }))
}(window), MediaPlayer = function(a) {
    "use strict";
    var b, c, d, e, f, g = "1.2.0",
        h = a,
        i = !1,
        j = !1,
        k = !0,
        l = !1,
        m = MediaPlayer.dependencies.BufferExtensions.BUFFER_SIZE_REQUIRED,
        n = function() {
            return !!c && !!d
        },
        o = function() {
            if (!i) throw "MediaPlayer not initialized!";
            if (!this.capabilities.supportsMediaSource()) return void this.errHandler.capabilityError("mediasource");
            if (!c || !d) throw "Missing view or source.";
            j = !0, e = b.getObject("streamController"), e.setVideoModel(f), e.setAutoPlay(k), e.load(d), b.mapValue("scheduleWhilePaused", l), b.mapOutlet("scheduleWhilePaused", "stream"), b.mapOutlet("scheduleWhilePaused", "bufferController"), b.mapValue("bufferMax", m), b.injectInto(this.bufferExt, "bufferMax")
        },
        p = function() {
            n() && o.call(this)
        },
        q = function() {
            var a = this.metricsModel.getReadOnlyMetricsFor("video") || this.metricsModel.getReadOnlyMetricsFor("audio");
            return this.metricsExt.getCurrentDVRInfo(a)
        },
        r = function() {
            return q.call(this).mpd.timeShiftBufferDepth
        },
        s = function(a) {
            var b = q.call(this),
                c = b.range.start + parseInt(a);
            return c > b.range.end && (c = b.range.end), c
        },
        t = function(a) {
            f.getElement().currentTime = this.getDVRSeekOffset(a)
        },
        u = function() {
            var a = q.call(this);
            return null === a ? 0 : Math.round(this.duration() - (a.range.end - a.time))
        },
        v = function() {
            var a, b = q.call(this);
            return null === b ? 0 : (a = b.range.end - b.range.start, Math.round(a < b.mpd.timeShiftBufferDepth ? a : b.mpd.timeShiftBufferDepth))
        },
        w = function() {
            var a, b, c = q.call(this);
            return null === c ? 0 : (a = c.mpd.availabilityStartTime.getTime() / 1e3, b = this.time() + (a + c.range.start), Math.round(b))
        },
        x = function() {
            var a, b, c = q.call(this);
            return null === c ? 0 : (a = c.mpd.availabilityStartTime.getTime() / 1e3, b = a + c.range.start + this.duration(), Math.round(b))
        },
        y = function(a, b, c) {
            var d = new Date(1e3 * a),
                e = d.toLocaleDateString(b),
                f = d.toLocaleTimeString(b, {
                    hour12: c
                });
            return f + " " + e
        },
        z = function(a) {
            a = Math.max(a, 0);
            var b = Math.floor(a / 3600),
                c = Math.floor(a % 3600 / 60),
                d = Math.floor(a % 3600 % 60);
            return (0 === b ? "" : 10 > b ? "0" + b.toString() + ":" : b.toString() + ":") + (10 > c ? "0" + c.toString() : c.toString()) + ":" + (10 > d ? "0" + d.toString() : d.toString())
        };
    return b = new dijon.System, b.mapValue("system", b), b.mapOutlet("system"), b.injectInto(h), {
        debug: void 0,
        eventBus: void 0,
        capabilities: void 0,
        abrController: void 0,
        metricsModel: void 0,
        metricsExt: void 0,
        bufferExt: void 0,
        errHandler: void 0,
        tokenAuthentication: void 0,
        uriQueryFragModel: void 0,
        addEventListener: function(a, b, c) {
            this.eventBus.addEventListener(a, b, c)
        },
        removeEventListener: function(a, b, c) {
            this.eventBus.removeEventListener(a, b, c)
        },
        getVersion: function() {
            return g
        },
        startup: function() {
            i || (b.injectInto(this), i = !0)
        },
        getDebug: function() {
            return this.debug
        },
        getVideoModel: function() {
            return f
        },
        setAutoPlay: function(a) {
            k = a
        },
        getAutoPlay: function() {
            return k
        },
        setScheduleWhilePaused: function(a) {
            l = a
        },
        getScheduleWhilePaused: function() {
            return l
        },
        setTokenAuthentication: function(a, b) {
            this.tokenAuthentication.setTokenAuthentication({
                name: a,
                type: b
            })
        },
        setBufferMax: function(a) {
            m = a
        },
        getBufferMax: function() {
            return m
        },
        getMetricsExt: function() {
            return this.metricsExt
        },
        getMetricsFor: function(a) {
            var b = this.metricsModel.getReadOnlyMetricsFor(a);
            return b
        },
        getQualityFor: function(a) {
            return this.abrController.getQualityFor(a)
        },
        setQualityFor: function(a, b) {
            this.abrController.setPlaybackQuality(a, b)
        },
        getAutoSwitchQuality: function() {
            return this.abrController.getAutoSwitchBitrate()
        },
        setAutoSwitchQuality: function(a) {
            this.abrController.setAutoSwitchBitrate(a)
        },
        setAbrAlgorithm: function(a) {
            this.abrController.setAbrAlgorithm(a)
        },
        setFixedBitrateArray: function(a) {
            this.abrController.setFixedBitrateArray(a)
        },
        attachView: function(a) {
            if (!i) throw "MediaPlayer not initialized!";
            c = a, f = null, c && (f = b.getObject("videoModel"), f.setElement(c)), j && e && (e.reset(), e = null, j = !1), n.call(this) && p.call(this)
        },
        attachSource: function(a) {
            if (!i) throw "MediaPlayer not initialized!";
            d = this.uriQueryFragModel.parseURI(a), this.setQualityFor("video", 0), this.setQualityFor("audio", 0), j && e && (e.reset(), e = null, j = !1), n.call(this) && p.call(this)
        },
        reset: function() {
            this.attachSource(null), this.attachView(null)
        },
        play: o,
        isReady: n,
        seek: t,
        time: u,
        duration: v,
        timeAsUTC: w,
        durationAsUTC: x,
        getDVRWindowSize: r,
        getDVRSeekOffset: s,
        formatUTC: y,
        convertToTimeCode: z
    }
}, MediaPlayer.prototype = {
    constructor: MediaPlayer
}, MediaPlayer.dependencies = {}, MediaPlayer.utils = {}, MediaPlayer.models = {}, MediaPlayer.vo = {}, MediaPlayer.vo.metrics = {}, MediaPlayer.rules = {}, MediaPlayer.di = {}, MediaPlayer.di.Context = function() {
    "use strict";
    return {
        system: void 0,
        setup: function() {
            this.system.autoMapOutlets = !0, this.system.mapSingleton("debug", MediaPlayer.utils.Debug), this.system.mapSingleton("tokenAuthentication", MediaPlayer.utils.TokenAuthentication), this.system.mapSingleton("eventBus", MediaPlayer.utils.EventBus), this.system.mapSingleton("capabilities", MediaPlayer.utils.Capabilities), this.system.mapSingleton("textTrackExtensions", MediaPlayer.utils.TextTrackExtensions), this.system.mapSingleton("vttParser", MediaPlayer.utils.VTTParser), this.system.mapSingleton("ttmlParser", MediaPlayer.utils.TTMLParser), this.system.mapClass("videoModel", MediaPlayer.models.VideoModel), this.system.mapSingleton("manifestModel", MediaPlayer.models.ManifestModel), this.system.mapSingleton("metricsModel", MediaPlayer.models.MetricsModel), this.system.mapSingleton("uriQueryFragModel", MediaPlayer.models.URIQueryAndFragmentModel), this.system.mapClass("protectionModel", MediaPlayer.models.ProtectionModel), this.system.mapSingleton("textSourceBuffer", MediaPlayer.dependencies.TextSourceBuffer), this.system.mapSingleton("mediaSourceExt", MediaPlayer.dependencies.MediaSourceExtensions),
                this.system.mapSingleton("sourceBufferExt", MediaPlayer.dependencies.SourceBufferExtensions), this.system.mapSingleton("bufferExt", MediaPlayer.dependencies.BufferExtensions), this.system.mapSingleton("abrController", MediaPlayer.dependencies.AbrController), this.system.mapSingleton("errHandler", MediaPlayer.dependencies.ErrorHandler), this.system.mapSingleton("protectionExt", MediaPlayer.dependencies.ProtectionExtensions), this.system.mapSingleton("videoExt", MediaPlayer.dependencies.VideoModelExtensions), this.system.mapClass("protectionController", MediaPlayer.dependencies.ProtectionController), this.system.mapClass("metrics", MediaPlayer.models.MetricsList), this.system.mapClass("downloadRatioRule", MediaPlayer.rules.DownloadRatioRule), this.system.mapClass("insufficientBufferRule", MediaPlayer.rules.InsufficientBufferRule), this.system.mapClass("limitSwitchesRule", MediaPlayer.rules.LimitSwitchesRule), this.system.mapClass("abrRulesCollection", MediaPlayer.rules.BaseRulesCollection), this.system.mapClass("eventController", MediaPlayer.dependencies.EventController), this.system.mapClass("textController", MediaPlayer.dependencies.TextController), this.system.mapClass("bufferController", MediaPlayer.dependencies.BufferController), this.system.mapClass("manifestLoader", MediaPlayer.dependencies.ManifestLoader), this.system.mapSingleton("manifestUpdater", MediaPlayer.dependencies.ManifestUpdater), this.system.mapClass("fragmentController", MediaPlayer.dependencies.FragmentController), this.system.mapClass("fragmentLoader", MediaPlayer.dependencies.FragmentLoader), this.system.mapClass("fragmentModel", MediaPlayer.dependencies.FragmentModel), this.system.mapSingleton("streamController", MediaPlayer.dependencies.StreamController), this.system.mapClass("stream", MediaPlayer.dependencies.Stream), this.system.mapClass("requestScheduler", MediaPlayer.dependencies.RequestScheduler), this.system.mapSingleton("schedulerExt", MediaPlayer.dependencies.SchedulerExtensions), this.system.mapClass("schedulerModel", MediaPlayer.dependencies.SchedulerModel), this.system.mapSingleton("fastMPC", MediaPlayer.dependencies.FastMPC), this.system.mapSingleton("bwPredictor", MediaPlayer.dependencies.BandwidthPredictor), this.system.mapSingleton("vbr", MediaPlayer.dependencies.VBR), this.system.mapSingleton("festive", MediaPlayer.dependencies.festive)
        }
    }
}, Dash = function() {
    "use strict";
    return {
        modules: {},
        dependencies: {},
        vo: {},
        di: {}
    }
}(), Dash.di.DashContext = function() {
    "use strict";
    return {
        system: void 0,
        setup: function() {
            Dash.di.DashContext.prototype.setup.call(this), this.system.mapClass("parser", Dash.dependencies.DashParser), this.system.mapClass("indexHandler", Dash.dependencies.DashHandler), this.system.mapClass("baseURLExt", Dash.dependencies.BaseURLExtensions), this.system.mapClass("fragmentExt", Dash.dependencies.FragmentExtensions), this.system.mapSingleton("manifestExt", Dash.dependencies.DashManifestExtensions), this.system.mapSingleton("metricsExt", Dash.dependencies.DashMetricsExtensions), this.system.mapSingleton("timelineConverter", Dash.dependencies.TimelineConverter)
        }
    }
}, Dash.di.DashContext.prototype = new MediaPlayer.di.Context, Dash.di.DashContext.prototype.constructor = Dash.di.DashContext, Dash.dependencies.BaseURLExtensions = function() {
    "use strict";
    var a = function(a, b) {
            for (var c, d, e, f, g, h, i, j, k, l, m = new DataView(a), n = {}, o = 0;
                "sidx" !== j && o < m.byteLength;) {
                for (k = m.getUint32(o), o += 4, j = "", f = 0; 4 > f; f += 1) l = m.getInt8(o), j += String.fromCharCode(l), o += 1;
                "moof" !== j && "traf" !== j && "sidx" !== j ? o += k - 8 : "sidx" === j && (o -= 8)
            }
            if (e = m.getUint32(o, !1) + o, e > a.byteLength) throw "sidx terminates after array buffer";
            for (n.version = m.getUint8(o + 8), o += 12, n.timescale = m.getUint32(o + 4, !1), o += 8, 0 === n.version ? (n.earliest_presentation_time = m.getUint32(o, !1), n.first_offset = m.getUint32(o + 4, !1), o += 8) : (n.earliest_presentation_time = utils.Math.to64BitNumber(m.getUint32(o + 4, !1), m.getUint32(o, !1)), n.first_offset = (m.getUint32(o + 8, !1) << 32) + m.getUint32(o + 12, !1), o += 16), n.first_offset += e + (b || 0), n.reference_count = m.getUint16(o + 2, !1), o += 4, n.references = [], c = n.first_offset, d = n.earliest_presentation_time, f = 0; f < n.reference_count; f += 1) h = m.getUint32(o, !1), g = h >>> 31, h = 2147483647 & h, i = m.getUint32(o + 4, !1), o += 12, n.references.push({
                size: h,
                type: g,
                offset: c,
                duration: i,
                time: d,
                timescale: n.timescale
            }), c += h, d += i;
            if (o !== e) throw "Error: final pos " + o + " differs from SIDX end " + e;
            return n
        },
        b = function(b, c, d) {
            var e, f, g, h, i, j, k, l;
            for (e = a.call(this, b, d), f = e.references, g = [], i = 0, j = f.length; j > i; i += 1) h = new Dash.vo.Segment, h.duration = f[i].duration, h.media = c, h.startTime = f[i].time, h.timescale = f[i].timescale, k = f[i].offset, l = f[i].offset + f[i].size - 1, h.mediaRange = k + "-" + l, g.push(h);
            return this.debug.log("Parsed SIDX box: " + g.length + " segments."), Q.when(g)
        },
        c = function(a, b) {
            var d, e, f, g, h, i, j, k, l, m = Q.defer(),
                n = new DataView(a),
                o = 0,
                p = "",
                q = 0,
                r = !1,
                s = this;
            for (s.debug.log("Searching for initialization.");
                "moov" !== p && o < n.byteLength;) {
                for (q = n.getUint32(o), o += 4, p = "", i = 0; 4 > i; i += 1) j = n.getInt8(o), p += String.fromCharCode(j), o += 1;
                "ftyp" === p && (d = o - 8), "moov" === p && (e = o - 8), "moov" !== p && (o += q - 8)
            }
            return h = n.byteLength - o, "moov" !== p ? (s.debug.log("Loading more bytes to find initialization."), b.range.start = 0, b.range.end = b.bytesLoaded + b.bytesToLoad, k = new XMLHttpRequest, k.onloadend = function() {
                r || m.reject("Error loading initialization.")
            }, k.onload = function() {
                r = !0, b.bytesLoaded = b.range.end, c.call(s, k.response).then(function(a) {
                    m.resolve(a)
                })
            }, k.onerror = function() {
                m.reject("Error loading initialization.")
            }, k.open("GET", s.tokenAuthentication.addTokenAsQueryArg(b.url)), k.responseType = "arraybuffer", k.setRequestHeader("Range", "bytes=" + b.range.start + "-" + b.range.end), k = s.tokenAuthentication.setTokenInRequestHeader(k), k.send(null)) : (f = void 0 === d ? e : d, g = e + q - 1, l = f + "-" + g, s.debug.log("Found the initialization.  Range: " + l), m.resolve(l)), m.promise
        },
        d = function(a) {
            var b = Q.defer(),
                d = new XMLHttpRequest,
                e = !0,
                f = this,
                g = {
                    url: a,
                    range: {},
                    searching: !1,
                    bytesLoaded: 0,
                    bytesToLoad: 1500,
                    request: d
                };
            return f.debug.log("Start searching for initialization."), g.range.start = 0, g.range.end = g.bytesToLoad, d.onload = function() {
                d.status < 200 || d.status > 299 || (e = !1, g.bytesLoaded = g.range.end, c.call(f, d.response, g).then(function(a) {
                    b.resolve(a)
                }))
            }, d.onloadend = d.onerror = function() {
                e && (e = !1, f.errHandler.downloadError("initialization", g.url, d), b.reject(d))
            }, d.open("GET", f.tokenAuthentication.addTokenAsQueryArg(g.url)), d.responseType = "arraybuffer", d.setRequestHeader("Range", "bytes=" + g.range.start + "-" + g.range.end), d = f.tokenAuthentication.setTokenInRequestHeader(d), d.send(null), f.debug.log("Perform init search: " + g.url), b.promise
        },
        e = function(a, c) {
            var d, f, g, h, i, j, k, l, m = Q.defer(),
                n = new DataView(a),
                o = new XMLHttpRequest,
                p = 0,
                q = "",
                r = 0,
                s = !0,
                t = !1,
                u = this;
            for (u.debug.log("Searching for SIDX box."), u.debug.log(c.bytesLoaded + " bytes loaded.");
                "sidx" !== q && p < n.byteLength;) {
                for (r = n.getUint32(p), p += 4, q = "", i = 0; 4 > i; i += 1) j = n.getInt8(p), q += String.fromCharCode(j), p += 1;
                "sidx" !== q && (p += r - 8)
            }
            if (d = n.byteLength - p, "sidx" !== q) m.reject();
            else if (r - 8 > d) u.debug.log("Found SIDX but we don't have all of it."), c.range.start = 0, c.range.end = c.bytesLoaded + (r - d), o.onload = function() {
                o.status < 200 || o.status > 299 || (s = !1, c.bytesLoaded = c.range.end, e.call(u, o.response, c).then(function(a) {
                    m.resolve(a)
                }))
            }, o.onloadend = o.onerror = function() {
                s && (s = !1, u.errHandler.downloadError("SIDX", c.url, o), m.reject(o))
            }, o.open("GET", u.tokenAuthentication.addTokenAsQueryArg(c.url)), o.responseType = "arraybuffer", o.setRequestHeader("Range", "bytes=" + c.range.start + "-" + c.range.end), o = u.tokenAuthentication.setTokenInRequestHeader(o), o.send(null);
            else if (c.range.start = p - 8, c.range.end = c.range.start + r, u.debug.log("Found the SIDX box.  Start: " + c.range.start + " | End: " + c.range.end), f = new ArrayBuffer(c.range.end - c.range.start), h = new Uint8Array(f), g = new Uint8Array(a, c.range.start, c.range.end - c.range.start), h.set(g), k = this.parseSIDX.call(this, f, c.range.start), l = k.references, null !== l && void 0 !== l && l.length > 0 && (t = 1 === l[0].type), t) {
                u.debug.log("Initiate multiple SIDX load.");
                var v, w, x, y, z, A, B = [];
                for (v = 0, w = l.length; w > v; v += 1) x = l[v].offset, y = l[v].offset + l[v].size - 1, z = x + "-" + y, B.push(this.loadSegments.call(u, c.url, z));
                Q.all(B).then(function(a) {
                    for (A = [], v = 0, w = a.length; w > v; v += 1) A = A.concat(a[v]);
                    m.resolve(A)
                }, function(a) {
                    m.reject(a)
                })
            } else u.debug.log("Parsing segments from SIDX."), b.call(u, f, c.url, c.range.start).then(function(a) {
                m.resolve(a)
            });
            return m.promise
        },
        f = function(a, c) {
            var d, f = Q.defer(),
                g = new XMLHttpRequest,
                h = !0,
                i = this,
                j = {
                    url: a,
                    range: {},
                    searching: !1,
                    bytesLoaded: 0,
                    bytesToLoad: 1500,
                    request: g
                };
            return null === c ? (i.debug.log("No known range for SIDX request."), j.searching = !0, j.range.start = 0, j.range.end = j.bytesToLoad) : (d = c.split("-"), j.range.start = parseFloat(d[0]), j.range.end = parseFloat(d[1])), g.onload = function() {
                g.status < 200 || g.status > 299 || (h = !1, j.searching ? (j.bytesLoaded = j.range.end, e.call(i, g.response, j).then(function(a) {
                    f.resolve(a)
                })) : b.call(i, g.response, j.url, j.range.start).then(function(a) {
                    f.resolve(a)
                }))
            }, g.onloadend = g.onerror = function() {
                h && (h = !1, i.errHandler.downloadError("SIDX", j.url, g), f.reject(g))
            }, g.open("GET", i.tokenAuthentication.addTokenAsQueryArg(j.url)), g.responseType = "arraybuffer", g.setRequestHeader("Range", "bytes=" + j.range.start + "-" + j.range.end), g = i.tokenAuthentication.setTokenInRequestHeader(g), g.send(null), i.debug.log("Perform SIDX load: " + j.url), f.promise
        };
    return {
        debug: void 0,
        errHandler: void 0,
        tokenAuthentication: void 0,
        loadSegments: f,
        loadInitialization: d,
        parseSegments: b,
        parseSIDX: a,
        findSIDX: e
    }
}, Dash.dependencies.BaseURLExtensions.prototype = {
    constructor: Dash.dependencies.BaseURLExtensions
}, Dash.dependencies.DashHandler = function() {
    "use strict";
    var a, b, c, d = -1,
        e = null,
        f = function(a, b) {
            for (; a.length < b;) a = "0" + a;
            return a
        },
        g = function(a, b, c) {
            for (var d, e, g, h, i = 0, j = 0, k = b.length, l = "%0", m = l.length;;) {
                if (i = a.indexOf("$" + b), 0 > i) return a;
                if (j = a.indexOf("$", i + k), 0 > j) return a;
                if (d = a.indexOf(l, i + k), d > i && j > d) switch (e = a.charAt(j - 1), g = parseInt(a.substring(d + m, j - 1), 10), e) {
                    case "d":
                    case "i":
                    case "u":
                        h = f(c.toString(), g);
                        break;
                    case "x":
                        h = f(c.toString(16), g);
                        break;
                    case "X":
                        h = f(c.toString(16), g).toUpperCase();
                        break;
                    case "o":
                        h = f(c.toString(8), g);
                        break;
                    default:
                        return this.debug.log("Unsupported/invalid IEEE 1003.1 format identifier string in URL"), a
                } else h = c;
                a = a.substring(0, i) + h + a.substring(j + 1)
            }
        },
        h = function(a) {
            return a.split("$$").join("$")
        },
        i = function(a, b) {
            if (null === b || -1 === a.indexOf("$RepresentationID$")) return a;
            var c = b.toString();
            return a.split("$RepresentationID$").join(c)
        },
        j = function(a, b) {
            return a.representation.startNumber + b
        },
        k = function(a, b) {
            var c, d = b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].BaseURL;
            return c = a === d ? a : -1 !== a.indexOf("http://") ? a : d + a
        },
        l = function(a, c) {
            var d, e, f = this,
                g = new MediaPlayer.vo.SegmentRequest;
            return d = a.adaptation.period, g.streamType = c, g.type = "Initialization Segment", g.url = k(a.initialization, a), g.range = a.range, e = d.start, g.availabilityStartTime = f.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(e, a.adaptation.period.mpd, b), g.availabilityEndTime = f.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(e + d.duration, d.mpd, b), g.quality = a.index, g
        },
        m = function(a) {
            var b = Q.defer(),
                d = null,
                e = null,
                f = this;
            return a ? (a.initialization ? (d = l.call(f, a, c), b.resolve(d)) : (e = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].BaseURL, f.baseURLExt.loadInitialization(e).then(function(g) {
                a.range = g, a.initialization = e, d = l.call(f, a, c), b.resolve(d)
            }, function(a) {
                b.reject(a)
            })), b.promise) : Q.reject("no represenation")
        },
        n = function(a) {
            var c, f, g, h = a.adaptation.period,
                i = !1;
            return (null === e || e > a.segments[0].availabilityIdx) && (e = a.segments[0].availabilityIdx), b ? i = !1 : 0 > d ? i = !1 : d < a.availableSegmentsNumber + e ? (f = A(d, a), f && (g = f.presentationStartTime - h.start, c = a.adaptation.period.duration, this.debug.log(a.segmentInfoType + ": " + g + " / " + c), i = g >= c)) : i = !0, Q.when(i)
        },
        o = function(a, c) {
            var d, e, f, g, h = this;
            return e = a.segmentDuration, f = a.adaptation.period.start + c * e, g = f + e, d = new Dash.vo.Segment, d.representation = a, d.duration = e, d.presentationStartTime = f, d.mediaStartTime = h.timelineConverter.calcMediaTimeFromPresentationTime(d.presentationStartTime, a), d.availabilityStartTime = h.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(d.presentationStartTime, a.adaptation.period.mpd, b), d.availabilityEndTime = h.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(g, a.adaptation.period.mpd, b), d.wallStartTime = h.timelineConverter.calcWallTimeForSegment(d, b), d.replacementNumber = j(d, c), d.availabilityIdx = c, d
        },
        p = function(b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = this,
                r = b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].SegmentTemplate,
                t = r.SegmentTimeline,
                v = b.availableSegmentsNumber > 0,
                w = 10,
                x = [],
                y = 0,
                z = -1,
                A = function(a) {
                    return u.call(q, b, y, a.d, p, r.media, a.mediaRange, z)
                };
            for (p = b.timescale, c = t.S_asArray, k = s.call(q, b), k ? (n = k.start, o = k.end) : m = q.timelineConverter.calcMediaTimeFromPresentationTime(a || 0, b), e = 0, f = c.length; f > e; e += 1)
                if (d = c[e], h = 0, d.hasOwnProperty("r") && (h = d.r), d.hasOwnProperty("t") && (y = d.t), 0 > h && (j = c[e + 1], i = j && j.hasOwnProperty("t") ? j.t / p : b.adaptation.period.duration, h = Math.ceil((i - y / p) / (d.d / p)) - 1), l) {
                    if (v) break;
                    z += h + 1
                } else
                    for (g = 0; h >= g; g += 1) {
                        if (z += 1, k) {
                            if (z > o) {
                                if (l = !0, v) break;
                                continue
                            }
                            z >= n && x.push(A.call(q, d))
                        } else {
                            if (x.length > w) {
                                if (l = !0, v) break;
                                continue
                            }
                            y / p >= m - d.d / p && x.push(A.call(q, d))
                        }
                        y += d.d
                    }
            if (!v) {
                var B, C, D = c[0];
                B = void 0 === D.t ? 0 : q.timelineConverter.calcPresentationTimeFromMediaTime(D.t / p, b), C = q.timelineConverter.calcPresentationTimeFromMediaTime((y - d.d) / p, b), b.segmentAvailabilityRange = {
                    start: B,
                    end: C
                }, b.availableSegmentsNumber = z + 1
            }
            return Q.when(x)
        },
        q = function(a) {
            var c, d, e, f, h = [],
                i = this,
                j = Q.defer(),
                k = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].SegmentTemplate,
                l = a.segmentDuration,
                m = null,
                n = Math.floor(a.adaptation.period.start / l),
                p = null,
                q = null;
            return f = a.startNumber, t.call(i, a).then(function(s) {
                for (a.segmentAvailabilityRange = s, m = r.call(i, a), d = m.start, e = m.end, c = d; e >= c; c += 1) p = o.call(i, a, c - (b ? n : 0)), p.replacementTime = (f + c - 1) * a.segmentDuration, q = k.media, q = g(q, "Number", p.replacementNumber), q = g(q, "Time", p.replacementTime), p.media = q, h.push(p), p = null;
                a.availableSegmentsNumber = n + Math.ceil((s.end - s.start) / l), j.resolve(h)
            }), j.promise
        },
        r = function(c) {
            var e, f, g, h = this,
                i = c.adaptation.period.start,
                j = c.segmentDuration,
                k = c.adaptation.period.mpd.manifest.minBufferTime,
                l = c.segmentAvailabilityRange,
                m = NaN,
                n = null,
                o = c.segments,
                p = 2 * j,
                q = Math.max(2 * k, 10 * j);
            return l || (l = h.timelineConverter.calcSegmentAvailabilityRange(c, b)), b && !c.adaptation.period.mpd.isClientServerTimeSyncCompleted ? (e = Math.floor(l.start / j), f = Math.floor(l.end / j), g = {
                start: e,
                end: f
            }) : (o ? (n = A(d, c), m = n ? n.presentationStartTime - i : d > 0 ? d * j : a - i || o[0].presentationStartTime - i) : m = d > 0 ? d * j : b ? l.end : l.start, e = Math.floor(Math.max(m - p, l.start) / j), f = Math.floor(Math.min(e + q / j, l.end / j)), g = {
                start: e,
                end: f
            })
        },
        s = function(c) {
            var e, f, g, h = NaN,
                i = c.segments,
                j = 2,
                k = 10,
                l = 0,
                m = Number.POSITIVE_INFINITY;
            if (b && !c.adaptation.period.mpd.isClientServerTimeSyncCompleted) return g = {
                start: l,
                end: m
            };
            if (!b && a) return null;
            if (i) {
                if (0 > d) return null;
                h = d
            } else h = d > 0 ? d : b ? m : l;
            return e = Math.max(h - j, l), f = Math.min(h + k, m), g = {
                start: e,
                end: f
            }
        },
        t = function(a) {
            var c, d, e = this,
                f = Q.defer(),
                g = function() {
                    c = e.timelineConverter.calcSegmentAvailabilityRange(a, b), c.end > 0 ? f.resolve(c) : (d = 1e3 * Math.abs(c.end), setTimeout(g, d))
                };
            return g(), f.promise
        },
        u = function(a, c, d, e, f, h, i) {
            var k, l, m, n = this,
                o = c / e,
                p = Math.min(d / e, a.adaptation.period.mpd.maxSegmentDuration);
            return k = n.timelineConverter.calcPresentationTimeFromMediaTime(o, a), l = k + p, m = new Dash.vo.Segment, m.representation = a, m.duration = p, m.mediaStartTime = o, m.presentationStartTime = k, m.availabilityStartTime = a.adaptation.period.mpd.manifest.mpdLoadedTime, m.availabilityEndTime = n.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(l, a.adaptation.period.mpd, b), m.wallStartTime = n.timelineConverter.calcWallTimeForSegment(m, b), m.replacementTime = c, m.replacementNumber = j(m, i), f = g(f, "Number", m.replacementNumber), f = g(f, "Time", m.replacementTime), m.media = f, m.mediaRange = h, m.availabilityIdx = i, m
        },
        v = function(a) {
            var c, d, e, f, g, h = this,
                i = [],
                j = Q.defer(),
                k = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].SegmentList,
                l = k.SegmentURL_asArray.length,
                m = 0,
                n = k.SegmentURL_asArray.length;
            return g = a.startNumber, t.call(h, a).then(function(p) {
                for (b || (f = r.call(h, a), m = f.start, n = f.end), c = m; n > c; c += 1) e = k.SegmentURL_asArray[c], d = o.call(h, a, c), d.replacementTime = (g + c - 1) * a.segmentDuration, d.media = e.media, d.mediaRange = e.mediaRange, d.index = e.index, d.indexRange = e.indexRange, i.push(d), d = null;
                a.segmentAvailabilityRange = p, a.availableSegmentsNumber = l, j.resolve(i)
            }), j.promise
        },
        w = function(a) {
            var b, c, d, e, f = this,
                g = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].BaseURL,
                h = Q.defer(),
                i = [],
                j = 0,
                k = null;
            return a.indexRange && (k = a.indexRange), this.baseURLExt.loadSegments(g, k).then(function(g) {
                for (c = 0, d = g.length; d > c; c += 1) b = g[c], e = u.call(f, a, b.startTime, b.duration, b.timescale, b.media, b.mediaRange, j), i.push(e), e = null, j += 1;
                a.segmentAvailabilityRange = {
                    start: i[0].presentationStartTime,
                    end: i[d - 1].presentationStartTime
                }, a.availableSegmentsNumber = d, h.resolve(i)
            }), h.promise
        },
        x = function(a) {
            var c, d, e = Q.defer(),
                f = this;
            return B.call(f, a) ? (c = "SegmentTimeline" === a.segmentInfoType ? p.call(f, a) : "SegmentTemplate" === a.segmentInfoType ? q.call(f, a) : "SegmentList" === a.segmentInfoType ? v.call(f, a) : w.call(f, a), Q.when(c).then(function(c) {
                if (a.segments = c, d = c.length - 1, b && isNaN(a.adaptation.period.liveEdge)) {
                    var g = f.metricsModel.getMetricsFor("stream"),
                        h = c[d].presentationStartTime;
                    a.adaptation.period.liveEdge = h, f.metricsModel.updateManifestUpdateInfo(f.metricsExt.getCurrentManifestUpdate(g), {
                        presentationStartTime: h
                    })
                }
                e.resolve(c)
            }), e.promise) : Q.when(a.segments)
        },
        y = function(a) {
            var b = this,
                c = Q.defer();
            return a.segments = null, x.call(b, a).then(function(b) {
                a.segments = b, c.resolve()
            }), c.promise
        },
        z = function(a, b) {
            var c, d, e, f, g = b.segments,
                h = g.length - 1,
                i = -1,
                j = this;
            if (g && g.length > 0)
                for (f = h; f >= 0; f--) {
                    if (c = g[f], d = c.presentationStartTime, e = c.duration, a + Dash.dependencies.DashHandler.EPSILON >= d && a - Dash.dependencies.DashHandler.EPSILON <= d + e) {
                        i = c.availabilityIdx;
                        break
                    } - 1 === i && a - Dash.dependencies.DashHandler.EPSILON > d + e && (i = isNaN(b.segmentDuration) ? c.availabilityIdx + 1 : Math.floor((a - b.adaptation.period.start) / b.segmentDuration))
                }
            return -1 === i && (isNaN(b.segmentDuration) ? (j.debug.log("Couldn't figure out a time!"), j.debug.log("Time: " + a), j.debug.log(g)) : i = Math.floor((a - b.adaptation.period.start) / b.segmentDuration)), Q.when(i)
        },
        A = function(a, b) {
            if (!b || !b.segments) return null;
            var c, d, e = b.segments.length;
            for (console.log("XIAOQI: indexHandler.getSegmentByIndex: representation.segments.length=" + e), d = 0; e > d; d += 1)
                if (c = b.segments[d], c.availabilityIdx === a) return c;
            return console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"), null
        },
        B = function(a) {
            var b, c, e = !1,
                f = a.segments;
            return f ? (c = f[0].availabilityIdx, b = f[f.length - 1].availabilityIdx, e = c > d || d > b) : e = !0, e
        },
        C = function(a) {
            if (null === a || void 0 === a) return Q.when(null);
            var b, d = new MediaPlayer.vo.SegmentRequest,
                e = a.representation,
                f = e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].bandwidth;
            return b = k(a.media, e), b = g(b, "Number", a.replacementNumber), b = g(b, "Time", a.replacementTime), b = g(b, "Bandwidth", f), b = i(b, e.id), b = h(b), d.streamType = c, d.type = "Media Segment", d.url = b, d.range = a.mediaRange, d.startTime = a.presentationStartTime, d.duration = a.duration, d.timescale = e.timescale, d.availabilityStartTime = a.availabilityStartTime, d.availabilityEndTime = a.availabilityEndTime, d.wallStartTime = a.wallStartTime, d.quality = e.index, d.index = a.availabilityIdx, Q.when(d)
        },
        D = function(b, c) {
            var e, f, g, h = this;
            return h.debug.log("XIAOQI: indexHandler: ENTERING getForTime"), b ? (a = c, h.debug.log("Getting the request for time: " + c), e = Q.defer(), x.call(h, b).then(function() {
                var a;
                return a = z.call(h, c, b)
            }).then(function(a) {
                return h.debug.log("Index for time " + c + " is " + a), d = a, n.call(h, b)
            }).then(function(a) {
                var c = null;
                return h.debug.log("XIAOQI: indexHandler.getForTime: Stream finished? " + a), a ? (f = new MediaPlayer.vo.SegmentRequest, f.action = f.ACTION_COMPLETE, f.index = d, h.debug.log("Signal complete."), h.debug.log(f), e.resolve(f)) : (g = A(d, b), h.debug.log("XIAOQI: indexHandler.getForTime: index=" + d + ", representation=" + b + ", segment=" + g), c = C.call(h, g)), c
            }).then(function(a) {
                e.resolve(a)
            }), e.promise) : Q.reject("no represenation")
        },
        E = function(b) {
            var c, e, f, g = this;
            if (g.debug.log("XIAOQI: requestScheduler: ENTERING getNext"), !b) return Q.reject("no represenation");
            if (-1 === d) throw "You must call getSegmentRequestForTime first.";
            return a = null, d += 1, c = Q.defer(), n.call(g, b).then(function(a) {
                a ? (e = new MediaPlayer.vo.SegmentRequest, e.action = e.ACTION_COMPLETE, e.index = d, g.debug.log("Signal complete."), c.resolve(e)) : x.call(g, b).then(function() {
                    var a;
                    return f = A(d, b), a = C.call(g, f)
                }).then(function(a) {
                    c.resolve(a)
                })
            }), c.promise
        },
        F = function(a, b, c) {
            var d, e = this,
                f = Math.max(b - c, 0),
                g = Q.defer(),
                h = 0;
            return a ? (x.call(e, a).then(function(a) {
                d = a[0].duration, h = Math.ceil(f / d), h = 1, g.resolve(h)
            }, function() {
                g.resolve(0)
            }), g.promise) : Q.reject("no represenation")
        },
        G = function(a) {
            var b, c, e = this,
                f = Q.defer();
            return a ? (c = d, x.call(e, a).then(function(d) {
                0 > c ? b = e.timelineConverter.calcPresentationStartTime(a.adaptation.period) : (c = c < d[0].availabilityIdx ? d[0].availabilityIdx : Math.min(d[d.length - 1].availabilityIdx, c), b = A(c, a).presentationStartTime), f.resolve(b)
            }, function() {
                f.reject()
            }), f.promise) : Q.reject("no represenation")
        };
    return {
        debug: void 0,
        baseURLExt: void 0,
        metricsModel: void 0,
        metricsExt: void 0,
        manifestModel: void 0,
        manifestExt: void 0,
        errHandler: void 0,
        timelineConverter: void 0,
        getType: function() {
            return c
        },
        setType: function(a) {
            c = a
        },
        getIsDynamic: function() {
            return b
        },
        setIsDynamic: function(a) {
            b = a
        },
        getCurrentIndex: function() {
            return d
        },
        getInitRequest: m,
        getSegmentRequestForTime: D,
        getNextSegmentRequest: E,
        getCurrentTime: G,
        getSegmentCountForDuration: F,
        updateSegmentList: y
    }
}, Dash.dependencies.DashHandler.EPSILON = .003, Dash.dependencies.DashHandler.prototype = {
    constructor: Dash.dependencies.DashHandler
}, Dash.dependencies.DashManifestExtensions = function() {
    "use strict";
    this.timelineConverter = void 0
}, Dash.dependencies.DashManifestExtensions.prototype = {
    constructor: Dash.dependencies.DashManifestExtensions,
    getIsAudio: function(a) {
        "use strict";
        var b, c, d, e = a.ContentComponent_asArray,
            f = !1,
            g = !1;
        if (e)
            for (b = 0, c = e.length; c > b; b += 1) "audio" === e[b].contentType && (f = !0, g = !0);
        if (a.hasOwnProperty("mimeType") && (f = -1 !== a.mimeType.indexOf("audio"), g = !0), !g)
            for (b = 0, c = a.Representation_asArray.length; !g && c > b;) d = a.Representation_asArray[b], d.hasOwnProperty("mimeType") && (f = -1 !== d.mimeType.indexOf("audio"), g = !0), b += 1;
        return f && (a.type = "audio"), Q.when(f)
    },
    getIsVideo: function(a) {
        "use strict";
        var b, c, d, e = a.ContentComponent_asArray,
            f = !1,
            g = !1;
        if (e)
            for (b = 0, c = e.length; c > b; b += 1) "video" === e[b].contentType && (f = !0, g = !0);
        if (a.hasOwnProperty("mimeType") && (f = -1 !== a.mimeType.indexOf("video"), g = !0), !g)
            for (b = 0, c = a.Representation_asArray.length; !g && c > b;) d = a.Representation_asArray[b], d.hasOwnProperty("mimeType") && (f = -1 !== d.mimeType.indexOf("video"), g = !0), b += 1;
        return f && (a.type = "video"), Q.when(f)
    },
    getIsText: function(a) {
        "use strict";
        var b, c, d, e = a.ContentComponent_asArray,
            f = !1,
            g = !1;
        if (e)
            for (b = 0, c = e.length; c > b; b += 1) "text" === e[b].contentType && (f = !0, g = !0);
        if (a.hasOwnProperty("mimeType") && (f = -1 !== a.mimeType.indexOf("vtt") || -1 !== a.mimeType.indexOf("ttml"), g = !0), !g)
            for (b = 0, c = a.Representation_asArray.length; !g && c > b;) d = a.Representation_asArray[b], d.hasOwnProperty("mimeType") && (f = -1 !== d.mimeType.indexOf("vtt") || -1 !== d.mimeType.indexOf("ttml"), g = !0), b += 1;
        return Q.when(f)
    },
    getIsTextTrack: function(a) {
        return "text/vtt" === a || "application/ttml+xml" === a
    },
    getIsMain: function() {
        "use strict";
        return Q.when(!1)
    },
    processAdaptation: function(a) {
        "use strict";
        return void 0 !== a.Representation_asArray && null !== a.Representation_asArray && a.Representation_asArray.sort(function(a, b) {
            return a.bandwidth - b.bandwidth
        }), a
    },
    getDataForId: function(a, b, c) {
        "use strict";
        var d, e, f = b.Period_asArray[c].AdaptationSet_asArray;
        for (d = 0, e = f.length; e > d; d += 1)
            if (f[d].hasOwnProperty("id") && f[d].id === a) return Q.when(f[d]);
        return Q.when(null)
    },
    getDataForIndex: function(a, b, c) {
        "use strict";
        var d = b.Period_asArray[c].AdaptationSet_asArray;
        return Q.when(d[a])
    },
    getDataIndex: function(a, b, c) {
        "use strict";
        var d, e, f = b.Period_asArray[c].AdaptationSet_asArray;
        for (d = 0, e = f.length; e > d; d += 1)
            if (f[d] === a) return Q.when(d);
        return Q.when(-1)
    },
    getVideoData: function(a, b) {
        "use strict";
        var c, d, e = a.Period_asArray[b].AdaptationSet_asArray,
            f = Q.defer(),
            g = [];
        for (c = 0, d = e.length; d > c; c += 1) g.push(this.getIsVideo(e[c]));
        return Q.all(g).then(function(a) {
            var b = !1;
            for (c = 0, d = a.length; d > c; c += 1) a[c] === !0 && (b = !0, f.resolve(e[c]));
            b || f.resolve(null)
        }), f.promise
    },
    getTextData: function(a, b) {
        "use strict";
        var c, d, e = a.Period_asArray[b].AdaptationSet_asArray,
            f = Q.defer(),
            g = [];
        for (c = 0, d = e.length; d > c; c += 1) g.push(this.getIsText(e[c]));
        return Q.all(g).then(function(a) {
            var b = !1;
            for (c = 0, d = a.length; d > c && !b; c += 1) a[c] === !0 && (b = !0, f.resolve(e[c]));
            b || f.resolve(null)
        }), f.promise
    },
    getAudioDatas: function(a, b) {
        "use strict";
        var c, d, e = a.Period_asArray[b].AdaptationSet_asArray,
            f = Q.defer(),
            g = [];
        for (c = 0, d = e.length; d > c; c += 1) g.push(this.getIsAudio(e[c]));
        return Q.all(g).then(function(a) {
            var b = [];
            for (c = 0, d = a.length; d > c; c += 1) a[c] === !0 && b.push(e[c]);
            f.resolve(b)
        }), f.promise
    },
    getPrimaryAudioData: function(a, b) {
        "use strict";
        var c, d, e = Q.defer(),
            f = [],
            g = this;
        return this.getAudioDatas(a, b).then(function(a) {
            for (a && 0 !== a.length || e.resolve(null), c = 0, d = a.length; d > c; c += 1) f.push(g.getIsMain(a[c]));
            Q.all(f).then(function(b) {
                var f = !1;
                for (c = 0, d = b.length; d > c; c += 1) b[c] === !0 && (f = !0, e.resolve(g.processAdaptation(a[c])));
                f || e.resolve(a[0])
            })
        }), e.promise
    },
    getCodec: function(a) {
        "use strict";
        var b = a.Representation_asArray[0],
            c = b.mimeType + ';codecs="' + b.codecs + '"';
        return Q.when(c)
    },
    getMimeType: function(a) {
        "use strict";
        return Q.when(a.Representation_asArray[0].mimeType)
    },
    getKID: function(a) {
        "use strict";
        return a && a.hasOwnProperty("cenc:default_KID") ? a["cenc:default_KID"] : null
    },
    getContentProtectionData: function(a) {
        "use strict";
        return a && a.hasOwnProperty("ContentProtection_asArray") && 0 !== a.ContentProtection_asArray.length ? Q.when(a.ContentProtection_asArray) : Q.when(null)
    },
    getIsDynamic: function(a) {
        "use strict";
        var b = !1,
            c = "dynamic";
        return a.hasOwnProperty("type") && (b = a.type === c), b
    },
    getIsDVR: function(a) {
        "use strict";
        var b, c, d = this.getIsDynamic(a);
        return b = !isNaN(a.timeShiftBufferDepth), c = d && b, Q.when(c)
    },
    getIsOnDemand: function(a) {
        "use strict";
        var b = !1;
        return a.profiles && a.profiles.length > 0 && (b = -1 !== a.profiles.indexOf("urn:mpeg:dash:profile:isoff-on-demand:2011")), Q.when(b)
    },
    getDuration: function(a) {
        var b;
        return b = a.hasOwnProperty("mediaPresentationDuration") ? a.mediaPresentationDuration : Number.POSITIVE_INFINITY, Q.when(b)
    },
    getBandwidth: function(a) {
        "use strict";
        return Q.when(a.bandwidth)
    },
    getRefreshDelay: function(a) {
        "use strict";
        var b = NaN,
            c = 2;
        return a.hasOwnProperty("minimumUpdatePeriod") && (b = Math.max(parseFloat(a.minimumUpdatePeriod), c)), Q.when(b)
    },
    getRepresentationCount: function(a) {
        "use strict";
        return Q.when(a.Representation_asArray.length)
    },
    getRepresentationFor: function(a, b) {
        "use strict";
        return Q.when(b.Representation_asArray[a])
    },
    getRepresentationsForAdaptation: function(a, b) {
        for (var c, d, e, f, g = this, h = g.processAdaptation(a.Period_asArray[b.period.index].AdaptationSet_asArray[b.index]), i = [], j = Q.defer(), k = 0; k < h.Representation_asArray.length; k += 1) f = h.Representation_asArray[k], c = new Dash.vo.Representation, c.index = k, c.adaptation = b, f.hasOwnProperty("id") && (c.id = f.id), f.hasOwnProperty("SegmentBase") ? (e = f.SegmentBase, c.segmentInfoType = "SegmentBase") : f.hasOwnProperty("SegmentList") ? (e = f.SegmentList, c.segmentInfoType = "SegmentList", c.useCalculatedLiveEdgeTime = !0) : f.hasOwnProperty("SegmentTemplate") ? (e = f.SegmentTemplate, e.hasOwnProperty("SegmentTimeline") ? c.segmentInfoType = "SegmentTimeline" : c.segmentInfoType = "SegmentTemplate", e.hasOwnProperty("initialization") && (c.initialization = e.initialization.split("$Bandwidth$").join(f.bandwidth).split("$RepresentationID$").join(f.id))) : (e = f.BaseURL, c.segmentInfoType = "BaseURL"), e.hasOwnProperty("Initialization") ? (d = e.Initialization, d.hasOwnProperty("sourceURL") ? c.initialization = d.sourceURL : d.hasOwnProperty("range") && (c.initialization = f.BaseURL, c.range = d.range)) : f.hasOwnProperty("mimeType") && g.getIsTextTrack(f.mimeType) && (c.initialization = f.BaseURL, c.range = 0), e.hasOwnProperty("timescale") && (c.timescale = e.timescale), e.hasOwnProperty("duration") && (c.segmentDuration = e.duration / c.timescale), e.hasOwnProperty("startNumber") && (c.startNumber = e.startNumber), e.hasOwnProperty("indexRange") && (c.indexRange = e.indexRange), e.hasOwnProperty("presentationTimeOffset") && (c.presentationTimeOffset = e.presentationTimeOffset / c.timescale), c.MSETimeOffset = g.timelineConverter.calcMSETimeOffset(c), i.push(c);
        return j.resolve(i), j.promise
    },
    getAdaptationsForPeriod: function(a, b) {
        for (var c, d = a.Period_asArray[b.index], e = [], f = 0; f < d.AdaptationSet_asArray.length; f += 1) c = new Dash.vo.AdaptationSet, c.index = f, c.period = b, e.push(c);
        return Q.when(e)
    },
    getRegularPeriods: function(a, b) {
        var c, d, e = this,
            f = Q.defer(),
            g = [],
            h = e.getIsDynamic(a),
            i = null,
            j = null,
            k = null,
            l = null;
        for (c = 0, d = a.Period_asArray.length; d > c; c += 1) j = a.Period_asArray[c], j.hasOwnProperty("start") ? (l = new Dash.vo.Period, l.start = j.start) : null !== i && j.hasOwnProperty("duration") ? (l = new Dash.vo.Period, l.start = k.start + k.duration, l.duration = j.duration) : 0 !== c || h || (l = new Dash.vo.Period, l.start = 0), null !== k && isNaN(k.duration) && (k.duration = l.start - k.start), null !== l && j.hasOwnProperty("id") && (l.id = j.id), null !== l && j.hasOwnProperty("duration") && (l.duration = j.duration), null !== l && (l.index = c, l.mpd = b, g.push(l)), i = j, j = null, k = l, l = null;
        return 0 === g.length ? Q.when(g) : (e.getCheckTime(a, g[0]).then(function(a) {
            b.checkTime = a, null !== k && isNaN(k.duration) ? e.getEndTimeForLastPeriod(b).then(function(a) {
                k.duration = a - k.start, f.resolve(g)
            }) : f.resolve(g)
        }), Q.when(f.promise))
    },
    getMpd: function(a) {
        var b = new Dash.vo.Mpd;
        return b.manifest = a, a.hasOwnProperty("availabilityStartTime") ? b.availabilityStartTime = new Date(a.availabilityStartTime.getTime()) : b.availabilityStartTime = new Date(a.mpdLoadedTime.getTime()), a.hasOwnProperty("availabilityEndTime") && (b.availabilityEndTime = new Date(a.availabilityEndTime.getTime())), a.hasOwnProperty("suggestedPresentationDelay") && (b.suggestedPresentationDelay = a.suggestedPresentationDelay), a.hasOwnProperty("timeShiftBufferDepth") && (b.timeShiftBufferDepth = a.timeShiftBufferDepth), a.hasOwnProperty("maxSegmentDuration") && (b.maxSegmentDuration = a.maxSegmentDuration), Q.when(b)
    },
    getFetchTime: function(a, b) {
        var c = this.timelineConverter.calcPresentationTimeFromWallTime(a.mpdLoadedTime, b);
        return Q.when(c)
    },
    getCheckTime: function(a, b) {
        var c = this,
            d = Q.defer(),
            e = NaN;
        return a.hasOwnProperty("minimumUpdatePeriod") ? c.getFetchTime(a, b).then(function(b) {
            e = b + a.minimumUpdatePeriod, d.resolve(e)
        }) : d.resolve(e), d.promise
    },
    getEndTimeForLastPeriod: function(a) {
        var b;
        if (a.manifest.mediaPresentationDuration) b = a.manifest.mediaPresentationDuration;
        else {
            if (isNaN(a.checkTime)) return Q.fail(new Error("Must have @mediaPresentationDuration or @minimumUpdatePeriod on MPD or an explicit @duration on the last period."));
            b = a.checkTime
        }
        return Q.when(b)
    },
    getEventsForPeriod: function(a, b) {
        var c = a.Period_asArray,
            d = c[b.index].EventStream_asArray,
            e = [];
        if (d)
            for (var f = 0; f < d.length; f += 1) {
                var g = new Dash.vo.EventStream;
                if (g.period = b, g.timescale = 1, !d[f].hasOwnProperty("schemeIdUri")) throw "Invalid EventStream. SchemeIdUri has to be set";
                g.schemeIdUri = d[f].schemeIdUri, d[f].hasOwnProperty("timescale") && (g.timescale = d[f].timescale), d[f].hasOwnProperty("value") && (g.value = d[f].value);
                for (var h = 0; h < d[f].Event_asArray.length; h += 1) {
                    var i = new Dash.vo.Event;
                    i.presentationTime = 0, i.eventStream = g, d[f].Event_asArray[h].hasOwnProperty("presentationTime") && (i.presentationTime = d[f].Event_asArray[h].presentationTime), d[f].Event_asArray[h].hasOwnProperty("duration") && (i.duration = d[f].Event_asArray[h].duration),
                        d[f].Event_asArray[h].hasOwnProperty("id") && (i.id = d[f].Event_asArray[h].id), e.push(i)
                }
            }
        return Q.when(e)
    },
    getEventStreamForAdaptationSet: function(a) {
        var b = [],
            c = a.InbandEventStream_asArray;
        if (c)
            for (var d = 0; d < c.length; d += 1) {
                var e = new Dash.vo.EventStream;
                if (e.timescale = 1, !c[d].hasOwnProperty("schemeIdUri")) throw "Invalid EventStream. SchemeIdUri has to be set";
                e.schemeIdUri = c[d].schemeIdUri, c[d].hasOwnProperty("timescale") && (e.timescale = c[d].timescale), c[d].hasOwnProperty("value") && (e.value = c[d].value), b.push(e)
            }
        return b
    },
    getEventStreamForRepresentation: function(a, b) {
        var c = [],
            d = a.Representation_asArray[b.index].InbandEventStream_asArray;
        if (d)
            for (var e = 0; e < d.length; e++) {
                var f = new Dash.vo.EventStream;
                if (f.timescale = 1, f.representation = b, !d[e].hasOwnProperty("schemeIdUri")) throw "Invalid EventStream. SchemeIdUri has to be set";
                f.schemeIdUri = d[e].schemeIdUri, d[e].hasOwnProperty("timescale") && (f.timescale = d[e].timescale), d[e].hasOwnProperty("value") && (f.value = d[e].value), c.push(f)
            }
        return c
    }
}, Dash.dependencies.DashMetricsExtensions = function() {
    "use strict";
    var a = function(a, b) {
            var c, d, e, f, g, h, i, j;
            for (h = 0; h < a.length; h += 1)
                for (c = a[h], e = c.AdaptationSet_asArray, i = 0; i < e.length; i += 1)
                    for (d = e[i], g = d.Representation_asArray, j = 0; j < g.length; j += 1)
                        if (f = g[j], b === f.id) return j;
            return -1
        },
        b = function(a, b) {
            var c, d, e, f, g, h, i, j;
            for (h = 0; h < a.length; h += 1)
                for (c = a[h], e = c.AdaptationSet_asArray, i = 0; i < e.length; i += 1)
                    for (d = e[i], g = d.Representation_asArray, j = 0; j < g.length; j += 1)
                        if (f = g[j], b === f.id) return f;
            return null
        },
        c = function(a, b) {
            var c = !1;
            return "video" === b ? (this.manifestExt.getIsVideo(a), "video" === a.type && (c = !0)) : "audio" === b ? (this.manifestExt.getIsAudio(a), "audio" === a.type && (c = !0)) : c = !1, c
        },
        d = function(a, b) {
            var d, e, f, g, h, i;
            for (h = 0; h < a.length; h += 1)
                for (d = a[h], f = d.AdaptationSet_asArray, i = 0; i < f.length; i += 1)
                    if (e = f[i], g = e.Representation_asArray, c.call(this, e, b)) return g.length;
            return -1
        },
        e = function(a) {
            var c, d = this,
                e = d.manifestModel.getValue(),
                f = e.Period_asArray;
            return c = b.call(d, f, a), null === c ? null : c.bandwidth
        },
        f = function(b) {
            var c, d = this,
                e = d.manifestModel.getValue(),
                f = e.Period_asArray;
            return c = a.call(d, f, b)
        },
        g = function(a) {
            var b, c = this,
                e = c.manifestModel.getValue(),
                f = e.Period_asArray;
            return b = d.call(this, f, a)
        },
        h = function(a) {
            if (null === a) return null;
            var b, c, d, e = a.RepSwitchList;
            return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
        },
        i = function(a) {
            if (null === a) return null;
            var b, c, d, e = a.BufferLevel;
            return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
        },
        j = function(a) {
            if (null === a) return null;
            var b, c, d = a.HttpList,
                e = null;
            if (null === d || d.length <= 0) return null;
            for (b = d.length, c = b - 1; c > 0;) {
                if (d[c].responsecode) {
                    e = d[c];
                    break
                }
                c -= 1
            }
            return e
        },
        k = function(a) {
            return null === a ? [] : a.HttpList ? a.HttpList : []
        },
        l = function(a) {
            if (null === a) return null;
            var b, c, d, e = a.DroppedFrames;
            return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
        },
        m = function(a) {
            if (null === a) return null;
            var b, c = a.DVRInfo,
                d = null;
            return null === c || c.length <= 0 ? null : (b = c.length - 1, d = c[b])
        },
        n = function(a) {
            if (null === a) return null;
            var b, c, d, e = a.ManifestUpdate;
            return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
        };
    return {
        manifestModel: void 0,
        manifestExt: void 0,
        getBandwidthForRepresentation: e,
        getIndexForRepresentation: f,
        getMaxIndexForBufferType: g,
        getCurrentRepresentationSwitch: h,
        getCurrentBufferLevel: i,
        getCurrentHttpRequest: j,
        getHttpRequests: k,
        getCurrentDroppedFrames: l,
        getCurrentDVRInfo: m,
        getCurrentManifestUpdate: n
    }
}, Dash.dependencies.DashMetricsExtensions.prototype = {
    constructor: Dash.dependencies.DashMetricsExtensions
}, Dash.dependencies.DashParser = function() {
    "use strict";
    var a = 31536e3,
        b = 2592e3,
        c = 86400,
        d = 3600,
        e = 60,
        f = 60,
        g = 1e3,
        h = /^P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/,
        i = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2})([0-9]{2}))?/,
        j = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/,
        k = [{
            type: "duration",
            test: function(a) {
                return h.test(a)
            },
            converter: function(f) {
                var g = h.exec(f);
                return parseFloat(g[2] || 0) * a + parseFloat(g[4] || 0) * b + parseFloat(g[6] || 0) * c + parseFloat(g[8] || 0) * d + parseFloat(g[10] || 0) * e + parseFloat(g[12] || 0)
            }
        }, {
            type: "datetime",
            test: function(a) {
                return i.test(a)
            },
            converter: function(a) {
                var b, c = i.exec(a);
                if (b = Date.UTC(parseInt(c[1], 10), parseInt(c[2], 10) - 1, parseInt(c[3], 10), parseInt(c[4], 10), parseInt(c[5], 10), c[6] && parseInt(c[6], 10) || 0, c[7] && parseFloat(c[7]) * g || 0), c[9] && c[10]) {
                    var d = parseInt(c[9], 10) * f + parseInt(c[10], 10);
                    b += ("+" === c[8] ? -1 : 1) * d * e * g
                }
                return new Date(b)
            }
        }, {
            type: "numeric",
            test: function(a) {
                return j.test(a)
            },
            converter: function(a) {
                return parseFloat(a)
            }
        }],
        l = function() {
            var a, b, c, d;
            return d = [{
                name: "profiles",
                merge: !1
            }, {
                name: "width",
                merge: !1
            }, {
                name: "height",
                merge: !1
            }, {
                name: "sar",
                merge: !1
            }, {
                name: "frameRate",
                merge: !1
            }, {
                name: "audioSamplingRate",
                merge: !1
            }, {
                name: "mimeType",
                merge: !1
            }, {
                name: "segmentProfiles",
                merge: !1
            }, {
                name: "codecs",
                merge: !1
            }, {
                name: "maximumSAPPeriod",
                merge: !1
            }, {
                name: "startsWithSap",
                merge: !1
            }, {
                name: "maxPlayoutRate",
                merge: !1
            }, {
                name: "codingDependency",
                merge: !1
            }, {
                name: "scanType",
                merge: !1
            }, {
                name: "FramePacking",
                merge: !0
            }, {
                name: "AudioChannelConfiguration",
                merge: !0
            }, {
                name: "ContentProtection",
                merge: !0
            }], a = {}, a.name = "AdaptationSet", a.isRoot = !1, a.isArray = !0, a.parent = null, a.children = [], a.properties = d, b = {}, b.name = "Representation", b.isRoot = !1, b.isArray = !0, b.parent = a, b.children = [], b.properties = d, a.children.push(b), c = {}, c.name = "SubRepresentation", c.isRoot = !1, c.isArray = !0, c.parent = b, c.children = [], c.properties = d, b.children.push(c), a
        },
        m = function() {
            var a, b, c, d;
            return d = [{
                name: "SegmentBase",
                merge: !0
            }, {
                name: "SegmentTemplate",
                merge: !0
            }, {
                name: "SegmentList",
                merge: !0
            }], a = {}, a.name = "Period", a.isRoot = !1, a.isArray = !0, a.parent = null, a.children = [], a.properties = d, b = {}, b.name = "AdaptationSet", b.isRoot = !1, b.isArray = !0, b.parent = a, b.children = [], b.properties = d, a.children.push(b), c = {}, c.name = "Representation", c.isRoot = !1, c.isArray = !0, c.parent = b, c.children = [], c.properties = d, b.children.push(c), a
        },
        n = function() {
            var a, b, c, d, e;
            return e = [{
                name: "BaseURL",
                merge: !0,
                mergeFunction: function(a, b) {
                    var c;
                    return c = 0 === b.indexOf("http://") ? b : a + b
                }
            }], a = {}, a.name = "mpd", a.isRoot = !0, a.isArray = !0, a.parent = null, a.children = [], a.properties = e, b = {}, b.name = "Period", b.isRoot = !1, b.isArray = !0, b.parent = null, b.children = [], b.properties = e, a.children.push(b), c = {}, c.name = "AdaptationSet", c.isRoot = !1, c.isArray = !0, c.parent = b, c.children = [], c.properties = e, b.children.push(c), d = {}, d.name = "Representation", d.isRoot = !1, d.isArray = !0, d.parent = c, d.children = [], d.properties = e, c.children.push(d), a
        },
        o = function() {
            var a = [];
            return a.push(l()), a.push(m()), a.push(n()), a
        },
        p = function(a, b) {
            var c, d = new X2JS(k, "", !0),
                e = new ObjectIron(o()),
                f = new Date,
                g = null,
                h = null;
            try {
                c = d.xml_str2json(a), g = new Date, c.hasOwnProperty("BaseURL") ? (c.BaseURL = c.BaseURL_asArray[0], 0 !== c.BaseURL.toString().indexOf("http") && (c.BaseURL = b + c.BaseURL)) : c.BaseURL = b, e.run(c), h = new Date, this.debug.log("Parsing complete: ( xml2json: " + (g.getTime() - f.getTime()) + "ms, objectiron: " + (h.getTime() - g.getTime()) + "ms, total: " + (h.getTime() - f.getTime()) / 1e3 + "s)")
            } catch (i) {
                return this.errHandler.manifestError("parsing the manifest failed", "parse", a), Q.reject(i)
            }
            return Q.when(c)
        };
    return {
        debug: void 0,
        errHandler: void 0,
        parse: p
    }
}, Dash.dependencies.DashParser.prototype = {
    constructor: Dash.dependencies.DashParser
}, Dash.dependencies.FragmentExtensions = function() {
    "use strict";
    var a = function(a) {
            for (var b, c, d, e, f, g, h = Q.defer(), i = new DataView(a), j = 0;
                "tfdt" !== e && j < i.byteLength;) {
                for (d = i.getUint32(j), j += 4, e = "", f = 0; 4 > f; f += 1) g = i.getInt8(j), e += String.fromCharCode(g), j += 1;
                "moof" !== e && "traf" !== e && "tfdt" !== e && (j += d - 8)
            }
            if (j === i.byteLength) throw "Error finding live offset.";
            return c = i.getUint8(j), this.debug.log("position: " + j), 0 === c ? (j += 4, b = i.getUint32(j, !1)) : (j += d - 16, b = utils.Math.to64BitNumber(i.getUint32(j + 4, !1), i.getUint32(j, !1))), h.resolve({
                version: c,
                base_media_decode_time: b
            }), h.promise
        },
        b = function(a) {
            for (var b, c, d, e, f, g, h, i = new DataView(a), j = 0;
                "sidx" !== f && j < i.byteLength;) {
                for (g = i.getUint32(j), j += 4, f = "", e = 0; 4 > e; e += 1) h = i.getInt8(j), f += String.fromCharCode(h), j += 1;
                "moof" !== f && "traf" !== f && "sidx" !== f ? j += g - 8 : "sidx" === f && (j -= 8)
            }
            return b = i.getUint8(j + 8), j += 12, c = i.getUint32(j + 4, !1), j += 8, d = 0 === b ? i.getUint32(j, !1) : utils.Math.to64BitNumber(i.getUint32(j + 4, !1), i.getUint32(j, !1)), Q.when({
                earliestPresentationTime: d,
                timescale: c
            })
        },
        c = function(b) {
            var c, d, e, f = Q.defer(),
                g = new XMLHttpRequest,
                h = !1;
            return c = b, g.onloadend = function() {
                h || (d = "Error loading fragment: " + c, f.reject(d))
            }, g.onload = function() {
                h = !0, e = a(g.response), f.resolve(e)
            }, g.onerror = function() {
                d = "Error loading fragment: " + c, f.reject(d)
            }, g.responseType = "arraybuffer", g.open("GET", c), g.send(null), f.promise
        };
    return {
        debug: void 0,
        loadFragment: c,
        parseTFDT: a,
        parseSIDX: b
    }
}, Dash.dependencies.FragmentExtensions.prototype = {
    constructor: Dash.dependencies.FragmentExtensions
}, Dash.dependencies.TimelineConverter = function() {
    "use strict";
    var a = 0,
        b = function(a, b, c, d) {
            var e = NaN;
            return e = d ? c && b.timeShiftBufferDepth != Number.POSITIVE_INFINITY ? new Date(b.availabilityStartTime.getTime() + 1e3 * (a + b.timeShiftBufferDepth)) : b.availabilityEndTime : c ? new Date(b.availabilityStartTime.getTime() + 1e3 * a) : b.availabilityStartTime
        },
        c = function(a, c, d) {
            return b.call(this, a, c, d)
        },
        d = function(a, c, d) {
            return b.call(this, a, c, d, !0)
        },
        e = function(a) {
            var b, c = "dynamic" === a.mpd.manifest.type,
                d = parseInt(this.uriQueryFragModel.getURIFragmentData.s);
            return c ? (!isNaN(d) && d > 1262304e3 && (b = d - a.mpd.availabilityStartTime.getTime() / 1e3, (b > a.liveEdge || b < a.liveEdge - a.mpd.timeShiftBufferDepth) && (b = null)), b = b || a.liveEdge) : b = !isNaN(d) && d < a.duration && d >= 0 ? d : a.start, b
        },
        f = function(a, b) {
            return (a.getTime() - b.mpd.availabilityStartTime.getTime()) / 1e3
        },
        g = function(a, b) {
            var c = b.presentationTimeOffset;
            return a - c
        },
        h = function(a, b) {
            var c = b.presentationTimeOffset;
            return c + a
        },
        i = function(a, b) {
            var c, d, e;
            return b && (c = a.representation.adaptation.period.mpd.suggestedPresentationDelay, d = a.presentationStartTime + c, e = new Date(a.availabilityStartTime.getTime() + 1e3 * d)), e
        },
        j = function(a, b, c) {
            var d, e = this,
                f = a.adaptation.period.start,
                g = e.calcSegmentAvailabilityRange(a, c);
            return b >= g.start + f && b <= g.end + f ? b : d = Math.max(g.end - 2 * a.adaptation.period.mpd.manifest.minBufferTime, g.start)
        },
        k = function(b, c) {
            var d, e, g = b.segmentDuration,
                h = 0,
                i = b.adaptation.period.duration,
                j = {
                    start: h,
                    end: i
                };
            return c ? b.adaptation.period.mpd.isClientServerTimeSyncCompleted && !isNaN(g) || !b.segmentAvailabilityRange ? (d = b.adaptation.period.mpd.checkTime, e = f(new Date((new Date).getTime() + a), b.adaptation.period), h = Math.max(e - b.adaptation.period.mpd.timeShiftBufferDepth, 0), d += a / 1e3, i = isNaN(d) ? e : Math.min(d, e), j = {
                start: h,
                end: i
            }) : b.segmentAvailabilityRange : j
        },
        l = function(b, c, d) {
            d.mpd.isClientServerTimeSyncCompleted || (d.mpd.clientServerTimeShift = c - b, d.mpd.isClientServerTimeSyncCompleted = !0, a = 1e3 * d.mpd.clientServerTimeShift)
        },
        m = function(a) {
            var b = a.presentationTimeOffset;
            return -b
        };
    return {
        system: void 0,
        debug: void 0,
        uriQueryFragModel: void 0,
        setup: function() {
            this.system.mapHandler("liveEdgeFound", void 0, l.bind(this))
        },
        calcAvailabilityStartTimeFromPresentationTime: c,
        calcAvailabilityEndTimeFromPresentationTime: d,
        calcPresentationTimeFromWallTime: f,
        calcPresentationTimeFromMediaTime: g,
        calcPresentationStartTime: e,
        calcActualPresentationTime: j,
        calcMediaTimeFromPresentationTime: h,
        calcSegmentAvailabilityRange: k,
        calcWallTimeForSegment: i,
        calcMSETimeOffset: m
    }
}, Dash.dependencies.TimelineConverter.prototype = {
    constructor: Dash.dependencies.TimelineConverter
}, Dash.vo.AdaptationSet = function() {
    "use strict";
    this.period = null, this.index = -1
}, Dash.vo.AdaptationSet.prototype = {
    constructor: Dash.vo.AdaptationSet
}, Dash.vo.Event = function() {
    "use strict";
    this.duration = NaN, this.presentationTime = NaN, this.id = NaN, this.messageData = "", this.eventStream = null, this.presentationTimeDelta = NaN
}, Dash.vo.Event.prototype = {
    constructor: Dash.vo.Event
}, Dash.vo.EventStream = function() {
    "use strict";
    this.adaptionSet = null, this.representation = null, this.period = null, this.timescale = 1, this.value = "", this.schemeIdUri = ""
}, Dash.vo.EventStream.prototype = {
    constructor: Dash.vo.EventStream
}, Dash.vo.Mpd = function() {
    "use strict";
    this.manifest = null, this.suggestedPresentationDelay = 0, this.availabilityStartTime = null, this.availabilityEndTime = Number.POSITIVE_INFINITY, this.timeShiftBufferDepth = Number.POSITIVE_INFINITY, this.maxSegmentDuration = Number.POSITIVE_INFINITY, this.checkTime = NaN, this.clientServerTimeShift = 0, this.isClientServerTimeSyncCompleted = !1
}, Dash.vo.Mpd.prototype = {
    constructor: Dash.vo.Mpd
}, Dash.vo.Period = function() {
    "use strict";
    this.id = null, this.index = -1, this.duration = NaN, this.start = NaN, this.mpd = null, this.liveEdge = NaN
}, Dash.vo.Period.prototype = {
    constructor: Dash.vo.Period
}, Dash.vo.Representation = function() {
    "use strict";
    this.id = null, this.index = -1, this.adaptation = null, this.segmentInfoType = null, this.initialization = null, this.segmentDuration = NaN, this.timescale = 1, this.startNumber = 1, this.indexRange = null, this.range = null, this.presentationTimeOffset = 0, this.MSETimeOffset = NaN, this.segmentAvailabilityRange = null, this.availableSegmentsNumber = 0
}, Dash.vo.Representation.prototype = {
    constructor: Dash.vo.Representation
}, Dash.vo.Segment = function() {
    "use strict";
    this.indexRange = null, this.index = null, this.mediaRange = null, this.media = null, this.duration = NaN, this.replacementTime = null, this.replacementNumber = NaN, this.mediaStartTime = NaN, this.presentationStartTime = NaN, this.availabilityStartTime = NaN, this.availabilityEndTime = NaN, this.availabilityIdx = NaN, this.wallStartTime = NaN, this.representation = null
}, Dash.vo.Segment.prototype = {
    constructor: Dash.vo.Segment
}, MediaPlayer.dependencies.AbrController = function() {
    "use strict";
    var a = !0,
        b = {},
        c = {},
        d = 0,
        e = 0,
        f = -1,
        g = -1,
        h = [0],
        i = [350, 600, 1e3, 2e3, 3e3],
        j = 5,
        k = 10,
        l = 1,
        m = 0,
        n = -1,
        o = [],
        p = function(a) {
            var c;
            return b.hasOwnProperty(a) || (b[a] = 0), c = b[a]
        },
        q = function(a, c) {
            b[a] = c
        },
        r = function(a) {
            var b;
            return c.hasOwnProperty(a) || (c[a] = 0), b = c[a]
        },
        s = function(a, b) {
            c[a] = b
        };
    return {
        debug: void 0,
        abrRulesCollection: void 0,
        manifestExt: void 0,
        metricsModel: void 0,
        metricsExt: void 0,
        fastMPC: void 0,
        bwPredictor: void 0,
        vbr: void 0,
        festive: void 0,
        getBitrateBB: function(a) {
            var b = this,
                c = 0,
                d = 0;
            c = j >= a ? i[0] : a > j + k ? i[4] : i[0] + (i[4] - i[0]) * (a - j) / k;
            for (var e = 4; e >= 0; e--) {
                if (c >= i[e]) {
                    d = e;
                    break
                }
                d = e
            }
            return b.debug.log("----------BB: tmpBitrate=" + c + ", tmpQuality=" + d + ", bufferLevel=" + a), d
        },
        getBitrateRB: function(a) {
            var b = this,
                c = 0,
                d = 0;
            c = a * l;
            for (var e = 4; e >= 0; e--) {
                if (c >= i[e]) {
                    d = e;
                    break
                }
                d = e
            }
            return b.debug.log("----------RB: tmpBitrate=" + c + ", tmpQuality=" + d + ", bandwidth=" + a), d
        },
        getAutoSwitchBitrate: function() {
            return a
        },
        setAutoSwitchBitrate: function(b) {
            a = b
        },
        setAbrAlgorithm: function(a) {
            n = a, console.log("-----VISUAL: set abrAlgo=" + n)
        },
        setFixedBitrateArray: function(a) {
            o = a, console.log("-----VISUAL: set fixedBitrateArray")
        },
        getMetricsFor: function(a) {
            var b = Q.defer(),
                c = this;
            return c.manifestExt.getIsVideo(a).then(function(d) {
                d ? b.resolve(c.metricsModel.getMetricsFor("video")) : c.manifestExt.getIsAudio(a).then(function(a) {
                    a ? b.resolve(c.metricsModel.getMetricsFor("audio")) : b.resolve(c.metricsModel.getMetricsFor("stream"))
                })
            }), b.promise
        },
        getPlaybackQuality: function(b, c, j, k, l, t) {
            var u, v, w, x, y, z, A, B, C, D, E = this,
                F = Q.defer(),
                G = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,
                H = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,
                I = [];
            return y = p(b), z = r(b), y = d, j === k && f === j ? a ? E.getMetricsFor(c).then(function(a) {
                E.abrRulesCollection.getRules().then(function(p) {
                    for (u = 0, v = p.length; v > u; u += 1) I.push(p[u].checkIndex(y, a, c));
                    Q.all(I).then(function(p) {
                        for (x = {}, x[MediaPlayer.rules.SwitchRequest.prototype.STRONG] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, x[MediaPlayer.rules.SwitchRequest.prototype.WEAK] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, x[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, u = 0, v = p.length; v > u; u += 1) w = p[u], w.quality !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (x[w.priority] = Math.min(x[w.priority], w.quality));
                        x[MediaPlayer.rules.SwitchRequest.prototype.WEAK] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (H = MediaPlayer.rules.SwitchRequest.prototype.WEAK, G = x[MediaPlayer.rules.SwitchRequest.prototype.WEAK]), x[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (H = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT, G = x[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT]), x[MediaPlayer.rules.SwitchRequest.prototype.STRONG] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (H = MediaPlayer.rules.SwitchRequest.prototype.STRONG, G = x[MediaPlayer.rules.SwitchRequest.prototype.STRONG]), G !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && void 0 !== G && (y = G), H !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && void 0 !== H && (z = H), E.debug.log("-----Original: quality: " + y + ", confidence: " + z), E.manifestExt.getRepresentationCount(c).then(function(c) {
                            0 > y && (y = 0), y >= c && (y = c - 1), z != MediaPlayer.rules.SwitchRequest.prototype.STRONG && z != MediaPlayer.rules.SwitchRequest.prototype.WEAK && (z = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT);
                            var p = y;
                            if (y = d, D = 0, j === k && f === j) {
                                if (f >= 0 && a && (A = E.metricsExt.getCurrentHttpRequest(a))) {
                                    B = E.bwPredictor.predictBandwidth(f, g, A);
                                    var r = 4;
                                    switch (m = l - .15 - .4 - r, E.debug.log("-----abrController: baseBuffer=" + r), h[f + 1] = l, E.debug.log("-----bufferLevelLog=" + h[f + 1]), n) {
                                        case 5:
                                            y = o[f + 1], void 0 === y && (y = 0, console.log("fixedQualityArray, chunk after " + f + " is undefined"));
                                            break;
                                        case 0:
                                            C = E.bwPredictor.getCombinedPredictionError(f), y = E.fastMPC.getBitrate(g, m, B / (1 + C));
                                            break;
                                        case 1:
                                            y = E.getBitrateBB(m);
                                            break;
                                        case 2:
                                            y = E.getBitrateRB(B);
                                            break;
                                        case 3:
                                            y = p;
                                            break;
                                        case 4:
                                            y = E.festive.getBitrate(g, m, B, f, i);
                                            break;
                                        case -1:
                                            C = E.bwPredictor.getCombinedPredictionError(f), y = E.fastMPC.getBitrate(g, m, B / (1 + C));
                                            break;
                                        default:
                                            y = 0
                                    }
                                }
                                e += 1, f = j + 1, g = y
                            }
                            d = y, E.debug.log("XIAOQI: abrController: lastRequested=" + j + ", lastBuffered=" + k + ", chunkCount=" + e + ", quality=" + y), q(b, y), s(b, z), F.resolve({
                                quality: y,
                                confidence: z
                            })
                        })
                    })
                })
            }) : (E.debug.log("Unchanged quality of " + y), F.resolve({
                quality: y,
                confidence: z
            })) : F.resolve({
                quality: y,
                confidence: .5
            }), F.promise
        },
        setPlaybackQuality: function(a, b) {
            var c = p(a);
            b !== c && q(a, b)
        },
        getQualityFor: function(a) {
            return p(a)
        }
    }
}, MediaPlayer.dependencies.AbrController.prototype = {
    constructor: MediaPlayer.dependencies.AbrController
}, MediaPlayer.dependencies.BufferController = function() {
    "use strict";
    var a, b, c, d, e, f, g, h, i, j = .15,
        k = 22,
        l = "WAITING",
        m = "READY",
        n = "VALIDATING",
        o = "LOADING",
        p = l,
        q = !1,
        r = !1,
        s = !1,
        t = !0,
        u = [],
        v = !1,
        w = -1,
        x = !0,
        y = -1,
        z = -1,
        A = !1,
        B = !1,
        C = !1,
        D = [],
        E = null,
        F = Q.defer(),
        G = null,
        H = null,
        I = null,
        J = 0,
        K = null,
        L = 0,
        M = !1,
        N = null,
        O = 0,
        P = !1,
        R = null,
        S = null,
        T = null,
        U = null,
        V = !1,
        W = null,
        X = null,
        Y = null,
        Z = null,
        _ = !0,
        aa = !1,
        ba = [],
        ca = -1,
        da = -1,
        ea = -1,
        fa = [],
        ga = [],
        ha = [],
        ia = 0,
        ja = 0,
        ka = 0,
        la = [350, 600, 1e3, 2e3, 3e3],
        ma = 0,
        na = 0,
        oa = 0,
        pa = [],
        qa = [],
        ra = [],
        sa = [],
        ta = [],
        ua = function(a) {
            var b = this;
            b.debug.log("BufferController " + f + " setState to:" + a), p = a, null !== K && b.fragmentController.onBufferControllerStateChange()
        },
        va = function(a, b) {
            var c = 0,
                d = null;
            _ === !1 && (d = Z.start, c = a.getTime() - d.getTime(), Z.duration = c, Z.stopreason = b, _ = !0)
        },
        wa = function() {
            q && r && (ua.call(this, m), this.requestScheduler.startScheduling(this, db), K = this.fragmentController.attachBufferController(this))
        },
        xa = function() {
            var a;
            this.requestScheduler.isScheduled(this) || (v === !1 && (a = new Date, va(a, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON), Y = this.metricsModel.addPlayList(f, a, 0, MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON)), this.debug.log("BufferController " + f + " start."), r = !0, s = !0, wa.call(this))
        },
        ya = function(a) {
            var b;
            this.debug.log("BufferController " + f + " seek: " + a), v = !0, w = a, b = new Date, va(b, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON), Y = this.metricsModel.addPlayList(f, b, w, MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON), xa.call(this)
        },
        za = function() {
            p !== l && (this.debug.log("BufferController " + f + " stop."), ua.call(this, C ? m : l), this.requestScheduler.stopScheduling(this), this.fragmentController.cancelPendingRequestsForModel(K), r = !1, s = !1, va(new Date, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON))
        },
        Aa = function(a, b) {
            var c = this,
                d = Q.defer(),
                e = c.manifestModel.getValue();
            return c.manifestExt.getDataIndex(a, e, b.index).then(function(a) {
                c.manifestExt.getAdaptationsForPeriod(e, b).then(function(b) {
                    c.manifestExt.getRepresentationsForAdaptation(e, b[a]).then(function(a) {
                        d.resolve(a)
                    })
                })
            }), d.promise
        },
        Ba = function(b) {
            return a[b]
        },
        Ca = function() {
            var a = this;
            p === o && (A && (A = !1, this.videoModel.stallStream(f, A), eb(A), a.debug.log("---------------REBUFFER: numRebuffer=" + ia + ", start:" + fa[ia - 1].getTime() + ", end:" + ga[ia - 1].getTime() + ", duration: " + ha[ia - 1] + " ms")), a.debug.log("----------Set state to READY in finishValidation"), ua.call(a, m))
        },
        Da = function(a) {
            if (this.fragmentController.isInitializationRequest(a)) ua.call(this, m);
            else {
                ua.call(this, o);
                var b = this,
                    c = b.fragmentController.getLoadingTime(b);
                if (c = 100, null !== R) return;
                R = setTimeout(function() {
                    $a() && (ua.call(b, m), cb.call(b), R = null)
                }, c)
            }
        },
        Ea = function(a, b) {
            this.fragmentController.isInitializationRequest(a) ? Na.call(this, a, b) : Fa.call(this, a, b)
        },
        Fa = function(a, b) {
            var c = this,
                d = Ba.call(c, a.quality),
                e = this.manifestExt.getEventStreamForAdaptationSet(c.getData()),
                g = this.manifestExt.getEventStreamForRepresentation(c.getData(), d);
            O || isNaN(a.duration) || (O = a.duration), c.fragmentController.process(b.data).then(function(b) {
                null !== b && null !== E ? ((e.length > 0 || g.length > 0) && Ia.call(c, b, a, e, g).then(function(a) {
                    c.eventController.addInbandEvents(a)
                }), Q.when(E.promise).then(function() {
                    Ja.call(c, b).then(function(b) {
                        Ga.call(c, b, a.quality, a.index).then(function() {
                            F.promise.then(function(b) {
                                b.index - 1 !== a.index || C || (C = !0, A && (A = !1, c.videoModel.stallStream(f, A), eb(A), c.debug.log("---------------REBUFFER: numRebuffer=" + ia + ", start:" + fa[ia - 1].getTime() + ", end:" + ga[ia - 1].getTime() + ", duration: " + ha[ia - 1] + " ms")), c.debug.log("----------Set state to READY in onMediaLoaded"), ua.call(c, m), c.system.notify("bufferingCompleted"))
                            })
                        })
                    })
                })) : c.debug.log("No " + f + " bytes to push.")
            })
        },
        Ga = function(a, c, d) {
            var e, g = this,
                i = void 0 === d,
                j = N && a == N.data,
                m = j ? G : Q.defer(),
                n = j ? D.length : D.push(m),
                o = g.videoModel.getCurrentTime(),
                q = new Date;
            return g.debug.log("XIAOQI: bufferController ENTERING appendToBuffer, quality=" + c + ", index=" + d), _ === !0 && p !== l && -1 !== y && (_ = !1, Z = g.metricsModel.appendPlayListTrace(Y, b.id, null, q, o, null, 1, null)), Q.when(j || 2 > n || D[n - 2].promise).then(function() {
                $a() && La.call(g).then(function() {
                    return c !== y && i || c !== z && !i ? (g.debug.log("XIAOQI: bufferController appendToBuffer, quality !== currentQuality"), e = K.getExecutedRequestForQualityAndIndex(c, d), e && (window.removed = e, K.removeExecutedRequest(e), i || g.indexHandler.getSegmentRequestForTime(b, e.startTime).then(Xa.bind(g))), m.resolve(), void(j && (G = null, N = null))) : void Q.when(H ? H.promise : !0).then(function() {
                        $a() && g.sourceBufferExt.append(X, a, g.videoModel).then(function() {
                            j && (G = null, N = null), i && (z = c), !g.requestScheduler.isScheduled(g) && Za.call(g) && xa.call(g), M = !1, g.debug.log("XIAOQI: bufferController.appendToBuffer: appended"), Ha.call(g).then(function() {
                                if (!i && (ba[d] = c, ea = d, g.debug.log("XIAOQI: bufferController.appendToBuffer: bufferedSegmentQuality[" + d + "]=" + ba[d]), h = new Date, ia > 0 && (ra[d] = h.getTime() - fa[0].getTime(), g.debug.log("----------BufferController: Chunk " + d + " appended, time = " + ra[d])), 64 === d)) {
                                    ma = 0, na = 0;
                                    for (var a = 0; a < ba.length; a++) ma += la[ba[a]], a > 0 && (na += Math.abs(la[ba[a]] - la[ba[a - 1]]));
                                    oa = ma - na - 3 * (ja + ka), g.debug.log("----------FINAL RESULTS: totalQoE=" + oa + ", totalBitrate" + ma + ", totalInstability" + na + ", totalRebufferTime" + ja + ", startupTime" + ka), pa = [oa, ma, na, ja, ka], qa = pa.concat(ba, g.bwPredictor.getPastThroughput(), g.bwPredictor.getBandwidthEstLog()), g.debug.log("----------FINAL RESULTS: pastThroughput length=" + g.bwPredictor.getPastThroughput().length + ", bandwidthEstLog length=" + g.bwPredictor.getBandwidthEstLog().length), $(document).ready(function() {
                                        $.ajax({
                                            url: "http://localhost:8001/receive",
                                            data: qa.join(","),
                                            type: "POST",
                                            cache: !1
                                        })
                                    })
                                }
                                m.resolve()
                            }), g.sourceBufferExt.getAllRanges(X).then(function(a) {
                                if (a && a.length > 0) {
                                    var b, c;
                                    for (b = 0, c = a.length; c > b; b += 1) g.debug.log("Buffered " + f + " Range: " + a.start(b) + " - " + a.end(b))
                                }
                            })
                        }, function(b) {
                            b.err.code === k && (N = {
                                data: a,
                                quality: c,
                                index: d
                            }, G = m, M = !0, J = 0, za.call(g))
                        })
                    })
                })
            }), m.promise
        },
        Ha = function() {
            if (!$a()) return Q.when(!1);
            var a = this,
                c = Q.defer(),
                d = ab.call(a);
            return a.manifestExt.getMpd(a.manifestModel.getValue()).then(function(c) {
                var e = a.timelineConverter.calcSegmentAvailabilityRange(b, B);
                a.metricsModel.addDVRInfo(f, d, c, e)
            }), a.sourceBufferExt.getBufferLength(X, d).then(function(b) {
                return $a() ? (L = b, a.metricsModel.addBufferLevel(f, new Date, L), Ka.call(a), Ya.call(a), void c.resolve()) : void c.reject()
            }), c.promise
        },
        Ia = function(a, b, c, d) {
            var e, f, g, h = [],
                i = 0,
                j = Math.pow(256, 2),
                k = Math.pow(256, 3),
                l = Math.max(isNaN(b.startTime) ? 0 : b.startTime, 0),
                m = [];
            aa = !1, g = c.concat(d);
            for (var n = 0; n < g.length; n++) m[g[n].schemeIdUri] = g[n];
            for (; i < a.length && (e = String.fromCharCode(a[i + 4], a[i + 5], a[i + 6], a[i + 7]), f = a[i] * k + a[i + 1] * j + 256 * a[i + 2] + 1 * a[i + 3], "moov" != e && "moof" != e);) {
                if ("emsg" == e) {
                    aa = !0;
                    for (var o = ["", "", 0, 0, 0, 0, ""], p = 0, q = i + 12; f + i > q;) 0 === p || 1 == p || 6 == p ? (0 !== a[q] ? o[p] += String.fromCharCode(a[q]) : p += 1, q += 1) : (o[p] = a[q] * k + a[q + 1] * j + 256 * a[q + 2] + 1 * a[q + 3], q += 4, p += 1);
                    var r = o[0],
                        s = o[1],
                        t = o[2],
                        u = o[3],
                        v = o[4],
                        w = o[5],
                        x = o[6],
                        y = l * t + u;
                    if (m[r]) {
                        var z = new Dash.vo.Event;
                        z.eventStream = m[r], z.eventStream.value = s, z.eventStream.timescale = t, z.duration = v, z.id = w, z.presentationTime = y, z.messageData = x, z.presentationTimeDelta = u, h.push(z)
                    }
                }
                i += f
            }
            return Q.when(h)
        },
        Ja = function(a) {
            if (!aa) return Q.when(a);
            for (var b, c, d = a.length, e = 0, f = 0, g = Math.pow(256, 2), h = Math.pow(256, 3), i = new Uint8Array(a.length); d > e;) {
                if (b = String.fromCharCode(a[e + 4], a[e + 5], a[e + 6], a[e + 7]), c = a[e] * h + a[e + 1] * g + 256 * a[e + 2] + 1 * a[e + 3], "emsg" != b)
                    for (var j = e; e + c > j; j++) i[f] = a[j], f += 1;
                e += c
            }
            return Q.when(i.subarray(0, f))
        },
        Ka = function() {
            var a = this,
                b = this.bufferExt.getLeastBufferLevel(),
                c = 2 * O,
                d = L - b;
            d > c && !H ? (J = 0, a.debug.log("XIAOQI: bufferController: ENTERING checkGapBetweenBuffers fragmentsToLoad = " + J), H = Q.defer()) : c > d && H && (H.resolve(), H = null)
        },
        La = function() {
            var a, b = this,
                c = Q.defer(),
                d = 0;
            return M ? (a = function() {
                Ma.call(b).then(function(b) {
                    d += b, d >= O ? c.resolve() : setTimeout(a, 1e3 * O)
                })
            }, a.call(b), c.promise) : Q.when(!0)
        },
        Ma = function() {
            var a, b, c = this,
                e = Q.defer(),
                f = c.videoModel.getCurrentTime(),
                g = 0;
            return b = c.fragmentController.getExecutedRequestForTime(K, f), a = b && !isNaN(b.startTime) ? b.startTime : Math.floor(f), O = b && !isNaN(b.duration) ? b.duration : 1, c.sourceBufferExt.getBufferRange(X, f).then(function(b) {
                null === b && w === f && X.buffered.length > 0 && (a = X.buffered.end(X.buffered.length - 1)), g = X.buffered.start(0), c.sourceBufferExt.remove(X, g, a, I.duration, d).then(function() {
                    c.fragmentController.removeExecutedRequestsBeforeTime(K, a), e.resolve(a - g)
                })
            }), e.promise
        },
        Na = function(a, b) {
            var c = this,
                d = b.data,
                e = a.quality;
            c.debug.log("Initialization finished loading: " + a.streamType), c.fragmentController.process(d).then(function(b) {
                null !== b ? (u[e] = b, e === y && Ga.call(c, b, a.quality).then(function() {
                    E.resolve()
                })) : c.debug.log("No " + f + " bytes to push.")
            })
        },
        Oa = function() {
            p === o && ua.call(this, m), this.system.notify("segmentLoadingFailed")
        },
        Pa = function() {
            var a = this,
                c = b.segmentAvailabilityRange,
                d = 43200;
            return T = c.end, S = {
                start: Math.max(0, T - d),
                end: T + d
            }, U = Math.floor((c.end - c.start) / 2), e = Q.defer(), b.useCalculatedLiveEdgeTime ? e.resolve(T) : a.indexHandler.getSegmentRequestForTime(b, T).then(Qa.bind(a, T, Sa, Ra)), e.promise
        },
        Qa = function(a, c, d, e) {
            var f = this;
            null === e ? (b.segments = null, b.segmentAvailabilityRange = {
                start: a - U,
                end: a + U
            }, f.indexHandler.getSegmentRequestForTime(b, a).then(Qa.bind(f, a, c, d))) : f.fragmentController.isFragmentExists(e).then(function(b) {
                b ? c.call(f, e, a) : d.call(f, e, a)
            })
        },
        Ra = function(a, c) {
            var d, e;
            return V ? void Ta.call(this, !1, c) : (e = c - T, d = e > 0 ? T - e : T + Math.abs(e) + U, void(d < S.start && d > S.end ? this.system.notify("segmentLoadingFailed") : (ua.call(this, m), this.indexHandler.getSegmentRequestForTime(b, d).then(Qa.bind(this, d, Sa, Ra)))))
        },
        Sa = function(a, c) {
            var d, f = a.startTime,
                g = this;
            if (!V) {
                if (0 === O) return void e.resolve(f);
                if (V = !0, S.end = f + 2 * U, c === T) return d = c + O, void this.indexHandler.getSegmentRequestForTime(b, d).then(Qa.bind(g, d, function() {
                    Ta.call(g, !0, d)
                }, function() {
                    e.resolve(d)
                }))
            }
            Ta.call(this, !0, c)
        },
        Ta = function(a, c) {
            var d, f;
            a ? S.start = c : S.end = c, d = Math.floor(S.end - S.start) <= O, d ? e.resolve(a ? c : c - O) : (f = (S.start + S.end) / 2, this.indexHandler.getSegmentRequestForTime(b, f).then(Qa.bind(this, f, Sa, Ra)))
        },
        Ua = function(a) {
            this.debug.log(f + " Stream is complete."), va(new Date, MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON), za.call(this), F.resolve(a)
        },
        Va = function() {
            var b = null;
            if (t && (this.debug.log("Marking a special seek for initial " + f + " playback."), v || (v = !0, w = 0), t = !1), x) E && Q.isPending(E.promise) && E.resolve(), E = Q.defer(), u = [], b = this.indexHandler.getInitRequest(a[y]);
            else if (b = Q.when(null), z !== y || -1 === z) {
                if (E && Q.isPending(E.promise)) return Q.when(null);
                E = Q.defer(), u[y] ? Ga.call(this, u[y], y).then(function() {
                    E.resolve()
                }) : b = this.indexHandler.getInitRequest(a[y])
            }
            return b
        },
        Wa = function() {
            var a, d = this;
            if (x && !v) d.debug.log("Data changed - loading the " + f + " fragment for time: " + c), a = d.indexHandler.getSegmentRequestForTime(b, c);
            else {
                var e, g = Q.defer();
                a = g.promise, Q.when(v ? w : d.indexHandler.getCurrentTime(b)).then(function(a) {
                    d.sourceBufferExt.getBufferRange(X, a).then(function(c) {
                        v && (b.segments = null), v = !1, e = c ? c.end : a, d.debug.log("Loading the " + f + " fragment for time: " + e), d.indexHandler.getSegmentRequestForTime(b, e).then(function(a) {
                            d.debug.log("XIAOQI: bufferController.loadNextFragment: SUCCESS: request=" + a + ", currentRepresentation=" + b + ", segmentTime=" + e), g.resolve(a)
                        }, function() {
                            d.debug.log("REJECT"), g.reject()
                        })
                    }, function() {
                        g.reject()
                    })
                }, function() {
                    g.reject()
                })
            }
            return a
        },
        Xa = function(a) {
            var c = this;
            c.debug.log("XIAOQI: bufferController ENTERING onFragmentRequest, request=" + a), null !== a ? (da = ca + 1, c.fragmentController.isFragmentLoadedOrPending(c, a) ? "complete" !== a.action ? c.indexHandler.getNextSegmentRequest(b).then(Xa.bind(c)) : (za.call(c), c.debug.log("----------Set state to READY in onFragmentRequest"), ua.call(c, m)) : Q.when(H ? H.promise : !0).then(function() {
                c.fragmentController.prepareFragmentForLoading(c, a, Da, Ea, Oa, Ua).then(function() {
                    c.debug.log("----------Set state to READY in onFragmentRequest 2"), ua.call(c, m)
                })
            })) : (c.debug.log("----------Set state to READY in onFragmentRequest 3"), ua.call(c, m))
        },
        Ya = function() {
            if (s) {
                var a = _a.call(this);
                g > L && (a > g || g >= a && !C) ? A || (this.debug.log("Waiting for more " + f + " buffer before starting playback."), A = !0, this.videoModel.stallStream(f, A), this.debug.log("------REBUFFER in CheckIfSufficientBuffer, minBufferTime=" + g), eb(A), this.debug.log("---------------REBUFFER: START, numRebuffer=" + ia)) : (this.debug.log("Got enough " + f + " buffer to start."), s = !1, A = !1, this.videoModel.stallStream(f, A), eb(A), this.debug.log("---------------REBUFFER: numRebuffer=" + ia + ", start:" + fa[ia - 1].getTime() + ", end:" + ga[ia - 1].getTime() + ", duration: " + ha[ia - 1] + " ms"))
            }
        },
        Za = function() {
            var a = this.videoModel.isPaused();
            return !a || a && this.scheduleWhilePaused
        },
        $a = function() {
            return !!W && !!X
        },
        _a = function() {
            var a = this.videoModel.getCurrentTime();
            return I.start + I.duration - a
        },
        ab = function() {
            var a = -1;
            return a = this.videoModel.getCurrentTime()
        },
        bb = function() {
            var a = this,
                c = a.videoModel.getPlaybackRate(),
                d = L / Math.max(c, 1),
                e = Q.defer();
            return a.bufferExt.getRequiredBufferLength(s, a.requestScheduler.getExecuteInterval(a) / 1e3, B, I.duration).then(function(c) {
                a.indexHandler.getSegmentCountForDuration(b, c, d).then(function(a) {
                    e.resolve(a)
                })
            }), e.promise
        },
        cb = function() {
            var a = this,
                b = a.fragmentController.getPendingRequests(a),
                c = a.fragmentController.getLoadingRequests(a),
                d = (b ? b.length : 0) + (c ? c.length : 0);
            a.debug.log("XIAOQI: bufferController ENTERING requestNewFragment, lastRequested=" + da + ", lastBuffered=" + ca), J - d > 0 && da === ca ? (J--, Wa.call(a).then(Xa.bind(a))) : (p === n && (a.debug.log("----------Set state to READY in requestNewFragment"), ua.call(a, m)), Ca.call(a))
        },
        db = function() {
            var a, c = this,
                d = !1,
                e = new Date,
                g = c.videoModel.getCurrentTime();
            if (ca = ea, c.debug.log("XIAOQI bufferController ENTERING validate, state= " + p + ", lastRequested=" + da + ", lastBuffered=" + ca), Ya.call(c), !Za.call(c) && !t && !x) return void za.call(c);
            if (j > L && !A && (c.debug.log("Stalling " + f + " Buffer: " + f), va(new Date, MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON), A = !0, s = !0, c.videoModel.stallStream(f, A), eb(A), c.debug.log("---------------REBUFFER: START, numRebuffer=" + ia)), p === m) {
                ua.call(c, n);
                var k = c.manifestModel.getValue().minBufferTime;
                c.bufferExt.decideBufferLength(k, I.duration, s).then(function(a) {
                    c.setMinBufferTime(a), c.requestScheduler.adjustExecuteInterval()
                }), Ha.call(c), c.debug.log("XIAOQI: bufferController currentIndex = " + c.indexHandler.getCurrentIndex()), da === ca && sa.length === da + 1 && (h = new Date, ia > 0 && (sa[da + 1] = h.getTime() - fa[0].getTime(), i = da + 1, i > 0 ? ta[i] = sa[da + 1] - ra[da] : 0 === i && (ta[i] = 0), c.debug.log("----------BufferController: Chunk " + i + " started, time = " + sa[da + 1] + ", delay = " + ta[i]))), c.abrController.getPlaybackQuality(f, W, da, ca, L, Ba.call(c, y)).then(function(h) {
                    var i = h.quality;
                    if (c.debug.log("XIAOQI: bufferController quality= " + i), void 0 !== i && (a = i), d = i !== y, d === !0) {
                        if (y = a, c.fragmentController.cancelPendingRequestsForModel(K), b = Ba.call(c, a), null === b || void 0 === b) throw "Unexpected error!";
                        X.timestampOffset !== b.MSETimeOffset && (X.timestampOffset = b.MSETimeOffset), va(new Date, MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON), c.metricsModel.addRepresentationSwitch(f, e, g, b.id)
                    }
                    return bb.call(c, i)
                }).then(function(a) {
                    c.debug.log("XIAOQI: bufferController fragmentsToLoad= " + a), J = a, Va.call(c).then(function(a) {
                        null !== a && (c.fragmentController.prepareFragmentForLoading(c, a, Da, Ea, Oa, Ua).then(function() {
                            c.debug.log("----------Set state to READY in validate"), ua.call(c, m)
                        }), x = !1)
                    }), cb.call(c)
                })
            } else p === n && (c.debug.log("----------Set state to READY in validate when state = VALIDATING"), ua.call(c, m))
        },
        eb = function(a) {
            a ? (ia += 1, fa[ia - 1] = new Date) : (ga[ia - 1] = new Date, ha[ia - 1] = ga[ia - 1].getTime() - fa[ia - 1].getTime(), 1 === ia ? ka = ha[ia - 1] : ja += ha[ia - 1])
        };
    return {
        videoModel: void 0,
        metricsModel: void 0,
        metricsExt: void 0,
        manifestExt: void 0,
        manifestModel: void 0,
        bufferExt: void 0,
        sourceBufferExt: void 0,
        abrController: void 0,
        fragmentExt: void 0,
        indexHandler: void 0,
        debug: void 0,
        system: void 0,
        errHandler: void 0,
        scheduleWhilePaused: void 0,
        eventController: void 0,
        timelineConverter: void 0,
        bwPredictor: void 0,
        initialize: function(a, c, d, e, f, h, i, j, k) {
            var l = this,
                m = l.manifestModel.getValue();
            B = l.manifestExt.getIsDynamic(m), l.setMediaSource(j), l.setVideoModel(f), l.setType(a), l.setBuffer(e), l.setScheduler(h), l.setFragmentController(i), l.setEventController(k), l.updateData(d, c).then(function() {
                return B ? void Pa.call(l).then(function(a) {
                    var d, e, f, h = Math.max(a - g, b.segmentAvailabilityRange.start),
                        i = l.metricsModel.getMetricsFor("stream"),
                        j = l.metricsExt.getCurrentManifestUpdate(i);
                    l.indexHandler.getSegmentRequestForTime(b, h).then(function(g) {
                        l.system.notify("liveEdgeFound", c.liveEdge, a, c), d = g ? g.duration : O, f = g ? g.startTime : b.adaptation.period.end - O, e = f + d / 2, c.liveEdge = e, l.metricsModel.updateManifestUpdateInfo(j, {
                            currentTime: e,
                            presentationStartTime: a,
                            latency: a - e,
                            clientTimeOffset: b.adaptation.period.mpd.clientServerTimeShift
                        }), q = !0, wa.call(l), ya.call(l, f)
                    })
                }) : (q = !0, void wa.call(l))
            }), l.indexHandler.setIsDynamic(B), l.bufferExt.decideBufferLength(m.minBufferTime, c, s).then(function(a) {
                l.setMinBufferTime(a)
            })
        },
        getType: function() {
            return f
        },
        setType: function(a) {
            f = a, void 0 !== this.indexHandler && this.indexHandler.setType(a)
        },
        getPeriodInfo: function() {
            return I
        },
        getVideoModel: function() {
            return this.videoModel
        },
        setVideoModel: function(a) {
            this.videoModel = a
        },
        getScheduler: function() {
            return this.requestScheduler
        },
        setScheduler: function(a) {
            this.requestScheduler = a
        },
        getFragmentController: function() {
            return this.fragmentController
        },
        setFragmentController: function(a) {
            this.fragmentController = a
        },
        setEventController: function(a) {
            this.eventController = a
        },
        getAutoSwitchBitrate: function() {
            var a = this;
            return a.abrController.getAutoSwitchBitrate()
        },
        setAutoSwitchBitrate: function(a) {
            var b = this;
            b.abrController.setAutoSwitchBitrate(a)
        },
        getData: function() {
            return W
        },
        updateData: function(d, e) {
            var g, h, i, j = this,
                k = Q.defer(),
                l = j.metricsModel.getMetricsFor("stream"),
                m = j.metricsExt.getCurrentManifestUpdate(l),
                n = W;
            return n || (n = d), za.call(j), Aa.call(j, d, e).then(function(l) {
                a = l, I = e, h = l.length;
                for (var n = 0; h > n; n += 1) i = l[n], j.metricsModel.addManifestUpdateRepresentationInfo(m, i.id, i.index, i.adaptation.period.index, f, i.presentationTimeOffset, i.startNumber, i.segmentInfoType);
                g = j.abrController.getQualityFor(f), b || (b = Ba.call(j, g)), j.indexHandler.getCurrentTime(b).then(function(a) {
                    x = !0, c = a, y = g, b = Ba.call(j, g), X.timestampOffset = b.MSETimeOffset, b.segmentDuration && (O = b.segmentDuration), W = d, j.bufferExt.updateData(W, f), j.seek(a), j.indexHandler.updateSegmentList(b).then(function() {
                        j.metricsModel.updateManifestUpdateInfo(m, {
                            latency: b.segmentAvailabilityRange.end - j.videoModel.getCurrentTime()
                        }), k.resolve()
                    })
                })
            }), k.promise
        },
        getCurrentRepresentation: function() {
            return b
        },
        getBuffer: function() {
            return X
        },
        setBuffer: function(a) {
            X = a
        },
        getMinBufferTime: function() {
            return g
        },
        setMinBufferTime: function(a) {
            g = a, g = 2
        },
        setMediaSource: function(a) {
            d = a
        },
        isReady: function() {
            return p === m
        },
        isBufferingCompleted: function() {
            return C
        },
        clearMetrics: function() {
            var a = this;
            null !== f && "" !== f && a.metricsModel.clearCurrentMetricsForType(f)
        },
        updateBufferState: function() {
            var a = this;
            M && N && !P ? (P = !0, Ga.call(a, N.data, N.quality, N.index).then(function() {
                P = !1
            })) : Ha.call(a)
        },
        updateStalledState: function() {
            A = this.videoModel.isStalled(), Ya.call(this)
        },
        reset: function(a) {
            var b = this,
                c = function(a) {
                    a && (a.reject(), a = null)
                };
            za.call(b), c(e), c(E), c(G), c(H), D.forEach(c), D = [], c(F), F = Q.defer(), b.clearMetrics(), b.fragmentController.abortRequestsForModel(K), b.fragmentController.detachBufferController(K), K = null, u = [], t = !0, S = null, T = null, V = !1, U = null, M = !1, N = null, P = !1, a || (b.sourceBufferExt.abort(d, X), b.sourceBufferExt.removeSourceBuffer(d, X)), W = null, X = null
        },
        start: xa,
        seek: ya,
        stop: za
    }
}, MediaPlayer.dependencies.BufferController.prototype = {
    constructor: MediaPlayer.dependencies.BufferController
}, MediaPlayer.dependencies.BufferExtensions = function() {
    "use strict";
    var a, b, c = 0,
        d = 0,
        e = null,
        f = null,
        g = function(a) {
            var b = this.metricsExt.getCurrentHttpRequest(a);
            return null !== b ? (b.tresponse.getTime() - b.trequest.getTime()) / 1e3 : 0
        },
        h = function() {
            var a, b, g, h = this;
            return a = e ? h.abrController.getQualityFor("audio") : c, b = f ? h.abrController.getQualityFor("video") : d, g = a === c && b === d
        };
    return {
        system: void 0,
        videoModel: void 0,
        manifestExt: void 0,
        metricsExt: void 0,
        metricsModel: void 0,
        abrController: void 0,
        bufferMax: void 0,
        updateData: function(a, b) {
            var g = a.Representation_asArray.length - 1;
            "audio" === b ? (c = g, e = a) : "video" === b && (d = g, f = a)
        },
        getTopQualityIndex: function(a) {
            var b = null;
            return "audio" === a ? b = c : "video" === a && (b = d), b
        },
        decideBufferLength: function(b, c) {
            return a = isNaN(c) || MediaPlayer.dependencies.BufferExtensions.DEFAULT_MIN_BUFFER_TIME < c && c > b ? Math.max(MediaPlayer.dependencies.BufferExtensions.DEFAULT_MIN_BUFFER_TIME, b) : b >= c ? Math.min(c, MediaPlayer.dependencies.BufferExtensions.DEFAULT_MIN_BUFFER_TIME) : Math.min(c, b), Q.when(a)
        },
        getLeastBufferLevel: function() {
            var a = this.metricsModel.getReadOnlyMetricsFor("video"),
                b = this.metricsExt.getCurrentBufferLevel(a),
                c = this.metricsModel.getReadOnlyMetricsFor("audio"),
                d = this.metricsExt.getCurrentBufferLevel(c),
                e = null;
            return e = null === b || null === d ? null !== d ? d.level : null !== b ? b.level : null : Math.min(d.level, b.level)
        },
        getRequiredBufferLength: function(c, d, e, f) {
            var i, j = this,
                k = j.metricsModel.getReadOnlyMetricsFor("video"),
                l = j.metricsModel.getReadOnlyMetricsFor("audio"),
                m = f >= MediaPlayer.dependencies.BufferExtensions.LONG_FORM_CONTENT_DURATION_THRESHOLD,
                n = Q.defer(),
                o = !1;
            return j.bufferMax === MediaPlayer.dependencies.BufferExtensions.BUFFER_SIZE_MIN ? (i = a, n.resolve(i)) : j.bufferMax === MediaPlayer.dependencies.BufferExtensions.BUFFER_SIZE_INFINITY ? (i = f, n.resolve(i)) : j.bufferMax === MediaPlayer.dependencies.BufferExtensions.BUFFER_SIZE_REQUIRED ? (b = a, e || c || (o = h.call(j)), o && (b = m ? MediaPlayer.dependencies.BufferExtensions.BUFFER_TIME_AT_TOP_QUALITY_LONG_FORM : MediaPlayer.dependencies.BufferExtensions.BUFFER_TIME_AT_TOP_QUALITY), i = b + d + Math.max(g.call(j, k), g.call(j, l)), n.resolve(i)) : n.reject("invalid bufferMax value: " + j.bufferMax), n.promise
        },
        getBufferTarget: function() {
            return void 0 === b ? a : b
        }
    }
}, MediaPlayer.dependencies.BufferExtensions.BUFFER_SIZE_REQUIRED = "required", MediaPlayer.dependencies.BufferExtensions.BUFFER_SIZE_MIN = "min", MediaPlayer.dependencies.BufferExtensions.BUFFER_SIZE_INFINITY = "infinity", MediaPlayer.dependencies.BufferExtensions.BUFFER_TIME_AT_STARTUP = 1, MediaPlayer.dependencies.BufferExtensions.DEFAULT_MIN_BUFFER_TIME = 8, MediaPlayer.dependencies.BufferExtensions.BUFFER_TIME_AT_TOP_QUALITY = 30, MediaPlayer.dependencies.BufferExtensions.BUFFER_TIME_AT_TOP_QUALITY_LONG_FORM = 300, MediaPlayer.dependencies.BufferExtensions.LONG_FORM_CONTENT_DURATION_THRESHOLD = 600, MediaPlayer.dependencies.BufferExtensions.prototype.constructor = MediaPlayer.dependencies.BufferExtensions, MediaPlayer.utils.Capabilities = function() {
    "use strict"
}, MediaPlayer.utils.Capabilities.prototype = {
    constructor: MediaPlayer.utils.Capabilities,
    supportsMediaSource: function() {
        "use strict";
        var a = "WebKitMediaSource" in window,
            b = "MediaSource" in window;
        return a || b
    },
    supportsMediaKeys: function() {
        "use strict";
        var a = "WebKitMediaKeys" in window,
            b = "MSMediaKeys" in window,
            c = "MediaKeys" in window;
        return a || b || c
    },
    supportsCodec: function(a, b) {
        "use strict";
        if (!(a instanceof HTMLMediaElement)) throw "element must be of type HTMLMediaElement.";
        var c = a.canPlayType(b);
        return "probably" === c
    }
}, MediaPlayer.utils.Debug = function() {
    "use strict";
    var a = !0;
    return {
        eventBus: void 0,
        setLogToBrowserConsole: function(b) {
            a = b
        },
        getLogToBrowserConsole: function() {
            return a
        },
        log: function(b) {
            a && console.log(b), this.eventBus.dispatchEvent({
                type: "log",
                message: b
            })
        }
    }
}, MediaPlayer.dependencies.ErrorHandler = function() {
    "use strict";
    return {
        eventBus: void 0,
        capabilityError: function(a) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "capability",
                event: a
            })
        },
        downloadError: function(a, b, c) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "download",
                event: {
                    id: a,
                    url: b,
                    request: c
                }
            })
        },
        manifestError: function(a, b, c) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "manifestError",
                event: {
                    message: a,
                    id: b,
                    manifest: c
                }
            })
        },
        closedCaptionsError: function(a, b, c) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "cc",
                event: {
                    message: a,
                    id: b,
                    cc: c
                }
            })
        },
        mediaSourceError: function(a) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "mediasource",
                event: a
            })
        },
        mediaKeySessionError: function(a) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "key_session",
                event: a
            })
        },
        mediaKeyMessageError: function(a) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "key_message",
                event: a
            })
        },
        mediaKeySystemSelectionError: function(a) {
            this.eventBus.dispatchEvent({
                type: "error",
                error: "key_system_selection",
                event: a
            })
        }
    }
}, MediaPlayer.dependencies.ErrorHandler.prototype = {
    constructor: MediaPlayer.dependencies.ErrorHandler
}, MediaPlayer.utils.EventBus = function() {
    "use strict";
    var a, b = function(b, c) {
            var d = (c ? "1" : "0") + b;
            return d in a || (a[d] = []), a[d]
        },
        c = function() {
            a = {}
        };
    return c(), {
        addEventListener: function(a, c, d) {
            var e = b(a, d),
                f = e.indexOf(c); - 1 === f && e.push(c)
        },
        removeEventListener: function(a, c, d) {
            var e = b(a, d),
                f = e.indexOf(c); - 1 !== f && e.splice(f, 1)
        },
        dispatchEvent: function(a) {
            for (var c = b(a.type, !1).slice(), d = 0; d < c.length; d++) c[d].call(this, a);
            return !a.defaultPrevented
        }
    }
}, MediaPlayer.dependencies.EventController = function() {
    "use strict";
    var a = [],
        b = [],
        c = [],
        d = null,
        e = 100,
        f = e / 1e3,
        g = "urn:mpeg:dash:event:2012",
        h = 1,
        i = function() {
            null !== d && (clearInterval(d), d = null), a = null, b = null, c = null
        },
        j = function() {
            null !== d && (clearInterval(d), d = null)
        },
        k = function() {
            var a = this;
            a.debug.log("Start Event Controller"), isNaN(e) || (d = setInterval(n.bind(this), e))
        },
        l = function(b) {
            var c = this;
            a = [], b && b.length > 0 && (a = b), c.debug.log("Added " + b.length + " inline events")
        },
        m = function(a) {
            for (var c = this, d = 0; d < a.length; d++) {
                var e = a[d];
                b[e.id] = e, c.debug.log("Add inband event with id " + e.id)
            }
        },
        n = function() {
            o.call(this, b), o.call(this, a), p.call(this)
        },
        o = function(a) {
            var b, d = this,
                e = this.videoModel.getCurrentTime();
            if (a)
                for (var i = 0; i < a.length; i++) {
                    var j = a[i];
                    void 0 !== j && (b = j.presentationTime / j.eventStream.timescale, (0 === b || e >= b && b + f > e) && (d.debug.log("Start Event at " + e), j.duration > 0 && c.push(j), j.eventStream.schemeIdUri == g && j.eventStream.value == h && q.call(this), a.splice(i, 1)))
                }
        },
        p = function() {
            var a = this;
            if (c)
                for (var b = this.videoModel.getCurrentTime(), d = 0; d < c.length; d++) {
                    var e = c[d];
                    null !== e && (e.duration + e.presentationTime) / e.eventStream.timescale < b && (a.debug.log("Remove Event at time " + b), e = null, c.splice(d, 1))
                }
        },
        q = function() {
            var a = this,
                b = a.manifestModel.getValue(),
                c = b.mpdUrl;
            b.hasOwnProperty("Location") && (c = b.Location), a.debug.log("Refresh manifest @ " + c), a.manifestLoader.load(c).then(function(b) {
                a.manifestModel.setValue(b)
            })
        };
    return {
        manifestModel: void 0,
        manifestExt: void 0,
        manifestLoader: void 0,
        debug: void 0,
        system: void 0,
        errHandler: void 0,
        videoModel: void 0,
        addInlineEvents: l,
        addInbandEvents: m,
        reset: i,
        clear: j,
        start: k,
        getVideoModel: function() {
            return this.videoModel
        },
        setVideoModel: function(a) {
            this.videoModel = a
        },
        initialize: function(a) {
            this.setVideoModel(a)
        }
    }
}, MediaPlayer.dependencies.EventController.prototype = {
    constructor: MediaPlayer.dependencies.EventController
}, MediaPlayer.dependencies.FragmentController = function() {
    "use strict";
    var a = [],
        b = function(b) {
            for (var c = a.length, d = 0; c > d; d++)
                if (a[d].getContext() == b) return a[d];
            return null
        },
        c = function() {
            for (var b = !0, c = a.length, d = 0; c > d; d++)
                if (!a[d].isReady()) {
                    b = !1;
                    break
                }
            return b
        },
        d = function() {
            for (var b = 0; b < a.length; b++) a[b].executeCurrentRequest()
        };
    return {
        system: void 0,
        debug: void 0,
        fragmentLoader: void 0,
        process: function(a) {
            var b = null;
            return null !== a && void 0 !== a && a.byteLength > 0 && (b = new Uint8Array(a)), Q.when(b)
        },
        attachBufferController: function(c) {
            if (!c) return null;
            var d = b(c);
            return d || (d = this.system.getObject("fragmentModel"), d.setContext(c), a.push(d)), d
        },
        detachBufferController: function(b) {
            var c = a.indexOf(b);
            c > -1 && a.splice(c, 1)
        },
        onBufferControllerStateChange: function() {
            c() && d.call(this)
        },
        isFragmentLoadedOrPending: function(a, c) {
            var d, e = b(a);
            return e ? d = e.isFragmentLoadedOrPending(c) : !1
        },
        getPendingRequests: function(a) {
            var c = b(a);
            return c ? c.getPendingRequests() : null
        },
        getLoadingRequests: function(a) {
            var c = b(a);
            return c ? c.getLoadingRequests() : null
        },
        isInitializationRequest: function(a) {
            return a && a.type && "initialization segment" === a.type.toLowerCase()
        },
        getLoadingTime: function(a) {
            var c = b(a);
            return c ? c.getLoadingTime() : null
        },
        getExecutedRequestForTime: function(a, b) {
            return a ? a.getExecutedRequestForTime(b) : null
        },
        removeExecutedRequest: function(a, b) {
            a && a.removeExecutedRequest(b)
        },
        removeExecutedRequestsBeforeTime: function(a, b) {
            a && a.removeExecutedRequestsBeforeTime(b)
        },
        cancelPendingRequestsForModel: function(a) {
            a && a.cancelPendingRequests()
        },
        abortRequestsForModel: function(a) {
            a && a.abortRequests()
        },
        isFragmentExists: function(a) {
            var b = Q.defer();
            return this.fragmentLoader.checkForExistence(a).then(function() {
                b.resolve(!0)
            }, function() {
                b.resolve(!1)
            }), b.promise
        },
        prepareFragmentForLoading: function(a, c, d, e, f, g) {
            var h = b(a);
            return h && c ? (h.addRequest(c), h.setCallbacks(d, e, f, g), Q.when(!0)) : Q.when(null)
        }
    }
}, MediaPlayer.dependencies.FragmentController.prototype = {
    constructor: MediaPlayer.dependencies.FragmentController
}, MediaPlayer.dependencies.FragmentLoader = function() {
    "use strict";
    var a = 3,
        b = 500,
        c = [],
        d = function(a, e) {
            var f = new XMLHttpRequest,
                g = null,
                h = !0,
                i = !0,
                j = null,
                k = this;
            c.push(f), a.requestStartDate = new Date, g = k.metricsModel.addHttpRequest(a.streamType, null, a.type, a.url, null, a.range, a.requestStartDate, null, null, null, null, a.duration), k.metricsModel.appendHttpTrace(g, a.requestStartDate, a.requestStartDate.getTime() - a.requestStartDate.getTime(), [0]), j = a.requestStartDate, f.open("GET", k.tokenAuthentication.addTokenAsQueryArg(a.url), !0), f.responseType = "arraybuffer", f = k.tokenAuthentication.setTokenInRequestHeader(f), a.range && f.setRequestHeader("Range", "bytes=" + a.range), f.onprogress = function(b) {
                var c = new Date;
                h && (h = !1, (!b.lengthComputable || b.lengthComputable && b.total != b.loaded) && (a.firstByteDate = c, g.tresponse = c)), k.metricsModel.appendHttpTrace(g, c, c.getTime() - j.getTime(), [f.response ? f.response.byteLength : 0]), j = c
            }, f.onload = function() {
                if (!(f.status < 200 || f.status > 299)) {
                    i = !1;
                    var b, c, d = new Date,
                        e = f.response;
                    a.firstByteDate || (a.firstByteDate = a.requestStartDate), a.requestEndDate = d, b = a.firstByteDate.getTime() - a.requestStartDate.getTime(), c = a.requestEndDate.getTime() - a.firstByteDate.getTime(), k.debug.log("loaded " + a.streamType + ":" + a.type + ":" + a.startTime + " (" + f.status + ", " + b + "ms, " + c + "ms)"), g.tresponse = a.firstByteDate, g.tfinish = a.requestEndDate, g.responsecode = f.status, k.metricsModel.appendHttpTrace(g, d, d.getTime() - j.getTime(), [e ? e.byteLength : 0]), j = d, a.deferred.resolve({
                        data: e,
                        request: a
                    })
                }
            }, f.onloadend = f.onerror = function() {
                if (-1 !== c.indexOf(f) && (c.splice(c.indexOf(f), 1), i)) {
                    i = !1;
                    var h, l, m = new Date,
                        n = f.response;
                    a.firstByteDate || (a.firstByteDate = a.requestStartDate), a.requestEndDate = m, h = a.firstByteDate.getTime() - a.requestStartDate.getTime(), l = a.requestEndDate.getTime() - a.firstByteDate.getTime(), k.debug.log("failed " + a.streamType + ":" + a.type + ":" + a.startTime + " (" + f.status + ", " + h + "ms, " + l + "ms)"), g.tresponse = a.firstByteDate, g.tfinish = a.requestEndDate, g.responsecode = f.status, k.metricsModel.appendHttpTrace(g, m, m.getTime() - j.getTime(), [n ? n.byteLength : 0]), j = m, e > 0 ? (k.debug.log("Failed loading segment: " + a.streamType + ":" + a.type + ":" + a.startTime + ", retry in " + b + "ms attempts: " + e), e--, setTimeout(function() {
                        d.call(k, a, e)
                    }, b)) : (k.debug.log("Failed loading segment: " + a.streamType + ":" + a.type + ":" + a.startTime + " no retry attempts left"), k.errHandler.downloadError("content", a.url, f), a.deferred.reject(f))
                }
            }, f.send()
        },
        e = function(a) {
            var b = new XMLHttpRequest,
                c = !1;
            b.open("HEAD", a.url, !0), b.onload = function() {
                b.status < 200 || b.status > 299 || (c = !0, a.deferred.resolve(a))
            }, b.onloadend = b.onerror = function() {
                c || a.deferred.reject(b)
            }, b.send()
        };
    return {
        metricsModel: void 0,
        errHandler: void 0,
        debug: void 0,
        tokenAuthentication: void 0,
        load: function(b) {
            return b ? (b.deferred = Q.defer(), d.call(this, b, a), b.deferred.promise) : Q.when(null)
        },
        checkForExistence: function(a) {
            return a ? (a.deferred = Q.defer(), e.call(this, a), a.deferred.promise) : Q.when(null)
        },
        abort: function() {
            var a, b, d = c.length;
            for (a = 0; d > a; a += 1) b = c[a], c[a] = null, b.abort(), b = null;
            c = []
        }
    }
}, MediaPlayer.dependencies.FragmentLoader.prototype = {
    constructor: MediaPlayer.dependencies.FragmentLoader
}, MediaPlayer.dependencies.FragmentModel = function() {
    "use strict";
    var a, b, c, d, e, f = [],
        g = [],
        h = [],
        i = 2,
        j = function(e) {
            var g, i, j = this;
            b.call(a, e), g = function(b, d) {
                h.splice(h.indexOf(b), 1), f.push(b), c.call(a, b, d), b.deferred = null
            }, i = function(b) {
                h.splice(h.indexOf(b), 1), d.call(a, b), b.deferred = null
            }, j.fragmentLoader.load(e).then(g.bind(a, e), i.bind(a, e))
        },
        k = function(a, b) {
            var c = function(a, c) {
                return a[b] < c[b] ? -1 : a[b] > c[b] ? 1 : 0
            };
            a.sort(c)
        },
        l = function(a) {
            var b = f.indexOf(a); - 1 !== b && f.splice(b, 1)
        };
    return {
        system: void 0,
        debug: void 0,
        fragmentLoader: void 0,
        setContext: function(b) {
            a = b
        },
        getContext: function() {
            return a
        },
        addRequest: function(a) {
            if (a) {
                if (this.isFragmentLoadedOrPending(a)) return;
                g.push(a), k.call(this, g, "index")
            }
        },
        setCallbacks: function(a, f, g, h) {
            b = a, e = h, d = g, c = f
        },
        isFragmentLoadedOrPending: function(a) {
            for (var b, c = !1, d = f.length, e = 0; d > e; e++)
                if (b = f[e], a.startTime === b.startTime || "complete" === b.action && a.action === b.action) {
                    if (a.url === b.url) {
                        c = !0;
                        break
                    }
                    l(a)
                }
            if (!c)
                for (e = 0, d = g.length; d > e; e += 1) b = g[e], a.url === b.url && a.startTime === b.startTime && (c = !0);
            if (!c)
                for (e = 0, d = h.length; d > e; e += 1) b = h[e], a.url === b.url && a.startTime === b.startTime && (c = !0);
            return c
        },
        isReady: function() {
            return a.isReady()
        },
        getPendingRequests: function() {
            return g
        },
        getLoadingRequests: function() {
            return h
        },
        getLoadingTime: function() {
            var a, b, c = 0;
            for (b = f.length - 1; b >= 0; b -= 1)
                if (a = f[b], a.requestEndDate instanceof Date && a.firstByteDate instanceof Date) {
                    c = a.requestEndDate.getTime() - a.firstByteDate.getTime();
                    break
                }
            return c
        },
        getExecutedRequestForTime: function(a) {
            var b, c = f.length - 1,
                d = NaN,
                e = NaN,
                g = null;
            for (b = c; b >= 0; b -= 1)
                if (g = f[b], d = g.startTime, e = d + g.duration, !isNaN(d) && !isNaN(e) && a > d && e > a) return g;
            return null
        },
        getExecutedRequestForQualityAndIndex: function(a, b) {
            var c, d = f.length - 1,
                e = null;
            for (c = d; c >= 0; c -= 1)
                if (e = f[c], e.quality === a && e.index === b) return e;
            return null
        },
        removeExecutedRequest: function(a) {
            l.call(this, a)
        },
        removeExecutedRequestsBeforeTime: function(a) {
            var b, c = f.length - 1,
                d = NaN,
                e = null;
            for (b = c; b >= 0; b -= 1) e = f[b], d = e.startTime, !isNaN(d) && a > d && l.call(this, e)
        },
        cancelPendingRequests: function() {
            g = []
        },
        abortRequests: function() {
            this.fragmentLoader.abort(), h = []
        },
        executeCurrentRequest: function() {
            var b, c = this;
            if (0 !== g.length && !(h.length >= i)) switch (b = g.shift(), b.action) {
                case "complete":
                    f.push(b), e.call(a, b);
                    break;
                case "download":
                    h.push(b), j.call(c, b);
                    break;
                default:
                    this.debug.log("Unknown request action."), b.deferred ? (b.deferred.reject(), b.deferred = null) : d.call(a, b)
            }
        }
    }
}, MediaPlayer.dependencies.FragmentModel.prototype = {
    constructor: MediaPlayer.dependencies.FragmentModel
}, MediaPlayer.dependencies.ManifestLoader = function() {
    "use strict";
    var a = 3,
        b = 500,
        c = null,
        d = function(a) {
            var b = null;
            return -1 !== a.indexOf("/") && (-1 !== a.indexOf("?") && (a = a.substring(0, a.indexOf("?"))), b = a.substring(0, a.lastIndexOf("/") + 1)), b
        },
        e = function(a, f) {
            var g = d(a),
                h = new XMLHttpRequest,
                i = new Date,
                j = null,
                k = !0,
                l = null,
                m = null,
                n = this;
            l = function() {
                h.status < 200 || h.status > 299 || (k = !1, j = new Date, n.tokenAuthentication.checkRequestHeaderForToken(h), n.metricsModel.addHttpRequest("stream", null, "MPD", a, null, null, i, j, h.status, null, null), n.parser.parse(h.responseText, g).then(function(b) {
                    b.mpdUrl = a, b.mpdLoadedTime = j, n.metricsModel.addManifestUpdate("stream", b.type, i, j, b.availabilityStartTime), c.resolve(b)
                }, function() {
                    c.reject(h)
                }))
            }, m = function() {
                k && (k = !1, n.metricsModel.addHttpRequest("stream", null, "MPD", a, null, null, i, new Date, h.status, null, null), f > 0 ? (n.debug.log("Failed loading manifest: " + a + ", retry in " + b + "ms attempts: " + f), f--, setTimeout(function() {
                    e.call(n, a, f)
                }, b)) : (n.debug.log("Failed loading manifest: " + a + " no retry attempts left"), n.errHandler.downloadError("manifest", a, h), c.reject(h)))
            };
            try {
                h.onload = l, h.onloadend = m, h.onerror = m, h.open("GET", a, !0), h.send()
            } catch (o) {
                h.onerror()
            }
        };
    return {
        debug: void 0,
        parser: void 0,
        errHandler: void 0,
        metricsModel: void 0,
        tokenAuthentication: void 0,
        load: function(b) {
            return c = Q.defer(), e.call(this, b, a), c.promise
        }
    }
}, MediaPlayer.dependencies.ManifestLoader.prototype = {
    constructor: MediaPlayer.dependencies.ManifestLoader
}, MediaPlayer.models.ManifestModel = function() {
    "use strict";
    var a;
    return {
        system: void 0,
        eventBus: void 0,
        getValue: function() {
            return a
        },
        setValue: function(b) {
            a = b, this.system.notify("manifestUpdated"), this.eventBus.dispatchEvent({
                type: "manifestLoaded",
                data: b
            })
        }
    }
}, MediaPlayer.models.ManifestModel.prototype = {
    constructor: MediaPlayer.models.ManifestModel
}, MediaPlayer.dependencies.ManifestUpdater = function() {
    "use strict";
    var a, b = NaN,
        c = null,
        d = !1,
        e = function() {
            null !== c && (clearInterval(c), c = null)
        },
        f = function() {
            e.call(this), isNaN(b) || (this.debug.log("Refresh manifest in " + b + " seconds."), c = setTimeout(h.bind(this), Math.min(1e3 * b, Math.pow(2, 31) - 1), this))
        },
        g = function() {
            var a, c = this,
                d = c.manifestModel.getValue();
            void 0 !== d && null !== d && c.manifestExt.getRefreshDelay(d).then(function(e) {
                a = ((new Date).getTime() - d.mpdLoadedTime.getTime()) / 1e3, b = Math.max(e - a, 0), f.call(c)
            })
        },
        h = function() {
            var b, c, e = this;
            Q.when(a ? a.promise : !0).then(function() {
                a = Q.defer(), b = e.manifestModel.getValue(), c = b.mpdUrl, b.hasOwnProperty("Location") && (c = b.Location), e.manifestLoader.load(c).then(function(a) {
                    e.manifestModel.setValue(a), e.debug.log("Manifest has been refreshed."), d || g.call(e)
                })
            })
        },
        i = function() {
            a && a.resolve()
        };
    return {
        debug: void 0,
        system: void 0,
        manifestModel: void 0,
        manifestExt: void 0,
        manifestLoader: void 0,
        setup: function() {
            g.call(this), this.system.mapHandler("streamsComposed", void 0, i.bind(this))
        },
        start: function() {
            d = !1, g.call(this)
        },
        stop: function() {
            d = !0, e.call(this)
        }
    }
}, MediaPlayer.dependencies.ManifestUpdater.prototype = {
    constructor: MediaPlayer.dependencies.ManifestUpdater
}, MediaPlayer.dependencies.MediaSourceExtensions = function() {
    "use strict"
}, MediaPlayer.dependencies.MediaSourceExtensions.prototype = {
    constructor: MediaPlayer.dependencies.MediaSourceExtensions,
    createMediaSource: function() {
        "use strict";
        var a = "WebKitMediaSource" in window,
            b = "MediaSource" in window;
        return b ? Q.when(new MediaSource) : a ? Q.when(new WebKitMediaSource) : null
    },
    attachMediaSource: function(a, b) {
        "use strict";
        return b.setSource(window.URL.createObjectURL(a)), Q.when(!0)
    },
    detachMediaSource: function(a) {
        "use strict";
        return a.setSource(""), Q.when(!0)
    },
    setDuration: function(a, b) {
        "use strict";
        return a.duration = b, Q.when(a.duration)
    },
    signalEndOfStream: function(a) {
        "use strict";
        return a.endOfStream(), Q.when(!0)
    }
}, MediaPlayer.models.MetricsModel = function() {
    "use strict";
    return {
        system: void 0,
        eventBus: void 0,
        streamMetrics: {},
        metricsChanged: function() {
            this.eventBus.dispatchEvent({
                type: "metricsChanged",
                data: {}
            })
        },
        metricChanged: function(a) {
            this.eventBus.dispatchEvent({
                type: "metricChanged",
                data: {
                    stream: a
                }
            }), this.metricsChanged()
        },
        metricUpdated: function(a, b, c) {
            this.eventBus.dispatchEvent({
                type: "metricUpdated",
                data: {
                    stream: a,
                    metric: b,
                    value: c
                }
            }), this.metricChanged(a)
        },
        metricAdded: function(a, b, c) {
            this.eventBus.dispatchEvent({
                type: "metricAdded",
                data: {
                    stream: a,
                    metric: b,
                    value: c
                }
            }), this.metricChanged(a)
        },
        clearCurrentMetricsForType: function(a) {
            delete this.streamMetrics[a], this.metricChanged(a)
        },
        clearAllCurrentMetrics: function() {
            var a = this;
            this.streamMetrics = {}, this.metricsChanged.call(a)
        },
        getReadOnlyMetricsFor: function(a) {
            return this.streamMetrics.hasOwnProperty(a) ? this.streamMetrics[a] : null
        },
        getMetricsFor: function(a) {
            var b;
            return this.streamMetrics.hasOwnProperty(a) ? b = this.streamMetrics[a] : (b = this.system.getObject("metrics"), this.streamMetrics[a] = b), b
        },
        addTcpConnection: function(a, b, c, d, e, f) {
            var g = new MediaPlayer.vo.metrics.TCPConnection;
            return g.tcpid = b, g.dest = c, g.topen = d, g.tclose = e, g.tconnect = f, this.getMetricsFor(a).TcpList.push(g), this.metricAdded(a, "TcpConnection", g), g
        },
        addHttpRequest: function(a, b, c, d, e, f, g, h, i, j, k, l) {
            var m = new MediaPlayer.vo.metrics.HTTPRequest;
            return m.stream = a, m.tcpid = b, m.type = c, m.url = d, m.actualurl = e, m.range = f, m.trequest = g, m.tresponse = h, m.tfinish = i, m.responsecode = j, m.interval = k, m.mediaduration = l, this.getMetricsFor(a).HttpList.push(m), this.metricAdded(a, "HttpRequest", m), m
        },
        appendHttpTrace: function(a, b, c, d) {
            var e = new MediaPlayer.vo.metrics.HTTPRequest.Trace;
            return e.s = b, e.d = c, e.b = d, a.trace.push(e), this.metricUpdated(a.stream, "HttpRequestTrace", a), e
        },
        addRepresentationSwitch: function(a, b, c, d, e) {
            var f = new MediaPlayer.vo.metrics.RepresentationSwitch;
            return f.t = b, f.mt = c, f.to = d, f.lto = e, this.getMetricsFor(a).RepSwitchList.push(f), this.metricAdded(a, "RepresentationSwitch", f), f
        },
        addBufferLevel: function(a, b, c) {
            var d = new MediaPlayer.vo.metrics.BufferLevel;
            return d.t = b, d.level = c, this.getMetricsFor(a).BufferLevel.push(d), this.metricAdded(a, "BufferLevel", d), d
        },
        addDVRInfo: function(a, b, c, d) {
            var e = new MediaPlayer.vo.metrics.DVRInfo;
            return e.time = b, e.range = d, e.mpd = c, this.getMetricsFor(a).DVRInfo.push(e), this.metricAdded(a, "DVRInfo", e), e
        },
        addDroppedFrames: function(a, b) {
            var c = new MediaPlayer.vo.metrics.DroppedFrames,
                d = this.getMetricsFor(a).DroppedFrames;
            return c.time = b.creationTime, c.droppedFrames = b.droppedVideoFrames, d.length > 0 && d[d.length - 1] == c ? d[d.length - 1] : (d.push(c), this.metricAdded(a, "DroppedFrames", c), c)
        },
        addManifestUpdate: function(a, b, c, d, e, f, g, h, i, j) {
            var k = new MediaPlayer.vo.metrics.ManifestUpdate,
                l = this.getMetricsFor("stream");
            return k.streamType = a, k.type = b, k.requestTime = c, k.fetchTime = d, k.availabilityStartTime = e, k.presentationStartTime = f, k.clientTimeOffset = g, k.currentTime = h, k.buffered = i, k.latency = j, l.ManifestUpdate.push(k), this.metricAdded(a, "ManifestUpdate", k), k
        },
        updateManifestUpdateInfo: function(a, b) {
            for (var c in b) a[c] = b[c];
            this.metricUpdated(a.streamType, "ManifestUpdate", a)
        },
        addManifestUpdatePeriodInfo: function(a, b, c, d, e) {
            var f = new MediaPlayer.vo.metrics.ManifestUpdate.PeriodInfo;
            return f.id = b, f.index = c, f.start = d, f.duration = e, a.periodInfo.push(f), this.metricUpdated(a.streamType, "ManifestUpdatePeriodInfo", a), f
        },
        addManifestUpdateRepresentationInfo: function(a, b, c, d, e, f, g, h) {
            var i = new MediaPlayer.vo.metrics.ManifestUpdate.RepresentationInfo;
            return i.id = b, i.index = c, i.periodIndex = d, i.streamType = e, i.startNumber = g, i.segmentInfoType = h, i.presentationTimeOffset = f, a.representationInfo.push(i), this.metricUpdated(a.streamType, "ManifestUpdateRepresentationInfo", a), i
        },
        addPlayList: function(a, b, c, d) {
            var e = new MediaPlayer.vo.metrics.PlayList;
            return e.stream = a, e.start = b, e.mstart = c, e.starttype = d, this.getMetricsFor(a).PlayList.push(e), this.metricAdded(a, "PlayList", e), e
        },
        appendPlayListTrace: function(a, b, c, d, e, f, g, h) {
            var i = new MediaPlayer.vo.metrics.PlayList.Trace;
            return i.representationid = b, i.subreplevel = c, i.start = d, i.mstart = e, i.duration = f, i.playbackspeed = g, i.stopreason = h, a.trace.push(i), this.metricUpdated(a.stream, "PlayListTrace", a), i
        }
    }
}, MediaPlayer.models.MetricsModel.prototype = {
    constructor: MediaPlayer.models.MetricsModel
}, MediaPlayer.dependencies.ProtectionController = function() {
    "use strict";
    var a = null,
        b = null,
        c = function(a) {
            var b = this;
            b.protectionModel.removeKeySystem(a)
        },
        d = function(a, c) {
            for (var d = this, e = 0; e < b.length; ++e)
                for (var f = 0; f < c.length; ++f)
                    if (b[e].isSupported(c[f]) && d.protectionExt.supportsCodec(b[e].keysTypeString, a)) {
                        var g = d.manifestExt.getKID(c[f]);
                        return g || (g = "unknown"), d.protectionModel.addKeySystem(g, c[f], b[e]), d.debug.log("DRM: Selected Key System: " + b[e].keysTypeString + " For KID: " + g), g
                    }
            throw new Error("DRM: The protection system for this content is not supported.")
        },
        e = function(a, b, c) {
            var d = this,
                e = null,
                f = null;
            d.protectionModel.needToAddKeySession(a) && (f = d.protectionModel.getInitData(a), !f && c ? (f = c, d.debug.log("DRM: Using initdata from needskey event. length: " + f.length)) : f && d.debug.log("DRM: Using initdata from prheader in mpd. length: " + f.length), f ? (e = d.protectionModel.addKeySession(a, b, f), d.debug.log("DRM: Added Key Session [" + e.sessionId + "] for KID: " + a + " type: " + b + " initData length: " + f.length)) : d.debug.log("DRM: initdata is null."))
        },
        f = function(a, b, c, d) {
            var e, f = this;
            return e = f.protectionModel.updateFromMessage(a, c, d), e.then(function(a) {
                b.update(a)
            }), e
        };
    return {
        system: void 0,
        debug: void 0,
        manifestExt: void 0,
        capabilities: void 0,
        videoModel: void 0,
        protectionModel: void 0,
        protectionExt: void 0,
        setup: function() {
            b = this.protectionExt.getKeySystems()
        },
        init: function(b, c) {
            this.videoModel = b, this.protectionModel = c, a = this.videoModel.getElement()
        },
        selectKeySystem: d,
        ensureKeySession: e,
        updateFromMessage: f,
        teardownKeySystem: c
    }
}, MediaPlayer.dependencies.ProtectionController.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionController
}, MediaPlayer.dependencies.ProtectionExtensions = function() {
    "use strict"
}, MediaPlayer.dependencies.ProtectionExtensions.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionExtensions,
    supportsCodec: function(a, b) {
        "use strict";
        var c = "WebKitMediaKeys" in window,
            d = "MSMediaKeys" in window,
            e = "MediaKeys" in window;
        return e ? MediaKeys.isTypeSupported(a, b) : c ? WebKitMediaKeys.isTypeSupported(a, b) : d ? MSMediaKeys.isTypeSupported(a, b) : !1
    },
    createMediaKeys: function(a) {
        "use strict";
        var b = "WebKitMediaKeys" in window,
            c = "MSMediaKeys" in window,
            d = "MediaKeys" in window;
        return d ? new MediaKeys(a) : b ? new WebKitMediaKeys(a) : c ? new MSMediaKeys(a) : null
    },
    setMediaKey: function(a, b) {
        var c = "WebKitSetMediaKeys" in a,
            d = "msSetMediaKeys" in a,
            e = "SetMediaKeys" in a;
        return e ? a.SetMediaKeys(b) : c ? a.WebKitSetMediaKeys(b) : d ? a.msSetMediaKeys(b) : void this.debug.log("no setmediakeys function in element")
    },
    createSession: function(a, b, c) {
        return a.createSession(b, c)
    },
    getKeySystems: function() {
        var a = function(a, b) {
                var c = Q.defer(),
                    d = null,
                    e = [],
                    f = new DOMParser,
                    g = f.parseFromString(a, "application/xml");
                if (!g.getElementsByTagName("Challenge")[0]) return c.reject("DRM: playready update, can not find Challenge in keyMessage"), c.promise;
                var h = g.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue;
                h && (d = BASE64.decode(h));
                var i = g.getElementsByTagName("name"),
                    j = g.getElementsByTagName("value");
                if (i.length != j.length) return c.reject("DRM: playready update, invalid header name/value pair in keyMessage"), c.promise;
                for (var k = 0; k < i.length; k++) e[k] = {
                    name: i[k].childNodes[0].nodeValue,
                    value: j[k].childNodes[0].nodeValue
                };
                var l = new XMLHttpRequest;
                return l.onload = function() {
                        200 == l.status ? c.resolve(new Uint8Array(l.response)) : c.reject('DRM: playready update, XHR status is "' + l.statusText + '" (' + l.status + "), expected to be 200. readyState is " + l.readyState)
                    }, l.onabort = function() {
                        c.reject('DRM: playready update, XHR aborted. status is "' + l.statusText + '" (' + l.status + "), readyState is " + l.readyState)
                    }, l.onerror = function() {
                        c.reject('DRM: playready update, XHR error. status is "' + l.statusText + '" (' + l.status + "), readyState is " + l.readyState)
                    }, l.open("POST", b), l.responseType = "arraybuffer",
                    e && e.forEach(function(a) {
                        l.setRequestHeader(a.name, a.value)
                    }), l.send(d), c.promise
            },
            b = function(a, b) {
                return null === a && 0 === b.length
            },
            c = function(a) {
                var b = 0,
                    c = 0,
                    d = 0,
                    e = new Uint8Array([112, 115, 115, 104, 0, 0, 0, 0]),
                    f = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]),
                    g = null,
                    h = null,
                    i = null,
                    j = null;
                if ("pro" in a) g = BASE64.decodeArray(a.pro.__text);
                else {
                    if (!("prheader" in a)) return null;
                    g = BASE64.decodeArray(a.prheader.__text)
                }
                return c = g.length, d = 4 + e.length + f.length + 4 + c, h = new ArrayBuffer(d), i = new Uint8Array(h), j = new DataView(h), j.setUint32(b, d), b += 4, i.set(e, b), b += e.length, i.set(f, b), b += f.length, j.setUint32(b, c), b += 4, i.set(g, b), b += c, i
            };
        return [{
            schemeIdUri: "urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95",
            keysTypeString: "com.microsoft.playready",
            isSupported: function(a) {
                return this.schemeIdUri === a.schemeIdUri.toLowerCase()
            },
            needToAddKeySession: b,
            getInitData: c,
            getUpdate: a
        }, {
            schemeIdUri: "urn:mpeg:dash:mp4protection:2011",
            keysTypeString: "com.microsoft.playready",
            isSupported: function(a) {
                return this.schemeIdUri === a.schemeIdUri.toLowerCase() && "cenc" === a.value.toLowerCase()
            },
            needToAddKeySession: b,
            getInitData: function() {
                return null
            },
            getUpdate: a
        }, {
            schemeIdUri: "urn:uuid:00000000-0000-0000-0000-000000000000",
            keysTypeString: "webkit-org.w3.clearkey",
            isSupported: function(a) {
                return this.schemeIdUri === a.schemeIdUri.toLowerCase()
            },
            needToAddKeySession: function() {
                return !0
            },
            getInitData: function() {
                return null
            },
            getUpdate: function(a) {
                return Q.when(a)
            }
        }]
    },
    addKey: function(a, b, c, d, e) {
        a.webkitAddKey(b, c, d, e)
    },
    generateKeyRequest: function(a, b, c) {
        a.webkitGenerateKeyRequest(b, c)
    },
    listenToNeedKey: function(a, b) {
        a.listen("webkitneedkey", b), a.listen("msneedkey", b), a.listen("needKey", b)
    },
    listenToKeyError: function(a, b) {
        a.addEventListener("webkitkeyerror", b, !1), a.addEventListener("mskeyerror", b, !1), a.addEventListener("keyerror", b, !1)
    },
    listenToKeyMessage: function(a, b) {
        a.addEventListener("webkitkeymessage", b, !1), a.addEventListener("mskeymessage", b, !1), a.addEventListener("keymessage", b, !1)
    },
    listenToKeyAdded: function(a, b) {
        a.addEventListener("webkitkeyadded", b, !1), a.addEventListener("mskeyadded", b, !1), a.addEventListener("keyadded", b, !1)
    },
    unlistenToKeyError: function(a, b) {
        a.removeEventListener("webkitkeyerror", b), a.removeEventListener("mskeyerror", b), a.removeEventListener("keyerror", b)
    },
    unlistenToKeyMessage: function(a, b) {
        a.removeEventListener("webkitkeymessage", b), a.removeEventListener("mskeymessage", b), a.removeEventListener("keymessage", b)
    },
    unlistenToKeyAdded: function(a, b) {
        a.removeEventListener("webkitkeyadded", b), a.removeEventListener("mskeyadded", b), a.removeEventListener("keyadded", b)
    }
}, MediaPlayer.models.ProtectionModel = function() {
    "use strict";
    var a = null,
        b = null,
        c = null,
        d = null,
        e = [];
    return {
        system: void 0,
        videoModel: void 0,
        protectionExt: void 0,
        setup: function() {
            a = this.videoModel.getElement()
        },
        init: function(b) {
            this.videoModel = b, a = this.videoModel.getElement()
        },
        addKeySession: function(a, f, g) {
            var h = null;
            return h = this.protectionExt.createSession(e[a].keys, f, g), this.protectionExt.listenToKeyAdded(h, b), this.protectionExt.listenToKeyError(h, c), this.protectionExt.listenToKeyMessage(h, d), e[a].initData = g, e[a].keySessions.push(h), h
        },
        addKeySystem: function(b, c, d) {
            var f = null;
            f = this.protectionExt.createMediaKeys(d.keysTypeString), this.protectionExt.setMediaKey(a, f), e[b] = {
                kID: b,
                contentProtection: c,
                keySystem: d,
                keys: f,
                initData: null,
                keySessions: []
            }
        },
        removeKeySystem: function(a) {
            if (null !== a && void 0 !== e[a] && 0 !== e[a].keySessions.length) {
                for (var f = e[a].keySessions, g = 0; g < f.length; ++g) this.protectionExt.unlistenToKeyError(f[g], c), this.protectionExt.unlistenToKeyAdded(f[g], b), this.protectionExt.unlistenToKeyMessage(f[g], d), f[g].close();
                e[a] = void 0
            }
        },
        needToAddKeySession: function(a) {
            var b = null;
            return b = e[a], b.keySystem.needToAddKeySession(b.initData, b.keySessions)
        },
        getInitData: function(a) {
            var b = null;
            return b = e[a], b.keySystem.getInitData(b.contentProtection)
        },
        updateFromMessage: function(a, b, c) {
            return e[a].keySystem.getUpdate(b, c)
        },
        listenToNeedKey: function(a) {
            this.protectionExt.listenToNeedKey(this.videoModel, a)
        },
        listenToKeyError: function(a) {
            c = a;
            for (var b = 0; b < e.length; ++b)
                for (var d = e[b].keySessions, f = 0; f < d.length; ++f) this.protectionExt.listenToKeyError(d[f], a)
        },
        listenToKeyMessage: function(a) {
            d = a;
            for (var b = 0; b < e.length; ++b)
                for (var c = e[b].keySessions, f = 0; f < c.length; ++f) this.protectionExt.listenToKeyMessage(c[f], a)
        },
        listenToKeyAdded: function(a) {
            b = a;
            for (var c = 0; c < e.length; ++c)
                for (var d = e[c].keySessions, f = 0; f < d.length; ++f) this.protectionExt.listenToKeyAdded(d[f], a)
        }
    }
}, MediaPlayer.models.ProtectionModel.prototype = {
    constructor: MediaPlayer.models.ProtectionModel
}, MediaPlayer.dependencies.RequestScheduler = function() {
    "use strict";
    var a = [],
        b = null,
        c = null,
        d = !1,
        e = 0,
        f = 1,
        g = 2,
        h = function(a, b, c) {
            if (a && b) {
                var e;
                e = w.call(this, a, g), e.setScheduledTask(b), e.setIsScheduled(!0), e.setExecuteTime(c), d || i.call(this)
            }
        },
        i = function() {
            var a = this.videoModel.getElement();
            this.schedulerExt.attachScheduleListener(a, j.bind(this)), this.schedulerExt.attachUpdateScheduleListener(a, m.bind(this)), d = !0
        },
        j = function() {
            var a, b, c, d = x.call(this, g),
                e = d.length,
                f = this.videoModel.getCurrentTime();
            for (c = 0; e > c; c += 1) a = d[c], b = a.getExecuteTime(), a.getIsScheduled() && f > b && (a.executeScheduledTask(), a.setIsScheduled(!1))
        },
        k = function(a) {
            var b, c = z(a, g);
            c && (y(c), b = x.call(this, g), 0 === b.length && l.call(this))
        },
        l = function() {
            var a = this.videoModel.getElement();
            this.schedulerExt.detachScheduleListener(a, j.bind(this)), this.schedulerExt.detachUpdateScheduleListener(a, m.bind(this)), d = !1
        },
        m = function() {
            n.call(this), j.call(this)
        },
        n = function() {
            var a, b = x.call(this, g),
                c = b.length;
            for (a = 0; c > a; a += 1) b[a].setIsScheduled(!0)
        },
        o = function(a, b, c) {
            if (a && b) {
                var d, e, g = c.getTime() - (new Date).getTime();
                e = w.call(this, a, f), e.setScheduledTask(b), d = setTimeout(function() {
                    e.executeScheduledTask(), y(e)
                }, g), e.setExecuteId(d)
            }
        },
        p = function(a) {
            var b = z(a, f);
            b && (clearTimeout(b.getExecuteId()), y(b))
        },
        q = function(a, b) {
            if (a && b) {
                var c = z(a, e);
                c || (c = w.call(this, a, e)), c.setIsScheduled(!0), c.setScheduledTask(b), t.call(this), b.call(a)
            }
        },
        r = function() {
            s.call(this)
        },
        s = function() {
            var a, b, c = this,
                d = x.call(c, e),
                f = d.length;
            for (b = 0; f > b; b += 1) a = d[b], a.getIsScheduled() && a.executeScheduledTask()
        },
        t = function() {
            null === c && (this.adjustExecuteInterval(), c = setInterval(r.bind(this), b))
        },
        u = function(a) {
            var b = z(a, e),
                c = x.call(this, e);
            b && (y(b), 0 === c.length && v.call(this))
        },
        v = function() {
            clearInterval(c), c = null
        },
        w = function(b, c) {
            if (!b) return null;
            var d = this.system.getObject("schedulerModel");
            return d.setContext(b), d.setType(c), a.push(d), d
        },
        x = function(b) {
            var c, d, e = [];
            for (d = 0; d < a.length; d += 1) c = a[d], c.getType() === b && e.push(c);
            return e
        },
        y = function(b) {
            var c = a.indexOf(b); - 1 !== c && a.splice(c, 1)
        },
        z = function(b, c) {
            for (var d = 0; d < a.length; d++)
                if (a[d].getContext() === b && a[d].getType() === c) return a[d];
            return null
        };
    return {
        system: void 0,
        videoModel: void 0,
        debug: void 0,
        schedulerExt: void 0,
        isScheduled: function(a) {
            var b = z(a, e);
            return !!b && b.getIsScheduled()
        },
        getExecuteInterval: function() {
            return b
        },
        adjustExecuteInterval: function() {
            if (!(a.length < 1)) {
                var d = this.schedulerExt.getExecuteInterval(a[0].getContext());
                b !== d && (b = d, null !== c && (this.debug.log("Changing execute interval: " + b), clearInterval(c), c = setInterval(r.bind(this), b)))
            }
        },
        startScheduling: q,
        stopScheduling: u,
        setTriggerForVideoTime: h,
        setTriggerForWallTime: o,
        removeTriggerForVideoTime: k,
        removeTriggerForWallTime: p
    }
}, MediaPlayer.dependencies.RequestScheduler.prototype = {
    constructor: MediaPlayer.dependencies.RequestScheduler
}, MediaPlayer.dependencies.SchedulerExtensions = function() {
    "use strict"
}, MediaPlayer.dependencies.SchedulerExtensions.prototype = {
    constructor: MediaPlayer.dependencies.SchedulerExtensions,
    getExecuteInterval: function(a) {
        var b = 1e3;
        return "undefined" != typeof a.getMinBufferTime && (b = 1e3 * a.getMinBufferTime() / 4, b = Math.max(b, 1e3)), b = 100
    },
    attachScheduleListener: function(a, b) {
        a.addEventListener("timeupdate", b)
    },
    detachScheduleListener: function(a, b) {
        a.removeEventListener("timeupdate", b)
    },
    attachUpdateScheduleListener: function(a, b) {
        a.addEventListener("seeking", b)
    },
    detachUpdateScheduleListener: function(a, b) {
        a.removeEventListener("seeking", b)
    }
}, MediaPlayer.dependencies.SchedulerModel = function() {
    "use strict";
    var a, b, c, d, e, f = !1;
    return {
        system: void 0,
        debug: void 0,
        schedulerExt: void 0,
        setContext: function(b) {
            a = b
        },
        getContext: function() {
            return a
        },
        setScheduledTask: function(a) {
            b = a
        },
        executeScheduledTask: function() {
            b.call(a)
        },
        setExecuteTime: function(a) {
            d = a
        },
        getExecuteTime: function() {
            return d
        },
        setExecuteId: function(a) {
            e = a
        },
        getExecuteId: function() {
            return e
        },
        setType: function(a) {
            c = a
        },
        getType: function() {
            return c
        },
        setIsScheduled: function(a) {
            f = a
        },
        getIsScheduled: function() {
            return f
        }
    }
}, MediaPlayer.dependencies.SchedulerModel.prototype = {
    constructor: MediaPlayer.dependencies.SchedulerModel
}, MediaPlayer.dependencies.SourceBufferExtensions = function() {
    "use strict";
    this.system = void 0, this.manifestExt = void 0
}, MediaPlayer.dependencies.SourceBufferExtensions.prototype = {
    constructor: MediaPlayer.dependencies.SourceBufferExtensions,
    createSourceBuffer: function(a, b) {
        "use strict";
        var c = Q.defer(),
            d = this;
        try {
            c.resolve(a.addSourceBuffer(b))
        } catch (e) {
            d.manifestExt.getIsTextTrack(b) ? c.resolve(d.system.getObject("textSourceBuffer")) : c.reject(e.description)
        }
        return c.promise
    },
    removeSourceBuffer: function(a, b) {
        "use strict";
        var c = Q.defer();
        try {
            c.resolve(a.removeSourceBuffer(b))
        } catch (d) {
            b && "function" == typeof b.getTextTrackExtensions ? c.resolve() : c.reject(d.description)
        }
        return c.promise
    },
    getBufferRange: function(a, b, c) {
        "use strict";
        var d, e, f = null,
            g = 0,
            h = 0,
            i = null,
            j = null,
            k = 0,
            l = c || .15;
        try {
            f = a.buffered
        } catch (m) {
            return Q.when(null)
        }
        if (null !== f) {
            for (e = 0, d = f.length; d > e; e += 1)
                if (g = f.start(e), h = f.end(e), null === i) {
                    if (k = Math.abs(g - b), b >= g && h > b) {
                        i = g, j = h;
                        continue
                    }
                    if (l >= k) {
                        i = g, j = h;
                        continue
                    }
                } else {
                    if (k = g - j, !(l >= k)) break;
                    j = h
                }
            if (null !== i) return Q.when({
                start: i,
                end: j
            })
        }
        return Q.when(null)
    },
    getAllRanges: function(a) {
        var b = null;
        try {
            return b = a.buffered, Q.when(b)
        } catch (c) {
            return Q.when(null)
        }
    },
    getBufferLength: function(a, b, c) {
        "use strict";
        var d = this,
            e = Q.defer();
        return d.getBufferRange(a, b, c).then(function(a) {
            null === a ? e.resolve(0) : e.resolve(a.end - b)
        }), e.promise
    },
    waitForUpdateEnd: function(a) {
        "use strict";
        var b, c = Q.defer(),
            d = 50,
            e = function() {
                a.updating || (clearInterval(b), c.resolve(!0))
            },
            f = function() {
                a.updating || (a.removeEventListener("updateend", f, !1), c.resolve(!0))
            };
        if ("function" == typeof a.addEventListener) try {
            a.addEventListener("updateend", f, !1)
        } catch (g) {
            b = setInterval(e, d)
        } else b = setInterval(e, d);
        return c.promise
    },
    append: function(a, b) {
        var c = Q.defer();
        try {
            "append" in a ? a.append(b) : "appendBuffer" in a && a.appendBuffer(b), this.waitForUpdateEnd(a).then(function() {
                c.resolve()
            })
        } catch (d) {
            c.reject({
                err: d,
                data: b
            })
        }
        return c.promise
    },
    remove: function(a, b, c, d, e) {
        var f = Q.defer();
        try {
            b >= 0 && d > b && c > b && "ended" !== e.readyState && a.remove(b, c), this.waitForUpdateEnd(a).then(function() {
                f.resolve()
            })
        } catch (g) {
            f.reject(g)
        }
        return f.promise
    },
    abort: function(a, b) {
        "use strict";
        var c = Q.defer();
        try {
            "open" === a.readyState && b.abort(), c.resolve()
        } catch (d) {
            c.reject(d.description)
        }
        return c.promise
    }
}, MediaPlayer.dependencies.Stream = function() {
    "use strict";
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = null,
        r = null,
        s = null,
        t = null,
        u = -1,
        v = null,
        w = -1,
        x = null,
        y = -1,
        z = !0,
        A = !1,
        B = !1,
        C = null,
        D = [],
        E = null,
        F = null,
        G = function() {
            A && this.videoModel.play()
        },
        H = function() {
            this.videoModel.pause()
        },
        I = function(a) {
            A && (this.debug.log("Do seek: " + a), this.system.notify("setCurrentTime"), this.videoModel.setCurrentTime(a), ba(a))
        },
        J = function(a) {
            var b, c = this;
            if (b = "msneedkey" !== a.type ? a.type : q, D.push({
                    type: b,
                    initData: a.initData
                }), this.debug.log("DRM: Key required for - " + b), s && q && !C) try {
                C = c.protectionController.selectKeySystem(q, s)
            } catch (d) {
                H.call(c), c.debug.log(d), c.errHandler.mediaKeySystemSelectionError(d)
            }
            C && c.protectionController.ensureKeySession(C, b, a.initData)
        },
        K = function(a) {
            var b = this,
                c = null,
                d = null,
                e = null,
                f = null;
            this.debug.log("DRM: Got a key message..."), c = a.target, d = new Uint16Array(a.message.buffer), e = String.fromCharCode.apply(null, d), f = a.destinationURL, b.protectionController.updateFromMessage(C, c, e, f).fail(function(a) {
                H.call(b), b.debug.log(a), b.errHandler.mediaKeyMessageError(a)
            })
        },
        L = function() {
            this.debug.log("DRM: Key added.")
        },
        M = function() {
            var a, b = event.target;
            switch (a = "DRM: MediaKeyError - sessionId: " + b.sessionId + " errorCode: " + b.error.code + " systemErrorCode: " + b.error.systemCode + " [", b.error.code) {
                case 1:
                    a += "MEDIA_KEYERR_UNKNOWN - An unspecified error occurred. This value is used for errors that don't match any of the other codes.";
                    break;
                case 2:
                    a += "MEDIA_KEYERR_CLIENT - The Key System could not be installed or updated.";
                    break;
                case 3:
                    a += "MEDIA_KEYERR_SERVICE - The message passed into update indicated an error from the license service.";
                    break;
                case 4:
                    a += "MEDIA_KEYERR_OUTPUT - There is no available output device with the required characteristics for the content protection system.";
                    break;
                case 5:
                    a += "MEDIA_KEYERR_HARDWARECHANGE - A hardware configuration change caused a content protection error.";
                    break;
                case 6:
                    a += "MEDIA_KEYERR_DOMAIN - An error occurred in a multi-device domain licensing configuration. The most common error is a failure to join the domain."
            }
            a += "]", this.debug.log(a), this.errHandler.mediaKeySessionError(a)
        },
        N = function(a) {
            var b = Q.defer(),
                c = this,
                d = function(e) {
                    c.debug.log("MediaSource is open!"), c.debug.log(e), a.removeEventListener("sourceopen", d), a.removeEventListener("webkitsourceopen", d), b.resolve(a)
                };
            return a.addEventListener("sourceopen", d, !1), a.addEventListener("webkitsourceopen", d, !1), c.mediaSourceExt.attachMediaSource(a, c.videoModel), b.promise
        },
        O = function() {
            var c = this;
            t && t.reset(B), v && v.reset(B), x && x.reset(B), F && F.reset(), b && c.mediaSourceExt.detachMediaSource(c.videoModel), A = !1, C = null, D = [], s = null, t = null, v = null, x = null, q = null, r = null, b = null, a = null
        },
        P = function(b, c, d, e) {
            if (b && c && d)
                if (null === t && null === v && null === x) {
                    var f = "No streams to play.";
                    this.errHandler.manifestError(f, "nostreams", a), this.debug.log(f), e.reject()
                } else e.resolve(!0)
        },
        R = function() {
            var c = Q.defer(),
                d = !1,
                e = !1,
                f = !1,
                g = this;
            return F = g.system.getObject("eventController"), F.initialize(g.videoModel), g.manifestExt.getDuration(a, E).then(function() {
                g.manifestExt.getVideoData(a, E.index).then(function(h) {
                    return null !== h ? (g.manifestExt.getDataIndex(h, a, E.index).then(function(a) {
                        u = a
                    }), g.manifestExt.getCodec(h).then(function(c) {
                        return g.debug.log("Video codec: " + c), q = c, g.manifestExt.getContentProtectionData(h).then(function(d) {
                            if (d && !g.capabilities.supportsMediaKeys()) return g.errHandler.capabilityError("mediakeys"), Q.when(null);
                            if (s = d, !g.capabilities.supportsCodec(g.videoModel.getElement(), c)) {
                                var e = "Video Codec (" + c + ") is not supported.";
                                return g.errHandler.manifestError(e, "codec", a), g.debug.log(e), Q.when(null)
                            }
                            return g.sourceBufferExt.createSourceBuffer(b, c)
                        })
                    }).then(function(a) {
                        null === a ? g.debug.log("No buffer was created, skipping video stream.") : (t = g.system.getObject("bufferController"), t.initialize("video", E, h, a, g.videoModel, g.requestScheduler, g.fragmentController, b, F)), d = !0, P.call(g, d, e, f, c)
                    }, function() {
                        g.errHandler.mediaSourceError("Error creating video source buffer."), d = !0, P.call(g, d, e, f, c)
                    })) : (g.debug.log("No video data."), d = !0, P.call(g, d, e, f, c)), g.manifestExt.getAudioDatas(a, E.index)
                }).then(function(h) {
                    return null !== h && h.length > 0 ? g.manifestExt.getPrimaryAudioData(a, E.index).then(function(h) {
                        g.manifestExt.getDataIndex(h, a, E.index).then(function(a) {
                            w = a
                        }), g.manifestExt.getCodec(h).then(function(c) {
                            return g.debug.log("Audio codec: " + c), r = c, g.manifestExt.getContentProtectionData(h).then(function(d) {
                                if (d && !g.capabilities.supportsMediaKeys()) return g.errHandler.capabilityError("mediakeys"), Q.when(null);
                                if (s = d, !g.capabilities.supportsCodec(g.videoModel.getElement(), c)) {
                                    var e = "Audio Codec (" + c + ") is not supported.";
                                    return g.errHandler.manifestError(e, "codec", a), g.debug.log(e), Q.when(null)
                                }
                                return g.sourceBufferExt.createSourceBuffer(b, c)
                            })
                        }).then(function(a) {
                            null === a ? g.debug.log("No buffer was created, skipping audio stream.") : (v = g.system.getObject("bufferController"), v.initialize("audio", E, h, a, g.videoModel, g.requestScheduler, g.fragmentController, b, F)), e = !0, P.call(g, d, e, f, c)
                        }, function() {
                            g.errHandler.mediaSourceError("Error creating audio source buffer."), e = !0, P.call(g, d, e, f, c)
                        })
                    }) : (g.debug.log("No audio streams."), e = !0, P.call(g, d, e, f, c)), g.manifestExt.getTextData(a, E.index)
                }).then(function(h) {
                    var i;
                    return null !== h ? (g.manifestExt.getDataIndex(h, a, E.index).then(function(a) {
                        y = a
                    }), g.manifestExt.getMimeType(h).then(function(a) {
                        return i = a, g.sourceBufferExt.createSourceBuffer(b, i)
                    }).then(function(a) {
                        null === a ? g.debug.log("Source buffer was not created for text track") : (x = g.system.getObject("textController"), x.initialize(E, h, a, g.videoModel, b), a.hasOwnProperty("initialize") && a.initialize(i, x), f = !0, P.call(g, d, e, f, c))
                    }, function(a) {
                        g.debug.log("Error creating text source buffer:"), g.debug.log(a), g.errHandler.mediaSourceError("Error creating text source buffer."), f = !0, P.call(g, d, e, f, c)
                    })) : (g.debug.log("No text tracks."), f = !0, P.call(g, d, e, f, c)), g.manifestExt.getEventsForPeriod(a, E)
                }).then(function(a) {
                    F.addInlineEvents(a)
                })
            }), c.promise
        },
        S = function() {
            var a = this,
                c = Q.defer();
            return a.manifestExt.getDuration(a.manifestModel.getValue(), E).then(function(c) {
                return a.mediaSourceExt.setDuration(b, c)
            }).then(function(b) {
                a.debug.log("Duration successfully set to: " + b), A = !0, c.resolve(!0)
            }), c.promise
        },
        T = function() {
            this.debug.log("Got loadmetadata event.");
            var a = this.timelineConverter.calcPresentationStartTime(E);
            this.debug.log("Starting playback at offset: " + a), this.videoModel.setCurrentTime(a), c.resolve(null)
        },
        U = function() {
            ea.call(this)
        },
        V = function() {
            da.call(this)
        },
        W = function(a) {
            var b = a.srcElement.error,
                c = b.code,
                d = "";
            if (-1 !== c) {
                switch (c) {
                    case 1:
                        d = "MEDIA_ERR_ABORTED";
                        break;
                    case 2:
                        d = "MEDIA_ERR_NETWORK";
                        break;
                    case 3:
                        d = "MEDIA_ERR_DECODE";
                        break;
                    case 4:
                        d = "MEDIA_ERR_SRC_NOT_SUPPORTED";
                        break;
                    case 5:
                        d = "MEDIA_ERR_ENCRYPTED"
                }
                B = !0, this.debug.log("Video Element Error: " + d), this.debug.log(b), this.errHandler.mediaSourceError(d), this.reset()
            }
        },
        X = function() {
            var a = this.videoModel.getCurrentTime();
            ba(a)
        },
        Y = function() {
            this.videoModel.listen("seeking", h), this.videoModel.unlisten("seeked", i)
        },
        Z = function() {
            aa.call(this)
        },
        $ = function() {
            aa.call(this)
        },
        _ = function() {
            t && t.updateStalledState(), v && v.updateStalledState()
        },
        aa = function() {
            t && t.updateBufferState(), v && v.updateBufferState()
        },
        ba = function(a) {
            t && (void 0 === a ? t.start() : t.seek(a)), v && (void 0 === a ? v.start() : v.seek(a))
        },
        ca = function() {
            t && t.stop(), v && v.stop()
        },
        da = function() {
            (!this.scheduleWhilePaused || this.manifestExt.getIsDynamic(a)) && ca.call(this)
        },
        ea = function() {
            if (!this.videoModel.isPaused()) {
                var b = this.videoModel.getCurrentTime(),
                    c = t ? t.getCurrentRepresentation() : v.getCurrentRepresentation(),
                    d = this.timelineConverter.calcActualPresentationTime(c, b, this.manifestExt.getIsDynamic(a)),
                    e = !isNaN(d) && d !== b;
                e ? (this.videoModel.setCurrentTime(d), ba(d)) : ba()
            }
        },
        fa = function(d) {
            var e = this;
            return a = d, e.mediaSourceExt.createMediaSource().then(function(a) {
                return N.call(e, a)
            }).then(function(a) {
                return b = a, R.call(e)
            }).then(function() {
                return S.call(e)
            }).then(function() {
                return c.promise
            }).then(function() {
                e.debug.log("element loaded!"), 0 === E.index && (F.start(), z && G.call(e))
            })
        },
        ga = function() {
            this.debug.log("Current time has changed, block programmatic seek."), this.videoModel.unlisten("seeking", h), this.videoModel.listen("seeked", i)
        },
        ha = function() {
            t && !t.isBufferingCompleted() || v && !v.isBufferingCompleted() || b && this.mediaSourceExt.signalEndOfStream(b)
        },
        ia = function() {
            ca.call(this)
        },
        ja = function(b) {
            var c, d, e, f, g, h, i = this,
                j = Q.defer(),
                k = Q.defer(),
                l = Q.defer(),
                m = Q.defer(),
                n = Q.defer();
            return a = i.manifestModel.getValue(), E = b, i.debug.log("Manifest updated... set new data on buffers."), t ? (c = t.getData(), f = c && c.hasOwnProperty("id") ? i.manifestExt.getDataForId(c.id, a, E.index) : i.manifestExt.getDataForIndex(u, a, E.index), f.then(function(a) {
                t.updateData(a, E).then(function() {
                    k.resolve()
                })
            })) : k.resolve(), v ? (d = v.getData(), g = d && d.hasOwnProperty("id") ? i.manifestExt.getDataForId(d.id, a, E.index) : i.manifestExt.getDataForIndex(w, a, E.index), g.then(function(a) {
                v.updateData(a, E).then(function() {
                    l.resolve()
                })
            })) : l.resolve(), x && (e = x.getData(), h = e && e.hasOwnProperty("id") ? i.manifestExt.getDataForId(e.id, a, E.index) : i.manifestExt.getDataForIndex(y, a, E.index), h.then(function(a) {
                x.updateData(a, E).then(function() {
                    m.resolve()
                })
            })), F && i.manifestExt.getEventsForPeriod(a, E).then(function(a) {
                F.addInlineEvents(a), n.resolve()
            }), Q.when(k.promise, l.promise, m.promise).then(function() {
                ea.call(i), j.resolve()
            }), j.promise
        };
    return {
        system: void 0,
        videoModel: void 0,
        manifestLoader: void 0,
        manifestModel: void 0,
        mediaSourceExt: void 0,
        sourceBufferExt: void 0,
        bufferExt: void 0,
        manifestExt: void 0,
        fragmentController: void 0,
        abrController: void 0,
        fragmentExt: void 0,
        protectionModel: void 0,
        protectionController: void 0,
        protectionExt: void 0,
        capabilities: void 0,
        debug: void 0,
        metricsExt: void 0,
        errHandler: void 0,
        timelineConverter: void 0,
        requestScheduler: void 0,
        scheduleWhilePaused: void 0,
        setup: function() {
            this.system.mapHandler("setCurrentTime", void 0, ga.bind(this)), this.system.mapHandler("bufferingCompleted", void 0, ha.bind(this)), this.system.mapHandler("segmentLoadingFailed", void 0, ia.bind(this)), c = Q.defer(), e = U.bind(this), f = V.bind(this), g = W.bind(this), h = X.bind(this), i = Y.bind(this), k = Z.bind(this), l = _.bind(this), j = $.bind(this), d = T.bind(this)
        },
        load: function(a, b) {
            E = b, fa.call(this, a)
        },
        setVideoModel: function(a) {
            this.videoModel = a, this.videoModel.listen("play", e), this.videoModel.listen("pause", f), this.videoModel.listen("error", g), this.videoModel.listen("seeking", h), this.videoModel.listen("timeupdate", j), this.videoModel.listen("progress", k), this.videoModel.listen("ratechange", l), this.videoModel.listen("loadedmetadata", d), this.requestScheduler.videoModel = a
        },
        initProtection: function() {
            m = J.bind(this), n = K.bind(this), o = L.bind(this), p = M.bind(this), this.protectionModel = this.system.getObject("protectionModel"), this.protectionModel.init(this.getVideoModel()), this.protectionController = this.system.getObject("protectionController"), this.protectionController.init(this.videoModel, this.protectionModel), this.protectionModel.listenToNeedKey(m), this.protectionModel.listenToKeyMessage(n), this.protectionModel.listenToKeyError(p), this.protectionModel.listenToKeyAdded(o)
        },
        getVideoModel: function() {
            return this.videoModel
        },
        getManifestExt: function() {
            var a = this;
            return a.manifestExt
        },
        setAutoPlay: function(a) {
            z = a
        },
        getAutoPlay: function() {
            return z
        },
        reset: function() {
            H.call(this), this.videoModel.unlisten("play", e), this.videoModel.unlisten("pause", f), this.videoModel.unlisten("error", g), this.videoModel.unlisten("seeking", h), this.videoModel.unlisten("timeupdate", j), this.videoModel.unlisten("progress", k), this.videoModel.unlisten("loadedmetadata", d), O.call(this), this.protectionController && this.protectionController.teardownKeySystem(C), this.protectionController = void 0, this.protectionModel = void 0, this.fragmentController = void 0, this.requestScheduler = void 0, c = Q.defer()
        },
        getDuration: function() {
            return E.duration
        },
        getStartTime: function() {
            return E.start
        },
        getPeriodIndex: function() {
            return E.index
        },
        getId: function() {
            return E.id
        },
        getPeriodInfo: function() {
            return E
        },
        startEventController: function() {
            F.start()
        },
        resetEventController: function() {
            F.reset()
        },
        updateData: ja,
        play: G,
        seek: I,
        pause: H
    }
}, MediaPlayer.dependencies.Stream.prototype = {
    constructor: MediaPlayer.dependencies.Stream
}, MediaPlayer.dependencies.StreamController = function() {
    "use strict";
    var a, b, c, d, e, f, g = [],
        h = 6,
        i = .2,
        j = !0,
        k = !1,
        l = function() {
            a.play()
        },
        m = function() {
            a.pause()
        },
        n = function(b) {
            a.seek(b)
        },
        o = function(a, b) {
            var c = a.getElement(),
                d = b.getElement();
            return d.parentNode || c.parentNode.insertBefore(d, c), c.style.width = "0px", d.style.width = "100%", r(c, d), q.call(this, a), p.call(this, b), Q.when(!0)
        },
        p = function(a) {
            a.listen("seeking", c), a.listen("progress", d), a.listen("timeupdate", b), a.listen("pause", e), a.listen("play", f)
        },
        q = function(a) {
            a.unlisten("seeking", c), a.unlisten("progress", d), a.unlisten("timeupdate", b), a.unlisten("pause", e), a.unlisten("play", f)
        },
        r = function(a, b) {
            ["controls", "loop", "muted", "playbackRate", "volume"].forEach(function(c) {
                b[c] = a[c]
            })
        },
        s = function() {
            var b = a.getVideoModel().getElement().buffered;
            if (b.length) {
                var c = b.length - 1,
                    e = b.end(c),
                    f = a.getStartTime() + a.getDuration() - e;
                h > f && (a.getVideoModel().unlisten("progress", d), x())
            }
        },
        t = function() {
            var b = a.getStartTime() + a.getDuration(),
                c = a.getVideoModel().getCurrentTime(),
                d = this;
            d.metricsModel.addDroppedFrames("video", d.videoExt.getPlaybackQuality(a.getVideoModel().getElement())), y() && (a.getVideoModel().getElement().seeking || i > b - c && C.call(this, a, y()))
        },
        u = function() {
            var b = a.getVideoModel().getCurrentTime(),
                c = z(b);
            c && c !== a && C.call(this, a, c, b)
        },
        v = function() {
            this.manifestUpdater.stop()
        },
        w = function() {
            this.manifestUpdater.start()
        },
        x = function() {
            var a = y();
            a && a.seek(a.getStartTime())
        },
        y = function() {
            var b = a.getPeriodIndex() + 1;
            return b < g.length ? g[b] : null
        },
        z = function(a) {
            var b = 0,
                c = null,
                d = g.length;
            d > 0 && (b += g[0].getStartTime());
            for (var e = 0; d > e; e++)
                if (c = g[e], b += c.getDuration(), b > a) return c
        },
        A = function() {
            var a = this.system.getObject("videoModel"),
                b = document.createElement("video");
            return a.setElement(b), a
        },
        B = function(a) {
            a.parentNode && a.parentNode.removeChild(a)
        },
        C = function(b, c, d) {
            !k && b && c && b !== c && (k = !0, b.pause(), a = c, o.call(this, b.getVideoModel(), c.getVideoModel()), n(d ? b.getVideoModel().getCurrentTime() : c.getStartTime()), l(), b.resetEventController(), a.startEventController(), k = !1)
        },
        D = function() {
            var b, c, d, e, f, h, i, k = this,
                l = k.manifestModel.getValue(),
                m = k.metricsModel.getMetricsFor("stream"),
                n = k.metricsExt.getCurrentManifestUpdate(m),
                o = Q.defer(),
                q = [];
            return l ? (k.manifestExt.getMpd(l).then(function(m) {
                a && (b = a.getPeriodInfo(), m.isClientServerTimeSyncCompleted = b.mpd.isClientServerTimeSyncCompleted, m.clientServerTimeShift = b.mpd.clientServerTimeShift), k.manifestExt.getRegularPeriods(l, m).then(function(b) {
                    if (0 === b.length) return o.reject("There are no regular periods");
                    for (k.metricsModel.updateManifestUpdateInfo(n, {
                            currentTime: k.videoModel.getCurrentTime(),
                            buffered: k.videoModel.getElement().buffered,
                            presentationStartTime: b[0].start,
                            clientTimeOffset: m.clientServerTimeShift
                        }), e = 0, c = b.length; c > e; e += 1) {
                        for (h = b[e], f = 0, d = g.length; d > f; f += 1) g[f].getId() === h.id && (i = g[f], q.push(i.updateData(h)));
                        i || (i = k.system.getObject("stream"), i.setVideoModel(0 === e ? k.videoModel : A.call(k)), i.initProtection(), i.setAutoPlay(j), i.load(l, h), g.push(i)), k.metricsModel.addManifestUpdatePeriodInfo(n, h.id, h.index, h.start, h.duration), i = null
                    }
                    a || (a = g[0], p.call(k, a.getVideoModel())), Q.all(q).then(function() {
                        o.resolve()
                    })
                })
            }), o.promise) : Q.when(!1)
        },
        E = function() {
            var a = this;
            D.call(a).then(function() {
                a.system.notify("streamsComposed")
            }, function(b) {
                a.errHandler.manifestError(b, "nostreamscomposed", a.manifestModel.getValue()), a.reset()
            })
        };
    return {
        system: void 0,
        videoModel: void 0,
        manifestLoader: void 0,
        manifestUpdater: void 0,
        manifestModel: void 0,
        mediaSourceExt: void 0,
        sourceBufferExt: void 0,
        bufferExt: void 0,
        manifestExt: void 0,
        fragmentController: void 0,
        abrController: void 0,
        fragmentExt: void 0,
        capabilities: void 0,
        debug: void 0,
        metricsModel: void 0,
        metricsExt: void 0,
        videoExt: void 0,
        errHandler: void 0,
        setup: function() {
            this.system.mapHandler("manifestUpdated", void 0, E.bind(this)), b = t.bind(this), d = s.bind(this), c = u.bind(this), e = v.bind(this), f = w.bind(this)
        },
        getManifestExt: function() {
            return a.getManifestExt()
        },
        setAutoPlay: function(a) {
            j = a
        },
        getAutoPlay: function() {
            return j
        },
        getVideoModel: function() {
            return this.videoModel
        },
        setVideoModel: function(a) {
            this.videoModel = a
        },
        load: function(a) {
            var b = this;
            b.manifestLoader.load(a).then(function(a) {
                b.manifestModel.setValue(a), b.debug.log("Manifest has loaded."), b.manifestUpdater.start()
            }, function() {
                b.reset()
            })
        },
        reset: function() {
            a && q.call(this, a.getVideoModel());
            for (var b = 0, c = g.length; c > b; b++) {
                var d = g[b];
                d.reset(), d !== a && B(d.getVideoModel().getElement())
            }
            g = [], this.manifestUpdater.stop(), this.manifestModel.setValue(null), this.metricsModel.clearAllCurrentMetrics(), k = !1, a = null
        },
        play: l,
        seek: n,
        pause: m
    }
}, MediaPlayer.dependencies.StreamController.prototype = {
    constructor: MediaPlayer.dependencies.StreamController
}, MediaPlayer.utils.TokenAuthentication = function() {
    "use strict";
    var a = {
        type: MediaPlayer.utils.TokenAuthentication.TYPE_QUERY
    };
    return {
        debug: void 0,
        getTokenAuthentication: function() {
            return a
        },
        setTokenAuthentication: function(b) {
            a = b
        },
        checkRequestHeaderForToken: function(b) {
            void 0 !== a.name && null !== b.getResponseHeader(a.name) && (a.token = b.getResponseHeader(a.name), this.debug.log(a.name + " received: " + a.token))
        },
        addTokenAsQueryArg: function(b) {
            if (void 0 !== a.name && void 0 !== a.token && a.type === MediaPlayer.utils.TokenAuthentication.TYPE_QUERY) {
                var c = -1 === b.indexOf("?") ? "?" : "&";
                b += c + a.name + "=" + a.token, this.debug.log(a.name + " is being appended on the request url with a value of : " + a.token)
            }
            return b
        },
        setTokenInRequestHeader: function(b) {
            return a.type === MediaPlayer.utils.TokenAuthentication.TYPE_HEADER && (b.setRequestHeader(a.name, a.token), this.debug.log(a.name + " is being set in the request header with a value of : " + a.token)), b
        }
    }
}, MediaPlayer.utils.TokenAuthentication.TYPE_QUERY = "query", MediaPlayer.utils.TokenAuthentication.TYPE_HEADER = "header", MediaPlayer.models.URIQueryAndFragmentModel = function() {
    "use strict";
    var a = new MediaPlayer.vo.URIFragmentData,
        b = [],
        c = function(c) {
            function d(a, b, c, d) {
                var e = d[0].split(/[=]/);
                return d.push({
                    key: e[0],
                    value: e[1]
                }), d.shift(), d
            }

            function e(a, c, d) {
                return c > 0 && (j && 0 === b.length ? b = d[c].split(/[&]/) : k && (g = d[c].split(/[&]/))), d
            }
            var f, g = [],
                h = new RegExp(/[?]/),
                i = new RegExp(/[#]/),
                j = h.test(c),
                k = i.test(c);
            return f = c.split(/[?#]/).map(e), b.length > 0 && (b = b.reduce(d, null)), g.length > 0 && (g = g.reduce(d, null), g.forEach(function(b) {
                a[b.key] = b.value
            })), c
        };
    return {
        parseURI: c,
        getURIFragmentData: a,
        getURIQueryData: b
    }
}, MediaPlayer.models.URIQueryAndFragmentModel.prototype = {
    constructor: MediaPlayer.models.URIQueryAndFragmentModel
}, MediaPlayer.models.VideoModel = function() {
    "use strict";
    var a, b = [],
        c = function() {
            return b.length > 0
        },
        d = function(c) {
            null !== c && (a.playbackRate = 0, b[c] !== !0 && (b.push(c), b[c] = !0))
        },
        e = function(d) {
            if (null !== d) {
                b[d] = !1;
                var e = b.indexOf(d); - 1 !== e && b.splice(e, 1), c() === !1 && (a.playbackRate = 1)
            }
        },
        f = function(a, b) {
            b ? d(a) : e(a)
        };
    return {
        system: void 0,
        setup: function() {},
        play: function() {
            a.play()
        },
        pause: function() {
            a.pause()
        },
        isPaused: function() {
            return a.paused
        },
        getPlaybackRate: function() {
            return a.playbackRate
        },
        setPlaybackRate: function(b) {
            a.playbackRate = b
        },
        getCurrentTime: function() {
            return a.currentTime
        },
        setCurrentTime: function(b) {
            a.currentTime != b && (a.currentTime = b)
        },
        listen: function(b, c) {
            a.addEventListener(b, c, !1)
        },
        unlisten: function(b, c) {
            a.removeEventListener(b, c, !1)
        },
        getElement: function() {
            return a
        },
        setElement: function(b) {
            a = b
        },
        setSource: function(b) {
            a.src = b
        },
        isStalled: function() {
            return 0 === a.playbackRate
        },
        stallStream: f
    }
}, MediaPlayer.models.VideoModel.prototype = {
    constructor: MediaPlayer.models.VideoModel
}, MediaPlayer.dependencies.VideoModelExtensions = function() {
    "use strict";
    return {
        getPlaybackQuality: function(a) {
            var b = "webkitDroppedFrameCount" in a,
                c = "getVideoPlaybackQuality" in a,
                d = null;
            return c ? d = a.getVideoPlaybackQuality() : b && (d = {
                droppedVideoFrames: a.webkitDroppedFrameCount,
                creationTime: new Date
            }), d
        }
    }
}, MediaPlayer.dependencies.VideoModelExtensions.prototype = {
    constructor: MediaPlayer.dependencies.VideoModelExtensions
}, MediaPlayer.dependencies.BandwidthPredictor = function() {
    "use strict";
    var a = [],
        b = [],
        c = [],
        d = 5,
        e = function(e, f, g) {
            var h, i, j, k, l = this,
                m = 0,
                n = 0,
                o = 0;
            if (g && e >= 0 && (h = (g.tfinish.getTime() - g.tresponse.getTime()) / 1e3, .1 > h && (h = .1), j = l.vbr.getChunkSize(e, f), i = 8 * j / h / 1e3, a[e] = i, b[e] = h, l.debug.log("----------BWPredict lastChunk=" + e + ", downloadTime=" + h + "s, lastThroughput=" + i + "kb/s, lastChunkSize=" + j)), 0 === a.length) return 0;
            k = Math.max(0, e + 1 - d), n = 0, o = 0;
            for (var p = k; e >= p; p++) n += b[p] / a[p], o += b[p];
            return m = o / n, c[e] = m, l.debug.log("----------BWPredict: bwEst=" + m + ", tmpIndex=" + k + ", tmpDownloadTime=" + o), m
        },
        f = function(b) {
            var e, f = this,
                g = 0,
                h = 0;
            if (a.length <= 1) return 0;
            e = Math.max(1, b + 1 - d);
            for (var i = e; b >= i; i++) g = Math.abs((c[i - 1] - a[i]) / a[i]), g > h && (h = g);
            return f.debug.log("----------BWPredict: maxError=" + h), h
        },
        g = function(b, e) {
            var f, g = 0,
                h = 0;
            if (a.length <= e) return 0;
            f = Math.max(1, b + 1 - d);
            for (var i = f; b >= i; i++) g = 0 > i - e ? 0 : Math.abs((c[i - e] - a[i]) / a[i]), g > h && (h = g);
            return h
        },
        h = function(a) {
            for (var b = 0, c = 0, d = 1; 5 >= d; d++) b = g(a, d), b > c && (c = b);
            return c
        };
    return {
        debug: void 0,
        metricsModel: void 0,
        metricsEst: void 0,
        vbr: void 0,
        getBitrate: function() {
            return 0
        },
        getPastThroughput: function() {
            return a;
        },
        getBandwidthEstLog: function() {
            return c
        },
        predictBandwidth: e,
        getPredictionError: f,
        getMultiStepPredictionError: g,
        getCombinedPredictionError: h
    }
}, MediaPlayer.dependencies.BandwidthPredictor.prototype = {
    constructor: MediaPlayer.dependencies.BandwidthPredictor
}, MediaPlayer.dependencies.FastMPC = function() {
    "use strict";
    var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 2, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 1, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 2, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0, 0, 0, 0, 2, 1, 1, 0, 1, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 1, 3, 3, 3, 2, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 2, 2, 2, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 2, 1, 0, 0, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 2, 2, 2, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 2, 1, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 0, 1, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 3, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 1, 0, 0, 2, 2, 1, 0, 1, 1, 1, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 2, 3, 0, 0, 1, 1, 1, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 2, 1, 0, 1, 1, 1, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 3, 3, 0, 1, 1, 1, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 1, 0, 1, 1, 1, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 3, 3, 2, 0, 0, 1, 1, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 3, 2, 0, 0, 1, 1, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 1, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 3, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 3, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 3, 2, 0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 3, 2, 0, 0, 1, 1, 1, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 1, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 3, 2, 2, 0, 1, 1, 1, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 3, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 3, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 2, 1, 0, 1, 1, 2, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 3, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 2, 1, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 1, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 1, 0, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 3, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 1, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 3, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 3, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 1, 0, 1, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 0, 0, 1, 1, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 2, 0, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 3, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 0, 2, 0, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 3, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 3, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 0, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 3, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 3, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 3, 0, 0, 1, 1, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 0, 0, 1, 1, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 3, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 0, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 0, 0, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 1, 0, 1, 1, 2, 2, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 1, 0, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 0, 1, 1, 2, 2, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 0, 1, 2, 2, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 2, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 1, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 1, 0, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 0, 1, 0, 2, 1, 0, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 0, 1, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 2, 0, 1, 1, 2, 2, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 0, 0, 1, 2, 2, 0, 1, 1, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 2, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 2, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 0, 1, 0, 2, 1, 0, 1, 2, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 2, 2, 0, 1, 1, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 1, 2, 2, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 0, 1, 1, 2, 2, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0, 2, 0, 1, 1, 2, 0, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 2, 0, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 0, 1, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 1, 3, 0, 1, 1, 3, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0, 2, 1, 0, 1, 1, 2, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 0, 1, 3, 2, 0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 3, 3, 3, 2, 3, 3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 1, 1, 1, 2, 2, 2, 3, 3, 1, 1, 1, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 1, 1, 2, 3, 2, 3, 3, 1, 1, 1, 3, 3, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 3, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 2, 3, 3, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 1, 1, 1, 2, 3, 3, 3, 1, 1, 1, 3, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 1, 1, 1, 2, 3, 3, 3, 1, 1, 1, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 3, 3, 1, 1, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 2, 3, 3, 1, 1, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 3, 3, 1, 1, 1, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 1, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 3, 3, 1, 1, 1, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 2, 3, 3, 1, 1, 2, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 3, 3, 1, 1, 1, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 1, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 3, 3, 1, 1, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 3, 3, 1, 1, 1, 3, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 3, 3, 1, 1, 3, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 3, 1, 1, 1, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 3, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 3, 1, 1, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 2, 1, 1, 1, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 3, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 3, 3, 1, 1, 2, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 3, 1, 1, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 3, 3, 1, 1, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 3, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 3, 3, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 1, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 3, 3, 1, 1, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 1, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 2, 2, 1, 1, 1, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 3, 1, 1, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 1, 1, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 3, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 3, 2, 1, 1, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 1, 1, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 1, 2, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 2, 1, 1, 2, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 3, 2, 2, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 2, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 1, 1, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 3, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 1, 1, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 3, 1, 1, 3, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 3, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 2, 3, 2, 3, 3, 3, 2, 3, 3, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 2, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 3, 3, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 2, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 3, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 3, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 3, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 4, 3, 4, 4, 3, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 3, 4, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 3, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 3, 4, 4, 4, 4, 3, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 3, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 3, 4, 3, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 2, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 2, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        b = function(b, c, d) {
            var e, f, g, h, i, j, k, l, m, n = this,
                o = 20 / 99,
                p = 0,
                q = 20,
                r = 2650 / 99,
                s = 3e3,
                t = 350,
                u = 100,
                v = 100;
            return n.debug.log("-----FastMPC: bw=" + d + ", buffer=" + c + ", R_prev=" + b), n.debug.log("-----FastMPC: mpctable length=" + a.length), e = b * u * v, p >= c ? f = 0 : c >= q ? f = (u - 1) * v : (j = Math.floor((c - p) / o), h = p + o * j, i = p + o * (j + 1), f = (h + i) / 2 >= c ? j * v : j * v), k = p + o * f / v, t >= d ? g = 0 : d >= s ? g = v - 1 : (j = Math.floor((d - t) / r), h = t + r * j, i = t + r * (j + 1), g = (h + i) / 2 >= d ? j : j), l = t + r * g, n.debug.log("-----FastMPC: bw=" + l + ", buffer=" + k + ", R_prev=" + b), m = e + f + g + 1, n.debug.log("-----FastMPC: index=" + m), a[m - 1]
        };
    return {
        debug: void 0,
        abrRulesCollection: void 0,
        manifestExt: void 0,
        metricsModel: void 0,
        getBitrate: b
    }
}, MediaPlayer.dependencies.FastMPC.prototype = {
    constructor: MediaPlayer.dependencies.FastMPC
}, MediaPlayer.dependencies.VBR = function() {
    "use strict";
    var a = [1680951, 1637558, 1371111, 1684293, 1400042, 1792609, 1213669, 1191552, 1888982, 1381292, 1593129, 1384566, 1918298, 1605664, 1356382, 1278860, 1580165, 1315506, 1642869, 928190, 1416e3, 865548, 1284104, 1692271, 1504744, 1484004, 1405086, 891371, 1401736, 1743545, 1084561, 1099310, 1789869, 1675658, 1636106, 1492615, 1200522, 1787763, 1690817, 1459339, 1250444, 1691788, 1403315, 1732710, 1270067, 1514363, 1615320, 1507682, 1260622, 1784654, 1352160, 1115913, 1637646, 1546975, 1637443, 1475444, 1616179, 1113960, 466635, 1727956, 1316739, 1373312, 458410, 320487, 573826],
        b = [1184008, 1123706, 854424, 1150093, 902304, 1237428, 763515, 840707, 1279590, 930828, 996858, 950867, 1285933, 1049248, 984261, 876058, 1054391, 875132, 996451, 660126, 1032091, 626844, 949274, 1197901, 1001670, 994288, 925341, 623084, 977347, 1184694, 766276, 834528, 1285071, 1017030, 1080835, 1078945, 788728, 1165402, 1123991, 937434, 804808, 1178153, 922947, 1175468, 903392, 970351, 1094905, 931644, 854957, 1179875, 978233, 794797, 1073857, 942081, 1074761, 1033448, 1181202, 660582, 297985, 1188866, 910001, 974311, 314327, 221329, 445973],
        c = [604139, 577615, 418531, 555427, 469238, 614632, 393715, 428426, 594788, 527047, 460827, 500774, 621760, 556545, 476734, 417508, 552639, 462442, 552256, 303234, 522859, 337637, 471941, 598737, 560588, 487684, 479873, 284277, 564825, 546935, 394056, 442514, 610493, 523364, 574457, 499175, 412705, 586327, 560284, 476697, 408166, 570011, 502061, 569274, 444948, 507586, 525450, 541979, 391886, 539537, 506089, 408110, 515570, 462132, 574826, 523754, 572621, 344553, 157240, 610010, 460871, 480012, 169331, 126490, 236234],
        d = [361158, 370284, 246858, 357922, 264156, 371586, 241808, 270621, 327839, 334864, 313171, 253682, 348331, 319047, 311275, 282933, 308899, 289234, 307870, 207573, 354546, 208087, 305510, 364291, 331480, 298846, 298034, 195290, 327636, 354076, 261457, 272419, 344053, 307537, 344697, 301834, 261403, 332467, 324205, 276260, 260969, 357539, 301214, 320538, 292593, 290952, 325914, 285965, 266844, 327707, 308757, 271734, 313780, 284833, 295589, 331270, 307411, 224531, 94934, 385537, 306688, 310705, 95847, 78651, 162260],
        e = [207189, 219272, 134208, 204651, 164461, 230942, 136746, 150366, 193697, 193362, 189146, 153391, 195591, 177177, 190923, 155030, 185660, 164741, 179442, 131632, 198676, 115285, 148044, 181978, 200708, 177663, 176815, 109489, 203211, 196841, 161524, 151656, 182521, 172804, 211407, 171710, 170866, 178753, 175461, 184494, 154382, 206330, 175870, 178679, 173567, 172998, 189473, 172737, 163181, 181882, 186151, 164281, 172026, 173011, 162488, 201781, 176856, 137099, 57015, 234214, 172494, 184405, 61936, 43268, 81580];
    return {
        debug: void 0,
        getChunkSize: function(f, g) {
            if (0 > f || f > 64) return 0;
            var h;
            switch (g) {
                case 4:
                    h = a[f];
                    break;
                case 3:
                    h = b[f];
                    break;
                case 2:
                    h = c[f];
                    break;
                case 1:
                    h = d[f];
                    break;
                case 0:
                    h = e[f];
                    break;
                default:
                    h = 0
            }
            return h
        }
    }
}, MediaPlayer.dependencies.VBR.prototype = {
    constructor: MediaPlayer.dependencies.VBR
}, MediaPlayer.dependencies.festive = function() {
    "use strict";
    var a = 12,
        b = [],
        c = 5,
        d = 0,
        e = [0, 1, 2, 3, 4],
        f = .85,
        g = -1,
        h = function(a, d, e) {
            var f = 0,
                h = 0;
            if (g >= 1)
                for (var i = Math.max(0, g + 1 - c); g - 1 >= i; i++) b[i] != b[i + 1] && (h += 1);
            return a != e && (h += 1), f = Math.pow(2, h)
        },
        i = function(a, b, c, d) {
            var e = 0;
            return e = Math.abs(d[a] / Math.min(c, d[b]) - 1)
        },
        j = function(b, c, d, e, f) {
            var g = 0,
                j = 0,
                k = 0;
            return g = h(b, c, d), j = i(b, c, e, f), k = g + a * j
        },
        k = function(a, c, h, i, k) {
            var l = this,
                m = 0,
                n = 0,
                o = 0,
                p = 0,
                q = a,
                r = 0,
                s = 0;
            b[i] = a, g = i, n = f * h;
            for (var t = 4; t >= 0; t--) {
                if (k[t] <= n) {
                    o = t;
                    break
                }
                o = t
            }
            return l.debug.log("-----FESTIVE: lastRequested=" + i + ", bwPrediction=" + h + ", b_target=" + o + ", switchUpCount=" + d), o > q ? (d += 1, p = d > e[q] ? q + 1 : q) : q > o ? (p = q - 1, d = 0) : (p = q, d = 0), p != q ? (r = j(q, p, q, h, k), s = j(p, p, q, h, k), s >= r ? m = q : (m = p, m > q && (d = 0))) : m = q, l.debug.log("-----FESTIVE: bitrate=" + m + ", b_ref=" + p + ", b_cur=" + q), m
        };
    return {
        debug: void 0,
        abrRulesCollection: void 0,
        manifestExt: void 0,
        metricsModel: void 0,
        getBitrate: k
    }
}, MediaPlayer.dependencies.festive.prototype = {
    constructor: MediaPlayer.dependencies.festive
}, MediaPlayer.utils.TTMLParser = function() {
    "use strict";
    var a, b = 3600,
        c = 60,
        d = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])((\.[0-9][0-9][0-9])|(:[0-9][0-9]))$/,
        e = function(e) {
            var f, g, h, i = d.test(e);
            if (!i) return NaN;
            if (f = e.split(":"), g = parseFloat(f[0]) * b + parseFloat(f[1]) * c + parseFloat(f[2]), f[3]) {
                if (h = a.tt.frameRate, !h || isNaN(h)) return NaN;
                g += parseFloat(f[3]) / h
            }
            return g
        },
        f = function() {
            var b = !1,
                c = a.hasOwnProperty("tt"),
                d = c ? a.tt.hasOwnProperty("head") : !1,
                e = d ? a.tt.head.hasOwnProperty("layout") : !1,
                f = d ? a.tt.head.hasOwnProperty("styling") : !1,
                g = c ? a.tt.hasOwnProperty("body") : !1,
                h = d ? a.tt.head.hasOwnProperty("profile") : !1;
            return c && d && e && f && g && (b = !0), b && (b = h && "http://www.w3.org/ns/ttml/profile/sdp-us" === a.tt.head.profile.use), b
        },
        g = function(a, b) {
            var c = Object.keys(a).filter(function(c) {
                return "xmlns" === c.split(":")[0] && a[c] === b
            }).map(function(a) {
                return a.split(":")[1]
            });
            return 1 != c.length ? null : c[0]
        },
        h = function(b) {
            var c, d, h, i, j, k, l, m = [],
                n = new X2JS([], "", !1);
            try {
                if (a = n.xml_str2json(b), !f()) return c = "TTML document has incorrect structure", Q.reject(c);
                if (k = g(a.tt, "http://www.w3.org/ns/ttml#parameter"), a.tt.hasOwnProperty(k + ":frameRate") && (a.tt.frameRate = parseInt(a.tt[k + ":frameRate"], 10)), d = a.tt.body.div_asArray[0].p_asArray, !d || 0 === d.length) return c = "TTML document does not contain any cues", Q.reject(c);
                for (l = 0; l < d.length; l += 1) {
                    if (h = d[l], i = e(h.begin), j = e(h.end), isNaN(i) || isNaN(j)) return c = "TTML document has incorrect timing value", Q.reject(c);
                    m.push({
                        start: i,
                        end: j,
                        data: h.__text
                    })
                }
                return Q.when(m)
            } catch (o) {
                return c = o.message, Q.reject(c)
            }
        };
    return {
        parse: h
    }
}, MediaPlayer.dependencies.TextController = function() {
    var a, b, c, d, e = "LOADING",
        f = "READY",
        g = !1,
        h = null,
        i = f,
        j = function(a) {
            this.debug.log("TextController setState to:" + a), i = a
        },
        k = function() {
            if (g && i === f) {
                var a = this;
                a.indexHandler.getInitRequest(d[0]).then(function(b) {
                    a.fragmentLoader.load(b).then(n.bind(a, b), o.bind(a, b)), j.call(a, e)
                })
            }
        },
        l = function() {
            k.call(this)
        },
        m = function(a, b) {
            var c = this,
                d = Q.defer(),
                e = c.manifestModel.getValue();
            return c.manifestExt.getDataIndex(a, e, b.index).then(function(a) {
                c.manifestExt.getAdaptationsForPeriod(e, b).then(function(b) {
                    c.manifestExt.getRepresentationsForAdaptation(e, b[a]).then(function(a) {
                        d.resolve(a)
                    })
                })
            }), d.promise
        },
        n = function(a, b) {
            var d = this;
            d.fragmentController.process(b.data).then(function(a) {
                null !== a && d.sourceBufferExt.append(c, a, d.videoModel)
            })
        },
        o = function() {};
    return {
        videoModel: void 0,
        fragmentLoader: void 0,
        fragmentController: void 0,
        indexHandler: void 0,
        sourceBufferExt: void 0,
        manifestModel: void 0,
        manifestExt: void 0,
        debug: void 0,
        initialize: function(a, b, c, d, e) {
            var f = this;
            f.setVideoModel(d), f.setBuffer(c), f.setMediaSource(e), f.updateData(b, a).then(function() {
                g = !0, k.call(f)
            })
        },
        setPeriodInfo: function(a) {
            h = a
        },
        getPeriodIndex: function() {
            return h.index
        },
        getVideoModel: function() {
            return this.videoModel
        },
        setVideoModel: function(a) {
            this.videoModel = a
        },
        getData: function() {
            return b
        },
        setData: function(a) {
            b = a
        },
        getBuffer: function() {
            return c
        },
        setBuffer: function(a) {
            c = a
        },
        setMediaSource: function(b) {
            a = b
        },
        updateData: function(a, c) {
            var e = this,
                g = Q.defer();
            return b = a, h = c, m.call(e, b, h).then(function(a) {
                d = a, j.call(e, f), k.call(e), g.resolve()
            }), g.promise
        },
        reset: function(b) {
            b || (this.sourceBufferExt.abort(a, c), this.sourceBufferExt.removeSourceBuffer(a, c))
        },
        start: l
    }
}, MediaPlayer.dependencies.TextController.prototype = {
    constructor: MediaPlayer.dependencies.TextController
}, MediaPlayer.dependencies.TextSourceBuffer = function() {
    var a, b, c;
    return {
        system: void 0,
        eventBus: void 0,
        errHandler: void 0,
        initialize: function(d, e) {
            c = d, a = e.getVideoModel().getElement(), b = e.getData()
        },
        append: function(c) {
            var d = this,
                e = String.fromCharCode.apply(null, new Uint16Array(c));
            d.getParser().parse(e).then(function(c) {
                var e = b.Representation_asArray[0].id,
                    f = b.lang;
                d.getTextTrackExtensions().addTextTrack(a, c, e, f, !0).then(function() {
                    d.eventBus.dispatchEvent({
                        type: "updateend"
                    })
                })
            }, function(a) {
                d.errHandler.closedCaptionsError(a, "parse", e)
            })
        },
        abort: function() {
            this.getTextTrackExtensions().deleteCues(a)
        },
        getParser: function() {
            var a;
            return "text/vtt" === c ? a = this.system.getObject("vttParser") : "application/ttml+xml" === c && (a = this.system.getObject("ttmlParser")), a
        },
        getTextTrackExtensions: function() {
            return this.system.getObject("textTrackExtensions")
        },
        addEventListener: function(a, b, c) {
            this.eventBus.addEventListener(a, b, c)
        },
        removeEventListener: function(a, b, c) {
            this.eventBus.removeEventListener(a, b, c)
        }
    }
}, MediaPlayer.dependencies.TextSourceBuffer.prototype = {
    constructor: MediaPlayer.dependencies.TextSourceBuffer
}, MediaPlayer.utils.TextTrackExtensions = function() {
    "use strict";
    var a;
    return {
        setup: function() {
            a = window.VTTCue || window.TextTrackCue
        },
        addTextTrack: function(b, c, d, e, f) {
            var g = b.addTextTrack("captions", d, e);
            g["default"] = f, g.mode = "showing";
            for (var h in c) {
                var i = c[h];
                g.addCue(new a(i.start, i.end, i.data))
            }
            return Q.when(g)
        },
        deleteCues: function(a) {
            for (var b = a.textTracks[0], c = b.cues, d = c.length - 1, e = d; e >= 0; e -= 1) b.removeCue(c[e]);
            b.mode = "disabled"
        }
    }
}, MediaPlayer.utils.VTTParser = function() {
    "use strict";
    var a = function(a) {
        var b = a.split(":"),
            c = b.length - 1;
        return a = 60 * parseInt(b[c - 1], 10) + parseFloat(b[c], 10), 2 === c && (a += 3600 * parseInt(b[0], 10)), a
    };
    return {
        parse: function(b) {
            var c, d = /(?:\r\n|\r|\n)/gm,
                e = /-->/,
                f = /(^[\s]+|[\s]+$)/g,
                g = [];
            b = b.split(d), c = b.length;
            for (var h = 0; c > h; h++) {
                var i = b[h];
                if (i.length > 0 && "WEBVTT" !== i && i.match(e)) {
                    var j = i.split(e),
                        k = b[h + 1];
                    g.push({
                        start: a(j[0].replace(f, "")),
                        end: a(j[1].replace(f, "")),
                        data: k
                    })
                }
            }
            return Q.when(g)
        }
    }
}, MediaPlayer.rules.BaseRulesCollection = function() {
    "use strict";
    var a = [];
    return {
        downloadRatioRule: void 0,
        insufficientBufferRule: void 0,
        getRules: function() {
            return Q.when(a)
        },
        setup: function() {
            var a = this;
            a.getRules().then(function(b) {
                b.push(a.downloadRatioRule), b.push(a.insufficientBufferRule)
            })
        }
    }
}, MediaPlayer.rules.BaseRulesCollection.prototype = {
    constructor: MediaPlayer.rules.BaseRulesCollection
}, MediaPlayer.rules.DownloadRatioRule = function() {
    "use strict";
    var a = function(a, b, c) {
        var d = this,
            e = Q.defer();
        return d.manifestExt.getRepresentationFor(a, c).then(function(a) {
            d.manifestExt.getBandwidth(a).then(function(a) {
                e.resolve(a / b)
            })
        }), e.promise
    };
    return {
        debug: void 0,
        manifestExt: void 0,
        metricsExt: void 0,
        checkIndex: function(b, c, d) {
            var e, f, g, h, i, j, k, l, m, n = this,
                o = n.metricsExt.getCurrentHttpRequest(c),
                p = .75;
            return c ? null === o ? Q.when(new MediaPlayer.rules.SwitchRequest) : (f = (o.tfinish.getTime() - o.trequest.getTime()) / 1e3, e = (o.tfinish.getTime() - o.tresponse.getTime()) / 1e3, 0 >= f ? Q.when(new MediaPlayer.rules.SwitchRequest) : null === o.mediaduration || void 0 === o.mediaduration || o.mediaduration <= 0 || isNaN(o.mediaduration) ? Q.when(new MediaPlayer.rules.SwitchRequest) : (j = Q.defer(), h = o.mediaduration / f, g = o.mediaduration / e * p, isNaN(g) || isNaN(h) ? (n.debug.log("The ratios are NaN, bailing."), Q.when(new MediaPlayer.rules.SwitchRequest)) : (n.debug.log("-----Original DASH.js: Total ratio: " + h + ", Download ratio: " + g + ", Download time: " + e), isNaN(g) ? j.resolve(new MediaPlayer.rules.SwitchRequest) : 4 > g ? b > 0 ? (n.debug.log("We are not at the lowest bitrate, so switch down."), n.manifestExt.getRepresentationFor(b - 1, d).then(function(a) {
                n.manifestExt.getBandwidth(a).then(function(a) {
                    n.manifestExt.getRepresentationFor(b, d).then(function(c) {
                        n.manifestExt.getBandwidth(c).then(function(c) {
                            i = a / c, n.debug.log("-----Original DASH.js: Switch ratio=" + i + ", oneDownBandwidth=" + a + ", currentBandwidth=" + c), i > g ? (n.debug.log("Things must be going pretty bad, switch all the way down."), j.resolve(new MediaPlayer.rules.SwitchRequest(0))) : (n.debug.log("Things could be better, so just switch down one index."), j.resolve(new MediaPlayer.rules.SwitchRequest(b - 1)))
                        })
                    })
                })
            })) : j.resolve(new MediaPlayer.rules.SwitchRequest(b)) : n.manifestExt.getRepresentationCount(d).then(function(c) {
                c -= 1, n.debug.log("-----Original DASH.js: max: " + c), c > b ? n.manifestExt.getRepresentationFor(b + 1, d).then(function(e) {
                    n.manifestExt.getBandwidth(e).then(function(e) {
                        n.manifestExt.getRepresentationFor(b, d).then(function(f) {
                            n.manifestExt.getBandwidth(f).then(function(f) {
                                if (i = e / f, n.debug.log("-----Original DASH.js: Switch ratio=" + i + ", oneUpBandwidth=" + e + ", currentBandwidth=" + f), g >= i)
                                    if (g > 100) n.debug.log("-----Original: Tons of bandwidth available, go all the way up."), j.resolve(new MediaPlayer.rules.SwitchRequest(c));
                                    else if (g > 10) n.debug.log("-----Original: Just enough bandwidth available, switch up one."), j.resolve(new MediaPlayer.rules.SwitchRequest(b + 1));
                                else {
                                    for (l = -1, k = [];
                                        (l += 1) < c;) k.push(a.call(n, l, f, d));
                                    Q.all(k).then(function(a) {
                                        for (l = 0, m = a.length; m > l && !(g < a[l]); l += 1);
                                        n.debug.log("Calculated ideal new quality index is: " + l), j.resolve(new MediaPlayer.rules.SwitchRequest(l))
                                    })
                                } else j.resolve(new MediaPlayer.rules.SwitchRequest)
                            })
                        })
                    })
                }) : j.resolve(new MediaPlayer.rules.SwitchRequest(c))
            }), j.promise))) : Q.when(new MediaPlayer.rules.SwitchRequest)
        }
    }
}, MediaPlayer.rules.DownloadRatioRule.prototype = {
    constructor: MediaPlayer.rules.DownloadRatioRule
}, MediaPlayer.rules.InsufficientBufferRule = function() {
    "use strict";
    var a = 0,
        b = 3;
    return {
        debug: void 0,
        checkIndex: function(c, d) {
            var e, f, g = this,
                h = !1,
                i = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
            return null === d.PlayList || void 0 === d.PlayList || 0 === d.PlayList.length ? Q.when(new MediaPlayer.rules.SwitchRequest) : (e = d.PlayList[d.PlayList.length - 1], null === e || void 0 === e || 0 === e.trace.length ? Q.when(new MediaPlayer.rules.SwitchRequest) : (f = e.trace[e.trace.length - 2], null === f || void 0 === f || null === f.stopreason || void 0 === f.stopreason ? Q.when(new MediaPlayer.rules.SwitchRequest) : (f.stopreason === MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON && (h = !0, a += 1, g.debug.log("Number of times the buffer has run dry: " + a)), a > b && (i = MediaPlayer.rules.SwitchRequest.prototype.STRONG, g.debug.log("Apply STRONG to buffer rule.")), h ? (g.debug.log("The buffer ran dry recently, switch down."), Q.when(new MediaPlayer.rules.SwitchRequest(c - 1, i))) : a > b ? (g.debug.log("Too many dry buffer hits, quit switching bitrates."), Q.when(new MediaPlayer.rules.SwitchRequest(c, i))) : Q.when(new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, i)))))
        }
    }
}, MediaPlayer.rules.InsufficientBufferRule.prototype = {
    constructor: MediaPlayer.rules.InsufficientBufferRule
}, MediaPlayer.rules.LimitSwitchesRule = function() {
    "use strict";
    var a = 10,
        b = 2e4,
        c = 5,
        d = 0;
    return {
        debug: void 0,
        checkIndex: function(e, f) {
            if (d > 0) return d -= 1, Q.when(new MediaPlayer.rules.SwitchRequest(e, MediaPlayer.rules.SwitchRequest.prototype.STRONG));
            var g, h, i, j = this,
                k = !1,
                l = (new Date).getTime(),
                m = f.RepSwitchList.length;
            for (i = m - 1; i >= 0; i -= 1) {
                if (g = f.RepSwitchList[i], h = l - g.t.getTime(), h >= b) {
                    j.debug.log("Reached time limit, bailing.");
                    break
                }
                if (i >= a) {
                    j.debug.log("Found too many switches within validation time, force the stream to not change."), k = !0;
                    break
                }
            }
            return k ? (j.debug.log("Wait some time before allowing another switch."), d = c, Q.when(new MediaPlayer.rules.SwitchRequest(e, MediaPlayer.rules.SwitchRequest.prototype.STRONG))) : Q.when(new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.STRONG))
        }
    }
}, MediaPlayer.rules.LimitSwitchesRule.prototype = {
    constructor: MediaPlayer.rules.LimitSwitchesRule
}, MediaPlayer.rules.SwitchRequest = function(a, b) {
    "use strict";
    this.quality = a, this.priority = b, void 0 === this.quality && (this.quality = 999), void 0 === this.priority && (this.priority = .5)
}, MediaPlayer.rules.SwitchRequest.prototype = {
    constructor: MediaPlayer.rules.SwitchRequest,
    NO_CHANGE: 999,
    DEFAULT: .5,
    STRONG: 1,
    WEAK: 0
}, MediaPlayer.models.MetricsList = function() {
    "use strict";
    return {
        TcpList: [],
        HttpList: [],
        RepSwitchList: [],
        BufferLevel: [],
        PlayList: [],
        DroppedFrames: [],
        DVRInfo: [],
        ManifestUpdate: []
    }
}, MediaPlayer.models.MetricsList.prototype = {
    constructor: MediaPlayer.models.MetricsList
}, MediaPlayer.vo.SegmentRequest = function() {
    "use strict";
    this.action = "download", this.startTime = NaN, this.streamType = null, this.type = null, this.duration = NaN, this.timescale = NaN, this.range = null, this.url = null, this.requestStartDate = null, this.firstByteDate = null, this.requestEndDate = null, this.deferred = null, this.quality = NaN, this.index = NaN, this.availabilityStartTime = null, this.availabilityEndTime = null, this.wallStartTime = null
}, MediaPlayer.vo.SegmentRequest.prototype = {
    constructor: MediaPlayer.vo.SegmentRequest,
    ACTION_DOWNLOAD: "download",
    ACTION_COMPLETE: "complete"
}, MediaPlayer.vo.URIFragmentData = function() {
    "use strict";
    this.t = null, this.xywh = null, this.track = null, this.id = null, this.s = null
}, MediaPlayer.vo.URIFragmentData.prototype = {
    constructor: MediaPlayer.vo.URIFragmentData
}, MediaPlayer.vo.metrics.BufferLevel = function() {
    "use strict";
    this.t = null, this.level = null
}, MediaPlayer.vo.metrics.BufferLevel.prototype = {
    constructor: MediaPlayer.vo.metrics.BufferLevel
}, MediaPlayer.vo.metrics.DVRInfo = function() {
    "use strict";
    this.time = null, this.range = null, this.mpd = null
}, MediaPlayer.vo.metrics.DVRInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.DVRInfo
}, MediaPlayer.vo.metrics.DroppedFrames = function() {
    "use strict";
    this.time = null, this.droppedFrames = null
}, MediaPlayer.vo.metrics.DroppedFrames.prototype = {
    constructor: MediaPlayer.vo.metrics.DroppedFrames
}, MediaPlayer.vo.metrics.HTTPRequest = function() {
    "use strict";
    this.stream = null, this.tcpid = null, this.type = null, this.url = null, this.actualurl = null, this.range = null, this.trequest = null, this.tresponse = null, this.tfinish = null, this.responsecode = null, this.interval = null, this.mediaduration = null, this.trace = []
}, MediaPlayer.vo.metrics.HTTPRequest.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest
}, MediaPlayer.vo.metrics.HTTPRequest.Trace = function() {
    "use strict";
    this.s = null, this.d = null, this.b = []
}, MediaPlayer.vo.metrics.HTTPRequest.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest.Trace
}, MediaPlayer.vo.metrics.ManifestUpdate = function() {
    "use strict";
    this.streamType = null, this.type = null, this.requestTime = null, this.fetchTime = null, this.availabilityStartTime = null, this.presentationStartTime = 0, this.clientTimeOffset = 0, this.currentTime = null, this.buffered = null, this.latency = 0, this.periodInfo = [], this.representationInfo = []
}, MediaPlayer.vo.metrics.ManifestUpdate.PeriodInfo = function() {
    "use strict";
    this.id = null, this.index = null, this.start = null, this.duration = null
}, MediaPlayer.vo.metrics.ManifestUpdate.RepresentationInfo = function() {
    "use strict";
    this.id = null, this.index = null, this.streamType = null, this.periodIndex = null, this.presentationTimeOffset = null, this.startNumber = null, this.segmentInfoType = null
}, MediaPlayer.vo.metrics.ManifestUpdate.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate
}, MediaPlayer.vo.metrics.ManifestUpdate.PeriodInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate.PeriodInfo
}, MediaPlayer.vo.metrics.ManifestUpdate.RepresentationInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate.RepresentationInfo
}, MediaPlayer.vo.metrics.PlayList = function() {
    "use strict";
    this.stream = null, this.start = null, this.mstart = null, this.starttype = null, this.trace = []
}, MediaPlayer.vo.metrics.PlayList.Trace = function() {
    "use strict";
    this.representationid = null, this.subreplevel = null, this.start = null, this.mstart = null, this.duration = null, this.playbackspeed = null, this.stopreason = null
}, MediaPlayer.vo.metrics.PlayList.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList
}, MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON = "initial_start", MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON = "seek", MediaPlayer.vo.metrics.PlayList.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList.Trace()
}, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON = "user_request", MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON = "representation_switch", MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON = "end_of_content", MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON = "rebuffering", MediaPlayer.vo.metrics.RepresentationSwitch = function() {
    "use strict";
    this.t = null, this.mt = null, this.to = null, this.lto = null
}, MediaPlayer.vo.metrics.RepresentationSwitch.prototype = {
    constructor: MediaPlayer.vo.metrics.RepresentationSwitch
}, MediaPlayer.vo.metrics.TCPConnection = function() {
    "use strict";
    this.tcpid = null, this.dest = null, this.topen = null, this.tclose = null, this.tconnect = null
}, MediaPlayer.vo.metrics.TCPConnection.prototype = {
    constructor: MediaPlayer.vo.metrics.TCPConnection
};