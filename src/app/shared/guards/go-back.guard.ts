import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';

// Currently not used, delete?
@Injectable({
  providedIn: 'root'
})
export class GoBackGuard implements CanDeactivate<boolean> {
  canDeactivate(
    component: boolean,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
    return confirm('You have unsaved data. Continue?');
  }
}
