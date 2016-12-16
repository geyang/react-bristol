/** Created by ge on 12/15/16. */

export function sigmoid(x) {
  "use strict";
  return 1 / (1 + Math.exp(-x));
}

export function rangedSigmoid(floor, ceiling, scale = 1, x) {
  return floor + (ceiling - floor) / (1 + Math.exp(-x * scale));
}

export function limit(min, max, n) {
  return Math.max(min, Math.min(max, n));
}

export function rangedTaper(floor, ceiling, scale = 1, x) {
  "use strict";
  return limit(0, 1, floor + (ceiling - floor) * (2 / (1 + Math.exp(-x * scale)) - 1));
}
