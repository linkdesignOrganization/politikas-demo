import { Component } from '@angular/core';
import { NordicNavComponent } from './components/nordic-nav/nordic-nav';
import { HomePageComponent } from './pages/home-page/home-page';

@Component({
  selector: 'app-root',
  imports: [NordicNavComponent, HomePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
