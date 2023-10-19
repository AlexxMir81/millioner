import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartGameComponent } from './components/start-game/start-game.component';
import { QuestionsComponent } from './components/questions/questions.component';


const routes: Routes = [
  {path: "", component:StartGameComponent},
  {path: "startgame", component:StartGameComponent},
  {path: "questions", component:QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
