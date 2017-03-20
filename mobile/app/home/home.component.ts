import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as application from "application";
import {Page} from "ui/page";
import * as app from "application";
import { Photo } from "../models/photo.model";
import { FirebaseService, UtilsService } from "../services";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";
import {TNSFancyAlert,TNSFancyAlertButton} from 'nativescript-fancyalert';
//plugins
import * as Toast from "nativescript-toast";
import * as camera from "nativescript-camera";
import * as fs from "file-system";
//import * as sound from "nativescript-sound";

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

    public Sounds = {
        //"fart": sound.create("~/assets/fart.wav")
    };

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
                    TNSFancyAlert.showSuccess('Success!', result, 'OK!');    
                }, (error: any) => {
                    TNSFancyAlert.showError('Oops!', error, 'OK!');    
                });
            })
        }, (error: any) => {
            TNSFancyAlert.showError('Oops!', error, 'OK!');
        });
    }

    vote(emoji:number,photo:Photo) {

        if (app.android) {
            this.Sounds["fart"].play();
        } else {
            //var soundFile = sound.create("~/assets/fart.wav");
            //soundFile.play();
        }


        this.firebaseService.vote(emoji,photo).then((result: any) => {
           Toast.makeText("Voted!").show();
        })
    }
    
}

