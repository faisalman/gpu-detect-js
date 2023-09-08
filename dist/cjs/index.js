"use strict";
/*! GPUDetect.js
    Extracts GPU information from the browser
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GPUDetect = void 0;
var re_parse_js_1 = require("re-parse-js");
var rendererMap = [
    [
        [
            /(intel).*\b(hd\sgraphics\s\d{4}|iris(?:\spro)|gma\s\w+)/i,
            /(nvidia)\s(geforce\s(?:gtx?\s)\d\w+|quadro)/i,
            /\b(sis)\s(\w+)/i
        ],
        ['vendor', 'model']
    ],
    [
        [
            /\b(radeon[\shdr\d]+\w{4,5})/i
        ], ['model', ['vendor', 'AMD']]
    ],
    [
        [
            /(adreno\s(?:\(tm\)\s)\w+)/i
        ],
        [['model', /\(tm\)\s/i, ''], ['vendor', 'Qualcomm']]
    ]
];
var vendorMap = [
    [[
            /\b(amd|apple|arm|ati|img|intel|nvidia|qualcomm|samsung|sis)\b/i
        ], ['vendor']]
];
;
var GPUDetect = (function () {
    function GPUDetect() {
    }
    GPUDetect.getGPU = function (strRenderer, strVendor) {
        var _a;
        var _b, _c;
        var gpuInfo = { vendor: undefined, model: undefined };
        if (typeof strRenderer !== 'string') {
            if (globalThis.document) {
                var canvas = document.createElement('canvas');
                var gl = (canvas.getContext('webgl2') ||
                    canvas.getContext('webgl') ||
                    canvas.getContext('experimental-webgl'));
                if (gl) {
                    var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    strVendor = gl.getParameter((debugInfo === null || debugInfo === void 0 ? void 0 : debugInfo.UNMASKED_VENDOR_WEBGL) || 0);
                    strRenderer = gl.getParameter((debugInfo === null || debugInfo === void 0 ? void 0 : debugInfo.UNMASKED_RENDERER_WEBGL) || 0);
                }
            }
        }
        if (strRenderer) {
            var re = new re_parse_js_1.REParse();
            (_a = re.use(rendererMap).parse(strRenderer), gpuInfo.vendor = _a.vendor, gpuInfo.model = _a.model);
            if (strVendor) {
                gpuInfo.vendor = gpuInfo.vendor || ((_b = re.parse(strVendor)) === null || _b === void 0 ? void 0 : _b.vendor) || ((_c = re.use(vendorMap).parse(strVendor)) === null || _c === void 0 ? void 0 : _c.vendor);
            }
        }
        return gpuInfo;
    };
    return GPUDetect;
}());
exports.GPUDetect = GPUDetect;
