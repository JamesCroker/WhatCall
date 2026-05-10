import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";
import 'videojs-youtube'

/**
 * Component plays a video.
 *
 * The source can be either mp4 or from YouTube.
 */
@Component({
  standalone: true,
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrls: [
    './video-player.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})

export class VideoPlayerComponent implements OnInit, OnDestroy {

  /**
   * HTML Element reference to Video tag
   */
  @ViewChild('target', { static: true }) target!: ElementRef;

  /**
   * Access the videojs player object.
   *
   * @returns {Player} videojs player object
   * @throws {Error} If the player is not yet initialized.
   */
  private get player(): Player {
    const player = videojs(this.target.nativeElement);
    if (!player) {
      throw new Error('VideoPlayer: player not initialized yet');
    }
    return player
  }

  /**
   * Sets the source URL for the video, and commences playing
   *
   * If set to undefined or null, will stop the video player and clear the source.
   */
  @Input()
  set source(s: string | undefined | null) {
    if (s) {
      if (s.includes('youtube')) {
        this.player.src({ src: s, type: 'video/youtube' });
        this.player.src({ src: s, type: 'video/youtube' });
      } else {
        this.player.src({ src: s, type: 'video/mp4' });
      } this.player.play();
      this.player.autoplay('muted');
    } else {
      this.player.pause();
      this.player.src({ src: '', type: '' });
    }
    this.changeDetectorRef.detectChanges();
  }
  get source(): string | undefined {
    if (this.player) {
      return this.player.currentSrc();
    }
    return undefined;
  }

  constructor(
    /** Injected ChangeDetectorRef service */
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // Empty constructor
  }

  /**
   *  ngOnInit event. Logs when the video player is ready.
   */
  ngOnInit() {
    videojs(this.target.nativeElement, { "techOrder": ["youtube"], "youtube": { "ytControls": 2 }, fluid: true })
      .ready(() => {
        console.log('VideoPlayer: player is ready');
      });
  }

  /**
   * Dispose the player OnDestroy
   */
  ngOnDestroy() {
    this.player.dispose();
  }
}
