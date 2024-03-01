import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  selected: any[] = [];
  selectedChanged = new Subject<any[]>();

  updateSelected(newSelected: any[]) {
    this.selected = newSelected;
    this.selectedChanged.next(this.selected);
  }
}
