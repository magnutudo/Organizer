import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as moment from "moment";

export interface Task {
  title: string
  id?: string
  date?: string
}

interface CreateResp {
  name: string
}

@Injectable({providedIn: "root"})
export class TasksService {
  static url = 'https://angie-6f315-default-rtdb.firebaseio.com/tasks'

  constructor(private http: HttpClient) {
  }

  create(task: Task): Observable<Task> {
    return this.http.post<CreateResp>(`${TasksService.url}/${task.date}.json`, task).pipe(map(res => {
        const createdTask = {
          ...task,
          id: res.name
        };
        this.setToken(createdTask);
        return createdTask;
      })
    );
  }
  setToken(task: Task): void {
    if(task){
      localStorage.setItem("token-task", task.title)
    }
    else{
      localStorage.clear()
    }

  }

  load(date: moment.Moment): Observable<Task[]> {
    return this.http.get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }
        return Object.keys(tasks).map(key => ({
          ...tasks[key],
          id: key
        }))
      }))
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}
