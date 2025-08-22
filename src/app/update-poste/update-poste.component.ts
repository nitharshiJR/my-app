import { Component } from '@angular/core';
import { DeclarativeCategoryService } from '../DeclarativeCategory.service';
import { Observable } from 'rxjs';
import { ICategory } from '../Icategory';


@Component({
  selector: 'app-update-poste',
  templateUrl: './update-poste.component.html',
  styleUrls: ['./update-poste.component.scss'],

})
export class UpdatePosteComponent {
  categories$!: Observable<ICategory[]>; // declare first

  constructor(private categoryService: DeclarativeCategoryService) {
    // initialize here
    this.categories$ = this.categoryService.categories$;
  }
}
