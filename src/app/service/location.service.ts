import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oblast } from '../model/oblast';
import { District } from '../model/district';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  public getAllLocations(): Observable<Oblast[]> {
    return this.http.get<Oblast[]>(`${this.url}/api/locations`)
  }

  public getOblast(id: number): Observable<Oblast> {
    return this.http.get<Oblast>(`${this.url}/api/locations/oblast/${id}`)
  }

  public getDistrict(id: number): Observable<District> {
    return this.http.get<District>(`${this.url}/api/locations/district/${id}`)
  }
}
