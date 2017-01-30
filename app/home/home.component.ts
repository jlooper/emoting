import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from "ui/page";
import { FirebaseService, UtilsService } from "../services";
import * as camera from "nativescript-camera";
import * as fs from "file-system";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";

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

    constructor(
        private firebaseService: FirebaseService,
        private utilsService: UtilsService
    ) { }

    ngOnInit() {
        camera.requestPermissions();
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
    }



}

