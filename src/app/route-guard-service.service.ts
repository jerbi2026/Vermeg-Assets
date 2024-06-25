import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PreviousRouteServiceService } from './previous-route-service.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor(private previousRouteService: PreviousRouteServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const previousRoutes = this.previousRouteService.getPreviousRoutes();
    const currentRoute = state.url;
    let ok=false

    // Vérifie si l'utilisateur a visité la route précédente correspondante
    if (currentRoute === '/sign_in/forget_pass') {
      if (previousRoutes.includes('/sign_in')) {
        this.router.navigate(['/sign_in/forget_pass']);
        ok= false;
      } else {
        // Redirige vers la page précédente si l'utilisateur n'a pas accédé à la route précédente
        this.router.navigate(['/sign_in']);
        ok= true;
      }
    }

    // Par défaut, ajoutez l'itinéraire actuel à la liste des routes visitées
    this.previousRouteService.addPreviousRoute(currentRoute);
    return ok;
  }
  
}