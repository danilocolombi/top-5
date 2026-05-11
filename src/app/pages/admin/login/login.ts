import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class AdminLogin {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = signal<string | null>(null);
  loading = signal(false);

  async submit(): Promise<void> {
    this.error.set(null);
    this.loading.set(true);
    const { error } = await this.auth.signIn(this.email, this.password);
    this.loading.set(false);
    if (error) {
      this.error.set(error);
      return;
    }
    this.router.navigateByUrl('/admin');
  }
}
