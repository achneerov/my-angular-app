import {Component} from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import { OptionService } from '../../services/option.service'; // Adjust the path accordingly
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragAndDropService } from './drag-and-drop.service'; // Adjust the path accordingly




import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'drag-and-drop',
  templateUrl: 'drag-and-drop.component.html',
  styleUrl: 'drag-and-drop.component.css',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, MatTooltipModule],
})



export class DragAndDropComponent {

  getTooltipText(item: string[]): string {
    return item.slice(1).join(', ');
  }
  

  options = [
    ['Popular Animals', 'Lion', 'Tiger', 'Bear'],
    ['Popular Colors', 'red', 'green', 'blue'],
    ['Popular Nouns', 'chair', 'table', 'car'],
    ['Popular Adjectives', 'good', 'great', 'incredible'],
  ];

  selected = [ 
    ['Popular Fruits', 'apple','pear', 'apricot'],
    ['Domain', 'domain'],
    ['.com', '.com'],
  ];

  constructor(
    private optionService: OptionService,
    private dragAndDropService: DragAndDropService
  ) {}

  ngOnInit(): void {
    this.dragAndDropService.updateSelected(this.selected);
    this.optionService.formattedOption$.subscribe(newOptionArray => {
      // Add the formatted option array to the options array
      if (newOptionArray.length > 0) {
        this.options.push(newOptionArray);
      }
    });
  }

  drop(event: CdkDragDrop<string[][]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.dragAndDropService.updateSelected(this.selected);

  }
}
