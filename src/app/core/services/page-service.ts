import { Injectable } from '@angular/core';
import { ProviderTypeStringPipe, RequestStatusStringPipe } from '../pipes';

import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedPage } from './activated-page';

@Injectable()
export class PageService {



  constructor() { }

  get listRoute(): string {
    return 'providers';
  }

  getListTitleForProvider(typeFlag: number, subTitle: string): string {
    return new ProviderTypeStringPipe().transform(typeFlag) + ' ' + subTitle;
  }

  getListTitleForRequestStatus(typeFlag: number, subTitle: string): string {
    return new RequestStatusStringPipe().transform(typeFlag) + ' ' + subTitle;
  }



  getActivatedPage(activatedRoute: ActivatedRoute): ActivatedPage {

    console.log('|--> activatedRoute: ' + activatedRoute.snapshot);
    const result = new ActivatedPage(); // = { };

    if (activatedRoute.snapshot.params['id']) {
      result.id = activatedRoute.snapshot.params['id']; // (+) converts string 'id' to a number
      result.isEdit = true;
      result.title = 'Edit';
      console.log('|--> id: ' + result.id);
    }
    if (activatedRoute.snapshot.params['flag']) {
      result.typeFlag = activatedRoute.snapshot.params['flag']; // (+) converts string 'id' to a number
      console.log('|--> flag: ' + result.typeFlag);
    }

    return result;
  }

  getTabsForProvider(typeFlag: number, id: string): any[] {
  return [
    {
      title: 'Basic',
      route: '/pages/providers/' + typeFlag + '/edit/' + id,
    },
    {
      title: 'Specialties',
      route: '/pages/providers/' + typeFlag + '/edit/specialties/' + id,
    },
    {
      title: 'Certificates',
      route: '/pages/providers/' + typeFlag + '/edit/certificates/' + id,
    },
    {
      title: 'Experience',
      route: '/pages/providers/' + typeFlag + '/edit/experiences/' + id,
    },
    {
      title: 'Address',
      route: '/pages/providers/' + typeFlag + '/edit/address/' + id,
    },
    {
      title: 'Location',
      route: '/pages/providers/' + typeFlag + '/edit/location/' + id,
    },
    {
      title: 'Audit',
      route: '/pages/providers/' + typeFlag + '/edit/audit/' + id,
    }
  ];
}

}
