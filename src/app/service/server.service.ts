import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { throwError, Observable, Subscriber } from 'rxjs';
import { tap, catchError} from 'rxjs/operators';
import { Status } from '../enum/status.enum';
import { CustomResponse } from '../interface/custom-response';
import { Server } from '../interface/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  
  private readonly apiUrl!: 'any';

  constructor(private http: HttpClient) {

   }

   servers$ =  <Observable<CustomResponse>> this.http.get<CustomResponse>(`${this.apiUrl}/server/list`)
   .pipe(
    tap(console.log),
    catchError(this.handleError)
   );

   save$ =  (server: Server ) => <Observable<CustomResponse>> this.http.post<CustomResponse>(`${this.apiUrl}/server/save`, server)
   .pipe(
    tap(console.log),
    catchError(this.handleError)
   );

   ping$ =  (ipAddress: string ) => <Observable<CustomResponse>> this.http.get<CustomResponse>(`${this.apiUrl}/server/ping/${ipAddress}`)
   .pipe(
    tap(console.log),
    catchError(this.handleError)
   );

   filter$ = (status: Status, response: CustomResponse) => <Observable<CustomResponse>>
   new Observable<CustomResponse>(
    Subscriber => {
      console.log(response);
      Subscriber.next(
        status = Status.ALL ? {...response, message: `Servers filterd by ${status} status`} :
        {
          ...response,
          message: 
        }
      )
    }
   )

   delete$ =  (serverId: number) => <Observable<CustomResponse>> this.http.delete<CustomResponse>(`${this.apiUrl}/server/delete/${serverId}`)
   .pipe(
    tap(console.log),
    catchError(this.handleError)
   );

    private handleError(error: HttpErrorResponse): Observable<never> {
      console.log(error)
      return throwError (`An error occurred - Error code: ${error.status}`);
    }
}
