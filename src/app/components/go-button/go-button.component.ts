import { Component } from '@angular/core';
import { DragAndDropService } from '../drag-and-drop/drag-and-drop.service';
import { GoButtonService } from '../../services/go-button.service';
import { AvailabilityService } from '../../services/api.service';


@Component({
  selector: 'go-button',
  templateUrl: './go-button.component.html',
  styleUrls: ['./go-button.component.css'],
  standalone: true,
})
export class GoButtonComponent {
  constructor(
    private dragAndDropService: DragAndDropService,
    private goButtonService: GoButtonService,
    private availabilityService: AvailabilityService,

  ) {}

  onClick() {
    const result = this.generateDomains(this.dragAndDropService.selected, 0, []);
    this.goButtonService.updateDomainList(result);
    const domain = 'example1.com'; // Replace with your domain or get it from some source
    this.availabilityService.checkAvailability(domain).subscribe(response => {
      console.log(`Availability of ${domain}: ${response.status}`);
    });
  }

  generateDomains(inputArray: any[][], index: number, currentCombination: string[]): string[] {
    if (index === inputArray.length) {
      return [currentCombination.join('')];
    }

    const currentSubArray = inputArray[index].slice(1);
    const result: string[] = [];

    for (const element of currentSubArray) {
      const updatedCombination = [...currentCombination, element];
      const subResult = this.generateDomains(inputArray, index + 1, updatedCombination);
      result.push(...subResult);
    }

    return result;
  }
}
