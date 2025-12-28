import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {



  const _NgxSpinnerService = inject(NgxSpinnerService) ;


// show loading here for request 
  _NgxSpinnerService.show() ;

  return next(req).pipe( finalize ( ()=>{

    //  hide loading screen to response get
    _NgxSpinnerService.hide() ;
  }))
};
