import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { loadingGifUrl } from 'src/constants/constants';
import { UserRole } from 'src/enums/user-role.enum';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isLoginLoading: boolean = false;
  loadingGif: string = loadingGifUrl;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  login() {
    this.isLoginLoading = true;
    if (!this.email) {
      this.alertService.toastNotification(
        'Email should not be empty',
        DialogLayoutDisplay.DANGER
      );
      this.isLoginLoading = false;
      return;
    }
    if (!this.password) {
      this.alertService.toastNotification(
        'Password should not be empty',
        DialogLayoutDisplay.DANGER
      );
      this.isLoginLoading = false;
      return;
    }

    this.authService
      .loginByEmail({
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (user) => {
          if (user.role == UserRole.ADMIN) {
            //is admin => redirect to super admin homepage
            this.router.navigate(['']).then(() => {
              window.location.reload();
              this.isLoginLoading = false;
            });
          } else {
            // else not admin
            // not supported yet
            this.authService.logout();
            this.alertService.toastNotification(
              'Login not supported yet',
              DialogLayoutDisplay.DANGER
            );
          }
        },
        (err) => {
          this.authService.handleHttpError(err);
          this.isLoginLoading = false;
        }
      );
  }
}
