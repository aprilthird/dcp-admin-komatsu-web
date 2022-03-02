import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "app/core/auth/auth.service";
import { AuthUtils } from "app/core/auth/auth.utils";
import { environment } from "environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private _authService: AuthService) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    if (
      this._authService.accessToken &&
      !AuthUtils.isTokenExpired(this._authService.accessToken)
    ) {
      newReq = req.clone({
        headers: req.headers.set(
          "Authorization",
          "Bearer " + this._authService.accessToken
        ),
      });
    }
    if (newReq.headers.has("Authorization")) {
      newReq = req.clone({
        headers: req.headers
          .set("Authorization", "Bearer " + this._authService.accessToken)
          .set("SO", "web")
          .set("project", environment.project),
      });
    } else {
      newReq = req.clone({
        headers: req.headers
          .set("SO", "web")
          .set("project", environment.project),
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Catch "401 Unauthorized" responses
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !location.pathname.includes("sign-in")
        ) {
          localStorage.clear();
          sessionStorage.clear();
          location.reload();
          // Sign out
          this._authService.signOut().subscribe(() => {});
        }

        return throwError(error);
      })
    );
  }
}
