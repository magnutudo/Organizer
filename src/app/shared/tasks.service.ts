import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
export interface Task {
  title:string
  id?:string
  date?:string
}
interface CreateResp {
  name:string
}
@Injectable({providedIn:"root"})
export class TasksService {
  static url = 'https://meow-c9adb-default-rtdb.firebaseio.com/tasks'
  constructor(private http:HttpClient) {
  }
  create(task:Task):Observable<Task>{
    return this.http.post<CreateResp>(`${TasksService.url}/${task.date}.json`,task).
    pipe(map(res => {
      console.log("resp",res)
      return {
        ...task,
        id:res.name
      }
    }))
  }
}
