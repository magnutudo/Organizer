import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import * as moment from "moment"
@Injectable({
  providedIn:"root"
})
export class DateService{
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  changeMonth(num:number){
    const value = this.date.value.add(num, "month")
    this.date.next(value)

  }
}
