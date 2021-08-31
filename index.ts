
import ImageBuilder from './lib/image-builder'

const imageBuilder = new ImageBuilder()


/*const world = 'world';

export function hello(world: string = 'world'): string {
    
  return `Hello ${world}! `;
}

hello()*/
setInterval( imageBuilder.run , 8000 );

console.log('Booting Teller Options Image Bot')
