import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable ({
  providedIn: 'root'
})

export class LoadService {
    LoadingSubject = new Subject<boolean>();
    Loading$ = this.LoadingSubject.asObservable();

    showLoader(){
        this.LoadingSubject.next(true);
    }

    hideLoader(){
        this.LoadingSubject.next(false);
    }

}