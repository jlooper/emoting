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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBSWxELHlCQUE4QyxhQUFhLENBQUMsQ0FBQTtBQUM1RCxJQUFZLEtBQUssV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNsQyxJQUFZLFdBQVcsV0FBTSxjQUFjLENBQUMsQ0FBQTtBQUk1QyxTQUFTO0FBQ1QsSUFBWSxLQUFLLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUM1QyxJQUFZLE1BQU0sV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBRzlDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QyxJQUFJLEdBQUcsQ0FBQztBQU9SO0lBV0ksdUJBQ1ksZUFBZ0MsRUFDaEMsWUFBMEI7UUFEMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBRXJDLENBQUM7SUFFRixnQ0FBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksT0FBTyxHQUFHO1lBQ1YsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUM7UUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQzthQUN0QixJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ1osV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUN0QyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDakIsdUVBQXVFO2dCQUN2RSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxHQUFHO1FBQWQsaUJBa0JDO1FBakJHLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFNLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFlBQWlCO1lBQ25FLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQzNDLDhDQUE4QztZQUM5QyxLQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxXQUFtQjtnQkFDakYsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBVztvQkFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNqQixDQUFDLEVBQUUsVUFBQyxLQUFVO29CQUNWLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsRUFBRSxVQUFDLEtBQVU7WUFDVixLQUFLLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLEtBQVksRUFBQyxLQUFXO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ3JELEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBdEVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsV0FBVztTQUMzQixDQUFDOztxQkFBQTtJQW1FRixvQkFBQztBQUFELENBQUMsQUFsRUQsSUFrRUM7QUFsRVkscUJBQWEsZ0JBa0V6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi9tb2RlbHMvcGhvdG8ubW9kZWxcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSwgVXRpbHNTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tICd1aS9lbnVtcyc7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tICdpbWFnZS1zb3VyY2UnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuXG4vL3BsdWdpbnNcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gXCJuYXRpdmVzY3JpcHQtdG9hc3RcIjtcbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5cbnZhciBpbWFnZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9pbWFnZVwiKTtcbnZhciBpbWc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwiZS1ob21lXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiaG9tZS5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBpZDogc3RyaW5nO1xuICAgIGltYWdlcGF0aDogc3RyaW5nO1xuICAgIGltYWdlOiBhbnk7XG4gICAgcHJpdmF0ZSBpbWFnZVBhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIHVwbG9hZGVkSW1hZ2VOYW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB1cGxvYWRlZEltYWdlUGF0aDogc3RyaW5nO1xuXG4gICAgcHVibGljIHBob3RvcyQ6IE9ic2VydmFibGU8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlXG4gICAgKSB7XG4gICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XG4gICAgICAgIHRoaXMucGhvdG9zJCA9IDxhbnk+dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0UGhvdG9zKCk7XG4gICAgfVxuXG4gICAgdGFrZVBob3RvKCkge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgICAgIGtlZXBBc3BlY3RSYXRpbzogdHJ1ZSxcbiAgICAgICAgICAgIHNhdmVUb0dhbGxlcnk6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpXG4gICAgICAgICAgICAudGhlbihpbWFnZUFzc2V0ID0+IHtcbiAgICAgICAgICAgICAgICBpbWFnZVNvdXJjZS5mcm9tQXNzZXQoaW1hZ2VBc3NldCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAvL3NhdmUgdGhlIHNvdXJjZSBpbWFnZSB0byBhIGZpbGUsIHRoZW4gc2VuZCB0aGF0IGZpbGUgcGF0aCB0byBmaXJlYmFzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVUb0ZpbGUodGhpcy5pbWFnZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0+IFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZVRvRmlsZShyZXMpIHtcbiAgICAgICAgbGV0IGltZ3NyYyA9IHJlcztcbiAgICAgICAgdGhpcy5pbWFnZVBhdGggPSB0aGlzLnV0aWxzU2VydmljZS5kb2N1bWVudHNQYXRoKGBwaG90by0ke0RhdGUubm93KCl9LnBuZ2ApO1xuICAgICAgICBpbWdzcmMuc2F2ZVRvRmlsZSh0aGlzLmltYWdlUGF0aCwgZW51bXMuSW1hZ2VGb3JtYXQucG5nKTtcbiAgICAgICAgLy91cGxvYWQgdGhlIGZpbGUsIHRoZW4gc2F2ZSBhbGxcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UudXBsb2FkRmlsZSh0aGlzLmltYWdlUGF0aCkudGhlbigodXBsb2FkZWRGaWxlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkZWRJbWFnZU5hbWUgPSB1cGxvYWRlZEZpbGUubmFtZTtcbiAgICAgICAgICAgIC8vZ2V0IGRvd25sb2FkVVJMIGFuZCBzdG9yZSBpdCBhcyBhIGZ1bGwgcGF0aDtcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldERvd25sb2FkVXJsKHRoaXMudXBsb2FkZWRJbWFnZU5hbWUpLnRoZW4oKGRvd25sb2FkVXJsOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5jcmVhdGVQaG90byhkb3dubG9hZFVybCkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0KVxuICAgICAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICBhbGVydCgnRmlsZSB1cGxvYWQgZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZvdGUoZW1vamk6bnVtYmVyLHBob3RvOlBob3RvKSB7XG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnZvdGUoZW1vamkscGhvdG8pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgIFRvYXN0Lm1ha2VUZXh0KFwiVm90ZWQhXCIpLnNob3coKTtcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbiJdfQ==