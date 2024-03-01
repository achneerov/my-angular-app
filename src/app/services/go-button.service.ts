// go-button.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoButtonService {
  private domain_list_Subject = new Subject<string[]>();
  domainList$ = this.domain_list_Subject.asObservable();

  updateDomainList(list: string[]) {
    this.domain_list_Subject.next(list);
  }
}