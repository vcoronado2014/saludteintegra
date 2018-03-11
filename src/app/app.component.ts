import { Component, Inject } from '@angular/core';
import * as moment from 'moment';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Inject('Window')
export class AppComponent {
  title = 'app';
}
