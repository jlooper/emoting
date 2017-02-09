"use strict";
var core_1 = require('@angular/core');
var fs = require('file-system');
var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.prototype.getFilename = function (path) {
        var parts = path.split('/');
        return parts[parts.length - 1];
    };
    UtilsService.prototype.documentsPath = function (filename) {
        return fs.knownFolders.documents().path + "/" + filename;
    };
    UtilsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UtilsService);
    return UtilsService;
}());
exports.UtilsService = UtilsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFpQyxlQUFlLENBQUMsQ0FBQTtBQUNqRCxJQUFZLEVBQUUsV0FBTSxhQUFhLENBQUMsQ0FBQTtBQUdsQztJQUFBO0lBVUEsQ0FBQztJQVJRLGtDQUFXLEdBQWxCLFVBQW1CLElBQVk7UUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLG9DQUFhLEdBQXBCLFVBQXFCLFFBQWdCO1FBQ25DLE1BQU0sQ0FBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksU0FBSSxRQUFVLENBQUM7SUFDM0QsQ0FBQztJQVZIO1FBQUMsaUJBQVUsRUFBRTs7b0JBQUE7SUFXYixtQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksb0JBQVksZUFVeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZpbGUtc3lzdGVtJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSB7XG5cbiAgcHVibGljIGdldEZpbGVuYW1lKHBhdGg6IHN0cmluZykge1xuICAgIGxldCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gIH1cblxuICBwdWJsaWMgZG9jdW1lbnRzUGF0aChmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGAke2ZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKS5wYXRofS8ke2ZpbGVuYW1lfWA7XG4gIH1cbn1cbiJdfQ==