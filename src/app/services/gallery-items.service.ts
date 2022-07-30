import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { galleryItemsEndpoint } from 'src/constants/api-constants';
import { getFormDataHeaders, getHeaders } from 'src/utils/functions';

@Injectable({
  providedIn: 'root',
})
export class GalleryItemsService {
  async getAllFolders(): Promise<any> {
    return await this.http
      .get(galleryItemsEndpoint + 'folders', {
        headers: getHeaders(),
      })
      .toPromise();
  }
  constructor(private http: HttpClient) {}

  async getGalleryItems(parent_id?: string): Promise<any> {
    let params = '';
    if (parent_id) {
      params = '?parent_id=' + parent_id;
    } else {
      params = '?parent_id=';
    }

    return await this.http
      .get(galleryItemsEndpoint + params, { headers: getHeaders() })
      .toPromise();
  }

  async getAllFiles(): Promise<any> {
    return await this.http
      .get(galleryItemsEndpoint + 'files', {
        headers: getHeaders(),
      })
      .toPromise();
  }

  getGalleryItem(id: number) {
    return this.http.get(galleryItemsEndpoint + id);
  }

  createGalleryItem(galleryItem: any) {
    return this.http.post(galleryItemsEndpoint, galleryItem);
  }

  updateGalleryItem(id: number, galleryItem: any) {
    return this.http.put(galleryItemsEndpoint + id, galleryItem);
  }

  deleteGalleryItem(id: number) {
    return this.http.delete(galleryItemsEndpoint + id, {
      headers: getHeaders(),
    });
  }

  storeFile(data: FormData) {
    return this.http.post(galleryItemsEndpoint + 'files', data, {
      headers: getFormDataHeaders(),
    });
  }
}
