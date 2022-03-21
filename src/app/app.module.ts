import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WordsGridComponent } from './words-grid/words-grid.component';
import { AlertComponent } from './alert/alert.component';
import { LetterTileComponent } from './letter-tile/letter-tile.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { WordleComponent } from './wordle/wordle.component';

@NgModule({
  declarations: [
    AppComponent,
    WordsGridComponent,
    AlertComponent,
    LetterTileComponent,
    KeyboardComponent,
    WordleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
