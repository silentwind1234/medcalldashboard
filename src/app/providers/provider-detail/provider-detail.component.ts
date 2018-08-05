import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../core/services';
import { NumberValidator } from '../../core/validators';

import { Provider, ProviderClient } from '../../core/data';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.scss']
})
export class ProviderDetailComponent implements OnInit {

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
      userId: '',
      providerType: this.page.typeFlag,
      rank: [0, [NumberValidator]],
      isEnabled: true,
      givenName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      familyName: ['', [Validators.required, Validators.maxLength(128)]],
      gender: ''
    });
  }

  ngOnInit() {
    if (this.page.isEdit) {
      this.client.get(this.page.id).subscribe(
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
      this.client.save(this.page.id, this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['providers/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
        });

    } else {
      this.client.create(this.itemForm.value)
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

  // goToLink(link: string): void {
    // this.router.navigateByUrl(link);
    // providers/1/edit/0b0e5233-40ad-41a5-bb8f-bbac7e2d8c76
    // console.log(link);
    // this.router.navigate(['providers/' + this.page.typeFlag + 'edit/0b0e5233-40ad-41a5-bb8f-bbac7e2d8c76']);
  // }

}
