# GPUDetect.js
Extracts GPU information from the browser

```sh
npm i gpu-detect-js
```

## Methods

`getGPU():GPUInfo`

`interface GPUInfo { vendor: string | undefined; model: string | undefined }`

## Code Example

```js
import { GPUDetect } from 'gpu-detect-js';

const gpuInfo = GPUDetect.getGPU();
console.log(gpuInfo);
// { vendor: "AMD", model: "Radeon R9 M295X" }
```