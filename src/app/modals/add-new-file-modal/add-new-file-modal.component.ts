import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { GalleryItemsService } from 'src/app/services/gallery-items.service';

@Component({
  selector: 'app-add-new-file-modal',
  templateUrl: './add-new-file-modal.component.html',
  styleUrls: ['./add-new-file-modal.component.css'],
})
export class AddNewFileModal implements OnInit {
  // get parent_id from modal ref
  parent_id: string;
  data: {
    name: string;
    description?: string;
    image: any;
    price: number;
    quantity: number;
    parent_id: string;
  };
  isStoreLoading: boolean = false;

  folders = [];
  constructor(
    public activeModal: NgbActiveModal,
    private galleryItemsService: GalleryItemsService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.data = {
      name: '',
      description: '',
      image: null,
      price: 0,
      quantity: 1,
      parent_id: this.parent_id,
    };
  }

  uploadImage(event: any) {
    this.data.image = event.target.files[0];
    console.log(this.data.image);
  }

  submitData() {
    // console.log(this.data);

    let data = new FormData();
    data.append('name', this.data.name);
    data.append('description', this.data.description);
    data.append('quantity', this.data.quantity.toString());
    data.append('price', this.data.price.toString());
    data.append('image', this.data.image, this.data.image.name);
    if (this.data.parent_id) data.append('parent_id', this.data.parent_id);

    console.log(data);
    this.galleryItemsService.storeFile(data).subscribe(
      (res) => {
        this.isStoreLoading = false;
        console.log(res);
        this.alertService.success('Product Created Successfully');
        this.data.name = '';
        this.data.description = '';
        this.data.image = null;
        this.data.price = 0;
        this.data.quantity = 1;
        this.data.parent_id = null;
        this.activeModal.close();
        window.location.reload();
      },
      (err) => {
        this.isStoreLoading = false;
        this.authService.handleHttpError(err);
        console.log(err);
        // this.alertService.error(err.error.message);
      }
    );
  }
}
