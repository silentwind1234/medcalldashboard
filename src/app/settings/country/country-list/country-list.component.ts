import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { PagedResultOfCountry, Country, CountryClient } from '../../../core/data';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  title = 'Countries';
  count = 0;
  typeFlag = 0;
  loadAll = false;
  loadingIndicator = true;
  items: PagedResultOfCountry = new PagedResultOfCountry();

  constructor(private client: CountryClient, private router: Router) {}

  ngOnInit() {
    this.loadPage({ offset: 0, pageSize: 10 });
  }

  // Common

  create() {
    this.router.navigate(['settings/countries/create']);
  }

  loadPage(para) {
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
