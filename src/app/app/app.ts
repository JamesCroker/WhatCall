import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatMenuModule, MatIconModule, RouterLinkWithHref, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
