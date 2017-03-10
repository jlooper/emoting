import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from "ui/page";
import { Photo } from "../models/photo.model";
import { FirebaseService, UtilsService } from "../services";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";

//plugins
import * as Toast from "nativescript-toast";
import * as camera from "nativescript-camera";
import * as fs from "file-system";

var imageModule = require("ui/image");
var img;

@Component({
    moduleId: module.id,
    selector: "e-home",
    templateUrl: "home.html"
})
export class HomeComponent implements OnInit {

    id: string;
    imagepath: string;
    image: any;
    private imagePath: string;
    private uploadedImageName: string;
    private uploadedImagePath: string;

    public photos$: Observable<any>;

    constructor(
        private firebaseService: FirebaseService,
        private utilsService: UtilsService
    ) {}

    ngOnInit() {
        camera.requestPermissions();
        this.photos$ = <any>this.firebaseService.getPhotos();

    }

    takePhoto() {
        let options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        };
        camera.takePicture(options)
            .then(imageAsset => {
                imageSource.fromAsset(imageAsset).then(res => {
                    this.image = res;
                    //save the source image to a file, then send that file path to firebase
                    this.saveToFile(this.image);
                })
            }).catch(function (err) {
                console.log("Error -> " + err.message);
            });
    }

    saveToFile(res) {
        let imgsrc = res;
        this.imagePath = this.utilsService.documentsPath(`photo-${Date.now()}.png`);
        imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png);
        //upload the file, then save all
        this.firebaseService.uploadFile(this.imagePath).then((uploadedFile: any) => {
            this.uploadedImageName = uploadedFile.name;
            //get downloadURL and store it as a full path;
            this.firebaseService.getDownloadUrl(this.uploadedImageName).then((downloadUrl: string) => {
                this.firebaseService.createPhoto(downloadUrl).then((result: any) => {
                    alert(result)
                }, (error: any) => {
                    alert(error);
                });
            })
        }, (error: any) => {
            alert('File upload error: ' + error);
        });
    }

    vote(emoji:number,photo:Photo) {
        this.firebaseService.vote(emoji,photo).then((result: any) => {
           Toast.makeText("Voted!").show();
        })
    }
    
}

