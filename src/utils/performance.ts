/**
 * Performance Monitoring Utilities
 * Track and optimize application performance
 */

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
}

const metrics: PerformanceMetric[] = [];

/**
 * Start measuring performance
 */
export function startMeasure(name: string): void {
  performance.mark(`${name}-start`);
}

/**
 * End measuring performance and log the duration
 */
export function endMeasure(name: string): number {
  performance.mark(`${name}-end`);
  const measure = performance.measure(name, `${name}-start`, `${name}-end`);
  
  const metric: PerformanceMetric = {
    name,
    duration: measure.duration,
    timestamp: Date.now(),
  };
  
  metrics.push(metric);
  
  if (import.meta.env.DEV) {
    console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
  }
  
  return measure.duration;
}

/**
 * Get all recorded metrics
 */
export function getMetrics(): PerformanceMetric[] {
  return [...metrics];
}

/**
 * Clear metrics
 */
export function clearMetrics(): void {
  metrics.length = 0;
  performance.clearMarks();
  performance.clearMeasures();
}

/**
 * Log Core Web Vitals
 */
export function logWebVitals(): void {
  if (typeof window === "undefined") return;

  // LCP (Largest Contentful Paint)
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (import.meta.env.DEV) {
          console.log("LCP:", entry);
        }
      });
    });
    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  } catch {
    console.warn("LCP not supported");
  }

  // FID (First Input Delay)
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (import.meta.env.DEV) {
          console.log("FID:", entry);
        }
      });
    });
    observer.observe({ entryTypes: ["first-input"] });
  } catch {
    console.warn("FID not supported");
  }

  // CLS (Cumulative Layout Shift)
  try {
    let cls = 0;
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if ((entry as LayoutShift).hadRecentInput) return;
        cls += (entry as LayoutShift).value;
        if (import.meta.env.DEV) {
          console.log("CLS:", cls);
        }
      });
    });
    observer.observe({ entryTypes: ["layout-shift"] });
  } catch {
    console.warn("CLS not supported");
  }
}

/**
 * LayoutShift interface for CLS
 */
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
