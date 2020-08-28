import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfinityBarService } from 'src/app/services/extra-services/infinity-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-infinity-bar',
  templateUrl: './infinity-bar.component.html',
  styleUrls: ['./infinity-bar.component.scss']
})
export class InfinityBarComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  show = false;
  constructor(
    private service: InfinityBarService,
  ) {
    this.subscription = service.loaderState
      .subscribe(({ show }: { show: boolean }) => {
        this.show = show;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
