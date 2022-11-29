import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecipesComponent } from './post-recipes.component';

describe('PostFormComponent', () => {
  let component: PostRecipesComponent;
  let fixture: ComponentFixture<PostRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
