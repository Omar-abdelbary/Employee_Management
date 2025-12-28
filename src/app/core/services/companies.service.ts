import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

   // injection service here to use http client and four method for api
  private readonly _HttpClient = inject(HttpClient) ;





  // get all campanies
  getAllCompanies():Observable<any> {
    return this._HttpClient.get(`${environment.base_Url}/api/companies`)
  }



  // createCompany
  createCompany(createFormInfo: object):Observable<any> {
    return this._HttpClient.post(`${environment.base_Url}/api/companies` ,
      createFormInfo
    )
  }


  // get company by id
  getCompanyById(companyId:string| number | null):Observable<any> {

    return this._HttpClient.get(`${environment.base_Url}/api/companies/:${companyId}`)
  }


  // update company by id
  updateCompanyById(compantId:string| number | null , updateFormInfo:object):Observable<any> {
    return this._HttpClient.put(`${environment.base_Url}/api/companies/:${compantId}` ,
      updateFormInfo
    )
  }



  //  delete company by id
  deleteCompanyById(companyId:string| number | null):Observable<any> {

    return this._HttpClient.delete(`${environment.base_Url}/api/companies/: ${companyId}`)


  }

}
