import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../core/services';
import { NumberValidator } from '../../core/validators';

import { Provider, ProviderClient } from '../../core/data';

@Component({
  selector: 'app-provider-detail-audit',
  templateUrl: './provider-detail-audit.component.html',
  styleUrls: ['./provider-detail-audit.component.scss']
})
export class ProviderDetailAuditComponent implements OnInit {

  id = '';
  title = 'Create';
  itemForm: FormGroup;
  page: ActivatedPage = new ActivatedPage();

  constructor(
    private client: ProviderClient,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageSrv: PageService) {

    this.page = this.pageSrv.getActivatedPage(this.activatedRoute);
    this.createForm();
    // this.title = this.pageSrv.getListTitleForProvider(this.page.typeFlag, this.page.title);
  }

  createForm() {
    this.itemForm = this.fb.group({
      id: '',
      createdBy: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      editedBy: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]],
      joinDate: '',
      ip: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(16)]]
    });
  }

  ngOnInit() {
    if (this.page.isEdit) {
      this.client.auditGet(this.page.id).subscribe(
        resp => {
          console.log(resp);
          this.itemForm.setValue(resp);
          // console.log("form--> " + this.itemForm.value);
        },
        error => console.log(error),
        () => console.log('get item complete')
      );
    }
  }

  save() {
    if (!this.itemForm.valid) {
      return;
    }
    if (this.page.isEdit) {
      this.client.auditPut(this.page.id, this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['providers/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
        });

    } else {
      this.client.auditPost(this.page.id, this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['providers/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
        });
    }
    // console.log(this.itemForm.value);
  }

  cancel() {
    this.router.navigate(['providers/' + this.page.typeFlag]);
  }

}
