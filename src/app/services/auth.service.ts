import { Injectable, signal } from '@angular/core';
import { supabase } from './supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _email = signal<string | null>(null);
  private _ready = signal(false);

  readonly email = this._email.asReadonly();
  readonly ready = this._ready.asReadonly();

  constructor() {
    if (typeof window === 'undefined') {
      this._ready.set(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      this._email.set(data.session?.user.email ?? null);
      this._ready.set(true);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      this._email.set(session?.user.email ?? null);
    });
  }

  isAuthenticated(): boolean {
    return this._email() !== null;
  }

  async signIn(email: string, password: string): Promise<{ error?: string }> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: error.message } : {};
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }
}
