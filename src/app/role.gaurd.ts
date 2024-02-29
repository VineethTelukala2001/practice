// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const expectedRole = route.data.expectedRole;
//     const userRole = localStorage.getItem('userRole'); // Retrieve user role from local storage

//     if (userRole !== expectedRole) {
//       // Redirect to unauthorized page or another suitable route
//       this.router.navigate(['/unauthorized']);
//       return false;
//     }
//     return true;
//   }
// }
