import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ProviderClient } from '../../core/data';

@Component({
  selector: 'app-starter',
  templateUrl: 'starter.template.html'
})
export class StarterViewComponent implements OnDestroy, OnInit  {

public nav: any;
doctorCount = 0;
nurseCount = 0;
labCount = 0;
radioCount = 0;

public constructor(private client: ProviderClient) {
  this.nav = document.querySelector('nav.navbar');
}

public ngOnInit(): any {
  this.nav.className += ' white-bg';

  this.client.count(1).subscribe(
    resp => {
      console.log(resp);
      this.doctorCount = resp;
    },
    error => console.log(error),
    () => console.log('get item complete')
  );

  this.client.count(2).subscribe(
    resp => {
      console.log(resp);
      this.nurseCount = resp;
    },
    error => console.log(error),
    () => console.log('get item complete')
  );

  this.client.count(3).subscribe(
    resp => {
      console.log(resp);
      this.labCount = resp;
    },
    error => console.log(error),
    () => console.log('get item complete')
  );

  this.client.count(4).subscribe(
    resp => {
      console.log(resp);
      this.radioCount = resp;
    },
    error => console.log(error),
    () => console.log('get item complete')
  );
}


public ngOnDestroy(): any {
  this.nav.classList.remove('white-bg');
}

}
