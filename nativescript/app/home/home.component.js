"use strict";
var core_1 = require('@angular/core');
var services_1 = require("../services");
var enums = require('ui/enums');
var imageSource = require('image-source');
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
            //currently, nothing is returned
            alert("Voted!");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBSWxELHlCQUE4QyxhQUFhLENBQUMsQ0FBQTtBQUM1RCxJQUFZLEtBQUssV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNsQyxJQUFZLFdBQVcsV0FBTSxjQUFjLENBQUMsQ0FBQTtBQUk1QyxJQUFZLE1BQU0sV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBRzlDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QyxJQUFJLEdBQUcsQ0FBQztBQU9SO0lBV0ksdUJBQ1ksZUFBZ0MsRUFDaEMsWUFBMEI7UUFEMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQ2xDLENBQUM7SUFFTCxnQ0FBUSxHQUFSO1FBQ0ksTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksT0FBTyxHQUFHO1lBQ1YsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGFBQWEsRUFBRSxJQUFJO1NBQ3RCLENBQUM7UUFDRixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQzthQUN0QixJQUFJLENBQUMsVUFBQSxVQUFVO1lBQ1osV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxHQUFHO2dCQUN0QyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztnQkFDakIsdUVBQXVFO2dCQUN2RSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUc7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxHQUFHO1FBQWQsaUJBa0JDO1FBakJHLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFdBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFNLENBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6RCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFlBQWlCO1lBQ25FLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQzNDLDhDQUE4QztZQUM5QyxLQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxXQUFtQjtnQkFDakYsS0FBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBVztvQkFDM0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNqQixDQUFDLEVBQUUsVUFBQyxLQUFVO29CQUNWLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsRUFBRSxVQUFDLEtBQVU7WUFDVixLQUFLLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNEJBQUksR0FBSixVQUFLLEtBQVksRUFBQyxLQUFXO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ3JELGdDQUFnQztZQUNoQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBdEVMO1FBQUMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsV0FBVztTQUMzQixDQUFDOztxQkFBQTtJQW1FRixvQkFBQztBQUFELENBQUMsQUFsRUQsSUFrRUM7QUFsRVkscUJBQWEsZ0JBa0V6QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuLi9tb2RlbHMvcGhvdG8ubW9kZWxcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSwgVXRpbHNTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tICd1aS9lbnVtcyc7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tICdpbWFnZS1zb3VyY2UnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuXG5pbXBvcnQgKiBhcyBjYW1lcmEgZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xuXG52YXIgaW1hZ2VNb2R1bGUgPSByZXF1aXJlKFwidWkvaW1hZ2VcIik7XG52YXIgaW1nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiBcImUtaG9tZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImhvbWUuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgaWQ6IHN0cmluZztcbiAgICBpbWFnZXBhdGg6IHN0cmluZztcbiAgICBpbWFnZTogYW55O1xuICAgIHByaXZhdGUgaW1hZ2VQYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSB1cGxvYWRlZEltYWdlTmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgdXBsb2FkZWRJbWFnZVBhdGg6IHN0cmluZztcblxuICAgIHB1YmxpYyBwaG90b3MkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY2FtZXJhLnJlcXVlc3RQZXJtaXNzaW9ucygpO1xuICAgICAgICB0aGlzLnBob3RvcyQgPSA8YW55PnRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFBob3RvcygpO1xuICAgIH1cblxuICAgIHRha2VQaG90bygpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICAgICAgICBrZWVwQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICAgICAgICBzYXZlVG9HYWxsZXJ5OiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIGNhbWVyYS50YWtlUGljdHVyZShvcHRpb25zKVxuICAgICAgICAgICAgLnRoZW4oaW1hZ2VBc3NldCA9PiB7XG4gICAgICAgICAgICAgICAgaW1hZ2VTb3VyY2UuZnJvbUFzc2V0KGltYWdlQXNzZXQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgLy9zYXZlIHRoZSBzb3VyY2UgaW1hZ2UgdG8gYSBmaWxlLCB0aGVuIHNlbmQgdGhhdCBmaWxlIHBhdGggdG8gZmlyZWJhc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlVG9GaWxlKHRoaXMuaW1hZ2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciAtPiBcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNhdmVUb0ZpbGUocmVzKSB7XG4gICAgICAgIGxldCBpbWdzcmMgPSByZXM7XG4gICAgICAgIHRoaXMuaW1hZ2VQYXRoID0gdGhpcy51dGlsc1NlcnZpY2UuZG9jdW1lbnRzUGF0aChgcGhvdG8tJHtEYXRlLm5vdygpfS5wbmdgKTtcbiAgICAgICAgaW1nc3JjLnNhdmVUb0ZpbGUodGhpcy5pbWFnZVBhdGgsIGVudW1zLkltYWdlRm9ybWF0LnBuZyk7XG4gICAgICAgIC8vdXBsb2FkIHRoZSBmaWxlLCB0aGVuIHNhdmUgYWxsXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnVwbG9hZEZpbGUodGhpcy5pbWFnZVBhdGgpLnRoZW4oKHVwbG9hZGVkRmlsZTogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZGVkSW1hZ2VOYW1lID0gdXBsb2FkZWRGaWxlLm5hbWU7XG4gICAgICAgICAgICAvL2dldCBkb3dubG9hZFVSTCBhbmQgc3RvcmUgaXQgYXMgYSBmdWxsIHBhdGg7XG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5nZXREb3dubG9hZFVybCh0aGlzLnVwbG9hZGVkSW1hZ2VOYW1lKS50aGVuKChkb3dubG9hZFVybDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuY3JlYXRlUGhvdG8oZG93bmxvYWRVcmwpLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdClcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgYWxlcnQoJ0ZpbGUgdXBsb2FkIGVycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2b3RlKGVtb2ppOm51bWJlcixwaG90bzpQaG90bykge1xuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS52b3RlKGVtb2ppLHBob3RvKS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAvL2N1cnJlbnRseSwgbm90aGluZyBpcyByZXR1cm5lZFxuICAgICAgICAgICBhbGVydChcIlZvdGVkIVwiKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuIl19