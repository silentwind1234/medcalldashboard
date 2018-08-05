import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PagedResultOfPriceRange, PriceRange,   PricerangeClient } from '../../../core/data';

@Component({
  selector: 'app-pricerange-list',
  templateUrl: './pricerange-list.component.html',
  styleUrls: ['./pricerange-list.component.scss']
})
export class PricerangeListComponent implements OnInit {

  title = 'Price Ranges';
  count = 0;
  typeFlag = 0;
  loadAll = false;
  loadingIndicator = true;
  items: PagedResultOfPriceRange = new PagedResultOfPriceRange();

  constructor(private client: PricerangeClient, private router: Router) { }

  ngOnInit() {
    this.loadPage({ offset: 0, pageSize: 10 });
  }

  // Common

  create() {
    this.router.navigate(['settings/priceranges/create']);
  }

  loadPage(para) {
    // console.log(para.offset + ', ' + para.pageSize);
    this.client.page(para.offset, para.pageSize, this.typeFlag, this.loadAll).subscribe(
      res => {
        this.items = res;
        this.count = res.count;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      },
      error => console.log(error),
      () => console.log('Get paged items complete'));
  }

  reloadPage() {
    this.loadPage({ offset: this.items.pageIndex, pageSize: this.items.pageSize });
  }

  delete(id) {
    this.client.delete(id)
      .subscribe(() => {
        this.reloadPage();
      }, (error) => {
        console.log(error);
      });
  }

  deleteConfirm(id): void {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this item: ?')) {
      this.delete(id);
      // event.confirm.resolve();
    } else {
      // event.confirm.reject();
    }
  }

  toggleEnabled(e) {
    this.loadAll = false;
    if (e.target.checked) {
      this.loadAll = true;
    }
    this.loadPage({ offset: 0, pageSize: 10 });
  }

}
