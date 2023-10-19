import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Question } from 'src/app/models/question';
import { GameServiceService } from 'src/app/services/game-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnChanges{
  isStarted: boolean = false;
  toContinue: boolean = false;
  winning: number = 0;
  message: string = "";
  accept: boolean = false;

  classes : any = {
    "red-border":this.accept,
     "green-border":this.accept
  };

  questionNumber:number = 0;
  question?: string;
  answer1?: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  
  questions: Array<Question> = [
    {question: "Это первый вопрос викторины", rightAnswer :2, answers: ["Неправильный ответ1", "Правильный ответ","Неправильный ответ1", "Неправильный ответ3"]},
    {question: "Это второй вопрос викторины", rightAnswer :1, answers: ["Правильный ответ", "ответ1 неправильный","ответ2 неправильный", "ответ3 неправильный"]},
    {question: "Это третий вопрос викторины", rightAnswer :3, answers: ["ответ1 неправильный", "ответ1 неправильный","Правильный ответ", "ответ3 неправильный"]},
    {question: "Это четвертый вопрос викторины", rightAnswer :4, answers: ["ответ1 неправильный", "ответ1 неправильный","ответ2 неправильный", "Правильный ответ"]},
    {question: "Это пятый вопрос викторины", rightAnswer :1, answers: ["Правильный ответ", "ответ1 неправильный","ответ2 неправильный", "ответ3 неправильный"]},
  ];

  constructor(readonly gameService: GameServiceService, private router: Router){}

  ngOnChanges(changes: SimpleChanges): void {
    //this.isStarted = this.gameService.isStarted;
  }

  ngOnInit(): void {
    this.gameService.currentStatus.subscribe(status => this.isStarted = status);
    this.initQuestion(0);
    
  }
  initQuestion(questionNumber: number){
    this.question = this.questions[questionNumber].question;
    this.answer1 = this.questions[questionNumber].answers[0];
    this.answer2 = this.questions[questionNumber].answers[1];
    this.answer3 = this.questions[questionNumber].answers[2];
    this.answer4 = this.questions[questionNumber].answers[3];
  }
  answer(variant: number): void{
    document.getElementById(variant.toString())?.classList.remove("start-border");
    document.getElementById(variant.toString())?.classList.add("red-border");
    
    setTimeout(() => {
      if(variant == this.questions[this.questionNumber].rightAnswer){
        document.getElementById(variant.toString())?.classList.remove("red-border");
        document.getElementById(variant.toString())?.classList.add("green-border");
        setTimeout(() => {
          this.winning+=100;
          if(this.questionNumber+1<this.questions.length){
              this.askContinue();
            }else{
              this.endGame("Поздравляем, Ваш выигрыш составил "+this.winning);
            }
            document.getElementById(variant.toString())?.classList.add("green-border");
          }, 2000);
          }else{
            this.endGame("Вы проиграли!");
        }
      }, 2000);

  }
  askContinue(){
    this.message = "Это правильный ответ!\nВы хотите продолжить игру? Ваш текущий выигрыш составляет "+this.winning;
    this.toContinue = !this.toContinue;
  }
  continueGame(){
    this.toContinue = !this.toContinue;
    ++this.questionNumber;
    this.initQuestion(this.questionNumber);
  }
  endGame(message: string){
     this.gameService.statusGameChange(false);
     this.gameService.getMessage(message);
     this.router.navigate(['']);
  }
  reject(){
    this.endGame("Вы отказались от продолжения игры, но Ваш выигрыш составил "+this.winning);
  }
}
