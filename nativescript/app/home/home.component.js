"use strict";
var core_1 = require('@angular/core');
var services_1 = require("../services");
var enums = require('ui/enums');
var imageSource = require('image-source');
//plugins
var Toast = require("nativescript-toast");
var camera = require("nativescript-camera");
var imageModule = require("ui/image");
var img;
var HomeComponent = (function () {
    function HomeComponent(firebaseService, utilsService) {
        this.firebaseService = firebaseService;
        this.utilsService = utilsService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        camera.requestPermissions();
        this.photos$ = this.firebaseService.getPhotos();
    };
    HomeComponent.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        };
        camera.takePicture(options)
            .then(function (imageAsset) {
            imageSource.fromAsset(imageAsset).then(function (res) {
                _this.image = res;
                //save the source image to a file, then send that file path to firebase
                _this.saveToFile(_this.image);
            });
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    HomeComponent.prototype.saveToFile = function (res) {
        var _this = this;
        var imgsrc = res;
        this.imagePath = this.utilsService.documentsPath("photo-" + Date.now() + ".png");
        imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png);
        //upload the file, then save all
        this.firebaseService.uploadFile(this.imagePath).then(function (uploadedFile) {
            _this.uploadedImageName = uploadedFile.name;
            //get downloadURL and store it as a full path;
            _this.firebaseService.getDownloadUrl(_this.uploadedImageName).then(function (downloadUrl) {
                _this.firebaseService.createPhoto(downloadUrl).then(function (result) {
                    alert(result);
                }, function (error) {
                    alert(error);
                });
            });
        }, function (error) {
            alert('File upload error: ' + error);
        });
    };
    HomeComponent.prototype.vote = function (emoji, photo) {
        this.firebaseService.vote(emoji, photo).then(function (result) {
            Toast.makeText("Voted!").show();
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "e-home",
            templateUrl: "home.html"
        }), 
        __metadata('design:paramtypes', [services_1.FirebaseService, services_1.UtilsService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBSWxELHlCQUE4QyxhQUFhLENBQUMsQ0FBQTtBQUM1RCxJQUFZLEtBQUssV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNsQyxJQUFZLFdBQVcsV0FBTSxjQUFjLENBQUMsQ0FBQTtBQUk1QyxTQUFTO0FBQ1QsSUFBWSxLQUFLLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUM1QyxJQUFZLE1BQU0sV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBRzlDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QyxJQUFJLEdBQUcsQ0FBQztBQU9SO0lBWUksdUJBQ1ksZUFBZ0MsRUFDaEMsWUFBMEI7UUFEMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBRXJDLENBQUM7SUFFRixnQ0FBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksT0FBTyxHQUFHO1lBQ1YsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUM7UUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQzthQUN0QixJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ1osV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUN0QyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDakIsdUVBQXVFO2dCQUN2RSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxHQUFHO1FBQWQsaUJBa0JDO1FBakJHLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFNLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFlBQWlCO1lBQ25FLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQzNDLDhDQUE4QztZQUM5QyxLQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxXQUFtQjtnQkFDakYsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBVztvQkFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNqQixDQUFDLEVBQUUsVUFBQyxLQUFVO29CQUNWLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsRUFBRSxVQUFDLEtBQVU7WUFDVixLQUFLLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLEtBQVksRUFBQyxLQUFXO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ3JELEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBdkVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsV0FBVztTQUMzQixDQUFDOztxQkFBQTtJQW9FRixvQkFBQztBQUFELENBQUMsQUFuRUQsSUFtRUM7QUFuRVkscUJBQWEsZ0JBbUV6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi9tb2RlbHMvcGhvdG8ubW9kZWxcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSwgVXRpbHNTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tICd1aS9lbnVtcyc7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tICdpbWFnZS1zb3VyY2UnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuXG4vL3BsdWdpbnNcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5cbnZhciBpbWFnZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9pbWFnZVwiKTtcbnZhciBpbWc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwiZS1ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZS5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBpZDogc3RyaW5nO1xuICAgIGltYWdlcGF0aDogc3RyaW5nO1xuICAgIGltYWdlOiBhbnk7XG4gICAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIHVwbG9hZGVkSW1hZ2VOYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB1cGxvYWRlZEltYWdlUGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgY29uZmV0dGlWaWV3OiBhbnk7XG5cbiAgICBwdWJsaWMgcGhvdG9zJDogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2VcbiAgICApIHtcbiAgICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNhbWVyYS5yZXF1ZXN0UGVybWlzc2lvbnMoKTtcbiAgICAgICAgdGhpcy5waG90b3MkID0gPGFueT50aGlzLmZpcmViYXNlU2VydmljZS5nZXRQaG90b3MoKTtcbiAgICB9XG5cbiAgICB0YWtlUGhvdG8oKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgd2lkdGg6IDMwMCxcbiAgICAgICAgICAgIGhlaWdodDogMzAwLFxuICAgICAgICAgICAga2VlcEFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgICAgICAgc2F2ZVRvR2FsbGVyeTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBjYW1lcmEudGFrZVBpY3R1cmUob3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGltYWdlQXNzZXQgPT4ge1xuICAgICAgICAgICAgICAgIGltYWdlU291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vc2F2ZSB0aGUgc291cmNlIGltYWdlIHRvIGEgZmlsZSwgdGhlbiBzZW5kIHRoYXQgZmlsZSBwYXRoIHRvIGZpcmViYXNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVRvRmlsZSh0aGlzLmltYWdlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLT4gXCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlVG9GaWxlKHJlcykge1xuICAgICAgICBsZXQgaW1nc3JjID0gcmVzO1xuICAgICAgICB0aGlzLmltYWdlUGF0aCA9IHRoaXMudXRpbHNTZXJ2aWNlLmRvY3VtZW50c1BhdGgoYHBob3RvLSR7RGF0ZS5ub3coKX0ucG5nYCk7XG4gICAgICAgIGltZ3NyYy5zYXZlVG9GaWxlKHRoaXMuaW1hZ2VQYXRoLCBlbnVtcy5JbWFnZUZvcm1hdC5wbmcpO1xuICAgICAgICAvL3VwbG9hZCB0aGUgZmlsZSwgdGhlbiBzYXZlIGFsbFxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS51cGxvYWRGaWxlKHRoaXMuaW1hZ2VQYXRoKS50aGVuKCh1cGxvYWRlZEZpbGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGxvYWRlZEltYWdlTmFtZSA9IHVwbG9hZGVkRmlsZS5uYW1lO1xuICAgICAgICAgICAgLy9nZXQgZG93bmxvYWRVUkwgYW5kIHN0b3JlIGl0IGFzIGEgZnVsbCBwYXRoO1xuICAgICAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RG93bmxvYWRVcmwodGhpcy51cGxvYWRlZEltYWdlTmFtZSkudGhlbigoZG93bmxvYWRVcmw6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmNyZWF0ZVBob3RvKGRvd25sb2FkVXJsKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQpXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGFsZXJ0KCdGaWxlIHVwbG9hZCBlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdm90ZShlbW9qaTpudW1iZXIscGhvdG86UGhvdG8pIHtcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2Uudm90ZShlbW9qaSxwaG90bykudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgVG9hc3QubWFrZVRleHQoXCJWb3RlZCFcIikuc2hvdygpO1xuICAgICAgICB9KVxuICAgIH1cbn1cblxuIl19