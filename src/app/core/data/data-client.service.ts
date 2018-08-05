import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IV1Client {
    /**
     * @return Success
     */
    config(): Observable<void>;
}

@Injectable()
export class V1Client implements IV1Client {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @return Success
     */
    config(): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/config";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processConfig(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processConfig(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processConfig(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface ICertificateClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCertificate>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Certificate[]>;
    /**
     * @return Success
     */
    get(id: string): Observable<Certificate>;
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @all (optional) 
     * @return Success
     */
    provider(id: string, pageIndex: number | null | undefined, pageSize: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCertificate>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Certificate | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Certificate | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
}

@Injectable()
export class CertificateClient implements ICertificateClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCertificate> {
        let url_ = this.baseUrl + "/api/v1/certificate/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfCertificate>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfCertificate>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfCertificate> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfCertificate.fromJS(resultData200) : new PagedResultOfCertificate();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfCertificate>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Certificate[]> {
        let url_ = this.baseUrl + "/api/v1/certificate/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<Certificate[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Certificate[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<Certificate[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Certificate.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Certificate[]>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<Certificate> {
        let url_ = this.baseUrl + "/api/v1/certificate/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<Certificate>><any>Observable.throw(e);
                }
            } else
                return <Observable<Certificate>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<Certificate> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Certificate.fromJS(resultData200) : new Certificate();
            return Observable.of(result200);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Certificate>(<any>null);
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @all (optional) 
     * @return Success
     */
    provider(id: string, pageIndex: number | null | undefined, pageSize: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCertificate> {
        let url_ = this.baseUrl + "/api/v1/certificate/provider/{id}?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processProvider(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processProvider(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfCertificate>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfCertificate>><any>Observable.throw(response_);
        });
    }

    protected processProvider(response: HttpResponseBase): Observable<PagedResultOfCertificate> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfCertificate.fromJS(resultData200) : new PagedResultOfCertificate();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfCertificate>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Certificate | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/certificate/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Certificate | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/certificate/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/certificate/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface ICityClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCity>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<City[]>;
    /**
     * @return Success
     */
    get(id: string): Observable<City>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: City | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: City | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
}

@Injectable()
export class CityClient implements ICityClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCity> {
        let url_ = this.baseUrl + "/api/v1/city/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfCity>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfCity>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfCity> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfCity.fromJS(resultData200) : new PagedResultOfCity();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfCity>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<City[]> {
        let url_ = this.baseUrl + "/api/v1/city/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<City[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<City[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<City[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(City.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<City[]>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<City> {
        let url_ = this.baseUrl + "/api/v1/city/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<City>><any>Observable.throw(e);
                }
            } else
                return <Observable<City>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<City> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? City.fromJS(resultData200) : new City();
            return Observable.of(result200);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<City>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: City | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/city/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: City | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/city/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/city/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface IConfigurationClient {
    /**
     * @return Success
     */
    configurationdata(): Observable<void>;
}

@Injectable()
export class ConfigurationClient implements IConfigurationClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @return Success
     */
    configurationdata(): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/configuration/configurationdata";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processConfigurationdata(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processConfigurationdata(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processConfigurationdata(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface ICountryClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCountry>;
    /**
     * @return Success
     */
    get(id: string): Observable<Country>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Country[]>;
    /**
     * @return Success
     */
    cities(id: string): Observable<City[]>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Country | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Country | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
}

@Injectable()
export class CountryClient implements ICountryClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfCountry> {
        let url_ = this.baseUrl + "/api/v1/country/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfCountry>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfCountry>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfCountry> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfCountry.fromJS(resultData200) : new PagedResultOfCountry();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfCountry>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<Country> {
        let url_ = this.baseUrl + "/api/v1/country/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<Country>><any>Observable.throw(e);
                }
            } else
                return <Observable<Country>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<Country> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Country.fromJS(resultData200) : new Country();
            return Observable.of(result200);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Country>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Country[]> {
        let url_ = this.baseUrl + "/api/v1/country/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<Country[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Country[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<Country[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Country.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Country[]>(<any>null);
    }

    /**
     * @return Success
     */
    cities(id: string): Observable<City[]> {
        let url_ = this.baseUrl + "/api/v1/country/{id}/cities";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processCities(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCities(<any>response_);
                } catch (e) {
                    return <Observable<City[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<City[]>><any>Observable.throw(response_);
        });
    }

    protected processCities(response: HttpResponseBase): Observable<City[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(City.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<City[]>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Country | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/country/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Country | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/country/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/country/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface IExperienceClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfExperience>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Experience[]>;
    /**
     * @return Success
     */
    get(id: string): Observable<Experience>;
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @all (optional) 
     * @return Success
     */
    provider(id: string, pageIndex: number | null | undefined, pageSize: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfExperience>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Experience | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Experience | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
}

@Injectable()
export class ExperienceClient implements IExperienceClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfExperience> {
        let url_ = this.baseUrl + "/api/v1/experience/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfExperience>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfExperience>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfExperience> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfExperience.fromJS(resultData200) : new PagedResultOfExperience();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfExperience>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Experience[]> {
        let url_ = this.baseUrl + "/api/v1/experience/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<Experience[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Experience[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<Experience[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Experience.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Experience[]>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<Experience> {
        let url_ = this.baseUrl + "/api/v1/experience/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<Experience>><any>Observable.throw(e);
                }
            } else
                return <Observable<Experience>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<Experience> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Experience.fromJS(resultData200) : new Experience();
            return Observable.of(result200);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Experience>(<any>null);
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @all (optional) 
     * @return Success
     */
    provider(id: string, pageIndex: number | null | undefined, pageSize: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfExperience> {
        let url_ = this.baseUrl + "/api/v1/experience/provider/{id}?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processProvider(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processProvider(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfExperience>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfExperience>><any>Observable.throw(response_);
        });
    }

    protected processProvider(response: HttpResponseBase): Observable<PagedResultOfExperience> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfExperience.fromJS(resultData200) : new PagedResultOfExperience();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfExperience>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Experience | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/experience/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Experience | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/experience/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/experience/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface IPatientClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfPatient>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Patient[]>;
    /**
     * @return Success
     */
    get(id: string): Observable<PatientEdit>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: PatientEdit | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: PatientEdit | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    auditPut(id: string, item: Audit | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    auditPost(id: string, item: Audit | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    addressGet(id: string): Observable<Address>;
    /**
     * @item (optional) 
     * @return Success
     */
    addressPut(id: string, item: Address | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    addressPost(id: string, item: Address | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    ccGet(id: string): Observable<CreditCard>;
    /**
     * @item (optional) 
     * @return Success
     */
    ccPut(id: string, item: CreditCard | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    ccPost(id: string, item: CreditCard | null | undefined): Observable<void>;
}

@Injectable()
export class PatientClient implements IPatientClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfPatient> {
        let url_ = this.baseUrl + "/api/v1/patient/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfPatient>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfPatient>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfPatient> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfPatient.fromJS(resultData200) : new PagedResultOfPatient();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfPatient>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Patient[]> {
        let url_ = this.baseUrl + "/api/v1/patient/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<Patient[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Patient[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<Patient[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Patient.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Patient[]>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<PatientEdit> {
        let url_ = this.baseUrl + "/api/v1/patient/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<PatientEdit>><any>Observable.throw(e);
                }
            } else
                return <Observable<PatientEdit>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<PatientEdit> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PatientEdit.fromJS(resultData200) : new PatientEdit();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PatientEdit>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: PatientEdit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: PatientEdit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    auditPut(id: string, item: Audit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/audit";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processAuditPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuditPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAuditPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    auditPost(id: string, item: Audit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/audit";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processAuditPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuditPost(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAuditPost(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    addressGet(id: string): Observable<Address> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/address";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAddressGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddressGet(<any>response_);
                } catch (e) {
                    return <Observable<Address>><any>Observable.throw(e);
                }
            } else
                return <Observable<Address>><any>Observable.throw(response_);
        });
    }

    protected processAddressGet(response: HttpResponseBase): Observable<Address> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Address.fromJS(resultData200) : new Address();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Address>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    addressPut(id: string, item: Address | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/address";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processAddressPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddressPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAddressPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    addressPost(id: string, item: Address | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/address";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processAddressPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddressPost(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAddressPost(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    ccGet(id: string): Observable<CreditCard> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/cc";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processCcGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCcGet(<any>response_);
                } catch (e) {
                    return <Observable<CreditCard>><any>Observable.throw(e);
                }
            } else
                return <Observable<CreditCard>><any>Observable.throw(response_);
        });
    }

    protected processCcGet(response: HttpResponseBase): Observable<CreditCard> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? CreditCard.fromJS(resultData200) : new CreditCard();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<CreditCard>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    ccPut(id: string, item: CreditCard | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/cc";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processCcPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCcPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCcPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    ccPost(id: string, item: CreditCard | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/patient/{id}/cc";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCcPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCcPost(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCcPost(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface IPricerangeClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfPriceRange>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<PriceRange[]>;
    /**
     * @return Success
     */
    get(id: string): Observable<PriceRange>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: PriceRange | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: PriceRange | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
}

@Injectable()
export class PricerangeClient implements IPricerangeClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfPriceRange> {
        let url_ = this.baseUrl + "/api/v1/pricerange/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfPriceRange>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfPriceRange>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfPriceRange> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfPriceRange.fromJS(resultData200) : new PagedResultOfPriceRange();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfPriceRange>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<PriceRange[]> {
        let url_ = this.baseUrl + "/api/v1/pricerange/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<PriceRange[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<PriceRange[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<PriceRange[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(PriceRange.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PriceRange[]>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<PriceRange> {
        let url_ = this.baseUrl + "/api/v1/pricerange/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<PriceRange>><any>Observable.throw(e);
                }
            } else
                return <Observable<PriceRange>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<PriceRange> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PriceRange.fromJS(resultData200) : new PriceRange();
            return Observable.of(result200);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PriceRange>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: PriceRange | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/pricerange/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: PriceRange | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/pricerange/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/pricerange/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface IProviderClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfProvider>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Provider[]>;
    /**
     * @return Success
     */
    get(id: string): Observable<ProviderEdit>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: ProviderEdit | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: ProviderEdit | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
    /**
     * @return Success
     */
    auditGet(id: string): Observable<Audit>;
    /**
     * @item (optional) 
     * @return Success
     */
    auditPut(id: string, item: Audit | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    auditPost(id: string, item: Audit | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    addressGet(id: string): Observable<Address>;
    /**
     * @item (optional) 
     * @return Success
     */
    addressPut(id: string, item: Address | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    addressPost(id: string, item: Address | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    balance(id: string): Observable<Balance>;
    /**
     * @all (optional) 
     * @return Success
     */
    certificates(id: string, all: boolean | null | undefined): Observable<Certificate[]>;
    /**
     * @all (optional) 
     * @return Success
     */
    experiences(id: string, all: boolean | null | undefined): Observable<Experience[]>;
    /**
     * @all (optional) 
     * @return Success
     */
    specialties(id: string, all: boolean | null | undefined): Observable<Specialty[]>;
    /**
     * @return Success
     */
    count(type: number): Observable<number>;
}

@Injectable()
export class ProviderClient implements IProviderClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfProvider> {
        let url_ = this.baseUrl + "/api/v1/provider/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfProvider>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfProvider>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfProvider> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfProvider.fromJS(resultData200) : new PagedResultOfProvider();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfProvider>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Provider[]> {
        let url_ = this.baseUrl + "/api/v1/provider/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<Provider[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Provider[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<Provider[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Provider.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Provider[]>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<ProviderEdit> {
        let url_ = this.baseUrl + "/api/v1/provider/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<ProviderEdit>><any>Observable.throw(e);
                }
            } else
                return <Observable<ProviderEdit>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<ProviderEdit> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ProviderEdit.fromJS(resultData200) : new ProviderEdit();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<ProviderEdit>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: ProviderEdit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/provider/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: ProviderEdit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/provider/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/provider/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    auditGet(id: string): Observable<Audit> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/audit";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAuditGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuditGet(<any>response_);
                } catch (e) {
                    return <Observable<Audit>><any>Observable.throw(e);
                }
            } else
                return <Observable<Audit>><any>Observable.throw(response_);
        });
    }

    protected processAuditGet(response: HttpResponseBase): Observable<Audit> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Audit.fromJS(resultData200) : new Audit();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Audit>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    auditPut(id: string, item: Audit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/audit";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processAuditPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuditPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAuditPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    auditPost(id: string, item: Audit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/audit";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processAuditPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuditPost(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAuditPost(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    addressGet(id: string): Observable<Address> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/address";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAddressGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddressGet(<any>response_);
                } catch (e) {
                    return <Observable<Address>><any>Observable.throw(e);
                }
            } else
                return <Observable<Address>><any>Observable.throw(response_);
        });
    }

    protected processAddressGet(response: HttpResponseBase): Observable<Address> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Address.fromJS(resultData200) : new Address();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Address>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    addressPut(id: string, item: Address | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/address";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processAddressPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddressPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAddressPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    addressPost(id: string, item: Address | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/address";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processAddressPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAddressPost(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processAddressPost(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    balance(id: string): Observable<Balance> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/balance";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processBalance(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processBalance(<any>response_);
                } catch (e) {
                    return <Observable<Balance>><any>Observable.throw(e);
                }
            } else
                return <Observable<Balance>><any>Observable.throw(response_);
        });
    }

    protected processBalance(response: HttpResponseBase): Observable<Balance> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Balance.fromJS(resultData200) : new Balance();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Balance>(<any>null);
    }

    /**
     * @all (optional) 
     * @return Success
     */
    certificates(id: string, all: boolean | null | undefined): Observable<Certificate[]> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/certificates?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processCertificates(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCertificates(<any>response_);
                } catch (e) {
                    return <Observable<Certificate[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Certificate[]>><any>Observable.throw(response_);
        });
    }

    protected processCertificates(response: HttpResponseBase): Observable<Certificate[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Certificate.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Certificate[]>(<any>null);
    }

    /**
     * @all (optional) 
     * @return Success
     */
    experiences(id: string, all: boolean | null | undefined): Observable<Experience[]> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/experiences?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processExperiences(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processExperiences(<any>response_);
                } catch (e) {
                    return <Observable<Experience[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Experience[]>><any>Observable.throw(response_);
        });
    }

    protected processExperiences(response: HttpResponseBase): Observable<Experience[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Experience.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Experience[]>(<any>null);
    }

    /**
     * @all (optional) 
     * @return Success
     */
    specialties(id: string, all: boolean | null | undefined): Observable<Specialty[]> {
        let url_ = this.baseUrl + "/api/v1/provider/{id}/specialties?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processSpecialties(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSpecialties(<any>response_);
                } catch (e) {
                    return <Observable<Specialty[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Specialty[]>><any>Observable.throw(response_);
        });
    }

    protected processSpecialties(response: HttpResponseBase): Observable<Specialty[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Specialty.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Specialty[]>(<any>null);
    }

    /**
     * @return Success
     */
    count(type: number): Observable<number> {
        let url_ = this.baseUrl + "/api/v1/request/provider/{type}/count";
        if (type === undefined || type === null)
            throw new Error("The parameter 'type' must be defined.");
        url_ = url_.replace("{type}", encodeURIComponent("" + type)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processCount(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCount(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>Observable.throw(e);
                }
            } else
                return <Observable<number>><any>Observable.throw(response_);
        });
    }

    protected processCount(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<number>(<any>null);
    }
}

export interface IRequestClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfRequest>;
    /**
     * @return Success
     */
    get(id: string): Observable<RequestEdit>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: RequestEdit | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: RequestEdit | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
    /**
     * @return Success
     */
    approve(id: string): Observable<void>;
}

@Injectable()
export class RequestClient implements IRequestClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfRequest> {
        let url_ = this.baseUrl + "/api/v1/request/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfRequest>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfRequest>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfRequest> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfRequest.fromJS(resultData200) : new PagedResultOfRequest();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfRequest>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<RequestEdit> {
        let url_ = this.baseUrl + "/api/v1/request/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<RequestEdit>><any>Observable.throw(e);
                }
            } else
                return <Observable<RequestEdit>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<RequestEdit> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? RequestEdit.fromJS(resultData200) : new RequestEdit();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<RequestEdit>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: RequestEdit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/request/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: RequestEdit | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/request/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/request/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    approve(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/request/approve/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processApprove(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processApprove(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processApprove(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export interface IStatusClient {
    /**
     * @return Success
     */
    count(status: number): Observable<number>;
}

@Injectable()
export class StatusClient implements IStatusClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @return Success
     */
    count(status: number): Observable<number> {
        let url_ = this.baseUrl + "/api/v1/request/status/{status}/count";
        if (status === undefined || status === null)
            throw new Error("The parameter 'status' must be defined.");
        url_ = url_.replace("{status}", encodeURIComponent("" + status)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processCount(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCount(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>Observable.throw(e);
                }
            } else
                return <Observable<number>><any>Observable.throw(response_);
        });
    }

    protected processCount(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<number>(<any>null);
    }
}

export interface ISpecialtyClient {
    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfSpecialty>;
    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Specialty[]>;
    /**
     * @return Success
     */
    get(id: string): Observable<Specialty>;
    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Specialty | null | undefined): Observable<void>;
    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Specialty | null | undefined): Observable<void>;
    /**
     * @return Success
     */
    delete(id: string): Observable<void>;
}

@Injectable()
export class SpecialtyClient implements ISpecialtyClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    /**
     * @pageIndex (optional) 
     * @pageSize (optional) 
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    page(pageIndex: number | null | undefined, pageSize: number | null | undefined, flag: number | null | undefined, all: boolean | null | undefined): Observable<PagedResultOfSpecialty> {
        let url_ = this.baseUrl + "/api/v1/specialty/page?";
        if (pageIndex !== undefined)
            url_ += "pageIndex=" + encodeURIComponent("" + pageIndex) + "&"; 
        if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&"; 
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processPage(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPage(<any>response_);
                } catch (e) {
                    return <Observable<PagedResultOfSpecialty>><any>Observable.throw(e);
                }
            } else
                return <Observable<PagedResultOfSpecialty>><any>Observable.throw(response_);
        });
    }

    protected processPage(response: HttpResponseBase): Observable<PagedResultOfSpecialty> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PagedResultOfSpecialty.fromJS(resultData200) : new PagedResultOfSpecialty();
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<PagedResultOfSpecialty>(<any>null);
    }

    /**
     * @flag (optional) 
     * @all (optional) 
     * @return Success
     */
    all(flag: number | null | undefined, all: boolean | null | undefined): Observable<Specialty[]> {
        let url_ = this.baseUrl + "/api/v1/specialty/all?";
        if (flag !== undefined)
            url_ += "flag=" + encodeURIComponent("" + flag) + "&"; 
        if (all !== undefined)
            url_ += "all=" + encodeURIComponent("" + all) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAll(<any>response_);
                } catch (e) {
                    return <Observable<Specialty[]>><any>Observable.throw(e);
                }
            } else
                return <Observable<Specialty[]>><any>Observable.throw(response_);
        });
    }

    protected processAll(response: HttpResponseBase): Observable<Specialty[]> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(Specialty.fromJS(item));
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Specialty[]>(<any>null);
    }

    /**
     * @return Success
     */
    get(id: string): Observable<Specialty> {
        let url_ = this.baseUrl + "/api/v1/specialty/get/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<Specialty>><any>Observable.throw(e);
                }
            } else
                return <Observable<Specialty>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<Specialty> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? Specialty.fromJS(resultData200) : new Specialty();
            return Observable.of(result200);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<Specialty>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    create(item: Specialty | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/specialty/create";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processCreate(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processCreate(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @item (optional) 
     * @return Success
     */
    save(id: string, item: Specialty | null | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/specialty/save/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(item);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processSave(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processSave(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    /**
     * @return Success
     */
    delete(id: string): Observable<void> {
        let url_ = this.baseUrl + "/api/v1/specialty/delete/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status === 404) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status === 400) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export class PagedResultOfCertificate implements IPagedResultOfCertificate {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Certificate[] | undefined;

    constructor(data?: IPagedResultOfCertificate) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(Certificate.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfCertificate {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfCertificate();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfCertificate {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Certificate[] | undefined;
}

export class Certificate implements ICertificate {
    providerId?: string | undefined;
    notes?: string | undefined;
    notesArabic?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;

    constructor(data?: ICertificate) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.providerId = data["providerId"];
            this.notes = data["notes"];
            this.notesArabic = data["notesArabic"];
            this.dateFrom = data["dateFrom"] ? new Date(data["dateFrom"].toString()) : <any>undefined;
            this.dateTo = data["dateTo"] ? new Date(data["dateTo"].toString()) : <any>undefined;
            this.name = data["name"];
            this.nameArabic = data["nameArabic"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Certificate {
        data = typeof data === 'object' ? data : {};
        let result = new Certificate();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["providerId"] = this.providerId;
        data["notes"] = this.notes;
        data["notesArabic"] = this.notesArabic;
        data["dateFrom"] = this.dateFrom ? this.dateFrom.toISOString() : <any>undefined;
        data["dateTo"] = this.dateTo ? this.dateTo.toISOString() : <any>undefined;
        data["name"] = this.name;
        data["nameArabic"] = this.nameArabic;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICertificate {
    providerId?: string | undefined;
    notes?: string | undefined;
    notesArabic?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;
}

export class PagedResultOfCity implements IPagedResultOfCity {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: City[] | undefined;

    constructor(data?: IPagedResultOfCity) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(City.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfCity {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfCity();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfCity {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: City[] | undefined;
}

export class City implements ICity {
    countryId?: string | undefined;
    countryName?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;

    constructor(data?: ICity) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.countryId = data["countryId"];
            this.countryName = data["countryName"];
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.name = data["name"];
            this.nameArabic = data["nameArabic"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): City {
        data = typeof data === 'object' ? data : {};
        let result = new City();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["countryId"] = this.countryId;
        data["countryName"] = this.countryName;
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        data["name"] = this.name;
        data["nameArabic"] = this.nameArabic;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICity {
    countryId?: string | undefined;
    countryName?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;
}

export class PagedResultOfCountry implements IPagedResultOfCountry {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Country[] | undefined;

    constructor(data?: IPagedResultOfCountry) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(Country.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfCountry {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfCountry();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfCountry {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Country[] | undefined;
}

export class Country implements ICountry {
    code?: string | undefined;
    code2?: string | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;

    constructor(data?: ICountry) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.code = data["code"];
            this.code2 = data["code2"];
            this.name = data["name"];
            this.nameArabic = data["nameArabic"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Country {
        data = typeof data === 'object' ? data : {};
        let result = new Country();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["code"] = this.code;
        data["code2"] = this.code2;
        data["name"] = this.name;
        data["nameArabic"] = this.nameArabic;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICountry {
    code?: string | undefined;
    code2?: string | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;
}

export class PagedResultOfExperience implements IPagedResultOfExperience {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Experience[] | undefined;

    constructor(data?: IPagedResultOfExperience) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(Experience.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfExperience {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfExperience();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfExperience {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Experience[] | undefined;
}

export class Experience implements IExperience {
    providerId?: string | undefined;
    notes?: string | undefined;
    notesArabic?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;

    constructor(data?: IExperience) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.providerId = data["providerId"];
            this.notes = data["notes"];
            this.notesArabic = data["notesArabic"];
            this.dateFrom = data["dateFrom"] ? new Date(data["dateFrom"].toString()) : <any>undefined;
            this.dateTo = data["dateTo"] ? new Date(data["dateTo"].toString()) : <any>undefined;
            this.name = data["name"];
            this.nameArabic = data["nameArabic"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Experience {
        data = typeof data === 'object' ? data : {};
        let result = new Experience();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["providerId"] = this.providerId;
        data["notes"] = this.notes;
        data["notesArabic"] = this.notesArabic;
        data["dateFrom"] = this.dateFrom ? this.dateFrom.toISOString() : <any>undefined;
        data["dateTo"] = this.dateTo ? this.dateTo.toISOString() : <any>undefined;
        data["name"] = this.name;
        data["nameArabic"] = this.nameArabic;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["id"] = this.id;
        return data; 
    }
}

export interface IExperience {
    providerId?: string | undefined;
    notes?: string | undefined;
    notesArabic?: string | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;
}

export class PagedResultOfPatient implements IPagedResultOfPatient {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Patient[] | undefined;

    constructor(data?: IPagedResultOfPatient) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(Patient.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfPatient {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfPatient();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfPatient {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Patient[] | undefined;
}

export class Patient implements IPatient {
    name?: string | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    isEnabled?: boolean | undefined;
    age?: number | undefined;
    gender?: number | undefined;
    maritalStatus?: number | undefined;
    id?: string | undefined;

    constructor(data?: IPatient) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.givenName = data["givenName"];
            this.familyName = data["familyName"];
            this.isEnabled = data["isEnabled"];
            this.age = data["age"];
            this.gender = data["gender"];
            this.maritalStatus = data["maritalStatus"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Patient {
        data = typeof data === 'object' ? data : {};
        let result = new Patient();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["givenName"] = this.givenName;
        data["familyName"] = this.familyName;
        data["isEnabled"] = this.isEnabled;
        data["age"] = this.age;
        data["gender"] = this.gender;
        data["maritalStatus"] = this.maritalStatus;
        data["id"] = this.id;
        return data; 
    }
}

export interface IPatient {
    name?: string | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    isEnabled?: boolean | undefined;
    age?: number | undefined;
    gender?: number | undefined;
    maritalStatus?: number | undefined;
    id?: string | undefined;
}

export class PatientEdit implements IPatientEdit {
    userId?: string | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    isEnabled?: boolean | undefined;
    birthDate?: Date | undefined;
    gender?: number | undefined;
    maritalStatus?: number | undefined;
    id?: string | undefined;

    constructor(data?: IPatientEdit) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userId = data["userId"];
            this.givenName = data["givenName"];
            this.familyName = data["familyName"];
            this.isEnabled = data["isEnabled"];
            this.birthDate = data["birthDate"] ? new Date(data["birthDate"].toString()) : <any>undefined;
            this.gender = data["gender"];
            this.maritalStatus = data["maritalStatus"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): PatientEdit {
        data = typeof data === 'object' ? data : {};
        let result = new PatientEdit();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["givenName"] = this.givenName;
        data["familyName"] = this.familyName;
        data["isEnabled"] = this.isEnabled;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        data["gender"] = this.gender;
        data["maritalStatus"] = this.maritalStatus;
        data["id"] = this.id;
        return data; 
    }
}

export interface IPatientEdit {
    userId?: string | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    isEnabled?: boolean | undefined;
    birthDate?: Date | undefined;
    gender?: number | undefined;
    maritalStatus?: number | undefined;
    id?: string | undefined;
}

export class Audit implements IAudit {
    ip?: string | undefined;
    joinDate?: Date | undefined;
    createdBy?: string | undefined;
    editedBy?: string | undefined;
    id?: string | undefined;

    constructor(data?: IAudit) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.ip = data["ip"];
            this.joinDate = data["joinDate"] ? new Date(data["joinDate"].toString()) : <any>undefined;
            this.createdBy = data["createdBy"];
            this.editedBy = data["editedBy"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Audit {
        data = typeof data === 'object' ? data : {};
        let result = new Audit();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["ip"] = this.ip;
        data["joinDate"] = this.joinDate ? this.joinDate.toISOString() : <any>undefined;
        data["createdBy"] = this.createdBy;
        data["editedBy"] = this.editedBy;
        data["id"] = this.id;
        return data; 
    }
}

export interface IAudit {
    ip?: string | undefined;
    joinDate?: Date | undefined;
    createdBy?: string | undefined;
    editedBy?: string | undefined;
    id?: string | undefined;
}

export class Address implements IAddress {
    street?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    postCode?: string | undefined;
    updatedAt?: Date | undefined;
    cityId?: string | undefined;
    cityName?: string | undefined;
    cityNameArabic?: string | undefined;
    id?: string | undefined;

    constructor(data?: IAddress) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.street = data["street"];
            this.latitude = data["latitude"];
            this.longitude = data["longitude"];
            this.postCode = data["postCode"];
            this.updatedAt = data["updatedAt"] ? new Date(data["updatedAt"].toString()) : <any>undefined;
            this.cityId = data["cityId"];
            this.cityName = data["cityName"];
            this.cityNameArabic = data["cityNameArabic"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Address {
        data = typeof data === 'object' ? data : {};
        let result = new Address();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["street"] = this.street;
        data["latitude"] = this.latitude;
        data["longitude"] = this.longitude;
        data["postCode"] = this.postCode;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>undefined;
        data["cityId"] = this.cityId;
        data["cityName"] = this.cityName;
        data["cityNameArabic"] = this.cityNameArabic;
        data["id"] = this.id;
        return data; 
    }
}

export interface IAddress {
    street?: string | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    postCode?: string | undefined;
    updatedAt?: Date | undefined;
    cityId?: string | undefined;
    cityName?: string | undefined;
    cityNameArabic?: string | undefined;
    id?: string | undefined;
}

export class CreditCard implements ICreditCard {
    cardNumber?: string | undefined;
    securityNumber?: string | undefined;
    expiration?: string | undefined;
    cardHolderName?: string | undefined;
    cardType?: number | undefined;
    street?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    zipCode?: string | undefined;
    id?: string | undefined;

    constructor(data?: ICreditCard) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.cardNumber = data["cardNumber"];
            this.securityNumber = data["securityNumber"];
            this.expiration = data["expiration"];
            this.cardHolderName = data["cardHolderName"];
            this.cardType = data["cardType"];
            this.street = data["street"];
            this.city = data["city"];
            this.country = data["country"];
            this.zipCode = data["zipCode"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): CreditCard {
        data = typeof data === 'object' ? data : {};
        let result = new CreditCard();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["cardNumber"] = this.cardNumber;
        data["securityNumber"] = this.securityNumber;
        data["expiration"] = this.expiration;
        data["cardHolderName"] = this.cardHolderName;
        data["cardType"] = this.cardType;
        data["street"] = this.street;
        data["city"] = this.city;
        data["country"] = this.country;
        data["zipCode"] = this.zipCode;
        data["id"] = this.id;
        return data; 
    }
}

export interface ICreditCard {
    cardNumber?: string | undefined;
    securityNumber?: string | undefined;
    expiration?: string | undefined;
    cardHolderName?: string | undefined;
    cardType?: number | undefined;
    street?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    zipCode?: string | undefined;
    id?: string | undefined;
}

export class PagedResultOfPriceRange implements IPagedResultOfPriceRange {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: PriceRange[] | undefined;

    constructor(data?: IPagedResultOfPriceRange) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(PriceRange.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfPriceRange {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfPriceRange();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfPriceRange {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: PriceRange[] | undefined;
}

export class PriceRange implements IPriceRange {
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;

    constructor(data?: IPriceRange) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.nameArabic = data["nameArabic"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): PriceRange {
        data = typeof data === 'object' ? data : {};
        let result = new PriceRange();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["nameArabic"] = this.nameArabic;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["id"] = this.id;
        return data; 
    }
}

export interface IPriceRange {
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;
}

export class PagedResultOfProvider implements IPagedResultOfProvider {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Provider[] | undefined;

    constructor(data?: IPagedResultOfProvider) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(Provider.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfProvider {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfProvider();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfProvider {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Provider[] | undefined;
}

export class Provider implements IProvider {
    name?: string | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    gender?: number | undefined;
    providerType?: number | undefined;
    id?: string | undefined;

    constructor(data?: IProvider) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.name = data["name"];
            this.givenName = data["givenName"];
            this.familyName = data["familyName"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.gender = data["gender"];
            this.providerType = data["providerType"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Provider {
        data = typeof data === 'object' ? data : {};
        let result = new Provider();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["givenName"] = this.givenName;
        data["familyName"] = this.familyName;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["gender"] = this.gender;
        data["providerType"] = this.providerType;
        data["id"] = this.id;
        return data; 
    }
}

export interface IProvider {
    name?: string | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    gender?: number | undefined;
    providerType?: number | undefined;
    id?: string | undefined;
}

export class ProviderEdit implements IProviderEdit {
    userId?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    providerType?: number | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    gender?: number | undefined;
    id?: string | undefined;

    constructor(data?: IProviderEdit) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userId = data["userId"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.providerType = data["providerType"];
            this.givenName = data["givenName"];
            this.familyName = data["familyName"];
            this.gender = data["gender"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): ProviderEdit {
        data = typeof data === 'object' ? data : {};
        let result = new ProviderEdit();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userId"] = this.userId;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["providerType"] = this.providerType;
        data["givenName"] = this.givenName;
        data["familyName"] = this.familyName;
        data["gender"] = this.gender;
        data["id"] = this.id;
        return data; 
    }
}

export interface IProviderEdit {
    userId?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    providerType?: number | undefined;
    givenName?: string | undefined;
    familyName?: string | undefined;
    gender?: number | undefined;
    id?: string | undefined;
}

export class Balance implements IBalance {
    profileId?: string | undefined;
    outstanding?: number | undefined;
    total?: number | undefined;
    updatedAt?: Date | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;

    constructor(data?: IBalance) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.profileId = data["profileId"];
            this.outstanding = data["outstanding"];
            this.total = data["total"];
            this.updatedAt = data["updatedAt"] ? new Date(data["updatedAt"].toString()) : <any>undefined;
            this.name = data["name"];
            this.nameArabic = data["nameArabic"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Balance {
        data = typeof data === 'object' ? data : {};
        let result = new Balance();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["profileId"] = this.profileId;
        data["outstanding"] = this.outstanding;
        data["total"] = this.total;
        data["updatedAt"] = this.updatedAt ? this.updatedAt.toISOString() : <any>undefined;
        data["name"] = this.name;
        data["nameArabic"] = this.nameArabic;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["id"] = this.id;
        return data; 
    }
}

export interface IBalance {
    profileId?: string | undefined;
    outstanding?: number | undefined;
    total?: number | undefined;
    updatedAt?: Date | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;
}

export class Specialty implements ISpecialty {
    providerType?: number | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;

    constructor(data?: ISpecialty) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.providerType = data["providerType"];
            this.name = data["name"];
            this.nameArabic = data["nameArabic"];
            this.rank = data["rank"];
            this.isEnabled = data["isEnabled"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Specialty {
        data = typeof data === 'object' ? data : {};
        let result = new Specialty();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["providerType"] = this.providerType;
        data["name"] = this.name;
        data["nameArabic"] = this.nameArabic;
        data["rank"] = this.rank;
        data["isEnabled"] = this.isEnabled;
        data["id"] = this.id;
        return data; 
    }
}

export interface ISpecialty {
    providerType?: number | undefined;
    name?: string | undefined;
    nameArabic?: string | undefined;
    rank?: number | undefined;
    isEnabled?: boolean | undefined;
    id?: string | undefined;
}

export class PagedResultOfRequest implements IPagedResultOfRequest {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Request[] | undefined;

    constructor(data?: IPagedResultOfRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(Request.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfRequest {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfRequest();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfRequest {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Request[] | undefined;
}

export class Request implements IRequest {
    patientName?: string | undefined;
    providerName?: string | undefined;
    specialty?: string | undefined;
    priceRange?: string | undefined;
    readonly dayKey?: string | undefined;
    status?: number | undefined;
    providerType?: number | undefined;
    isClosed?: boolean | undefined;
    requestDate?: Date | undefined;
    visitDate?: Date | undefined;
    closeDate?: Date | undefined;
    cost?: number | undefined;
    approvedBy?: string | undefined;
    approvalDate?: Date | undefined;
    id?: string | undefined;

    constructor(data?: IRequest) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.patientName = data["patientName"];
            this.providerName = data["providerName"];
            this.specialty = data["specialty"];
            this.priceRange = data["priceRange"];
            (<any>this).dayKey = data["dayKey"];
            this.status = data["status"];
            this.providerType = data["providerType"];
            this.isClosed = data["isClosed"];
            this.requestDate = data["requestDate"] ? new Date(data["requestDate"].toString()) : <any>undefined;
            this.visitDate = data["visitDate"] ? new Date(data["visitDate"].toString()) : <any>undefined;
            this.closeDate = data["closeDate"] ? new Date(data["closeDate"].toString()) : <any>undefined;
            this.cost = data["cost"];
            this.approvedBy = data["approvedBy"];
            this.approvalDate = data["approvalDate"] ? new Date(data["approvalDate"].toString()) : <any>undefined;
            this.id = data["id"];
        }
    }

    static fromJS(data: any): Request {
        data = typeof data === 'object' ? data : {};
        let result = new Request();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["patientName"] = this.patientName;
        data["providerName"] = this.providerName;
        data["specialty"] = this.specialty;
        data["priceRange"] = this.priceRange;
        data["dayKey"] = this.dayKey;
        data["status"] = this.status;
        data["providerType"] = this.providerType;
        data["isClosed"] = this.isClosed;
        data["requestDate"] = this.requestDate ? this.requestDate.toISOString() : <any>undefined;
        data["visitDate"] = this.visitDate ? this.visitDate.toISOString() : <any>undefined;
        data["closeDate"] = this.closeDate ? this.closeDate.toISOString() : <any>undefined;
        data["cost"] = this.cost;
        data["approvedBy"] = this.approvedBy;
        data["approvalDate"] = this.approvalDate ? this.approvalDate.toISOString() : <any>undefined;
        data["id"] = this.id;
        return data; 
    }
}

export interface IRequest {
    patientName?: string | undefined;
    providerName?: string | undefined;
    specialty?: string | undefined;
    priceRange?: string | undefined;
    dayKey?: string | undefined;
    status?: number | undefined;
    providerType?: number | undefined;
    isClosed?: boolean | undefined;
    requestDate?: Date | undefined;
    visitDate?: Date | undefined;
    closeDate?: Date | undefined;
    cost?: number | undefined;
    approvedBy?: string | undefined;
    approvalDate?: Date | undefined;
    id?: string | undefined;
}

export class RequestEdit implements IRequestEdit {
    patientName?: string | undefined;
    providerName?: string | undefined;
    specialty?: string | undefined;
    priceRange?: string | undefined;
    status?: number | undefined;
    providerType?: number | undefined;
    isClosed?: boolean | undefined;
    requestDate?: Date | undefined;
    visitDate?: Date | undefined;
    closeDate?: Date | undefined;
    cost?: number | undefined;
    approvedBy?: string | undefined;
    approvalDate?: Date | undefined;
    notes?: string | undefined;
    providerNotes?: string | undefined;
    providerRating?: number | undefined;
    patientRating?: number | undefined;
    id?: string | undefined;

    constructor(data?: IRequestEdit) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.patientName = data["patientName"];
            this.providerName = data["providerName"];
            this.specialty = data["specialty"];
            this.priceRange = data["priceRange"];
            this.status = data["status"];
            this.providerType = data["providerType"];
            this.isClosed = data["isClosed"];
            this.requestDate = data["requestDate"] ? new Date(data["requestDate"].toString()) : <any>undefined;
            this.visitDate = data["visitDate"] ? new Date(data["visitDate"].toString()) : <any>undefined;
            this.closeDate = data["closeDate"] ? new Date(data["closeDate"].toString()) : <any>undefined;
            this.cost = data["cost"];
            this.approvedBy = data["approvedBy"];
            this.approvalDate = data["approvalDate"] ? new Date(data["approvalDate"].toString()) : <any>undefined;
            this.notes = data["notes"];
            this.providerNotes = data["providerNotes"];
            this.providerRating = data["providerRating"];
            this.patientRating = data["patientRating"];
            this.id = data["id"];
        }
    }

    static fromJS(data: any): RequestEdit {
        data = typeof data === 'object' ? data : {};
        let result = new RequestEdit();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["patientName"] = this.patientName;
        data["providerName"] = this.providerName;
        data["specialty"] = this.specialty;
        data["priceRange"] = this.priceRange;
        data["status"] = this.status;
        data["providerType"] = this.providerType;
        data["isClosed"] = this.isClosed;
        data["requestDate"] = this.requestDate ? this.requestDate.toISOString() : <any>undefined;
        data["visitDate"] = this.visitDate ? this.visitDate.toISOString() : <any>undefined;
        data["closeDate"] = this.closeDate ? this.closeDate.toISOString() : <any>undefined;
        data["cost"] = this.cost;
        data["approvedBy"] = this.approvedBy;
        data["approvalDate"] = this.approvalDate ? this.approvalDate.toISOString() : <any>undefined;
        data["notes"] = this.notes;
        data["providerNotes"] = this.providerNotes;
        data["providerRating"] = this.providerRating;
        data["patientRating"] = this.patientRating;
        data["id"] = this.id;
        return data; 
    }
}

export interface IRequestEdit {
    patientName?: string | undefined;
    providerName?: string | undefined;
    specialty?: string | undefined;
    priceRange?: string | undefined;
    status?: number | undefined;
    providerType?: number | undefined;
    isClosed?: boolean | undefined;
    requestDate?: Date | undefined;
    visitDate?: Date | undefined;
    closeDate?: Date | undefined;
    cost?: number | undefined;
    approvedBy?: string | undefined;
    approvalDate?: Date | undefined;
    notes?: string | undefined;
    providerNotes?: string | undefined;
    providerRating?: number | undefined;
    patientRating?: number | undefined;
    id?: string | undefined;
}

export class PagedResultOfSpecialty implements IPagedResultOfSpecialty {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Specialty[] | undefined;

    constructor(data?: IPagedResultOfSpecialty) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.pageIndex = data["pageIndex"];
            this.pageSize = data["pageSize"];
            this.count = data["count"];
            this.pageCount = data["pageCount"];
            if (data["result"] && data["result"].constructor === Array) {
                this.result = [];
                for (let item of data["result"])
                    this.result.push(Specialty.fromJS(item));
            }
        }
    }

    static fromJS(data: any): PagedResultOfSpecialty {
        data = typeof data === 'object' ? data : {};
        let result = new PagedResultOfSpecialty();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageIndex"] = this.pageIndex;
        data["pageSize"] = this.pageSize;
        data["count"] = this.count;
        data["pageCount"] = this.pageCount;
        if (this.result && this.result.constructor === Array) {
            data["result"] = [];
            for (let item of this.result)
                data["result"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IPagedResultOfSpecialty {
    pageIndex?: number | undefined;
    pageSize?: number | undefined;
    count?: number | undefined;
    pageCount?: number | undefined;
    result?: Specialty[] | undefined;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = function() { 
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob); 
        }
    });
}