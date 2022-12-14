import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Subject } from 'rxjs';
import { IRecipe } from '../shared/IRecipe';

@Injectable({providedIn: 'root'})

export class PostService {

  isLoading = new Subject<string>();
  errorMessage = new Subject<string>();

  constructor(private http: HttpClient) {}

  postRecipe(data: any) {
     this.http.post('https://angular-update-af322-default-rtdb.firebaseio.com/recipes.json', data)
       .subscribe({
         next: (response) => {
           this.getRecipes();
         },
         error: (err) => {
           catchError(error => {
             this.errorMessage.next(err.message)
             return error;
           })
         }
       });
  }

  getRecipes() {
    let searchParams = new HttpParams().append('print', 'pretty');
    searchParams = searchParams.append('name', 'afolabi-opakunle');

    return this.http.get<IRecipe[]>('https://angular-update-af322-default-rtdb.firebaseio.com/recipes.json', {
      headers: new HttpHeaders({
        "custom-head-lead": "afolabi-opakunle",
      }),
      params: searchParams,
    })
      .pipe(map((responseData: any) => {
        const responseArray: IRecipe[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            responseArray.push({...responseData[key as keyof IRecipe], id: key})
          }
        }
        return responseArray;
      }),
        catchError(error => {
          this.errorMessage.next(error.message)
          return error
        }))
  }

  deleteRecipes() {
   return this.http.delete('https://angular-update-af322-default-rtdb.firebaseio.com/recipes.json')
  }

}
