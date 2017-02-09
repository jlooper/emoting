"use strict";
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var Observable_1 = require('rxjs/Observable');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
require('rxjs/add/operator/share');
var utils_service_1 = require('./utils.service');
var FirebaseService = (function () {
    function FirebaseService(ngZone, utils) {
        this.ngZone = ngZone;
        this.utils = utils;
        this.photos = new BehaviorSubject_1.BehaviorSubject([]);
        this._allPhotos = [];
    }
    FirebaseService.prototype.uploadFile = function (localPath, file) {
        var filename = this.utils.getFilename(localPath);
        var remotePath = "" + filename;
        return firebase.uploadFile({
            remoteFullPath: remotePath,
            localFullPath: localPath,
            onProgress: function (status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        });
    };
    FirebaseService.prototype.getDownloadUrl = function (remoteFilePath) {
        return firebase.getDownloadUrl({
            remoteFullPath: remoteFilePath
        })
            .then(function (url) {
            return url;
        }, function (errorMessage) {
            console.log(errorMessage);
        });
    };
    FirebaseService.prototype.createPhoto = function (downloadPath) {
        return firebase.push("/Photos", { "path": downloadPath, "date": 0 - Date.now() }).then(function (result) {
            return 'Photo added!';
        }, function (errorMessage) {
            console.log(errorMessage);
        });
    };
    FirebaseService.prototype.vote = function (emoji, photo) {
        //which emoji do we upate?
        this.publishUpdates();
        switch (emoji) {
            case 1:
                return firebase.update("/Photos/" + photo.id + "", {
                    emoji1: photo.emoji1 + 1
                });
            case 2:
                return firebase.update("/Photos/" + photo.id + "", {
                    emoji2: photo.emoji2 + 1
                });
            case 3:
                return firebase.update("/Photos/" + photo.id + "", {
                    emoji3: photo.emoji3 + 1
                });
            case 4:
                return firebase.update("/Photos/" + photo.id + "", {
                    emoji4: photo.emoji4 + 1
                });
            case 5:
                return firebase.update("/Photos/" + photo.id + "", {
                    emoji5: photo.emoji5 + 1
                })
                    .then(function (result) {
                    //nothing is returned
                }, function (errorMessage) {
                    console.log(errorMessage);
                });
        }
    };
    FirebaseService.prototype.getPhotos = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var path = 'Photos';
            var onValueEvent = function (snapshot) {
                _this.ngZone.run(function () {
                    var results = _this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        }).share();
    };
    FirebaseService.prototype.handleSnapshot = function (data) {
        this._allPhotos = [];
        if (data) {
            for (var id in data) {
                var result = Object.assign({ id: id }, data[id]);
                this._allPhotos.push(result);
            }
            this.publishUpdates();
        }
        return this._allPhotos;
    };
    FirebaseService.prototype.publishUpdates = function () {
        this._allPhotos.sort(function (a, b) {
            if (a.date < b.date)
                return -1;
            if (a.date > b.date)
                return 1;
            return 0;
        });
        this.photos.next(this._allPhotos.slice());
    };
    FirebaseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.NgZone, utils_service_1.UtilsService])
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQUVuRCxJQUFPLFFBQVEsV0FBVyw4QkFBOEIsQ0FBQyxDQUFDO0FBQzFELDJCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzdDLGdDQUFnQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ3ZELFFBQU8seUJBQXlCLENBQUMsQ0FBQTtBQUNqQyw4QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUcvQztJQUNFLHlCQUNVLE1BQWMsRUFDZCxLQUFtQjtRQURuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUc3QixXQUFNLEdBQWtDLElBQUksaUNBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV4RCxlQUFVLEdBQWlCLEVBQUUsQ0FBQztJQUpsQyxDQUFDO0lBTUwsb0NBQVUsR0FBVixVQUFXLFNBQWlCLEVBQUUsSUFBVTtRQUN0QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLFVBQVUsR0FBRyxLQUFHLFFBQVUsQ0FBQztRQUMvQixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN6QixjQUFjLEVBQUUsVUFBVTtZQUMxQixhQUFhLEVBQUUsU0FBUztZQUN4QixVQUFVLEVBQUUsVUFBVSxNQUFNO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFl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QUksQ0FBQyxVQUFVLFFBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUF2SEg7UUFBQyxpQkFBVSxFQUFFOzt1QkFBQTtJQXlIYixzQkFBQztBQUFELENBQUMsQUF4SEQsSUF3SEM7QUF4SFksdUJBQWUsa0JBd0gzQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIi4uL21vZGVscy9waG90by5tb2RlbFwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2hhcmUnO1xuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi91dGlscy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSB1dGlsczogVXRpbHNTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcGhvdG9zOiBCZWhhdmlvclN1YmplY3Q8QXJyYXk8UGhvdG8+PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gIHByaXZhdGUgX2FsbFBob3RvczogQXJyYXk8UGhvdG8+ID0gW107XG5cbiAgdXBsb2FkRmlsZShsb2NhbFBhdGg6IHN0cmluZywgZmlsZT86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IGZpbGVuYW1lID0gdGhpcy51dGlscy5nZXRGaWxlbmFtZShsb2NhbFBhdGgpO1xuICAgIGxldCByZW1vdGVQYXRoID0gYCR7ZmlsZW5hbWV9YDtcbiAgICByZXR1cm4gZmlyZWJhc2UudXBsb2FkRmlsZSh7XG4gICAgICByZW1vdGVGdWxsUGF0aDogcmVtb3RlUGF0aCxcbiAgICAgIGxvY2FsRnVsbFBhdGg6IGxvY2FsUGF0aCxcbiAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uIChzdGF0dXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJVcGxvYWRlZCBmcmFjdGlvbjogXCIgKyBzdGF0dXMuZnJhY3Rpb25Db21wbGV0ZWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBlcmNlbnRhZ2UgY29tcGxldGU6IFwiICsgc3RhdHVzLnBlcmNlbnRhZ2VDb21wbGV0ZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0RG93bmxvYWRVcmwocmVtb3RlRmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGZpcmViYXNlLmdldERvd25sb2FkVXJsKHtcbiAgICAgIHJlbW90ZUZ1bGxQYXRoOiByZW1vdGVGaWxlUGF0aFxuICAgIH0pXG4gICAgICAudGhlbihcbiAgICAgIGZ1bmN0aW9uICh1cmw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2U6IGFueSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cblxuICBjcmVhdGVQaG90byhkb3dubG9hZFBhdGg6IHN0cmluZykge1xuICAgIHJldHVybiBmaXJlYmFzZS5wdXNoKFxuICAgICAgXCIvUGhvdG9zXCIsXG4gICAgICB7IFwicGF0aFwiOiBkb3dubG9hZFBhdGgsIFwiZGF0ZVwiOiAwIC0gRGF0ZS5ub3coKSB9XG4gICAgKS50aGVuKFxuICAgICAgZnVuY3Rpb24gKHJlc3VsdDogYW55KSB7XG4gICAgICAgIHJldHVybiAnUGhvdG8gYWRkZWQhJztcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdm90ZShlbW9qaTpudW1iZXIscGhvdG86UGhvdG8pIHtcbiAgICAvL3doaWNoIGVtb2ppIGRvIHdlIHVwYXRlP1xuICAgIHRoaXMucHVibGlzaFVwZGF0ZXMoKTtcbiAgICBcbiAgICBzd2l0Y2ggKGVtb2ppKSBcbiAgICB7IFxuICAgIGNhc2UgMTogXG4gICAgcmV0dXJuIGZpcmViYXNlLnVwZGF0ZShcIi9QaG90b3MvXCIgKyBwaG90by5pZCArIFwiXCIsIHtcbiAgICAgIGVtb2ppMTogcGhvdG8uZW1vamkxKzFcbiAgICB9KVxuICAgIGNhc2UgMjogXG4gICAgcmV0dXJuIGZpcmViYXNlLnVwZGF0ZShcIi9QaG90b3MvXCIgKyBwaG90by5pZCArIFwiXCIsIHtcbiAgICAgIGVtb2ppMjogcGhvdG8uZW1vamkyKzFcbiAgICB9KVxuICAgIGNhc2UgMzogXG4gICAgcmV0dXJuIGZpcmViYXNlLnVwZGF0ZShcIi9QaG90b3MvXCIgKyBwaG90by5pZCArIFwiXCIsIHtcbiAgICAgIGVtb2ppMzogcGhvdG8uZW1vamkzKzFcbiAgICB9KSBcbiAgICBjYXNlIDQ6IFxuICAgIHJldHVybiBmaXJlYmFzZS51cGRhdGUoXCIvUGhvdG9zL1wiICsgcGhvdG8uaWQgKyBcIlwiLCB7XG4gICAgICBlbW9qaTQ6IHBob3RvLmVtb2ppNCsxXG4gICAgfSkgXG4gICAgY2FzZSA1OiBcbiAgICByZXR1cm4gZmlyZWJhc2UudXBkYXRlKFwiL1Bob3Rvcy9cIiArIHBob3RvLmlkICsgXCJcIiwge1xuICAgICAgZW1vamk1OiBwaG90by5lbW9qaTUrMVxuICAgIH0pICAgIFxuICAgICAudGhlbihcbiAgICAgIGZ1bmN0aW9uIChyZXN1bHQ6IGFueSkge1xuICAgICAgICAvL25vdGhpbmcgaXMgcmV0dXJuZWRcbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgfVxuICB9XG4gIGdldFBob3RvcygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgbGV0IHBhdGggPSAnUGhvdG9zJztcblxuICAgICAgbGV0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgbGV0IHJlc3VsdHMgPSB0aGlzLmhhbmRsZVNuYXBzaG90KHNuYXBzaG90LnZhbHVlKTtcbiAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIob25WYWx1ZUV2ZW50LCBgLyR7cGF0aH1gKTtcbiAgICB9KS5zaGFyZSgpO1xuICB9XG4gIFxuICBoYW5kbGVTbmFwc2hvdChkYXRhOiBhbnkpIHtcbiAgICB0aGlzLl9hbGxQaG90b3MgPSBbXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgZm9yIChsZXQgaWQgaW4gZGF0YSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gKDxhbnk+T2JqZWN0KS5hc3NpZ24oeyBpZDogaWQgfSwgZGF0YVtpZF0pO1xuICAgICAgICB0aGlzLl9hbGxQaG90b3MucHVzaChyZXN1bHQpO1xuICAgICAgfVxuICAgICAgdGhpcy5wdWJsaXNoVXBkYXRlcygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYWxsUGhvdG9zO1xuICB9XG5cblxuICBwdWJsaXNoVXBkYXRlcygpIHtcbiAgICB0aGlzLl9hbGxQaG90b3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGEuZGF0ZSA8IGIuZGF0ZSkgcmV0dXJuIC0xO1xuICAgICAgaWYgKGEuZGF0ZSA+IGIuZGF0ZSkgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9KVxuICAgIHRoaXMucGhvdG9zLm5leHQoWy4uLnRoaXMuX2FsbFBob3Rvc10pO1xuICB9XG5cbn0iXX0=