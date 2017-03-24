import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  photos: FirebaseListObservable<any[]>;
  constructor (af: AngularFire){
    this.photos = af.database.list('/Photos',{
      query:{
        orderByChild: "date"
      }
    });
  }
}

