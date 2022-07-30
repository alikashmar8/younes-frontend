import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryItem } from 'src/models/gallery-item.model';
import { User } from 'src/models/user.model';
import { AuthService } from './services/auth.service';
import { GalleryItemsService } from './services/gallery-items.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}
