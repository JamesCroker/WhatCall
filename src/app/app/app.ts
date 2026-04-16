import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu";

@Component({
  selector: 'app-root',
  imports: [MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  constructor(
  ) { 
    // Empty constructor for dependency injection
  }
  
}
