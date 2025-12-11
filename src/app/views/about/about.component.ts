import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  display: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('statsSection') statsSection?: ElementRef<HTMLElement>;

  stats: Stat[] = [
    { label: 'projets réalisés', value: 20, prefix: '+', display: 0 },
    { label: 'experts dédiés', value: 2, display: 0 },
    { label: 'solutions sur mesure', value: 100, suffix: '%', display: 0 }
  ];

  private observer?: IntersectionObserver;
  private animationStarted = false;

  ngAfterViewInit(): void {
    if (!this.statsSection) {
      this.startCounting();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        this.startCounting();
        this.observer?.disconnect();
      }
    }, { threshold: 0.3 });

    this.observer.observe(this.statsSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private startCounting(): void {
    if (this.animationStarted) {
      return;
    }

    this.animationStarted = true;
    this.stats.forEach((stat) => this.animateStat(stat));
  }

  private animateStat(stat: Stat): void {
    const duration = 1500;
    const startValue = 0;
    const endValue = stat.value;
    let startTime: number | null = null;

    const step = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const linearProgress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
      stat.display = Math.round(startValue + (endValue - startValue) * easedProgress);

      if (linearProgress < 1) {
        requestAnimationFrame(step);
      } else {
        stat.display = endValue;
      }
    };

    requestAnimationFrame(step);
  }
}
