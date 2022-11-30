import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('outgoing');
    const modifiedRequest = req.clone({
      headers: req.headers.append('username', 'judea')
    })
    return next.handle(modifiedRequest);
  }

}
