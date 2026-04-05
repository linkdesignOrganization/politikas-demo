import { Component } from '@angular/core';
import { NordicNavComponent } from '../../components/nordic-nav/nordic-nav';
import { HomePageComponent } from '../home-page/home-page';

@Component({
  selector: 'app-home-shell-page',
  imports: [NordicNavComponent, HomePageComponent],
  templateUrl: './home-shell-page.html'
})
export class HomeShellPageComponent {}
