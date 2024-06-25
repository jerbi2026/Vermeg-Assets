import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteServiceService {

  constructor() { }
  private previousRoutes: string[] = [];
  addPreviousRoute(route: string): void {
    this.previousRoutes.push(route);
  }

  getPreviousRoutes(): string[] {
    return this.previousRoutes;
  }
}
