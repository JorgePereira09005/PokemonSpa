import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonFinderService {

  private baseUrl = "https://pokeapi.co/api/v2/";

  constructor(private httpClient: HttpClient) { }

  getPokemonByName(name: string): Observable<any> {
    const lowerCaseName = name.toLowerCase();
    console.log('insde getPokemonByName -> lowercasename: ' + lowerCaseName);
    const url = this.baseUrl + `pokemon/${lowerCaseName}`;
    return this.httpClient.get(url);
  }

  getPokemonById(id: number): Observable<any> {
    const url = this.baseUrl + `pokemon/${id}`;
    return this.httpClient.get(url);
  }

  getEvolvesFrom(id: number): Observable<GetEvolution> {
    const url = this.baseUrl + `pokemon-species/${id}`;
    return this.httpClient.get<GetEvolution>(url);
  }

  getRelatedTo(id: number): Observable<GetEvolution> {

    id = id + 1;
    const url = this.baseUrl + `pokemon-species/${id}`;
    return this.httpClient.get<GetEvolution>(url);
  }

}

interface GetEvolution {
  evolves_from_species: {
    name: string;
    url: string;
  }
  name: string;
}

