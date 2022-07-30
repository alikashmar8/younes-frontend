import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() message: string;
  currentUser;
  collector_id = null;
  employees: User[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  submit() {
    this.activeModal.close(true);
  }
}
