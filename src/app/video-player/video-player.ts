import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";
import 'videojs-youtube'

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrls: [
    './video-player.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})

export class VideoPlayer implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target!: ElementRef;

  private get player(): Player {
    const player = videojs(this.target.nativeElement);
    if (!player) {
      throw new Error('VideoPlayer: player not initialized yet');
    }
    return player
  }

  // See options: https://videojs.com/guides/options
  @Input()
  set source(s: string | undefined | null) {
      if (s) {
        this.player!.src({ src: s, type: 'video/youtube' });
        this.player!.load();
        this.player!.play();
      } else {
        this.player!.pause();
        this.player!.src({ src: '', type: '' });
      }
  }
  get source(): string | undefined {
    if (this.player) {
      return this.player.currentSrc();
    }
    return undefined;
  }

  constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {
    // Constructor logic if needed
  }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    videojs(this.target.nativeElement, { "techOrder": ["youtube"], "youtube": { "ytControls": 2 }, fluid: true })
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}