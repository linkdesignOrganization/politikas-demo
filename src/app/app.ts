import { Component } from '@angular/core';
import { HomePageComponent } from './pages/home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [HomePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
