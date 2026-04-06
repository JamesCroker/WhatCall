import { Injectable } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class UploadModalService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  /**
   * Launches the upload modal.
   * Handles a lazy load of the UploadCompoent
   */
  async launch() {
    const UploadComponent = await import('./upload').then(m => m.UploadComponent)
    console.log('Launching upload modal');
    return this.dialog.open(UploadComponent, {
      height: '400px',
      width: '600px',
    });
  }

}