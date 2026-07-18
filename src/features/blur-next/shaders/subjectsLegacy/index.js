// First, IMPORT all the shapes from their files
import { roundedRect } from './rounded-rect.js';
import { circle } from './circle.js';
import { heart } from './heart.js';
import { star } from './star.js';
import { anvil } from './anvil.js';

// THEN, re-export them so they're available to other files
export { roundedRect, circle, heart, star, anvil };

// Finally, choose your active subject
export const activeSubject = star;  // ← Change this to switch shapes!
// export const activeSubject = circle;
// export const activeSubject = heart;
// export const activeSubject = star;