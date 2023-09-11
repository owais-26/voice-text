import { Component, NgZone } from '@angular/core';

import { SpeechRecognitionService } from './speech-recognition-service.service';

import { ɵafterNextNavigation } from '@angular/router';



@Component({

  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']

})

export class AppComponent {

  title = 'Frontend';



  spokenText: string = '';

  listening: boolean = false;





  constructor(private speechRecognitionService: SpeechRecognitionService, private ngZone: NgZone) { }



  toggleListening() {

    this.listening = !this.listening;

    if (this.listening) {

      this.startListening();

    } else {

      this.stopListening();

    }

  }



  private startListening() {

    // console.log("CHECK");

    this.spokenText = '';

    this.speechRecognitionService.startListening().subscribe(

      (text: string) => {

        this.ngZone.run(() => {
          console.log(text);
          this.spokenText = text;

          this.toggleListening();

        });

      },

      (error) => {

        console.log(error);

      }



    );

  }



  private stopListening() {

    this.speechRecognitionService.stopListening();

  }



  updateText() {

    this.spokenText = "NEW TEXT";

  }

}

