import { Injectable, NgZone, Inject } from "@angular/core";
import { Photo } from "../models/photo.model";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import { UtilsService } from './utils.service';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import {TNSFancyAlert,TNSFancyAlertButton} from 'nativescript-fancyalert';

@Injectable()
export class FirebaseService {



  constructor(
    private ngZone: NgZone,
    private utils: UtilsService
  ) {}

  photos: BehaviorSubject<Array<Photo>> = new BehaviorSubject([]);
  loader = new LoadingIndicator();
  private _allPhotos: Array<Photo> = [];

  public uploadFile(localPath: string, file?: any): Promise<any> {
    this.loader.show({message:"Uploading..."});
    let filename = this.utils.getFilename(localPath);
    let remotePath = `${filename}`;
    return firebase.uploadFile({
      remoteFullPath: remotePath,
      localFullPath: localPath,
      onProgress: function (status) {
        console.log("Uploaded fraction: " + status.fractionCompleted);
        console.log("Percentage complete: " + status.percentageCompleted);
      }
    });
  }

  public getDownloadUrl(remoteFilePath: string): Promise<any> {
    return firebase.getDownloadUrl({
      remoteFullPath: remoteFilePath
    })
      .then(
      function (url: string) {
        return url;
      },
      function (errorMessage: any) {
        return errorMessage;
      });
  }

  createPhoto(downloadPath: string) {
    return firebase.push(
      "/Photos",
      { "path": downloadPath, "date": 0 - Date.now(), "emoji1":0, "emoji2":0, "emoji3":0, "emoji4":0, "emoji5":0}
    ).then(
      function (result: any) {
        return 'Photo added!';
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }

  vote(emoji:number,photo:Photo) {
    //which emoji do we upate?
    this.publishUpdates();
    switch (emoji) 
    
    { 
    case 1: 
    return firebase.update("/Photos/" + photo.id + "", {
      emoji1: photo.emoji1+1
    })
    case 2: 
    return firebase.update("/Photos/" + photo.id + "", {
      emoji2: photo.emoji2+1
    })
    case 3: 
    return firebase.update("/Photos/" + photo.id + "", {
      emoji3: photo.emoji3+1
    }) 
    case 4: 
    return firebase.update("/Photos/" + photo.id + "", {
      emoji4: photo.emoji4+1
    }) 
    case 5: 
    return firebase.update("/Photos/" + photo.id + "", {
      emoji5: photo.emoji5+1
    })    
     .then(
      function (result: any) {
        //nothing is returned
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
   }
  }

  getPhotos(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Photos';

      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          let results = this.handleSnapshot(snapshot.value);
          observer.next(results);
        });
      };
      firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();
  }
  
  handleSnapshot(data: any) {
    this._allPhotos = [];
    if (data) {
      for (let id in data) {
        let result = (<any>Object).assign({ id: id }, data[id]);
        this._allPhotos.push(result);
      }
      this.publishUpdates();
    }
    return this._allPhotos;
  }


  publishUpdates() {
    this._allPhotos.sort(function (a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    })
    this.photos.next([...this._allPhotos]);
  }

}