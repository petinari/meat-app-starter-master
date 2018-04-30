import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',

})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];
  
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService, 
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group(
      {
        searchControl: this.searchControl
      }
    )
    this.searchControl.valueChanges.debounceTime(500).distinctUntilChanged()
    .switchMap(a => this.restaurantsService.restaurants(a))
    .catch(error => Observable.from([]))
    .subscribe(restaurants => this.restaurants = restaurants)
    
    this.restaurantsService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants);
  }

  

}
