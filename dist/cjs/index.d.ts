/*! GPUDetect.js
    Extracts GPU information from the browser
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
interface GPUInfo {
    vendor: string | undefined;
    model: string | undefined;
}
export declare class GPUDetect {
    static getGPU(strRenderer?: string, strVendor?: string): GPUInfo;
}
export {};
