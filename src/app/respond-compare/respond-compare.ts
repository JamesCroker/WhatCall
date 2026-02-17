import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-respond-compare',
  imports: [],
  templateUrl: './respond-compare.html',
  styleUrl: './respond-compare.scss',
})
export class RespondCompareComponent {

  @Input() userResponse: string = '';

  @Input() visible: boolean = true;
  
}
