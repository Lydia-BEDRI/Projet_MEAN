// import {Injectable} from '@angular/core';
// import {
//     HttpRequest,
//     HttpHandler,
//     HttpEvent,
//     HttpInterceptor, HTTP_INTERCEPTORS
// } from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {AuthentificationService} from "../services/authentification.service";
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//     constructor(private authService: AuthentificationService) {
//     }
//
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//         const token = this.authService.getToken();
//
//         if (token) {
//             const cloned = req.clone(
//                 {
//                     setHeaders: {
//                         'Authorization': `${token}`
//                     }
//                 }
//             )
//             return next.handle(cloned);
//         }
//         return next.handle(req);
//     }
//
// }
//
// export const AuthInterceptorProvider = {
//     provide: HTTP_INTERCEPTORS,
//     useClass: AuthInterceptor,
//     multi: true
// }
