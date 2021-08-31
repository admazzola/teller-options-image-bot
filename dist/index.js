"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_builder_1 = require("./lib/image-builder");
const imageBuilder = new image_builder_1.default();
/*const world = 'world';

export function hello(world: string = 'world'): string {
    
  return `Hello ${world}! `;
}

hello()*/
setInterval(imageBuilder.run, 8000);
console.log('Booting Teller Options Image Bot');
//# sourceMappingURL=index.js.map