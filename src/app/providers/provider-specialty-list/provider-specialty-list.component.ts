import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, ActivatedPage } from '../../core/services';
import { NumberValidator } from '../../core/validators';

import { Provider, ProviderClient } from '../../core/data';

@Component({
  selector: 'app-provider-specialty-list',
  templateUrl: './provider-specialty-list.component.html',
  styleUrls: ['./provider-specialty-list.component.scss']
})
export class ProviderSpecialtyListComponent implements OnInit {

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

  createForm() {}

  ngOnInit() {
  }

}
