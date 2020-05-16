import { TestBed } from '@angular/core/testing';

import { PokemonFinderService } from './pokemon-finder.service';

describe('PokemonFinderService', () => {
  let service: PokemonFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
