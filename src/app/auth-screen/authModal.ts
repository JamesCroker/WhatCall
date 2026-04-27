import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
    MatDialog
} from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class AuthModalService {

    constructor(
        private dialog: MatDialog,
        private auth: Auth
    ) {
    }

    /**
     * Launches the upload modal.
     * Handles a lazy load of the AuthScreenComponent
     */
    async launch(): Promise<void> {
        if (!this.auth.currentUser) {
            console.log('Launching auth modal');
            const AuthModalComponent = await import('./auth-screen').then(m => m.AuthScreenComponent)
            const dialog = this.dialog.open(AuthModalComponent, {});

            return new Promise<void>((resolve) => {
                dialog.afterClosed().subscribe({
                    complete: () => {
                        resolve();
                    }
                })
            });
        }
        console.log('User is already authenticated, no need to launch auth modal');
    }

}