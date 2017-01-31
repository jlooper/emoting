import {Injectable, NgZone} from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {UtilsService} from './utils.service';

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
    private utils: UtilsService
  ){}

 uploadFile(localPath: string, file?: any): Promise<any> {
      let filename = this.utils.getFilename(localPath);
      let remotePath = `${filename}`;   
      return firebase.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath,
        onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
        }
      });
  }

  getDownloadUrl(remoteFilePath: string): Promise<any> {
      return firebase.getDownloadUrl({
        remoteFullPath: remoteFilePath})
      .then(
        function (url:string) {
          return url;
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });
   }

   createPhoto(downloadPath:string) {
     return firebase.push(
        "/Photos",
        { "path": downloadPath, "date": 0 - Date.now()}
      ).then(
        function (result:any) {
          return 'Photo added!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
   }
}