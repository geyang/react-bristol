/** Created by ge on 12/15/16. */

export function sigmoid(x) {
  "use strict";
  return 1 / (1 + Math.exp(-x));
}

export function rangedSigmoid(floor, ceiling, x) {
  return floor + (ceiling - floor) * (1 + Math.exp(-x));
}

export function rangedTaper(floor, ceiling, x) {
  "use strict";
  return floor + (ceiling - floor) * (2 * (1 + Math.exp(-x)) - 1);
}
