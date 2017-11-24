import { Injectable}                    from '@angular/core';
import { HttpEvent, HttpInterceptor, 
        HttpHandler, HttpRequest }      from '@angular/common/http';
import { Observable }                   from 'rxjs/Observable';

import { environment }                  from '../../environments/environment';

@Injectable()
export class WeatherAPIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const changedReq = req.clone({params: req.params.set('appid', environment.weatherAPI.apiKey)});
        return next.handle(changedReq);
    }
}
