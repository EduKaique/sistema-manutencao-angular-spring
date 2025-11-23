import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Tenta pegar o token do localStorage
  const token = localStorage.getItem('token'); 

  // 2. Se o token existir, CLONA a requisição e adiciona o cabeçalho
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 3. Se não tiver token, manda a original
  return next(req);
};