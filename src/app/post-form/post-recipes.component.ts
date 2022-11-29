import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-recipes',
  templateUrl: './post-recipes.component.html',
  styleUrls: ['./post-recipes.component.css']
})
export class PostRecipesComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
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
    this.form.reset()
  }

}
