import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";
import 'videojs-youtube'

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
  @ViewChild('target', { static: true }) target!: ElementRef;

  private get player(): Player {
    const player = videojs(this.target.nativeElement);
    if (!player) {
      throw new Error('VideoPlayer: player not initialized yet');
    }
    return player
  }

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
  }
  get source(): string | undefined {
    if (this.player) {
      return this.player.currentSrc();
    }
    return undefined;
  }

  // Instantiate a Video.js player OnInit
  ngOnInit() {
    videojs(this.target.nativeElement, { "techOrder": ["youtube"], "youtube": { "ytControls": 2 }, fluid: true })
      .ready(() => {
        console.log('VideoPlayer: player is ready');
      });
  }

  // Dispose the player OnDestroy
  ngOnDestroy() {
    this.player.dispose();
  }
}