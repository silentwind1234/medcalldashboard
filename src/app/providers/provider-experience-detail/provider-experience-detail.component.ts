import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Experience, ExperienceClient } from '../../core/data';
import { NumberValidator } from '../../core/validators';


import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-provider-experience-detail',
  templateUrl: './provider-experience-detail.component.html',
  styleUrls: ['./provider-experience-detail.component.scss']
})
export class ProviderExperienceDetailComponent implements OnInit {

  id: '';
  title: '';
  isEdit: true;
  itemForm: FormGroup;
  // closeBtnName: string;
  // saveBtnName: string;

  constructor(public bsModalRef: BsModalRef, private client: ExperienceClient, private fb: FormBuilder) {
    this.isEdit = true;
    this.createForm();
  }

  createForm() {
    this.itemForm = this.fb.group({
      id: '',

      rank: [0, [NumberValidator]],
      isEnabled: true,
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      nameArabic: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      notes: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      notesArabic: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(128)]],
      dateFrom: '',
      dateTo: '',
      providerId: ''
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      this.client.get(this.id).subscribe(
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
    console.log('save ' + this.itemForm.valid + ' ' + this.itemForm.value);
    if (!this.itemForm.valid) {
      return;
    }
    if (this.isEdit) {
      this.client.save(this.id, this.itemForm.value)
        .subscribe(() => {
          // this.router.navigate(['providers/' + this.page.typeFlag]);
          this.bsModalRef.hide();
        }, (error) => {
          this.bsModalRef.hide();
          console.log(error);
        });

    } else {
      this.client.create(this.itemForm.value)
        .subscribe(() => {
          // this.router.navigate(['providers/' + this.page.typeFlag]);
          this.bsModalRef.hide();
        }, (error) => {
          this.bsModalRef.hide();
          console.log(error);
        });
    }
    // console.log(this.itemForm.value);
  }

  cancel() {
    // this.router.navigate(['providers/' + this.page.typeFlag]);
  }

}
