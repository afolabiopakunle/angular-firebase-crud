import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IRecipe } from '../shared/IRecipe';

@Component({
  selector: 'app-post-recipes',
  templateUrl: './post-recipes.component.html',
  styleUrls: ['./post-recipes.component.css']
})
export class PostRecipesComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.buildForm();
    this.getRecipes();
  }

  buildForm() {
    this.form = this.fb.group(
      {
        title: ['', Validators.required],
        content: ['', Validators.required]
      },
    )
  }

  submit() {
    console.log(this.form.value);
    this.http.post('https://angular-update-af322-default-rtdb.firebaseio.com/recipes.json', this.form.value)
      .subscribe({
        next: (response) => {
          console.log(response)
        }
      })
    this.form.reset()
  }

  getRecipes() {
    this.http.get('https://angular-update-af322-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map((responseData: any) => {
        const responseArray: IRecipe[] = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)) {
            responseArray.push({...responseData[key as keyof IRecipe], id: key})
          }
        }
        return responseArray;
      }))
      .subscribe({
        next: (responseArray) => {
          console.log(responseArray);
        }
      })
  }

}
