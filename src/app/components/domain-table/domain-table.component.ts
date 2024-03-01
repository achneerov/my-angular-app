import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GoButtonService } from '../../services/go-button.service';
import { CommonModule } from '@angular/common';
import { AvailabilityService } from '../../services/api.service';

@Component({
  selector: 'app-domain-table',
  standalone: true,
  templateUrl: './domain-table.component.html',
  styleUrls: ['./domain-table.component.css'],
  imports: [CommonModule],
})
export class DomainTableComponent implements OnDestroy {
  domainStatusMap: Map<string, string> = new Map();
  domain_list: string[] = [];
  private domainListSubscription: Subscription;

  constructor(
    private goButtonService: GoButtonService,
    private availabilityService: AvailabilityService,
  ) {
    this.domainListSubscription = this.goButtonService.domainList$.subscribe((updatedList) => {
      this.initList(updatedList);
      this.processUpdatedList(updatedList);
    });
  }

  ngOnDestroy() {
    this.domainListSubscription.unsubscribe();
  }

  private initList(updatedList: string[]) {
    this.domainStatusMap.clear();
    for (const domain of updatedList) {
      this.domainStatusMap.set(domain, 'in queue');
    }

  }

  private async processUpdatedList(updatedList: string[]) {

    for (const domain of updatedList) {
      this.domainStatusMap.set(domain, 'checking');


      try {
        const response = await this.availabilityService.checkAvailability(domain).toPromise();

        if (response && response.status === 'taken') {
          this.domainStatusMap.set(domain, 'taken');
        } else {
          this.domainStatusMap.set(domain, 'available');
        }
      } catch (error) {
        // Handle error if necessary
        console.error('Error checking availability for', domain, error);
      }
    }
  }
}
