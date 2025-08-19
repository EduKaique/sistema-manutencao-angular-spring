import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
