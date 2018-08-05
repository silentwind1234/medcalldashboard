// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /*
  STS_BASE_URL: 'http://localhost:5000',
  API_BASE_URL: 'http://localhost:5001',
  APP_BASE_URL: 'http://localhost:4200',
  */
  STS_BASE_URL: 'http://medcallidsrv1234.azurewebsites.net',
  API_BASE_URL: 'http://medcallapi1234.azurewebsites.net',
  APP_BASE_URL: 'https://medcalldashboard.azurewebsites.net'
 

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
