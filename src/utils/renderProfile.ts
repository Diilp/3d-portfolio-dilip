type RenderProfile = {
  isLowPower: boolean;
  isMidPower: boolean;
  enableShadows: boolean;
  enableAmbientOcclusion: boolean;
  maxDpr: number;
  techStackDpr: [number, number];
  shadowMapSize: [number, number];
  techStackSphereCount: number;
  techStackSegments: number;
};

export function getRenderProfile(): RenderProfile {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const pixelRatio = window.devicePixelRatio || 1;

  const isMobile = matchMedia("(pointer: coarse)").matches;
  const isLowPower = memory <= 4 || cores <= 4 || (isMobile && pixelRatio > 2);
  const isMidPower = !isLowPower && (memory <= 8 || cores <= 6);
  const maxDpr = isLowPower ? 1.25 : isMidPower ? 1.5 : Math.min(pixelRatio, 2);

  return {
    isLowPower,
    isMidPower,
    enableShadows: !isLowPower,
    enableAmbientOcclusion: !isLowPower,
    maxDpr,
    techStackDpr: [1, maxDpr],
    shadowMapSize: isMidPower ? [512, 512] : [1024, 1024],
    techStackSphereCount: isLowPower ? 16 : isMidPower ? 24 : 30,
    techStackSegments: isLowPower ? 18 : isMidPower ? 24 : 28,
  };
}
