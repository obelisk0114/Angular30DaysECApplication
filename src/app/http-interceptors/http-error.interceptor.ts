import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen, delay, map } from 'rxjs/operators';

/** Use to handle all http error. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  delayTime = 3000;
  maxRetry = 5;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      
      retryWhen(error => {
        let retries = 0;
        return error.pipe(delay(this.delayTime), map(err => {
          if (retries++ === this.maxRetry) {
            throw err;
          }
          //console.log(`retry : ${retries} , ` + new Date().toTimeString());
          return err;
        }))
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
      // console.error('An error occurred:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}\nerror message is: ${err.message}`;
    }

    window.alert(errorMessage);
    //console.error(errorMessage + " ; " + new Date().toTimeString());

    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }
}