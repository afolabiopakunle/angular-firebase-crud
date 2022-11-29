import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IRecipe } from '../shared/IRecipe';

@Injectable({providedIn: 'root'})

export class PostService {

  constructor(private http: HttpClient) {}

  postRecipe(data: any) {
    this.http.post('https://angular-update-af322-default-rtdb.firebaseio.com/recipes.json', data)
      .subscribe({
        next: (response) => {
          console.log(response)
        }
      })
  }

  getRecipes() {
    return this.http.get('https://angular-update-af322-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map((responseData: any) => {
        const responseArray: IRecipe[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            responseArray.push({...responseData[key as keyof IRecipe], id: key})
          }
        }
        return responseArray;
      }))
  }

}
