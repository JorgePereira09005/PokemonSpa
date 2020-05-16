import { Component, OnInit } from '@angular/core';
import { PokemonFinderService } from 'src/app/_services/pokemon-finder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/_common/pokemon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-pokedex-screen',
  templateUrl: './pokedex-screen.component.html',
  styleUrls: ['./pokedex-screen.component.css']
})
export class PokedexScreenComponent implements OnInit {

  pokemon: Pokemon = new Pokemon();
  searchName: string;

  constructor(private finderService: PokemonFinderService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer:DomSanitizer) {           
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( ()=> {

      const pokemonName: string = this.route.snapshot.paramMap.get('name');
      console.log(pokemonName + ' this pokemon loading');

      if(pokemonName == null) {
        this.getRandomPokemon();
      } else {
        this.getPokemonByName(pokemonName);
      }

      /* setTimeout( ()=> {
        this.getEvolvesFrom();
        this.getRelatedTo();
      }, 1000); */
    })

  }

  getPokemonByName(name: string) {

    console.log('before subscribing and receving data ' + name);
    this.finderService.getPokemonByName(name).subscribe(
      data => {
        console.log('after subscribing and receving data ' + data.name);
        this.pokemon.name = data.name;
        this.pokemon.id = data.id;

        this.pokemon.back_default = 
          this.sanitizer.bypassSecurityTrustResourceUrl(data.sprites.back_default);
        
        this.pokemon.front_default = 
          this.sanitizer.bypassSecurityTrustResourceUrl(data.sprites.front_default);
        
        this.pokemon.types = data.types;
        this.pokemon.height = data.height;
        this.pokemon.weight = data.weight;
        this.pokemon.stats = data.stats;
      }
    )
  }

  getRandomPokemon() {

    console.log('inside this.getRandomPokemon()')
    const randomId: number = Math.floor(Math.random() * 807) + 1; 

    this.finderService.getPokemonById(randomId).subscribe(
      data => {
        this.pokemon.name = data.name;
        this.pokemon.id = data.id;

        this.pokemon.back_default = 
          this.sanitizer.bypassSecurityTrustResourceUrl(data.sprites.back_default);
        
        this.pokemon.front_default = 
          this.sanitizer.bypassSecurityTrustResourceUrl(data.sprites.front_default);
        
        this.pokemon.types = data.types;
        this.pokemon.height = data.height;
        this.pokemon.weight = data.weight;
        this.pokemon.stats = data.stats;
      }
    )
  }

  getEvolvesFrom(): void{
    this.finderService.getEvolvesFrom(this.pokemon.id).subscribe(
      data => {
        this.pokemon.evolvesFrom = data.evolves_from_species.name;
      }
    );
  }

  getRelatedTo(): void {
    this.finderService.getRelatedTo(this.pokemon.id).subscribe(
      data => {
        try {
          if(data.evolves_from_species.name == this.pokemon.name) {
            this.pokemon.evolvesTo = data.name;
          }
        } catch(e) {
        }
      }
    );
  }

  onSubmit(name: string) {

    if(this.route.snapshot.paramMap.get('name') && name== '') {
      this.router.navigateByUrl(`/`);
    } else if (!this.route.snapshot.paramMap.get('name') && name == ''){
      window.location.reload();
    } else {
      this.router.navigateByUrl(`/${name}`);
    }
    
  }

  getPrevious() {

    if (this.pokemon.id -1 >= 0) {
      const id:number = this.pokemon.id - 1;

      this.finderService.getPokemonByName(`bulbasaur`).subscribe(
        data => {
          this.router.navigateByUrl(`/${id}`);
        }
      )
    }
  }

  getNext() {
    if (this.pokemon.id + 1 <= 807) {
      const id:number = this.pokemon.id + 1;

      this.finderService.getPokemonByName(`bulbasaur`).subscribe(
        () => {
          this.router.navigateByUrl(`/${id}`);
        }
      )
    }
  }

}
