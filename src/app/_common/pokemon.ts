import { SafeResourceUrl } from '@angular/platform-browser';

export class Pokemon {
  name: string;
  id: number;
  /* sprites: {
      back_default: string;
      front_default: string;
  } */
  back_default: SafeResourceUrl;
  front_default: SafeResourceUrl;
  types: Type[];
  height: number;
  weight: number;
  stats: Stat[];
  evolvesFrom: string;
  evolvesTo: string;  
}

class Type {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}
  
class Stat {
  base_stat: string;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}
