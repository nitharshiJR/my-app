import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { ICategory } from './Icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<{id:string, title:string}[]> {
    return this.http
      .get<{ [id: string]: { title: string } }>(
        'https://rxjs-demo-92c5c-default-rtdb.firebaseio.com/categories.json'
      )
      .pipe(
        map(categories => {
          const categoriesData: {id:string, title:string}[] = [];
          for (let id in categories) {
            categoriesData.push({ id, title: categories[id].title });
          }
          return categoriesData;
        })
      );
  }
}
