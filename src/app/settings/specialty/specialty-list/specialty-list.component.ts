import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { PagedResultOfSpecialty, Specialty, SpecialtyClient } from '../../../core/data';
import { PageService } from '../../../core/services';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.scss']
})
export class SpecialtyListComponent implements OnInit {

  title = '';
  subTitle = 'Specialties';
  count = 0;
  typeFlag = 0;
  loadAll = false;
  loadingIndicator = true;
  items: PagedResultOfSpecialty = new PagedResultOfSpecialty();

  constructor(private client: SpecialtyClient, private router: Router, private route: ActivatedRoute, private pageSrv: PageService) {
    this.route.params.subscribe(params => {
      this.typeFlag = params['flag']; // (+) converts string 'id' to a number
      this.title = this.pageSrv.getListTitleForProvider(this.typeFlag, this.subTitle);
      this.loadPage({ offset: 0, pageSize: 10 });
    });
  }

  ngOnInit() {
    this.loadPage({ offset: 0, pageSize: 10 });
  }

  // Common

  create() {
    this.router.navigate(['settings/specialties/create']);
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
