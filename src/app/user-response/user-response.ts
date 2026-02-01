import { Component, EventEmitter, Input, Output } from '@angular/core';



/**
 * Component to display user response options.
 * @category Components
 */
@Component({
  selector: 'app-user-response',
  imports: [],
  templateUrl: './user-response.html',
  styleUrl: './user-response.scss',
})
export class UserResponse {

  /**
   * Type of response options to display.
   * @default ResponseType.full
   */
  @Input() options?: string[] = [];

  @Input() visible: boolean = true;

  /**
   * Event emitted when a response option is selected.
   * @type {EventEmitter<string>}
   * @memberof UserResponse
   * @example
   * this.selection.subscribe((response: string) => {
   *   console.log('User selected response:', response);
   * });
   */
  @Output() selection: EventEmitter<string> = new EventEmitter();


  sendResponse(t: string): void {
    this.selection.emit(t);
  }

}
