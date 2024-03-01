// option.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  private formattedOptionSubject = new BehaviorSubject<string[]>([]);
  formattedOption$ = this.formattedOptionSubject.asObservable();

  addFormattedOption(optionArray: string[]): void {
    this.formattedOptionSubject.next(optionArray);
  }
}
