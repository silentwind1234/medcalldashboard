import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../core/services';
import { NumberValidator, DecimalValidator } from '../../core/validators';

import { Provider, ProviderClient, City, CityClient } from '../../core/data';

@Component({
  selector: 'app-provider-detail-address',
  templateUrl: './provider-detail-address.component.html',
  styleUrls: ['./provider-detail-address.component.scss']
})
export class ProviderDetailAddressComponent implements OnInit {

  id = '';
  title = 'Create';
  itemForm: FormGroup;
  page: ActivatedPage = new ActivatedPage();

  cityList = new Array<City>();

  constructor(
    private client: ProviderClient,
    private cityClient: CityClient,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageSrv: PageService) {

    this.page = this.pageSrv.getActivatedPage(this.activatedRoute);

    this.cityClient.all(0, false).subscribe(
      r => {
        // console.log(r);
        this.cityList = r;
      },
      error => console.log(error),
      () => console.log('get cities complete')
    );

    this.createForm();
    // this.title = this.pageSrv.getListTitleForProvider(this.page.typeFlag, this.page.title);
  }

  createForm() {
    this.itemForm = this.fb.group({
      id: '',
      cityId: '',
      cityName: '',
      cityNameArabic: '',
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(512)]],
      postCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      latitude: [0, [DecimalValidator]],
      longitude: [0, [DecimalValidator]],
      updatedAt: ''
    });
  }

  ngOnInit() {
    if (this.page.isEdit) {
      this.client.addressGet(this.page.id).subscribe(
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
      console.log(this.itemForm.value);
      this.client.addressPut(this.page.id, this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['providers/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
          this.router.navigate(['providers/' + this.page.typeFlag]);
        });

    } else {
      this.client.addressPost(this.page.id, this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['providers/' + this.page.typeFlag]);
        }, (error) => {
          console.log(error);
          this.router.navigate(['providers/' + this.page.typeFlag]);
        });
    }
    // console.log(this.itemForm.value);
  }

  cancel() {
    this.router.navigate(['providers/' + this.page.typeFlag]);
  }
}
