import { Injectable, NgZone } from "@angular/core";
import { Photo } from "../models/photo.model";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import { UtilsService } from './utils.service';

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
    private utils: UtilsService
  ) { }

  photos: BehaviorSubject<Array<Photo>> = new BehaviorSubject([]);

  private _allPhotos: Array<Photo> = [];

  uploadFile(localPath: string, file?: any): Promise<any> {
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

  getDownloadUrl(remoteFilePath: string): Promise<any> {
    return firebase.getDownloadUrl({
      remoteFullPath: remoteFilePath
    })
      .then(
      function (url: string) {
        return url;
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }

  createPhoto(downloadPath: string) {
    return firebase.push(
      "/Photos",
      { "path": downloadPath, "date": 0 - Date.now() }
    ).then(
      function (result: any) {
        return 'Photo added!';
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }

  vote1(id: string) {
    this.publishUpdates();
    return firebase.update("/Photos/" + id + "", {
      emoji1: 1
    })
      .then(
      function (result: any) {
        return 'You have successfully voted!';
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }
  vote2(id: string) {
    this.publishUpdates();
    return firebase.update("/Photos/" + id + "", {
      emoji2: 1
    })
      .then(
      function (result: any) {
        return 'You have successfully voted!';
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }

  vote3(id: string) {
    this.publishUpdates();
    return firebase.update("/Photos/" + id + "", {
      emoji3: 1
    })
      .then(
      function (result: any) {
        return 'You have successfully voted!';
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }

  vote4(id: string) {
    this.publishUpdates();
    return firebase.update("/Photos/" + id + "", {
      emoji4: 1
    })
      .then(
      function (result: any) {
        return 'You have successfully voted!';
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }

  vote5(id: string) {
    this.publishUpdates();
    return firebase.update("/Photos/" + id + "", {
      emoji5: 1
    })
      .then(
      function (result: any) {
        return 'You have successfully voted!';
      },
      function (errorMessage: any) {
        console.log(errorMessage);
      });
  }

  getPhotos(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'Photos';

      let onValueEvent = (snapshot: any) => {
        this.ngZone.run(() => {
          let results = this.handleSnapshot(snapshot.value);
          console.log(JSON.stringify(results))
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