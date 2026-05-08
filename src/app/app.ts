import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav],
  template: `
    <app-nav />
    <router-outlet />
    <footer class="border-t border-zinc-800/60 bg-zinc-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center">
        <p class="text-zinc-500 text-xs italic tracking-wide flex items-center gap-2">
          <span aria-hidden="true" class="inline-block w-1 h-1 rounded-full bg-violet-500"></span>
          curated by a human, not an algorithm
          <span aria-hidden="true" class="inline-block w-1 h-1 rounded-full bg-pink-500"></span>
        </p>
      </div>
    </footer>
  `,
})
export class App {}
