import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {



   const _ToastrService = inject(ToastrService) ;

  return next(req).pipe( catchError( (err)=>{


    // catch error here and add to alert to see user to website
    _ToastrService.error(err.error.message , "EmployeeSystem")
    // return error because catch to return only
    return throwError ( ()=> err)
  }))
};
