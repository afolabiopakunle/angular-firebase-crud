import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostRecipesComponent } from './post-form/post-recipes.component';

const routes: Routes = [
  { path: '', redirectTo: 'post-recipes', pathMatch: 'full'},
  { path: 'post-recipes', component: PostRecipesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
