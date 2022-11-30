import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { IRecipe } from '../shared/IRecipe';
import { PostService } from './PostService';

@Component({
  selector: 'app-post-recipes',
  templateUrl: './post-recipes.component.html',
  styleUrls: ['./post-recipes.component.css']
})
export class PostRecipesComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  recipes: IRecipe[] = [];
  isLoading = false;
  errorSubscription!: Subscription;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private postService: PostService,
              ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getRecipes();
    this.errorSubscription = this.postService.errorMessage.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    })
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
    this.form.reset();
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
          // this.errorMessage = err.message
    }
      })
  }

  deleteRecipes() {
    this.postService.deleteRecipes()
      .subscribe(() => {
        this.recipes = [];
      })

  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
