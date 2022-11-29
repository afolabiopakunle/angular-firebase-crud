import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IRecipe } from '../shared/IRecipe';
import { PostService } from './PostService';

@Component({
  selector: 'app-post-recipes',
  templateUrl: './post-recipes.component.html',
  styleUrls: ['./post-recipes.component.css']
})
export class PostRecipesComponent implements OnInit {

  form!: FormGroup;
  recipes!: IRecipe[];

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private postService: PostService,
              ) { }

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
    this.postService.postRecipe(this.form.value)
    this.form.reset()
  }

  getRecipes() {
      this.postService.getRecipes()
      .subscribe({
        next: (responseArray) => {
          this.recipes = responseArray;
        }
      })
  }

}
