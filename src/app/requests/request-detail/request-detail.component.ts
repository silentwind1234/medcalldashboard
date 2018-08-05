import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../core/services';
import { NumberValidator } from '../../core/validators';

import { Request, RequestEdit, RequestClient } from '../../core/data';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {

  id = '';
  title = 'Request';
  item = new RequestEdit();
  itemForm: FormGroup;
  page: ActivatedPage = new ActivatedPage();

  constructor(
    private client: RequestClient,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageSrv: PageService) {

      this.page = this.pageSrv.getActivatedPage(this.activatedRoute);
      this.createForm();
      // this.title = this.pageSrv.getListTitleForProvider(this.page.typeFlag, this.page.title);
  }

  createForm() {
  }

  ngOnInit() {
    if (this.page.isEdit) {
      this.client.get(this.page.id).subscribe(
        resp => {
          console.log(resp);
          this.item = resp;
          // this.itemForm.setValue(resp);
          // console.log("form--> " + this.itemForm.value);
        },
        error => console.log(error),
        () => console.log('get item complete')
      );
    }
  }

  approve() {
    console.log('approve clicked');
    this.client.approve(this.page.id)
        .subscribe(() => {
          this.router.navigate(['requests/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
        });
  }

  save() {
    if (!this.itemForm.valid) {
      return;
    }
    if (this.page.isEdit) {
      this.client.save(this.page.id, this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['requests/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
        });

    } else {
      this.client.create(this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['requests/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
        });
    }
    // console.log(this.itemForm.value);
  }

  cancel() {
    this.router.navigate(['requests/' + this.page.typeFlag]);
  }

}
