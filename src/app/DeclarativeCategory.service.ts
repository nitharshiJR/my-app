import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from './Icategory';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeclarativeCategoryService {
  categories$: Observable<ICategory[]>;

  constructor(private http: HttpClient) {
    this.categories$ = this.http
      .get<{ [id: string]: any }>(
        'https://rxjs-demo-92c5c-default-rtdb.firebaseio.com/categories.json'
      )
      .pipe(
        map((res) => {
          const categoriesData: ICategory[] = [];
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              categoriesData.push({
                categoryId: res[key].id,
                categoryTitle: res[key].name,
              });
            }
          }
          return categoriesData;
        }),
        shareReplay(1)
      );
  }
}
