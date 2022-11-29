import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
