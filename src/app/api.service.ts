import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPointsUser } from './api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getAdminsByPage(page: any, pageSize: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private _httpClient:HttpClient) { }
  // services for dashboards
  getdashboard(): Observable<any> {
    return this._httpClient.get(endPointsUser.dashboard);
  }

  // services for login
  postlogin(id:any):Observable<any> {
    return this._httpClient.post(endPointsUser.postlogin,id);
  }
  sendotp(id:any): Observable<any> {
    return this._httpClient.post(endPointsUser.sendotp,id);
    }
    // services for admin
  postAdmin(id: any): Observable<any> {
    return this._httpClient.post(endPointsUser.addadmin,id);
  }
  getAdmin(): Observable<any> {
    return this._httpClient.get(endPointsUser.viewadmin);
  }
  updateAdmin(id: any,payload:any): Observable<any> {
    return this._httpClient.put(endPointsUser.updateadmin+id,payload);
  }
  deleteAdmin(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteadmin+id);
  }
  editadmin(id: any):Observable<any> {
    return this._httpClient.get(endPointsUser.editadmin+id)
  }

   // services for domain
   adddomain(id: any): Observable<any> {
    return this._httpClient.post(endPointsUser.adddomain,id);
  }
  viewdomain(): Observable<any> {
    return this._httpClient.get(endPointsUser.viewdomain,);
  }
  updatedomain(id: any,payload:any): Observable<any> {
    return this._httpClient.put(endPointsUser.updatedomain+id,payload);
  }
  deletedomain(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deletedomain+id);
  }
  editdomain(id: any):Observable<any> {
    return this._httpClient.get(endPointsUser.editdomain+id)
  }

   // services for hosting
  addhosting(id: any): Observable<any> {
    return this._httpClient.post(endPointsUser.addhosting,id);
  }
  viewhosting(): Observable<any> {
    return this._httpClient.get(endPointsUser.viewhosting,);
  }
  updatehosting(id: any,payload:any): Observable<any> {
    return this._httpClient.put(endPointsUser.updatehosting+id,payload);
  }
  deletehosting(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deletehosting+id);
  }
  edithosting(id: any):Observable<any> {
    return this._httpClient.get(endPointsUser.edithosting+id)
  }

   // services for hosting map
  addhostdomainmap(id: any): Observable<any> {
    return this._httpClient.post(endPointsUser.addhostdomainmap,id);
  }
  viewhostdomainmap(): Observable<any> {
    return this._httpClient.get(endPointsUser.viewhostdomainmap);
  }
  updatehostdomainmap(id: any,payload:any): Observable<any> {
    return this._httpClient.put(endPointsUser.updatehostdomainmap+id,payload);
  }
  deletehostdomainmap(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deletehostdomainmap+id);
  }
  edithostdomainmap(id: any):Observable<any> {
    return this._httpClient.get(endPointsUser.edithostdomainmap+id)
  }
  getalldomains(): Observable<any> {
    return this._httpClient.get(endPointsUser.getalldomains);
  }
  getallhosting(): Observable<any> {
    return this._httpClient.get(endPointsUser.getallhosting);
  }
  getallproviders(): Observable<any> {
    return this._httpClient.get(endPointsUser.getallproviders);
  }

   // services for Email
  addemail(id: any): Observable<any> {
    return this._httpClient.post(endPointsUser.addemail,id);
  }
  viewemail(): Observable<any> {
    return this._httpClient.get(endPointsUser.viewemail);
  }
  updateemail(id: any,payload:any): Observable<any> {
    return this._httpClient.put(endPointsUser.updateemail+id,payload);
  }
  deleteemail(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteemail+id);
  }
  editemail(id: any):Observable<any> {
    return this._httpClient.get(endPointsUser.editemail+id)
  }

   // services for It Returns
  additreturns(id: any): Observable<any> {
    return this._httpClient.post(endPointsUser.additreturns,id);
  }
  viewitreturns(): Observable<any> {
    return this._httpClient.get(endPointsUser.viewitreturns);
  }
  updateitreturns(id: any,payload:any): Observable<any> {
    return this._httpClient.put(endPointsUser.updateitreturns+id,payload);
  }
  deleteitreturns(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.deleteitreturns+id);
  }
  edititreturns(id: any):Observable<any> {
    return this._httpClient.get(endPointsUser.edititreturns+id)
  }

  // services for passwords list
  viewpasswords(): Observable<any> {
    return this._httpClient.get(endPointsUser.viewpasswords);
  }
}
