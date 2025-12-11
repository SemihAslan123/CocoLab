import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterLink],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.revealOnScroll();
    window.addEventListener('scroll', this.revealOnScroll);
  }

  revealOnScroll(): void {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }
}
