import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../../core/services';
import { NumberValidator } from '../../../core/validators';

import { Country, CountryClient } from '../../../core/data';



@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  id = '';
  title = 'Create';
  itemForm: FormGroup;
  page: ActivatedPage = new ActivatedPage();

  constructor(
    private client: CountryClient,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageSrv: PageService) {

      this.page = this.pageSrv.getActivatedPage(this.activatedRoute);
      this.createForm();
      // this.title = this.pageSrv.getListTitleForProvider(this.page.typeFlag, this.page.title);
  }

  get name() { return this.itemForm.get('name'); }
  get nameArabic() { return this.itemForm.get('nameArabic'); }
  get code() { return this.itemForm.get('code'); }
  get code2() { return this.itemForm.get('code2'); }
  get rank() { return this.itemForm.get('rank'); }

  createForm() {
    this.itemForm = this.fb.group({
      id: '',
      rank: [0, [NumberValidator]],
      isEnabled: true,
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      code2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      nameArabic: ['', [Validators.required, Validators.maxLength(128)]]
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
          this.router.navigate(['settings/countries']);
        }, (error) => {
          console.log(error);
        });

    } else {
      this.client.create(this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['settings/countries']);
        }, (error) => {
          console.log(error);
        });
    }
    // console.log(this.itemForm.value);
  }

  cancel() {
    this.router.navigate(['settings/countries']);
  }

}
