//////////////////////////////////////////////
/*! GPUDetect.js
    Extracts GPU information from the browser
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
/////////////////////////////////////////////

import { REParse } from 're-parse-js';

const rendererMap = [
    [
        [
            /(intel).*\b(hd\sgraphics\s\d{4}|iris(?:\spro)|gma\s\w+)/i,         // Intel
            /(nvidia)\s(geforce\s(?:gtx?\s)\d\w+|quadro)/i,                     // NVIDIA
            /\b(sis)\s(\w+)/i                                                   // SiS
        ], 
        ['vendor', 'model']
    ],
    [
        [
            /\b(radeon[\shdr\d]+\w{4,5})/i                                         // ATI/AMD
        ], ['model', ['vendor', 'AMD']]
    ], 
    [
        [
            /(adreno\s(?:\(tm\)\s)\w+)/i                                        // Qualcomm
        ], 
        [['model', /\(tm\)\s/i, ''], ['vendor', 'Qualcomm']]
    ]
];

const vendorMap = [
    [[
    /\b(amd|apple|arm|ati|img|intel|nvidia|qualcomm|samsung|sis)\b/i
    ], ['vendor']]
];

interface GPUInfo  {
    vendor: string | undefined;
    model: string | undefined;
};

export class GPUDetect {

    static getGPU (strRenderer?: string, strVendor?: string): GPUInfo {

        let gpuInfo = { vendor : undefined, model : undefined };

        if (typeof strRenderer !== 'string') {
            if (globalThis.document) {
                const canvas = document.createElement('canvas');
                const gl = <WebGLRenderingContext>(canvas.getContext('webgl2') || 
                            canvas.getContext('webgl') || 
                            canvas.getContext('experimental-webgl'));
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    strVendor = gl.getParameter(debugInfo?.UNMASKED_VENDOR_WEBGL || 0);
                    strRenderer = gl.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL || 0);
                }
            }
        }

        if (strRenderer) {
            const re = new REParse();
            ({ vendor : gpuInfo.vendor, model : gpuInfo.model } = re.use(rendererMap).parse(strRenderer));

            if (strVendor) {
                gpuInfo.vendor = gpuInfo.vendor || re.parse(strVendor)?.vendor || re.use(vendorMap).parse(strVendor)?.vendor;
            }
        }

        return gpuInfo;
    }
}