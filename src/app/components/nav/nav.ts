import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';

interface SectionLink {
  fragment: string;
  label: string;
}

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
})
export class Nav {
  private route = inject(ActivatedRoute);

  sections: SectionLink[] = [
    { fragment: 'weekly', label: 'This Week' },
    { fragment: 'throwback', label: 'Throwback' },
    { fragment: 'editors', label: "Editor's Picks" },
    { fragment: 'artists', label: 'Artists' },
  ];

  activeFragment = toSignal(this.route.fragment, { initialValue: null });
  mobileOpen = signal(false);

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
