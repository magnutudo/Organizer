import { Component } from '@angular/core';
import {DateService} from "../shared/date.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {
  constructor(public dateService:DateService) {
  }

  go(number: number) {
    this.dateService.changeMonth(number)

  }
}
