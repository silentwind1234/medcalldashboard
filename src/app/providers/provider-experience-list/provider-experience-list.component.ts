import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { PagedResultOfExperience, Experience, ExperienceClient } from '../../core/data';
import { PageService } from '../../core/services';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProviderExperienceDetailComponent } from '../provider-experience-detail/provider-experience-detail.component';

@Component({
  selector: 'app-provider-experience-list',
  templateUrl: './provider-experience-list.component.html',
  styleUrls: ['./provider-experience-list.component.scss']
})
export class ProviderExperienceListComponent implements OnInit {

  title = '';
  subTitle = 'List';
  count = 0;
  id = '';
  typeFlag = 0;
  loadAll = true;
  loadingIndicator = true;
  items: PagedResultOfExperience = new PagedResultOfExperience();

  bsModalRef: BsModalRef;

  constructor(
    private client: ExperienceClient,
    private router: Router,
    private route: ActivatedRoute,
    private pageSrv: PageService,
    private modalService: BsModalService) {
      this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.typeFlag = params['flag']; // (+) converts string 'id' to a number
      this.title = this.pageSrv.getListTitleForProvider(this.typeFlag, this.subTitle);
      this.loadPage({ offset: 0, pageSize: 10 });
    });
  }

  ngOnInit() {
    this.loadPage({ offset: 0, pageSize: 10 });
  }

  // Modal

  openModalWithComponent(rowId) {
    console.log(rowId);
    const initialState = {
      id: rowId,
      title: 'Experience'
    };
    this.bsModalRef = this.modalService.show(ProviderExperienceDetailComponent, {initialState});
    // this.bsModalRef.content.closeBtnName = 'Save';
    // this.bsModalRef.content.closeBtnName = 'Cancel';
  }

  // Common

  create() {
    this.router.navigate(['providers/create']);
  }

  loadPage(para) {
    this.client.provider(this.id, para.offset, para.pageSize, this.loadAll).subscribe(
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
    // console.log(e);
    // console.log(e.target.checked);
    this.loadAll = false;
    if (e.target.checked) {
      this.loadAll = true;
    }
    this.loadPage({ offset: 0, pageSize: 10 });
  }
}
