import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { PagedResultOfCertificate, Certificate, CertificateClient, PagedResultOfExperience } from '../../core/data';
import { PageService } from '../../core/services';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProviderCertificateDetailComponent } from '../provider-certificate-detail/provider-certificate-detail.component';



@Component({
  selector: 'app-provider-certificate-list',
  templateUrl: './provider-certificate-list.component.html',
  styleUrls: ['./provider-certificate-list.component.scss']
})
export class ProviderCertificateListComponent implements OnInit {

  title = '';
  subTitle = 'List';
  count = 0;
  id = '';
  typeFlag = 0;
  loadAll = true;
  loadingIndicator = true;
  items: PagedResultOfCertificate = new PagedResultOfCertificate();

  bsModalRef: BsModalRef;

  constructor(
    private client: CertificateClient,
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
    this.bsModalRef = this.modalService.show(ProviderCertificateDetailComponent, {initialState});
    // this.bsModalRef.content.closeBtnName = 'Save';
    // this.bsModalRef.content.closeBtnName = 'Cancel';
  }


  // Common

  create() {
    this.router.navigate(['providers/create']);
  }

  loadPage(para) {
    this.client.provider(this.id, para.offset, para.pageSize,  this.loadAll).subscribe(
      res => {
        this.items = res;
        this.count = res.count;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      },
      error => console.log(error),
      () => console.log('Get paged items complete', this.items));
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
