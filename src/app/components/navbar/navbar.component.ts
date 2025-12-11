import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  menuOpen = false;
  hideNavButtons = false;
  isServicesRoute = false;
  private lastScrollTop = 0;
  private readonly scrollThreshold = 20;
  private routerSubscription: Subscription;

  constructor(private router: Router) {
    this.updateRouteState(this.router.url);
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateRouteState(event.urlAfterRedirects));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.setBodyScroll(!this.menuOpen);
  }

  closeMenu() {
    this.menuOpen = false;
    this.setBodyScroll(true);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
    const isScrollingDown = currentScroll > this.lastScrollTop;

    if (isScrollingDown && currentScroll > this.scrollThreshold) {
      this.hideNavButtons = true;
    } else {
      this.hideNavButtons = false;
    }

    this.lastScrollTop = Math.max(currentScroll, 0);
  }

  ngOnDestroy() {
    this.setBodyScroll(true);
    this.routerSubscription.unsubscribe();
  }

  private setBodyScroll(enable: boolean) {
    document.body.style.overflow = enable ? '' : 'hidden';
  }

  private updateRouteState(url: string) {
    this.isServicesRoute = url.includes('/services');
  }
}
