import { Component, OnInit, Output } from '@angular/core';
import { GameServiceService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit{
isStarted: boolean = false;
message: string = "";
constructor(public gameService: GameServiceService){}

  ngOnInit(): void {
    this.gameService.currentStatus.subscribe(status => this.isStarted = status);
    this.gameService.currentMessage.subscribe(message => this.message = message);
  }
   
start(){
  this.gameService.statusGameChange(true);

   }
  // stop(){
  //   this.isStarted = false;
  // }
}
