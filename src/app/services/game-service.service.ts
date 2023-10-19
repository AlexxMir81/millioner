import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {
  isStarted: boolean = false;


  private statusGame = new BehaviorSubject(this.isStarted);
  private messageSource = new BehaviorSubject("Добро пожаловать в игру \"Кто хочеть стать миллионером\"!");
  currentStatus = this.statusGame.asObservable();
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  statusGameChange(isStarted: boolean){
    this.statusGame.next(isStarted);
  }
  getMessage(message: string){
    this.messageSource.next(message);
  }
}
