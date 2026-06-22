import type { ScrollSmoother } from "gsap/ScrollSmoother";

export let smoother: ScrollSmoother;

export const setSmoother = (instance: ScrollSmoother) => {
  smoother = instance;
};
