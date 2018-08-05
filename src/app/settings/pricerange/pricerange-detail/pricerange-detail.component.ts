import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../../core/services';
import { NumberValidator } from '../../../core/validators';

import { PriceRange, PricerangeClient } from '../../../core/data';

@Component({
  selector: 'app-pricerange-detail',
  templateUrl: './pricerange-detail.component.html',
  styleUrls: ['./pricerange-detail.component.scss']
})
export class PricerangeDetailComponent implements OnInit {

  id = '';
  title = 'Create';
  itemForm: FormGroup;
  page: ActivatedPage = new ActivatedPage();

  constructor(
    private client: PricerangeClient,
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
      rank: [0, [NumberValidator]],
      isEnabled: true,
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
          this.router.navigate(['settings/priceranges']);
        }, (error) => {
          console.log(error);
        });

    } else {
      this.client.create(this.itemForm.value)
        .subscribe(() => {
          this.router.navigate(['settings/priceranges']);
        }, (error) => {
          console.log(error);
        });
    }
    // console.log(this.itemForm.value);
  }

  cancel() {
    this.router.navigate(['settings/priceranges']);
  }

}
