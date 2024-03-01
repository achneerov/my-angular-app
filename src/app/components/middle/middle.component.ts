
import {Component} from '@angular/core';
import { DragAndDropComponent } from '../drag-and-drop/drag-and-drop.component';
import { AddOptionComponent } from '../add-option/add-option.component';
import { GoButtonComponent } from '../go-button/go-button.component';
import { DomainTableComponent } from '../domain-table/domain-table.component';






@Component({
  selector: 'app-middle',
  standalone: true,
  imports: [DragAndDropComponent, AddOptionComponent, GoButtonComponent, DomainTableComponent ],
  templateUrl: './middle.component.html',
  styleUrl: './middle.component.css'
})

export class MiddleComponent {

}
