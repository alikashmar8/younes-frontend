import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewFileModal } from 'src/app/modals/add-new-file-modal/add-new-file-modal.component';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryItemsService } from 'src/app/services/gallery-items.service';
import { GalleryItem } from 'src/models/gallery-item.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  galleryItems: GalleryItem[] = [];
  isLoading: boolean = false;
  search: string = '';
  parent_id = null;
  parentIdsHistory = [];
  constructor(
    private authService: AuthService,
    private galleryItemsService: GalleryItemsService,
    private alertService: AlertService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      this.currentUser = this.authService.currentUser;
      this.galleryItems = await this.galleryItemsService.getGalleryItems(
        this.parent_id
      );
      console.log(this.galleryItems);

      this.isLoading = false;
    } catch (e) {
      console.log(e);
      alert('An error occurred while loading data');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  addProduct() {
    const modalRef = this.modalService.open(AddNewFileModal, {
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.parent_id = this.parent_id;
    modalRef.result.then(
      (result) => {
        if (result) {
        }
      },
      (rejected) => {}
    );
  }

  openDeleteConfirmation(id) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message =
      'Are you sure you want to delete this item?';
    modalRef.result.then(
      (result) => {
        if (result) {
          this.galleryItemsService.deleteGalleryItem(id).subscribe(
            (result: any) => {
              if (result.affected > 0) {
                this.alertService.toastSuccess('Item deleted successfully');
                window.location.reload();
              } else {
                this.alertService.toastError('Error deleting company');
              }
            },
            (error) => {
              this.authService.handleHttpError(error);
            }
          );
        }
      },
      (rejected) => {}
    );
  }

  folderClicked(folder_id) {
    this.parentIdsHistory.push(this.parent_id);
    this.parent_id = folder_id;
    this.galleryItems = [];
    this.ngOnInit();
  }

  goBack() {
    this.parent_id = this.parentIdsHistory.pop();
    this.galleryItems = [];
    this.ngOnInit();
  }
}
