import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmotingCardComponent } from './emoting-card/emoting-card.component';
import { ResultChartComponent } from './result-chart/result-chart.component';
import { EmojiVotesComponent } from './emoji-votes/emoji-votes.component';

@NgModule({
  declarations: [
    AppComponent,
    EmotingCardComponent,
    ResultChartComponent,
    EmojiVotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
