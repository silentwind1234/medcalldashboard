import { Injectable } from '@angular/core';
import { ProviderTypeStringPipe } from '../core/pipes';

@Injectable()
export class ProvidersService {



  constructor() { }

  get listRoute(): string {
    return 'providers';
  }

  getListTitle(typeFlag: number): string {
    return new ProviderTypeStringPipe().transform(typeFlag) + 's';
  }

  getTitle(typeFlag: number, subTitle: string): string {
    return new ProviderTypeStringPipe().transform(typeFlag) + ' ' + subTitle;
  }


  getTabs(typeFlag: number, id: string): any[] {
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
