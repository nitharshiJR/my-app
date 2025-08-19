import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from './Icategory';
import { map, share, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarativeCategoryService {
  categories$: any;

  constructor(private http: HttpClient) {
    this.categories$ = this.http
      .get<{ [id: string]: ICategory }>(
        `https://rxjs-demo-92c5c-default-rtdb.firebaseio.com/categories.json`
      )
      .pipe(
        map((categories) => {
          let categoriesData: ICategory[] = [];
          for (let id in categories) {
            categoriesData.push({ ...categories[id], id });
          }
          return categoriesData;
        }),
        shareReplay()
      );
  }
}