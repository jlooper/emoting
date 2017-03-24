import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Photo } from './photo.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  photos: FirebaseListObservable<any[]>;
  votingRecord;

  constructor(af: AngularFire) {
    this.loadVotingRecord();

    this.photos = af.database.list('/Photos',{
      query:{
        orderByChild: "date"
      }
    });
  }

  vote(index, photo: Photo) {
    this.votingRecord[photo.$key] = index;
    localStorage.setItem("votingRecord", JSON.stringify(this.votingRecord));
    console.log(this.votingRecord);

    var updateObject = (index === 1) ? { emoji1: photo.emoji1++ } :
      (index === 2) ? { emoji2: photo.emoji2++ } :
      (index === 3) ? { emoji3: photo.emoji3++ } :
      (index === 4) ? { emoji4: photo.emoji4++ } :
      (index === 5) ? { emoji5: photo.emoji5++ } : {};

    this.photos.update(photo.$key, updateObject);
  }

  private loadVotingRecord() {
    this.votingRecord = localStorage.getItem("votingRecord");
    if (this.votingRecord) {
      this.votingRecord = JSON.parse(this.votingRecord);
    } else {
      this.votingRecord = {};
    }
  }
}
