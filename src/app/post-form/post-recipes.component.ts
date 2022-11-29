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
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,
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
      .subscribe({
        next: (response) => {
          this.getRecipes();
        }
      })
    this.form.reset();
    // this.getRecipes();
  }

  getRecipes() {
    this.isLoading = true;
      this.postService.getRecipes()
      .subscribe({
        next: (responseArray) => {
          this.isLoading = false
          this.recipes = responseArray;
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message
    }
      })
  }

}
