import { Component } from '@angular/core';
import { detectBody } from '../../../app.helpers';

declare var jQuery: any;

@Component({
  selector: 'app-basic-layout',
  templateUrl: 'basicLayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent {

  public ngOnInit(): any {
    detectBody();
  }

  public onResize() {
    detectBody();
  }

}
