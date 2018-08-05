import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../../core/services';
import { NumberValidator } from '../../../core/validators';

import { City, CityClient, Country, CountryClient } from '../../../core/data';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {

  id = '';
  title = 'Create';
  itemForm: FormGroup;
  page: ActivatedPage = new ActivatedPage();

  countryList = new Array<Country>();

  constructor(
    private client: CityClient,
    private countryClient: CountryClient,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageSrv: PageService) {

      this.page = this.pageSrv.getActivatedPage(this.activatedRoute);

      this.countryClient.all(0, false).subscribe(
        r => {
          console.log(r);
          this.countryList = r;
        },
        error => console.log(error),
        () => console.log('get countries complete')
      );

      this.createForm();
      // this.title = this.pageSrv.getListTitleForProvider(this.page.typeFlag, this.page.title);
  }

  get country() { return this.itemForm.get('country'); }
  createForm() {
    this.itemForm = this.fb.group({
      id: '',
      countryId: '',
      countryName: '',
      // country: new FormControl(this.countryList[0]),
      // country: '',
      latitude: 0,
      longitude: 0,
      rank: [0, [NumberValidator]],
      isEnabled: true,
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      nameArabic: ['', [Validators.required, Validators.maxLength(128)]]
    });
    // this.itemForm.controls['country'].patchValue(this.itemForm.controls['countryId'].value, {onlySelf: true});
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

  selectCountry() {
    alert('');
  }

  save() {
    if (!this.itemForm.valid) {
      return;
    }
    if (this.page.isEdit) {
      this.client.save(this.page.id, this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['settings/cities']);
        }, (error) => {
          console.log(error);
        });

    } else {
      this.client.create(this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['settings/cities']);
        }, (error) => {
          console.log(error);
        });
    }
    // console.log(this.itemForm.value);
  }

  cancel() {
    this.router.navigate(['settings/cities']);
  }

}
