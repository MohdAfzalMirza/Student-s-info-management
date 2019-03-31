import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams, HttpEvent, HttpHeaders } from '@angular/common/http';
import { ResponseContentType, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Headers } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from '../../environments/environment';


@Injectable()
export class ApiCommonService {

    url = environment.baseUrl;



    headers = new HttpHeaders({
        'Content-Type': 'application/json'

    });

    HTMLHeaders = new HttpHeaders({
        'Content-Type': 'text/html charset=utf-8'
    });


    constructor(private http: HttpClient) {
    }


    get(endpoint: string, params?: any): Observable<any> {

        return this.http.get(this.url + endpoint,
        )
    }




    post(endpoint: string, body: any): Observable<any> {
        return this.http.post(this.url + endpoint, body,
            {
                headers: this.headers,

            });
    }
 


    delete(endpoint: string) {
        return this.http.delete(this.url + endpoint,
            {
                headers: this.headers,

            });
    }

}
