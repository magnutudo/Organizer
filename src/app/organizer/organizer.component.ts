import {Component, OnInit} from '@angular/core';
import {DateService} from "../shared/date.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task, TasksService} from "../shared/tasks.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit{
  form:FormGroup
  constructor(public dateService:DateService,private taskService:TasksService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      title:new FormControl("",Validators.required)
    })
  }


  submit() {
    const task:Task = {
      title: this.form.value.title,
      date: this.dateService.date.value.format("DD-MM-YYYY")
    }
    this.taskService.create(task).subscribe(task =>{
      this.form.reset()

    },error => console.log(error)
    )
  }
}
