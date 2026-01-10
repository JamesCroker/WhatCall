import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Videos } from './videos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('whatcall');

  public videos : any[] = [];

  constructor(
    private videoService: Videos,
    private changeDetector: ChangeDetectorRef
  ) {
    videoService.getVideos().then(videos => {
      this.videos = videos;
      console.log(this.videos);
      this.changeDetector.detectChanges();
    });
  }

}
