function createUnityInstance(t, r, l) {
  function d(e, t) {
    if (!d.aborted && r.showBanner)
      return "error" == t && (d.aborted = !0), r.showBanner(e, t);
    switch (t) {
      case "error":
        console.error(e);
        break;
      case "warning":
        console.warn(e);
        break;
      default:
        console.log(e);
    }
  }
  function n(e) {
    var t = e.reason || e.error,
      r = t ? t.toString() : e.message || e.reason || "",
      n = t && t.stack ? t.stack.toString() : "";
    (r += "\n" + (n = n.startsWith(r) ? n.substring(r.length) : n).trim()) &&
      u.stackTraceRegExp &&
      u.stackTraceRegExp.test(r) &&
      b(
        r,
        e.filename || (t && (t.fileName || t.sourceURL)) || "",
        e.lineno || (t && (t.lineNumber || t.line)) || 0
      );
  }
  function e(e, t, r) {
    var n = e[t];
    (void 0 !== n && n) ||
      (console.warn(
        'Config option "' +
          t +
          '" is missing or empty. Falling back to default value: "' +
          r +
          '". Consider updating your WebGL template to include the missing config option.'
      ),
      (e[t] = r));
  }
  l = l || function () {};
  var o,
    u = {
      canvas: t,
      webglContextAttributes: { preserveDrawingBuffer: !1, powerPreference: 0 },
      streamingAssetsUrl: "StreamingAssets",
      downloadProgress: {},
      deinitializers: [],
      intervals: {},
      setInterval: function (e, t) {
        e = window.setInterval(e, t);
        return (this.intervals[e] = !0), e;
      },
      clearInterval: function (e) {
        delete this.intervals[e], window.clearInterval(e);
      },
      preRun: [],
      postRun: [],
      print: function (e) {
        console.log(e);
      },
      printErr: function (e) {
        console.error(e),
          "string" == typeof e &&
            -1 != e.indexOf("wasm streaming compile failed") &&
            (-1 != e.toLowerCase().indexOf("mime")
              ? d(
                  'HTTP Response Header "Content-Type" configured incorrectly on the server for file ' +
                    u.codeUrl +
                    ' , should be "application/wasm". Startup time performance will suffer.',
                  "warning"
                )
              : d(
                  'WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file ' +
                    u.codeUrl +
                    ", but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.",
                  "warning"
                ));
      },
      locateFile: function (e) {
        return e;
      },
      disabledCanvasEvents: ["contextmenu", "dragstart"],
    };
  for (o in (e(r, "companyName", "Unity"),
  e(r, "productName", "WebGL Player"),
  e(r, "productVersion", "1.0"),
  r))
    u[o] = r[o];
  u.streamingAssetsUrl = new URL(u.streamingAssetsUrl, document.URL).href;
  var i = u.disabledCanvasEvents.slice();
  function a(e) {
    e.preventDefault();
  }
  i.forEach(function (e) {
    t.addEventListener(e, a);
  }),
    window.addEventListener("error", n),
    window.addEventListener("unhandledrejection", n);
  var s = "",
    f = "";
  function c(e) {
    document.webkitCurrentFullScreenElement === t
      ? t.style.width &&
        ((s = t.style.width),
        (f = t.style.height),
        (t.style.width = "100%"),
        (t.style.height = "100%"))
      : s && ((t.style.width = s), (t.style.height = f), (f = s = ""));
  }
  document.addEventListener("webkitfullscreenchange", c),
    u.deinitializers.push(function () {
      for (var e in (u.disableAccessToMediaDevices(),
      i.forEach(function (e) {
        t.removeEventListener(e, a);
      }),
      window.removeEventListener("error", n),
      window.removeEventListener("unhandledrejection", n),
      document.removeEventListener("webkitfullscreenchange", c),
      u.intervals))
        window.clearInterval(e);
      u.intervals = {};
    }),
    (u.QuitCleanup = function () {
      for (var e = 0; e < u.deinitializers.length; e++) u.deinitializers[e]();
      (u.deinitializers = []), "function" == typeof u.onQuit && u.onQuit();
    });
  var h = {
    Module: u,
    SetFullscreen: function () {
      if (u.SetFullscreen) return u.SetFullscreen.apply(u, arguments);
      u.print("Failed to set Fullscreen mode: Player not loaded yet.");
    },
    SendMessage: function () {
      if (u.SendMessage) return u.SendMessage.apply(u, arguments);
      u.print("Failed to execute SendMessage: Player not loaded yet.");
    },
    Quit: function () {
      return new Promise(function (e, t) {
        (u.shouldQuit = !0), (u.onQuit = e);
      });
    },
    GetMemoryInfo: function () {
      var e = u._getMemInfo();
      return {
        totalWASMHeapSize: u.HEAPU32[e >> 2],
        usedWASMHeapSize: u.HEAPU32[1 + (e >> 2)],
        totalJSHeapSize: u.HEAPF64[1 + (e >> 3)],
        usedJSHeapSize: u.HEAPF64[2 + (e >> 3)],
      };
    },
  };
  function b(e, t, r) {
    -1 == e.indexOf("fullscreen error") &&
      (u.startupErrorHandler
        ? u.startupErrorHandler(e, t, r)
        : (u.errorHandler && u.errorHandler(e, t, r)) ||
          (console.log("Invoking error handler due to\n" + e),
          "function" == typeof dump &&
            dump("Invoking error handler due to\n" + e),
          b.didShowErrorMessage ||
            (-1 !=
            (e =
              "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" +
              e).indexOf("DISABLE_EXCEPTION_CATCHING")
              ? (e =
                  "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace.")
              : -1 != e.indexOf("Cannot enlarge memory arrays")
              ? (e =
                  "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings.")
              : (-1 == e.indexOf("Invalid array buffer length") &&
                  -1 == e.indexOf("Invalid typed array length") &&
                  -1 == e.indexOf("out of memory") &&
                  -1 == e.indexOf("could not allocate memory")) ||
                (e =
                  "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."),
            alert(e),
            (b.didShowErrorMessage = !0))));
  }
  function m(e, t) {
    if ("symbolsUrl" != e) {
      var r = u.downloadProgress[e],
        n =
          ((r =
            r ||
            (u.downloadProgress[e] = {
              started: !1,
              finished: !1,
              lengthComputable: !1,
              total: 0,
              loaded: 0,
            })),
          "object" != typeof t ||
            ("progress" != t.type && "load" != t.type) ||
            (r.started ||
              ((r.started = !0), (r.lengthComputable = t.lengthComputable)),
            (r.total = t.total),
            (r.loaded = t.loaded),
            "load" == t.type && (r.finished = !0)),
          0),
        o = 0,
        i = 0,
        a = 0,
        s = 0;
      for (e in u.downloadProgress) {
        if (!(r = u.downloadProgress[e]).started) return;
        i++,
          r.lengthComputable
            ? ((n += r.loaded), (o += r.total), a++)
            : r.finished || s++;
      }
      l(0.9 * (i ? (i - s - (o ? (a * (o - n)) / o : 0)) / i : 0));
    }
  }
  (u.SystemInfo = (function () {
    var e,
      t,
      r,
      n,
      o = navigator.userAgent + " ",
      i = [
        ["Firefox", "Firefox"],
        ["OPR", "Opera"],
        ["Edg", "Edge"],
        ["SamsungBrowser", "Samsung Browser"],
        ["Trident", "Internet Explorer"],
        ["MSIE", "Internet Explorer"],
        ["Chrome", "Chrome"],
        ["CriOS", "Chrome on iOS Safari"],
        ["FxiOS", "Firefox on iOS Safari"],
        ["Safari", "Safari"],
      ];
    function a(e, t, r) {
      return (e = RegExp(e, "i").exec(t)) && e[r];
    }
    for (var s = 0; s < i.length; ++s)
      if ((t = a(i[s][0] + "[/ ](.*?)[ \\)]", o, 1))) {
        e = i[s][1];
        break;
      }
    "Safari" == e && (t = a("Version/(.*?) ", o, 1)),
      "Internet Explorer" == e && (t = a("rv:(.*?)\\)? ", o, 1) || t);
    for (
      var l = [
          ["Windows (.*?)[;)]", "Windows"],
          ["Android ([0-9_.]+)", "Android"],
          ["iPhone OS ([0-9_.]+)", "iPhoneOS"],
          ["iPad.*? OS ([0-9_.]+)", "iPadOS"],
          ["FreeBSD( )", "FreeBSD"],
          ["OpenBSD( )", "OpenBSD"],
          ["Linux|X11()", "Linux"],
          ["Mac OS X ([0-9_\\.]+)", "MacOS"],
          ["bot|google|baidu|bing|msn|teoma|slurp|yandex", "Search Bot"],
        ],
        d = 0;
      d < l.length;
      ++d
    )
      if ((u = a(l[d][0], o, 1))) {
        (r = l[d][1]), (u = u.replace(/_/g, "."));
        break;
      }
    var f,
      u =
        {
          "NT 5.0": "2000",
          "NT 5.1": "XP",
          "NT 5.2": "Server 2003",
          "NT 6.0": "Vista",
          "NT 6.1": "7",
          "NT 6.2": "8",
          "NT 6.3": "8.1",
          "NT 10.0": "10",
        }[u] || u,
      c =
        ((c = document.createElement("canvas")) &&
          ((f = (h = c.getContext("webgl2")) ? 2 : 0),
          h || ((h = c && c.getContext("webgl")) && (f = 1)),
          h &&
            (n =
              (h.getExtension("WEBGL_debug_renderer_info") &&
                h.getParameter(37446)) ||
              h.getParameter(7937))),
        "undefined" != typeof SharedArrayBuffer),
      h =
        "object" == typeof WebAssembly &&
        "function" == typeof WebAssembly.compile;
    return {
      width: screen.width,
      height: screen.height,
      userAgent: o.trim(),
      browser: e || "Unknown browser",
      browserVersion: t || "Unknown version",
      mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
      os: r || "Unknown OS",
      osVersion: u || "Unknown OS Version",
      gpu: n || "Unknown GPU",
      language: navigator.userLanguage || navigator.language,
      hasWebGL: f,
      hasCursorLock: !!document.body.requestPointerLock,
      hasFullscreen:
        !!document.body.requestFullscreen ||
        !!document.body.webkitRequestFullscreen,
      hasThreads: c,
      hasWasm: h,
      hasWasmThreads: !1,
    };
  })()),
    (u.abortHandler = function (e) {
      return b(e, "", 0), !0;
    }),
    (Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50)),
    (u.readBodyWithProgress = function (i, a, s) {
      var e = i.body ? i.body.getReader() : void 0,
        l = void 0 !== i.headers.get("Content-Length"),
        d = (function (e, t) {
          if (!t) return 0;
          var t = e.headers.get("Content-Encoding"),
            r = parseInt(e.headers.get("Content-Length"));
          switch (t) {
            case "br":
              return Math.round(5 * r);
            case "gzip":
              return Math.round(4 * r);
            default:
              return r;
          }
        })(i, l),
        f = new Uint8Array(d),
        u = [],
        c = 0,
        h = 0;
      return (
        l ||
          console.warn(
            "[UnityCache] Response is served without Content-Length header. Please reconfigure server to include valid Content-Length for better download performance."
          ),
        (function o() {
          return void 0 === e
            ? i.arrayBuffer().then(function (e) {
                var t = new Uint8Array(e);
                return (
                  a({
                    type: "progress",
                    response: i,
                    total: e.length,
                    loaded: 0,
                    lengthComputable: l,
                    chunk: s ? t : null,
                  }),
                  t
                );
              })
            : e.read().then(function (e) {
                if (e.done) {
                  if (c === d) return f;
                  if (c < d) return f.slice(0, c);
                  for (
                    var t = new Uint8Array(c), r = (t.set(f, 0), h), n = 0;
                    n < u.length;
                    ++n
                  )
                    t.set(u[n], r), (r += u[n].length);
                  return t;
                }
                return (
                  c + e.value.length <= f.length
                    ? (f.set(e.value, c), (h = c + e.value.length))
                    : u.push(e.value),
                  (c += e.value.length),
                  a({
                    type: "progress",
                    response: i,
                    total: Math.max(d, c),
                    loaded: c,
                    lengthComputable: l,
                    chunk: s ? e.value : null,
                  }),
                  o()
                );
              });
        })().then(function (e) {
          return (
            a({
              type: "load",
              response: i,
              total: e.length,
              loaded: e.length,
              lengthComputable: l,
              chunk: null,
            }),
            (i.parsedBody = e),
            i
          );
        })
      );
    }),
    (u.fetchWithProgress = function (e, t) {
      var r = function () {};
      return (
        t && t.onProgress && (r = t.onProgress),
        fetch(e, t).then(function (e) {
          return u.readBodyWithProgress(e, r, t.enableStreamingDownload);
        })
      );
    });
  var g = {
    gzip: {
      require: function (e) {
        var t,
          r = {
            "inflate.js": function (e, t, r) {
              "use strict";
              var u = e("./zlib/inflate"),
                c = e("./utils/common"),
                h = e("./utils/strings"),
                b = e("./zlib/constants"),
                n = e("./zlib/messages"),
                o = e("./zlib/zstream"),
                i = e("./zlib/gzheader"),
                m = Object.prototype.toString;
              function a(e) {
                if (!(this instanceof a)) return new a(e);
                this.options = c.assign(
                  { chunkSize: 16384, windowBits: 0, to: "" },
                  e || {}
                );
                var t = this.options;
                if (
                  (t.raw &&
                    0 <= t.windowBits &&
                    t.windowBits < 16 &&
                    ((t.windowBits = -t.windowBits),
                    0 === t.windowBits && (t.windowBits = -15)),
                  !(0 <= t.windowBits && t.windowBits < 16) ||
                    (e && e.windowBits) ||
                    (t.windowBits += 32),
                  15 < t.windowBits &&
                    t.windowBits < 48 &&
                    0 == (15 & t.windowBits) &&
                    (t.windowBits |= 15),
                  (this.err = 0),
                  (this.msg = ""),
                  (this.ended = !1),
                  (this.chunks = []),
                  (this.strm = new o()),
                  (this.strm.avail_out = 0),
                  (e = u.inflateInit2(this.strm, t.windowBits)) !== b.Z_OK)
                )
                  throw new Error(n[e]);
                (this.header = new i()),
                  u.inflateGetHeader(this.strm, this.header);
              }
              function s(e, t) {
                if (((t = new a(t)).push(e, !0), t.err))
                  throw t.msg || n[t.err];
                return t.result;
              }
              (a.prototype.push = function (e, t) {
                var r,
                  n,
                  o,
                  i,
                  a,
                  s = this.strm,
                  l = this.options.chunkSize,
                  d = this.options.dictionary,
                  f = !1;
                if (this.ended) return !1;
                (n = t === ~~t ? t : !0 === t ? b.Z_FINISH : b.Z_NO_FLUSH),
                  "string" == typeof e
                    ? (s.input = h.binstring2buf(e))
                    : "[object ArrayBuffer]" === m.call(e)
                    ? (s.input = new Uint8Array(e))
                    : (s.input = e),
                  (s.next_in = 0),
                  (s.avail_in = s.input.length);
                do {
                  if (
                    (0 === s.avail_out &&
                      ((s.output = new c.Buf8(l)),
                      (s.next_out = 0),
                      (s.avail_out = l)),
                    (r = u.inflate(s, b.Z_NO_FLUSH)) === b.Z_NEED_DICT &&
                      d &&
                      ((a =
                        "string" == typeof d
                          ? h.string2buf(d)
                          : "[object ArrayBuffer]" === m.call(d)
                          ? new Uint8Array(d)
                          : d),
                      (r = u.inflateSetDictionary(this.strm, a))),
                    r === b.Z_BUF_ERROR && !0 === f && ((r = b.Z_OK), (f = !1)),
                    r !== b.Z_STREAM_END && r !== b.Z_OK)
                  )
                    return this.onEnd(r), !(this.ended = !0);
                } while (
                  (!s.next_out ||
                    (0 !== s.avail_out &&
                      r !== b.Z_STREAM_END &&
                      (0 !== s.avail_in ||
                        (n !== b.Z_FINISH && n !== b.Z_SYNC_FLUSH))) ||
                    ("string" === this.options.to
                      ? ((a = h.utf8border(s.output, s.next_out)),
                        (o = s.next_out - a),
                        (i = h.buf2string(s.output, a)),
                        (s.next_out = o),
                        (s.avail_out = l - o),
                        o && c.arraySet(s.output, s.output, a, o, 0),
                        this.onData(i))
                      : this.onData(c.shrinkBuf(s.output, s.next_out))),
                  0 === s.avail_in && 0 === s.avail_out && (f = !0),
                  (0 < s.avail_in || 0 === s.avail_out) && r !== b.Z_STREAM_END)
                );
                return (n = r === b.Z_STREAM_END ? b.Z_FINISH : n) ===
                  b.Z_FINISH
                  ? ((r = u.inflateEnd(this.strm)),
                    this.onEnd(r),
                    (this.ended = !0),
                    r === b.Z_OK)
                  : n !== b.Z_SYNC_FLUSH ||
                      (this.onEnd(b.Z_OK), !(s.avail_out = 0));
              }),
                (a.prototype.onData = function (e) {
                  this.chunks.push(e);
                }),
                (a.prototype.onEnd = function (e) {
                  e === b.Z_OK &&
                    ("string" === this.options.to
                      ? (this.result = this.chunks.join(""))
                      : (this.result = c.flattenChunks(this.chunks))),
                    (this.chunks = []),
                    (this.err = e),
                    (this.msg = this.strm.msg);
                }),
                (r.Inflate = a),
                (r.inflate = s),
                (r.inflateRaw = function (e, t) {
                  return ((t = t || {}).raw = !0), s(e, t);
                }),
                (r.ungzip = s);
            },
            "utils/common.js": function (e, t, r) {
              "use strict";
              var n =
                  "undefined" != typeof Uint8Array &&
                  "undefined" != typeof Uint16Array &&
                  "undefined" != typeof Int32Array,
                o =
                  ((r.assign = function (e) {
                    for (
                      var t = Array.prototype.slice.call(arguments, 1);
                      t.length;

                    ) {
                      var r = t.shift();
                      if (r) {
                        if ("object" != typeof r)
                          throw new TypeError(r + "must be non-object");
                        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
                      }
                    }
                    return e;
                  }),
                  (r.shrinkBuf = function (e, t) {
                    if (e.length !== t) {
                      if (e.subarray) return e.subarray(0, t);
                      e.length = t;
                    }
                    return e;
                  }),
                  {
                    arraySet: function (e, t, r, n, o) {
                      if (t.subarray && e.subarray)
                        e.set(t.subarray(r, r + n), o);
                      else for (var i = 0; i < n; i++) e[o + i] = t[r + i];
                    },
                    flattenChunks: function (e) {
                      for (var t, r, n, o = 0, i = 0, a = e.length; i < a; i++)
                        o += e[i].length;
                      for (
                        n = new Uint8Array(o), i = t = 0, a = e.length;
                        i < a;
                        i++
                      )
                        (r = e[i]), n.set(r, t), (t += r.length);
                      return n;
                    },
                  }),
                i = {
                  arraySet: function (e, t, r, n, o) {
                    for (var i = 0; i < n; i++) e[o + i] = t[r + i];
                  },
                  flattenChunks: function (e) {
                    return [].concat.apply([], e);
                  },
                };
              (r.setTyped = function (e) {
                e
                  ? ((r.Buf8 = Uint8Array),
                    (r.Buf16 = Uint16Array),
                    (r.Buf32 = Int32Array),
                    r.assign(r, o))
                  : ((r.Buf8 = Array),
                    (r.Buf16 = Array),
                    (r.Buf32 = Array),
                    r.assign(r, i));
              }),
                r.setTyped(n);
            },
            "utils/strings.js": function (e, t, r) {
              "use strict";
              var l = e("./common"),
                o = !0,
                i = !0;
              try {
                String.fromCharCode.apply(null, [0]);
              } catch (e) {
                o = !1;
              }
              try {
                String.fromCharCode.apply(null, new Uint8Array(1));
              } catch (e) {
                i = !1;
              }
              for (var d = new l.Buf8(256), n = 0; n < 256; n++)
                d[n] =
                  252 <= n
                    ? 6
                    : 248 <= n
                    ? 5
                    : 240 <= n
                    ? 4
                    : 224 <= n
                    ? 3
                    : 192 <= n
                    ? 2
                    : 1;
              function f(e, t) {
                if (t < 65537 && ((e.subarray && i) || (!e.subarray && o)))
                  return String.fromCharCode.apply(null, l.shrinkBuf(e, t));
                for (var r = "", n = 0; n < t; n++)
                  r += String.fromCharCode(e[n]);
                return r;
              }
              (d[254] = d[254] = 1),
                (r.string2buf = function (e) {
                  for (var t, r, n, o, i = e.length, a = 0, s = 0; s < i; s++)
                    55296 == (64512 & (r = e.charCodeAt(s))) &&
                      s + 1 < i &&
                      56320 == (64512 & (n = e.charCodeAt(s + 1))) &&
                      ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), s++),
                      (a += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4);
                  for (t = new l.Buf8(a), s = o = 0; o < a; s++)
                    55296 == (64512 & (r = e.charCodeAt(s))) &&
                      s + 1 < i &&
                      56320 == (64512 & (n = e.charCodeAt(s + 1))) &&
                      ((r = 65536 + ((r - 55296) << 10) + (n - 56320)), s++),
                      r < 128
                        ? (t[o++] = r)
                        : (r < 2048
                            ? (t[o++] = 192 | (r >>> 6))
                            : (r < 65536
                                ? (t[o++] = 224 | (r >>> 12))
                                : ((t[o++] = 240 | (r >>> 18)),
                                  (t[o++] = 128 | ((r >>> 12) & 63))),
                              (t[o++] = 128 | ((r >>> 6) & 63))),
                          (t[o++] = 128 | (63 & r)));
                  return t;
                }),
                (r.buf2binstring = function (e) {
                  return f(e, e.length);
                }),
                (r.binstring2buf = function (e) {
                  for (
                    var t = new l.Buf8(e.length), r = 0, n = t.length;
                    r < n;
                    r++
                  )
                    t[r] = e.charCodeAt(r);
                  return t;
                }),
                (r.buf2string = function (e, t) {
                  for (
                    var r,
                      n,
                      o = t || e.length,
                      i = new Array(2 * o),
                      a = 0,
                      s = 0;
                    s < o;

                  )
                    if ((r = e[s++]) < 128) i[a++] = r;
                    else if (4 < (n = d[r])) (i[a++] = 65533), (s += n - 1);
                    else {
                      for (
                        r &= 2 === n ? 31 : 3 === n ? 15 : 7;
                        1 < n && s < o;

                      )
                        (r = (r << 6) | (63 & e[s++])), n--;
                      1 < n
                        ? (i[a++] = 65533)
                        : r < 65536
                        ? (i[a++] = r)
                        : ((r -= 65536),
                          (i[a++] = 55296 | ((r >> 10) & 1023)),
                          (i[a++] = 56320 | (1023 & r)));
                    }
                  return f(i, a);
                }),
                (r.utf8border = function (e, t) {
                  for (
                    var r =
                      (t = (t = t || e.length) > e.length ? e.length : t) - 1;
                    0 <= r && 128 == (192 & e[r]);

                  )
                    r--;
                  return !(r < 0) && 0 !== r && r + d[e[r]] > t ? r : t;
                });
            },
            "zlib/inflate.js": function (e, t, r) {
              "use strict";
              var L = e("../utils/common"),
                R = e("./adler32"),
                O = e("./crc32"),
                I = e("./inffast"),
                P = e("./inftrees"),
                z = 0,
                F = -2,
                N = 1,
                n = 852,
                o = 592;
              function H(e) {
                return (
                  ((e >>> 24) & 255) +
                  ((e >>> 8) & 65280) +
                  ((65280 & e) << 8) +
                  ((255 & e) << 24)
                );
              }
              function i() {
                (this.mode = 0),
                  (this.last = !1),
                  (this.wrap = 0),
                  (this.havedict = !1),
                  (this.flags = 0),
                  (this.dmax = 0),
                  (this.check = 0),
                  (this.total = 0),
                  (this.head = null),
                  (this.wbits = 0),
                  (this.wsize = 0),
                  (this.whave = 0),
                  (this.wnext = 0),
                  (this.window = null),
                  (this.hold = 0),
                  (this.bits = 0),
                  (this.length = 0),
                  (this.offset = 0),
                  (this.extra = 0),
                  (this.lencode = null),
                  (this.distcode = null),
                  (this.lenbits = 0),
                  (this.distbits = 0),
                  (this.ncode = 0),
                  (this.nlen = 0),
                  (this.ndist = 0),
                  (this.have = 0),
                  (this.next = null),
                  (this.lens = new L.Buf16(320)),
                  (this.work = new L.Buf16(288)),
                  (this.lendyn = null),
                  (this.distdyn = null),
                  (this.sane = 0),
                  (this.back = 0),
                  (this.was = 0);
              }
              function a(e) {
                var t;
                return e && e.state
                  ? ((t = e.state),
                    (e.total_in = e.total_out = t.total = 0),
                    (e.msg = ""),
                    t.wrap && (e.adler = 1 & t.wrap),
                    (t.mode = N),
                    (t.last = 0),
                    (t.havedict = 0),
                    (t.dmax = 32768),
                    (t.head = null),
                    (t.hold = 0),
                    (t.bits = 0),
                    (t.lencode = t.lendyn = new L.Buf32(n)),
                    (t.distcode = t.distdyn = new L.Buf32(o)),
                    (t.sane = 1),
                    (t.back = -1),
                    z)
                  : F;
              }
              function s(e) {
                var t;
                return e && e.state
                  ? (((t = e.state).wsize = 0),
                    (t.whave = 0),
                    (t.wnext = 0),
                    a(e))
                  : F;
              }
              function l(e, t) {
                var r, n;
                return !e ||
                  !e.state ||
                  ((n = e.state),
                  t < 0
                    ? ((r = 0), (t = -t))
                    : ((r = 1 + (t >> 4)), t < 48 && (t &= 15)),
                  t && (t < 8 || 15 < t))
                  ? F
                  : (null !== n.window && n.wbits !== t && (n.window = null),
                    (n.wrap = r),
                    (n.wbits = t),
                    s(e));
              }
              function d(e, t) {
                var r;
                return e
                  ? ((r = new i()),
                    ((e.state = r).window = null),
                    (r = l(e, t)) !== z && (e.state = null),
                    r)
                  : F;
              }
              var Z,
                D,
                M = !0;
              function W(e, t, r, n) {
                var o;
                return (
                  null === (e = e.state).window &&
                    ((e.wsize = 1 << e.wbits),
                    (e.wnext = 0),
                    (e.whave = 0),
                    (e.window = new L.Buf8(e.wsize))),
                  n >= e.wsize
                    ? (L.arraySet(e.window, t, r - e.wsize, e.wsize, 0),
                      (e.wnext = 0),
                      (e.whave = e.wsize))
                    : (n < (o = e.wsize - e.wnext) && (o = n),
                      L.arraySet(e.window, t, r - n, o, e.wnext),
                      (n -= o)
                        ? (L.arraySet(e.window, t, r - n, n, 0),
                          (e.wnext = n),
                          (e.whave = e.wsize))
                        : ((e.wnext += o),
                          e.wnext === e.wsize && (e.wnext = 0),
                          e.whave < e.wsize && (e.whave += o))),
                  0
                );
              }
              (r.inflateReset = s),
                (r.inflateReset2 = l),
                (r.inflateResetKeep = a),
                (r.inflateInit = function (e) {
                  return d(e, 15);
                }),
                (r.inflateInit2 = d),
                (r.inflate = function (e, t) {
                  var r,
                    n,
                    o,
                    i,
                    a,
                    s,
                    l,
                    d,
                    f,
                    u,
                    c,
                    h,
                    b,
                    m,
                    g,
                    p,
                    w,
                    v,
                    k,
                    y,
                    _,
                    x,
                    S,
                    E,
                    U = 0,
                    C = new L.Buf8(4),
                    B = [
                      16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14,
                      1, 15,
                    ];
                  if (
                    !e ||
                    !e.state ||
                    !e.output ||
                    (!e.input && 0 !== e.avail_in)
                  )
                    return F;
                  12 === (r = e.state).mode && (r.mode = 13),
                    (a = e.next_out),
                    (o = e.output),
                    (l = e.avail_out),
                    (i = e.next_in),
                    (n = e.input),
                    (s = e.avail_in),
                    (d = r.hold),
                    (f = r.bits),
                    (u = s),
                    (c = l),
                    (x = z);
                  e: for (;;)
                    switch (r.mode) {
                      case N:
                        if (0 === r.wrap) r.mode = 13;
                        else {
                          for (; f < 16; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          if (2 & r.wrap && 35615 === d)
                            (C[(r.check = 0)] = 255 & d),
                              (C[1] = (d >>> 8) & 255),
                              (r.check = O(r.check, C, 2, 0)),
                              (f = d = 0),
                              (r.mode = 2);
                          else if (
                            ((r.flags = 0),
                            r.head && (r.head.done = !1),
                            !(1 & r.wrap) || (((255 & d) << 8) + (d >> 8)) % 31)
                          )
                            (e.msg = "incorrect header check"), (r.mode = 30);
                          else if (8 != (15 & d))
                            (e.msg = "unknown compression method"),
                              (r.mode = 30);
                          else {
                            if (
                              ((f -= 4),
                              (_ = 8 + (15 & (d >>>= 4))),
                              0 === r.wbits)
                            )
                              r.wbits = _;
                            else if (_ > r.wbits) {
                              (e.msg = "invalid window size"), (r.mode = 30);
                              break;
                            }
                            (r.dmax = 1 << _),
                              (e.adler = r.check = 1),
                              (r.mode = 512 & d ? 10 : 12),
                              (f = d = 0);
                          }
                        }
                        break;
                      case 2:
                        for (; f < 16; ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        if (((r.flags = d), 8 != (255 & r.flags))) {
                          (e.msg = "unknown compression method"), (r.mode = 30);
                          break;
                        }
                        if (57344 & r.flags) {
                          (e.msg = "unknown header flags set"), (r.mode = 30);
                          break;
                        }
                        r.head && (r.head.text = (d >> 8) & 1),
                          512 & r.flags &&
                            ((C[0] = 255 & d),
                            (C[1] = (d >>> 8) & 255),
                            (r.check = O(r.check, C, 2, 0))),
                          (f = d = 0),
                          (r.mode = 3);
                      case 3:
                        for (; f < 32; ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        r.head && (r.head.time = d),
                          512 & r.flags &&
                            ((C[0] = 255 & d),
                            (C[1] = (d >>> 8) & 255),
                            (C[2] = (d >>> 16) & 255),
                            (C[3] = (d >>> 24) & 255),
                            (r.check = O(r.check, C, 4, 0))),
                          (f = d = 0),
                          (r.mode = 4);
                      case 4:
                        for (; f < 16; ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        r.head &&
                          ((r.head.xflags = 255 & d), (r.head.os = d >> 8)),
                          512 & r.flags &&
                            ((C[0] = 255 & d),
                            (C[1] = (d >>> 8) & 255),
                            (r.check = O(r.check, C, 2, 0))),
                          (f = d = 0),
                          (r.mode = 5);
                      case 5:
                        if (1024 & r.flags) {
                          for (; f < 16; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          (r.length = d),
                            r.head && (r.head.extra_len = d),
                            512 & r.flags &&
                              ((C[0] = 255 & d),
                              (C[1] = (d >>> 8) & 255),
                              (r.check = O(r.check, C, 2, 0))),
                            (f = d = 0);
                        } else r.head && (r.head.extra = null);
                        r.mode = 6;
                      case 6:
                        if (
                          1024 & r.flags &&
                          ((h = s < (h = r.length) ? s : h) &&
                            (r.head &&
                              ((_ = r.head.extra_len - r.length),
                              r.head.extra ||
                                (r.head.extra = new Array(r.head.extra_len)),
                              L.arraySet(r.head.extra, n, i, h, _)),
                            512 & r.flags && (r.check = O(r.check, n, h, i)),
                            (s -= h),
                            (i += h),
                            (r.length -= h)),
                          r.length)
                        )
                          break e;
                        (r.length = 0), (r.mode = 7);
                      case 7:
                        if (2048 & r.flags) {
                          if (0 === s) break e;
                          for (
                            h = 0;
                            (_ = n[i + h++]),
                              r.head &&
                                _ &&
                                r.length < 65536 &&
                                (r.head.name += String.fromCharCode(_)),
                              _ && h < s;

                          );
                          if (
                            (512 & r.flags && (r.check = O(r.check, n, h, i)),
                            (s -= h),
                            (i += h),
                            _)
                          )
                            break e;
                        } else r.head && (r.head.name = null);
                        (r.length = 0), (r.mode = 8);
                      case 8:
                        if (4096 & r.flags) {
                          if (0 === s) break e;
                          for (
                            h = 0;
                            (_ = n[i + h++]),
                              r.head &&
                                _ &&
                                r.length < 65536 &&
                                (r.head.comment += String.fromCharCode(_)),
                              _ && h < s;

                          );
                          if (
                            (512 & r.flags && (r.check = O(r.check, n, h, i)),
                            (s -= h),
                            (i += h),
                            _)
                          )
                            break e;
                        } else r.head && (r.head.comment = null);
                        r.mode = 9;
                      case 9:
                        if (512 & r.flags) {
                          for (; f < 16; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          if (d !== (65535 & r.check)) {
                            (e.msg = "header crc mismatch"), (r.mode = 30);
                            break;
                          }
                          f = d = 0;
                        }
                        r.head &&
                          ((r.head.hcrc = (r.flags >> 9) & 1),
                          (r.head.done = !0)),
                          (e.adler = r.check = 0),
                          (r.mode = 12);
                        break;
                      case 10:
                        for (; f < 32; ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        (e.adler = r.check = H(d)), (f = d = 0), (r.mode = 11);
                      case 11:
                        if (0 === r.havedict)
                          return (
                            (e.next_out = a),
                            (e.avail_out = l),
                            (e.next_in = i),
                            (e.avail_in = s),
                            (r.hold = d),
                            (r.bits = f),
                            2
                          );
                        (e.adler = r.check = 1), (r.mode = 12);
                      case 12:
                        if (5 === t || 6 === t) break e;
                      case 13:
                        if (r.last) (d >>>= 7 & f), (f -= 7 & f), (r.mode = 27);
                        else {
                          for (; f < 3; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          switch (((r.last = 1 & d), --f, 3 & (d >>>= 1))) {
                            case 0:
                              r.mode = 14;
                              break;
                            case 1:
                              var A,
                                A = (T = void 0),
                                T = r;
                              if (M) {
                                for (
                                  Z = new L.Buf32(512),
                                    D = new L.Buf32(32),
                                    A = 0;
                                  A < 144;

                                )
                                  T.lens[A++] = 8;
                                for (; A < 256; ) T.lens[A++] = 9;
                                for (; A < 280; ) T.lens[A++] = 7;
                                for (; A < 288; ) T.lens[A++] = 8;
                                for (
                                  P(1, T.lens, 0, 288, Z, 0, T.work, {
                                    bits: 9,
                                  }),
                                    A = 0;
                                  A < 32;

                                )
                                  T.lens[A++] = 5;
                                P(2, T.lens, 0, 32, D, 0, T.work, { bits: 5 }),
                                  (M = !1);
                              }
                              if (
                                ((T.lencode = Z),
                                (T.lenbits = 9),
                                (T.distcode = D),
                                (T.distbits = 5),
                                (r.mode = 20),
                                6 !== t)
                              )
                                break;
                              (d >>>= 2), (f -= 2);
                              break e;
                            case 2:
                              r.mode = 17;
                              break;
                            case 3:
                              (e.msg = "invalid block type"), (r.mode = 30);
                          }
                          (d >>>= 2), (f -= 2);
                        }
                        break;
                      case 14:
                        for (d >>>= 7 & f, f -= 7 & f; f < 32; ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        if ((65535 & d) != ((d >>> 16) ^ 65535)) {
                          (e.msg = "invalid stored block lengths"),
                            (r.mode = 30);
                          break;
                        }
                        if (
                          ((r.length = 65535 & d),
                          (f = d = 0),
                          (r.mode = 15),
                          6 === t)
                        )
                          break e;
                      case 15:
                        r.mode = 16;
                      case 16:
                        if ((h = r.length)) {
                          if (0 === (h = l < (h = s < h ? s : h) ? l : h))
                            break e;
                          L.arraySet(o, n, i, h, a),
                            (s -= h),
                            (i += h),
                            (l -= h),
                            (a += h),
                            (r.length -= h);
                        } else r.mode = 12;
                        break;
                      case 17:
                        for (; f < 14; ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        if (
                          ((r.nlen = 257 + (31 & d)),
                          (d >>>= 5),
                          (f -= 5),
                          (r.ndist = 1 + (31 & d)),
                          (d >>>= 5),
                          (f -= 5),
                          (r.ncode = 4 + (15 & d)),
                          (d >>>= 4),
                          (f -= 4),
                          286 < r.nlen || 30 < r.ndist)
                        ) {
                          (e.msg = "too many length or distance symbols"),
                            (r.mode = 30);
                          break;
                        }
                        (r.have = 0), (r.mode = 18);
                      case 18:
                        for (; r.have < r.ncode; ) {
                          for (; f < 3; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          (r.lens[B[r.have++]] = 7 & d), (d >>>= 3), (f -= 3);
                        }
                        for (; r.have < 19; ) r.lens[B[r.have++]] = 0;
                        if (
                          ((r.lencode = r.lendyn),
                          (r.lenbits = 7),
                          (S = { bits: r.lenbits }),
                          (x = P(0, r.lens, 0, 19, r.lencode, 0, r.work, S)),
                          (r.lenbits = S.bits),
                          x)
                        ) {
                          (e.msg = "invalid code lengths set"), (r.mode = 30);
                          break;
                        }
                        (r.have = 0), (r.mode = 19);
                      case 19:
                        for (; r.have < r.nlen + r.ndist; ) {
                          for (
                            ;
                            (p =
                              ((U = r.lencode[d & ((1 << r.lenbits) - 1)]) >>>
                                16) &
                              255),
                              (w = 65535 & U),
                              !((g = U >>> 24) <= f);

                          ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          if (w < 16)
                            (d >>>= g), (f -= g), (r.lens[r.have++] = w);
                          else {
                            if (16 === w) {
                              for (E = g + 2; f < E; ) {
                                if (0 === s) break e;
                                s--, (d += n[i++] << f), (f += 8);
                              }
                              if (((d >>>= g), (f -= g), 0 === r.have)) {
                                (e.msg = "invalid bit length repeat"),
                                  (r.mode = 30);
                                break;
                              }
                              (_ = r.lens[r.have - 1]),
                                (h = 3 + (3 & d)),
                                (d >>>= 2),
                                (f -= 2);
                            } else if (17 === w) {
                              for (E = g + 3; f < E; ) {
                                if (0 === s) break e;
                                s--, (d += n[i++] << f), (f += 8);
                              }
                              (_ = 0),
                                (h = 3 + (7 & (d >>>= g))),
                                (d >>>= 3),
                                (f = f - g - 3);
                            } else {
                              for (E = g + 7; f < E; ) {
                                if (0 === s) break e;
                                s--, (d += n[i++] << f), (f += 8);
                              }
                              (_ = 0),
                                (h = 11 + (127 & (d >>>= g))),
                                (d >>>= 7),
                                (f = f - g - 7);
                            }
                            if (r.have + h > r.nlen + r.ndist) {
                              (e.msg = "invalid bit length repeat"),
                                (r.mode = 30);
                              break;
                            }
                            for (; h--; ) r.lens[r.have++] = _;
                          }
                        }
                        if (30 === r.mode) break;
                        if (0 === r.lens[256]) {
                          (e.msg = "invalid code -- missing end-of-block"),
                            (r.mode = 30);
                          break;
                        }
                        if (
                          ((r.lenbits = 9),
                          (S = { bits: r.lenbits }),
                          (x = P(
                            1,
                            r.lens,
                            0,
                            r.nlen,
                            r.lencode,
                            0,
                            r.work,
                            S
                          )),
                          (r.lenbits = S.bits),
                          x)
                        ) {
                          (e.msg = "invalid literal/lengths set"),
                            (r.mode = 30);
                          break;
                        }
                        if (
                          ((r.distbits = 6),
                          (r.distcode = r.distdyn),
                          (S = { bits: r.distbits }),
                          (x = P(
                            2,
                            r.lens,
                            r.nlen,
                            r.ndist,
                            r.distcode,
                            0,
                            r.work,
                            S
                          )),
                          (r.distbits = S.bits),
                          x)
                        ) {
                          (e.msg = "invalid distances set"), (r.mode = 30);
                          break;
                        }
                        if (((r.mode = 20), 6 === t)) break e;
                      case 20:
                        r.mode = 21;
                      case 21:
                        if (6 <= s && 258 <= l) {
                          (e.next_out = a),
                            (e.avail_out = l),
                            (e.next_in = i),
                            (e.avail_in = s),
                            (r.hold = d),
                            (r.bits = f),
                            I(e, c),
                            (a = e.next_out),
                            (o = e.output),
                            (l = e.avail_out),
                            (i = e.next_in),
                            (n = e.input),
                            (s = e.avail_in),
                            (d = r.hold),
                            (f = r.bits),
                            12 === r.mode && (r.back = -1);
                          break;
                        }
                        for (
                          r.back = 0;
                          (p =
                            ((U = r.lencode[d & ((1 << r.lenbits) - 1)]) >>>
                              16) &
                            255),
                            (w = 65535 & U),
                            !((g = U >>> 24) <= f);

                        ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        if (p && 0 == (240 & p)) {
                          for (
                            v = g, k = p, y = w;
                            (p =
                              ((U =
                                r.lencode[
                                  y + ((d & ((1 << (v + k)) - 1)) >> v)
                                ]) >>>
                                16) &
                              255),
                              (w = 65535 & U),
                              !(v + (g = U >>> 24) <= f);

                          ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          (d >>>= v), (f -= v), (r.back += v);
                        }
                        if (
                          ((d >>>= g),
                          (f -= g),
                          (r.back += g),
                          (r.length = w),
                          0 === p)
                        ) {
                          r.mode = 26;
                          break;
                        }
                        if (32 & p) {
                          (r.back = -1), (r.mode = 12);
                          break;
                        }
                        if (64 & p) {
                          (e.msg = "invalid literal/length code"),
                            (r.mode = 30);
                          break;
                        }
                        (r.extra = 15 & p), (r.mode = 22);
                      case 22:
                        if (r.extra) {
                          for (E = r.extra; f < E; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          (r.length += d & ((1 << r.extra) - 1)),
                            (d >>>= r.extra),
                            (f -= r.extra),
                            (r.back += r.extra);
                        }
                        (r.was = r.length), (r.mode = 23);
                      case 23:
                        for (
                          ;
                          (p =
                            ((U = r.distcode[d & ((1 << r.distbits) - 1)]) >>>
                              16) &
                            255),
                            (w = 65535 & U),
                            !((g = U >>> 24) <= f);

                        ) {
                          if (0 === s) break e;
                          s--, (d += n[i++] << f), (f += 8);
                        }
                        if (0 == (240 & p)) {
                          for (
                            v = g, k = p, y = w;
                            (p =
                              ((U =
                                r.distcode[
                                  y + ((d & ((1 << (v + k)) - 1)) >> v)
                                ]) >>>
                                16) &
                              255),
                              (w = 65535 & U),
                              !(v + (g = U >>> 24) <= f);

                          ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          (d >>>= v), (f -= v), (r.back += v);
                        }
                        if (((d >>>= g), (f -= g), (r.back += g), 64 & p)) {
                          (e.msg = "invalid distance code"), (r.mode = 30);
                          break;
                        }
                        (r.offset = w), (r.extra = 15 & p), (r.mode = 24);
                      case 24:
                        if (r.extra) {
                          for (E = r.extra; f < E; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          (r.offset += d & ((1 << r.extra) - 1)),
                            (d >>>= r.extra),
                            (f -= r.extra),
                            (r.back += r.extra);
                        }
                        if (r.offset > r.dmax) {
                          (e.msg = "invalid distance too far back"),
                            (r.mode = 30);
                          break;
                        }
                        r.mode = 25;
                      case 25:
                        if (0 === l) break e;
                        if (r.offset > (h = c - l)) {
                          if ((h = r.offset - h) > r.whave && r.sane) {
                            (e.msg = "invalid distance too far back"),
                              (r.mode = 30);
                            break;
                          }
                          (b =
                            h > r.wnext
                              ? ((h -= r.wnext), r.wsize - h)
                              : r.wnext - h),
                            h > r.length && (h = r.length),
                            (m = r.window);
                        } else (m = o), (b = a - r.offset), (h = r.length);
                        for (
                          l -= h = l < h ? l : h, r.length -= h;
                          (o[a++] = m[b++]), --h;

                        );
                        0 === r.length && (r.mode = 21);
                        break;
                      case 26:
                        if (0 === l) break e;
                        (o[a++] = r.length), l--, (r.mode = 21);
                        break;
                      case 27:
                        if (r.wrap) {
                          for (; f < 32; ) {
                            if (0 === s) break e;
                            s--, (d |= n[i++] << f), (f += 8);
                          }
                          if (
                            ((c -= l),
                            (e.total_out += c),
                            (r.total += c),
                            c &&
                              (e.adler = r.check =
                                (r.flags ? O : R)(r.check, o, c, a - c)),
                            (c = l),
                            (r.flags ? d : H(d)) !== r.check)
                          ) {
                            (e.msg = "incorrect data check"), (r.mode = 30);
                            break;
                          }
                          f = d = 0;
                        }
                        r.mode = 28;
                      case 28:
                        if (r.wrap && r.flags) {
                          for (; f < 32; ) {
                            if (0 === s) break e;
                            s--, (d += n[i++] << f), (f += 8);
                          }
                          if (d !== (4294967295 & r.total)) {
                            (e.msg = "incorrect length check"), (r.mode = 30);
                            break;
                          }
                          f = d = 0;
                        }
                        r.mode = 29;
                      case 29:
                        x = 1;
                        break e;
                      case 30:
                        x = -3;
                        break e;
                      case 31:
                        return -4;
                      default:
                        return F;
                    }
                  return (
                    (e.next_out = a),
                    (e.avail_out = l),
                    (e.next_in = i),
                    (e.avail_in = s),
                    (r.hold = d),
                    (r.bits = f),
                    (r.wsize ||
                      (c !== e.avail_out &&
                        r.mode < 30 &&
                        (r.mode < 27 || 4 !== t))) &&
                    W(e, e.output, e.next_out, c - e.avail_out)
                      ? ((r.mode = 31), -4)
                      : ((u -= e.avail_in),
                        (c -= e.avail_out),
                        (e.total_in += u),
                        (e.total_out += c),
                        (r.total += c),
                        r.wrap &&
                          c &&
                          (e.adler = r.check =
                            (r.flags ? O : R)(r.check, o, c, e.next_out - c)),
                        (e.data_type =
                          r.bits +
                          (r.last ? 64 : 0) +
                          (12 === r.mode ? 128 : 0) +
                          (20 === r.mode || 15 === r.mode ? 256 : 0)),
                        ((0 == u && 0 === c) || 4 === t) && x === z ? -5 : x)
                  );
                }),
                (r.inflateEnd = function (e) {
                  var t;
                  return e && e.state
                    ? ((t = e.state).window && (t.window = null),
                      (e.state = null),
                      z)
                    : F;
                }),
                (r.inflateGetHeader = function (e, t) {
                  return e && e.state && 0 != (2 & (e = e.state).wrap)
                    ? (((e.head = t).done = !1), z)
                    : F;
                }),
                (r.inflateSetDictionary = function (e, t) {
                  var r,
                    n = t.length;
                  return !e ||
                    !e.state ||
                    (0 !== (r = e.state).wrap && 11 !== r.mode)
                    ? F
                    : 11 === r.mode && R(1, t, n, 0) !== r.check
                    ? -3
                    : W(e, t, n, n)
                    ? ((r.mode = 31), -4)
                    : ((r.havedict = 1), z);
                }),
                (r.inflateInfo = "pako inflate (from Nodeca project)");
            },
            "zlib/constants.js": function (e, t, r) {
              "use strict";
              t.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8,
              };
            },
            "zlib/messages.js": function (e, t, r) {
              "use strict";
              t.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version",
              };
            },
            "zlib/zstream.js": function (e, t, r) {
              "use strict";
              t.exports = function () {
                (this.input = null),
                  (this.next_in = 0),
                  (this.avail_in = 0),
                  (this.total_in = 0),
                  (this.output = null),
                  (this.next_out = 0),
                  (this.avail_out = 0),
                  (this.total_out = 0),
                  (this.msg = ""),
                  (this.state = null),
                  (this.data_type = 2),
                  (this.adler = 0);
              };
            },
            "zlib/gzheader.js": function (e, t, r) {
              "use strict";
              t.exports = function () {
                (this.text = 0),
                  (this.time = 0),
                  (this.xflags = 0),
                  (this.os = 0),
                  (this.extra = null),
                  (this.extra_len = 0),
                  (this.name = ""),
                  (this.comment = ""),
                  (this.hcrc = 0),
                  (this.done = !1);
              };
            },
            "zlib/adler32.js": function (e, t, r) {
              "use strict";
              t.exports = function (e, t, r, n) {
                for (
                  var o = (65535 & e) | 0, i = ((e >>> 16) & 65535) | 0, a = 0;
                  0 !== r;

                ) {
                  for (
                    r -= a = 2e3 < r ? 2e3 : r;
                    (i = (i + (o = (o + t[n++]) | 0)) | 0), --a;

                  );
                  (o %= 65521), (i %= 65521);
                }
                return o | (i << 16) | 0;
              };
            },
            "zlib/crc32.js": function (e, t, r) {
              "use strict";
              var s = (function () {
                for (var e = [], t = 0; t < 256; t++) {
                  for (var r = t, n = 0; n < 8; n++)
                    r = 1 & r ? 3988292384 ^ (r >>> 1) : r >>> 1;
                  e[t] = r;
                }
                return e;
              })();
              t.exports = function (e, t, r, n) {
                var o = s,
                  i = n + r;
                e ^= -1;
                for (var a = n; a < i; a++) e = (e >>> 8) ^ o[255 & (e ^ t[a])];
                return -1 ^ e;
              };
            },
            "zlib/inffast.js": function (e, t, r) {
              "use strict";
              t.exports = function (e, t) {
                var r,
                  n,
                  o,
                  i,
                  a,
                  s,
                  l = e.state,
                  d = e.next_in,
                  f = e.input,
                  u = d + (e.avail_in - 5),
                  c = e.next_out,
                  h = e.output,
                  b = c - (t - e.avail_out),
                  m = c + (e.avail_out - 257),
                  g = l.dmax,
                  p = l.wsize,
                  w = l.whave,
                  v = l.wnext,
                  k = l.window,
                  y = l.hold,
                  _ = l.bits,
                  x = l.lencode,
                  S = l.distcode,
                  E = (1 << l.lenbits) - 1,
                  U = (1 << l.distbits) - 1;
                e: do {
                  for (
                    _ < 15 &&
                      ((y += f[d++] << _),
                      (_ += 8),
                      (y += f[d++] << _),
                      (_ += 8)),
                      r = x[y & E];
                    ;

                  ) {
                    if (
                      ((y >>>= n = r >>> 24),
                      (_ -= n),
                      0 == (n = (r >>> 16) & 255))
                    )
                      h[c++] = 65535 & r;
                    else {
                      if (!(16 & n)) {
                        if (0 == (64 & n)) {
                          r = x[(65535 & r) + (y & ((1 << n) - 1))];
                          continue;
                        }
                        if (32 & n) {
                          l.mode = 12;
                          break e;
                        }
                        (e.msg = "invalid literal/length code"), (l.mode = 30);
                        break e;
                      }
                      for (
                        o = 65535 & r,
                          (n &= 15) &&
                            (_ < n && ((y += f[d++] << _), (_ += 8)),
                            (o += y & ((1 << n) - 1)),
                            (y >>>= n),
                            (_ -= n)),
                          _ < 15 &&
                            ((y += f[d++] << _),
                            (_ += 8),
                            (y += f[d++] << _),
                            (_ += 8)),
                          r = S[y & U];
                        ;

                      ) {
                        if (
                          ((y >>>= n = r >>> 24),
                          (_ -= n),
                          !(16 & (n = (r >>> 16) & 255)))
                        ) {
                          if (0 == (64 & n)) {
                            r = S[(65535 & r) + (y & ((1 << n) - 1))];
                            continue;
                          }
                          (e.msg = "invalid distance code"), (l.mode = 30);
                          break e;
                        }
                        if (
                          ((i = 65535 & r),
                          _ < (n &= 15) &&
                            ((y += f[d++] << _),
                            (_ += 8) < n && ((y += f[d++] << _), (_ += 8))),
                          g < (i += y & ((1 << n) - 1)))
                        ) {
                          (e.msg = "invalid distance too far back"),
                            (l.mode = 30);
                          break e;
                        }
                        if (((y >>>= n), (_ -= n), (n = c - b) < i)) {
                          if (w < (n = i - n) && l.sane) {
                            (e.msg = "invalid distance too far back"),
                              (l.mode = 30);
                            break e;
                          }
                          if (((s = k), (a = 0) === v)) {
                            if (((a += p - n), n < o)) {
                              for (o -= n; (h[c++] = k[a++]), --n; );
                              (a = c - i), (s = h);
                            }
                          } else if (v < n) {
                            if (((a += p + v - n), (n -= v) < o)) {
                              for (o -= n; (h[c++] = k[a++]), --n; );
                              if (((a = 0), v < o)) {
                                for (o -= n = v; (h[c++] = k[a++]), --n; );
                                (a = c - i), (s = h);
                              }
                            }
                          } else if (((a += v - n), n < o)) {
                            for (o -= n; (h[c++] = k[a++]), --n; );
                            (a = c - i), (s = h);
                          }
                          for (; 2 < o; )
                            (h[c++] = s[a++]),
                              (h[c++] = s[a++]),
                              (h[c++] = s[a++]),
                              (o -= 3);
                          o && ((h[c++] = s[a++]), 1 < o && (h[c++] = s[a++]));
                        } else {
                          for (
                            a = c - i;
                            (h[c++] = h[a++]),
                              (h[c++] = h[a++]),
                              (h[c++] = h[a++]),
                              2 < (o -= 3);

                          );
                          o && ((h[c++] = h[a++]), 1 < o && (h[c++] = h[a++]));
                        }
                        break;
                      }
                    }
                    break;
                  }
                } while (d < u && c < m);
                (y &= (1 << (_ -= (o = _ >> 3) << 3)) - 1),
                  (e.next_in = d -= o),
                  (e.next_out = c),
                  (e.avail_in = d < u ? u - d + 5 : 5 - (d - u)),
                  (e.avail_out = c < m ? m - c + 257 : 257 - (c - m)),
                  (l.hold = y),
                  (l.bits = _);
              };
            },
            "zlib/inftrees.js": function (e, t, r) {
              "use strict";
              var I = e("../utils/common"),
                P = [
                  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35,
                  43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
                ],
                z = [
                  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18,
                  18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72,
                  78,
                ],
                F = [
                  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
                  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193,
                  12289, 16385, 24577, 0, 0,
                ],
                N = [
                  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22,
                  22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29,
                  64, 64,
                ];
              t.exports = function (e, t, r, n, o, i, a, s) {
                for (
                  var l,
                    d,
                    f,
                    u,
                    c,
                    h,
                    b,
                    m,
                    g,
                    p = s.bits,
                    w = 0,
                    v = 0,
                    k = 0,
                    y = 0,
                    _ = 0,
                    x = 0,
                    S = 0,
                    E = 0,
                    U = 0,
                    C = 0,
                    B = null,
                    A = 0,
                    T = new I.Buf16(16),
                    L = new I.Buf16(16),
                    R = null,
                    O = 0,
                    w = 0;
                  w <= 15;
                  w++
                )
                  T[w] = 0;
                for (v = 0; v < n; v++) T[t[r + v]]++;
                for (_ = p, y = 15; 1 <= y && 0 === T[y]; y--);
                if ((y < _ && (_ = y), 0 === y))
                  (o[i++] = 20971520), (o[i++] = 20971520), (s.bits = 1);
                else {
                  for (k = 1; k < y && 0 === T[k]; k++);
                  for (_ < k && (_ = k), w = E = 1; w <= 15; w++)
                    if ((E = (E <<= 1) - T[w]) < 0) return -1;
                  if (0 < E && (0 === e || 1 !== y)) return -1;
                  for (L[1] = 0, w = 1; w < 15; w++) L[w + 1] = L[w] + T[w];
                  for (v = 0; v < n; v++)
                    0 !== t[r + v] && (a[L[t[r + v]]++] = v);
                  if (
                    ((h =
                      0 === e
                        ? ((B = R = a), 19)
                        : 1 === e
                        ? ((B = P), (A -= 257), (R = z), (O -= 257), 256)
                        : ((B = F), (R = N), -1)),
                    (w = k),
                    (c = i),
                    (S = v = C = 0),
                    (f = -1),
                    (u = (U = 1 << (x = _)) - 1),
                    (1 === e && 852 < U) || (2 === e && 592 < U))
                  )
                    return 1;
                  for (;;) {
                    for (
                      g =
                        a[v] < h
                          ? ((m = 0), a[v])
                          : a[v] > h
                          ? ((m = R[O + a[v]]), B[A + a[v]])
                          : ((m = 96), 0),
                        l = 1 << (b = w - S),
                        k = d = 1 << x;
                      (o[c + (C >> S) + (d -= l)] =
                        (b << 24) | (m << 16) | g | 0),
                        0 !== d;

                    );
                    for (l = 1 << (w - 1); C & l; ) l >>= 1;
                    if (
                      ((C = 0 !== l ? (C & (l - 1)) + l : 0), v++, 0 == --T[w])
                    ) {
                      if (w === y) break;
                      w = t[r + a[v]];
                    }
                    if (_ < w && (C & u) !== f) {
                      for (
                        c += k, E = 1 << (x = w - (S = 0 === S ? _ : S));
                        x + S < y && !((E -= T[x + S]) <= 0);

                      )
                        x++, (E <<= 1);
                      if (
                        ((U += 1 << x),
                        (1 === e && 852 < U) || (2 === e && 592 < U))
                      )
                        return 1;
                      o[(f = C & u)] = (_ << 24) | (x << 16) | (c - i) | 0;
                    }
                  }
                  0 !== C && (o[c + C] = ((w - S) << 24) | (64 << 16) | 0),
                    (s.bits = _);
                }
                return 0;
              };
            },
          };
        for (t in r) r[t].folder = t.substring(0, t.lastIndexOf("/") + 1);
        function n(e, t) {
          var r = t.match(/^\//)
            ? null
            : e
            ? t.match(/^\.\.?\//)
              ? o(e.folder + t)
              : i(e, t)
            : o(t);
          if (r)
            return (
              r.exports ||
                ((r.parent = e), r(n.bind(null, r), r, (r.exports = {}))),
              r.exports
            );
          throw "module not found: " + t;
        }
        var o = function (e) {
            var t = [];
            return (e = e.split("/").every(function (e) {
              return ".." == e ? t.pop() : "." == e || "" == e || t.push(e);
            })
              ? t.join("/")
              : null)
              ? r[e] || r[e + ".js"] || r[e + "/index.js"]
              : null;
          },
          i = function (e, t) {
            return e
              ? o(e.folder + "node_modules/" + t) || i(e.parent, t)
              : null;
          };
        return n(null, e);
      },
      decompress: function (e) {
        this.exports || (this.exports = this.require("inflate.js"));
        try {
          return this.exports.inflate(e);
        } catch (e) {}
      },
      hasUnityMarker: function (e) {
        var t = 10,
          r = "UnityWeb Compressed Content (gzip)";
        if (t > e.length || 31 != e[0] || 139 != e[1]) return !1;
        var n = e[3];
        if (4 & n) {
          if (t + 2 > e.length) return !1;
          if ((t += 2 + e[t] + (e[t + 1] << 8)) > e.length) return !1;
        }
        if (8 & n) {
          for (; t < e.length && e[t]; ) t++;
          if (t + 1 > e.length) return !1;
          t++;
        }
        return (
          16 & n &&
          String.fromCharCode.apply(null, e.subarray(t, t + r.length + 1)) ==
            r + "\0"
        );
      },
    },
  };
  function p(r) {
    m(r);
    var e = u.fetchWithProgress,
      t = u[r],
      t = /file:\/\//.exec(t) ? "same-origin" : void 0;
    return e(u[r], {
      method: "GET",
      companyName: u.companyName,
      productName: u.productName,
      productVersion: u.productVersion,
      control: "no-store",
      mode: t,
      onProgress: function (e) {
        m(r, e);
      },
    })
      .then(function (e) {
        return (
          (a = e.parsedBody),
          (s = u[r]),
          new Promise(function (e, t) {
            try {
              for (var r in g) {
                var n, o, i;
                if (g[r].hasUnityMarker(a))
                  return (
                    s &&
                      console.log(
                        'You can reduce startup time if you configure your web server to add "Content-Encoding: ' +
                          r +
                          '" response header when serving "' +
                          s +
                          '" file.'
                      ),
                    (n = g[r]).worker ||
                      ((o = URL.createObjectURL(
                        new Blob(
                          [
                            "this.require = ",
                            n.require.toString(),
                            "; this.decompress = ",
                            n.decompress.toString(),
                            "; this.onmessage = ",
                            function (e) {
                              e = {
                                id: e.data.id,
                                decompressed: this.decompress(
                                  e.data.compressed
                                ),
                              };
                              postMessage(
                                e,
                                e.decompressed ? [e.decompressed.buffer] : []
                              );
                            }.toString(),
                            "; postMessage({ ready: true });",
                          ],
                          { type: "application/javascript" }
                        )
                      )),
                      (n.worker = new Worker(o)),
                      (n.worker.onmessage = function (e) {
                        e.data.ready
                          ? URL.revokeObjectURL(o)
                          : (this.callbacks[e.data.id](e.data.decompressed),
                            delete this.callbacks[e.data.id]);
                      }),
                      (n.worker.callbacks = {}),
                      (n.worker.nextCallbackId = 0)),
                    (i = n.worker.nextCallbackId++),
                    (n.worker.callbacks[i] = e),
                    void n.worker.postMessage({ id: i, compressed: a }, [
                      a.buffer,
                    ])
                  );
              }
              e(a);
            } catch (e) {
              t(e);
            }
          })
        );
        var a, s;
      })
      .catch(function (e) {
        var t = "Failed to download file " + u[r];
        "file:" == location.protocol
          ? d(
              t +
                ". Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.",
              "error"
            )
          : console.error(t);
      });
  }
  function w() {
    Promise.all([
      p("frameworkUrl").then(function (e) {
        var s = URL.createObjectURL(
          new Blob([e], { type: "application/javascript" })
        );
        return new Promise(function (i, e) {
          var a = document.createElement("script");
          (a.src = s),
            (a.onload = function () {
              if ("undefined" == typeof unityFramework || !unityFramework) {
                var e,
                  t = [
                    ["br", "br"],
                    ["gz", "gzip"],
                  ];
                for (e in t) {
                  var r,
                    n = t[e];
                  if (u.frameworkUrl.endsWith("." + n[0]))
                    return (
                      (r = "Unable to parse " + u.frameworkUrl + "!"),
                      "file:" == location.protocol
                        ? void d(
                            r +
                              " Loading pre-compressed (brotli or gzip) content via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host compressed Unity content, or use the Unity Build and Run option.",
                            "error"
                          )
                        : ((r +=
                            ' This can happen if build compression was enabled but web server hosting the content was misconfigured to not serve the file with HTTP Response Header "Content-Encoding: ' +
                            n[1] +
                            '" present. Check browser Console and Devtools Network tab to debug.'),
                          "br" == n[0] &&
                            "http:" == location.protocol &&
                            ((n =
                              -1 !=
                              ["localhost", "127.0.0.1"].indexOf(
                                location.hostname
                              )
                                ? ""
                                : "Migrate your server to use HTTPS."),
                            (r = /Firefox/.test(navigator.userAgent)
                              ? "Unable to parse " +
                                u.frameworkUrl +
                                '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported in Firefox over HTTP connections. ' +
                                n +
                                ' See <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1670675">https://bugzilla.mozilla.org/show_bug.cgi?id=1670675</a> for more information.'
                              : "Unable to parse " +
                                u.frameworkUrl +
                                '!<br>If using custom web server, verify that web server is sending .br files with HTTP Response Header "Content-Encoding: br". Brotli compression may not be supported over HTTP connections. Migrate your server to use HTTPS.')),
                          void d(r, "error"))
                    );
                }
                d(
                  "Unable to parse " +
                    u.frameworkUrl +
                    "! The file is corrupt, or compression was misconfigured? (check Content-Encoding HTTP Response Header on web server)",
                  "error"
                );
              }
              var o = unityFramework;
              (unityFramework = null),
                (a.onload = null),
                URL.revokeObjectURL(s),
                i(o);
            }),
            (a.onerror = function (e) {
              d(
                "Unable to load file " +
                  u.frameworkUrl +
                  "! Check that the file exists on the remote server. (also check browser Console and Devtools Network tab to debug)",
                "error"
              );
            }),
            document.body.appendChild(a),
            u.deinitializers.push(function () {
              document.body.removeChild(a);
            });
        });
      }),
      p("codeUrl"),
    ]).then(function (e) {
      (u.wasmBinary = e[1]), e[0](u);
    });
    var e = p("dataUrl");
    u.preRun.push(function () {
      u.addRunDependency("dataUrl"),
        e.then(function (e) {
          var t = new DataView(e.buffer, e.byteOffset, e.byteLength),
            r = 0,
            n = "UnityWebData1.0\0";
          if (
            !String.fromCharCode.apply(null, e.subarray(r, r + n.length)) == n
          )
            throw "unknown data format";
          var o = t.getUint32((r += n.length), !0);
          for (r += 4; r < o; ) {
            var i = t.getUint32(r, !0),
              a = ((r += 4), t.getUint32(r, !0)),
              s = ((r += 4), t.getUint32(r, !0)),
              l =
                ((r += 4),
                String.fromCharCode.apply(null, e.subarray(r, r + s)));
            r += s;
            for (
              var d = 0, f = l.indexOf("/", d) + 1;
              0 < f;
              d = f, f = l.indexOf("/", d) + 1
            )
              u.FS_createPath(l.substring(0, d), l.substring(d, f - 1), !0, !0);
            u.FS_createDataFile(l, null, e.subarray(i, i + a), !0, !0, !0);
          }
          u.removeRunDependency("dataUrl");
        });
    });
  }
  return new Promise(function (e, t) {
    var r;
    u.SystemInfo.hasWebGL
      ? 1 == u.SystemInfo.hasWebGL
        ? ((r =
            'Your browser does not support graphics API "WebGL 2" which is required for this content.'),
          "Safari" == u.SystemInfo.browser &&
            parseInt(u.SystemInfo.browserVersion) < 15 &&
            (u.SystemInfo.mobile || 1 < navigator.maxTouchPoints
              ? (r += "\nUpgrade to iOS 15 or later.")
              : (r += "\nUpgrade to Safari 15 or later.")),
          t(r))
        : u.SystemInfo.hasWasm
        ? ((u.startupErrorHandler = t),
          l(0),
          u.postRun.push(function () {
            l(1), delete u.startupErrorHandler, e(h);
          }),
          w())
        : t("Your browser does not support WebAssembly.")
      : t("Your browser does not support WebGL.");
  });
}
