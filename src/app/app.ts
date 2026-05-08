import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  template: `
    <app-nav />
    <router-outlet />
  `,
})
export class App {}
