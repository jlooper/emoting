"use strict";
var Photo = (function () {
    function Photo(id, path, date, emoji1, emoji2, emoji3, emoji4, emoji5) {
        this.id = id;
        this.path = path;
        this.date = date;
        this.emoji1 = emoji1;
        this.emoji2 = emoji2;
        this.emoji3 = emoji3;
        this.emoji4 = emoji4;
        this.emoji5 = emoji5;
    }
    return Photo;
}());
exports.Photo = Photo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG8ubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaG90by5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFDSSxlQUVXLEVBQVUsRUFDVixJQUFZLEVBQ1osSUFBWSxFQUNaLE1BQWMsRUFDZCxNQUFjLEVBQ2QsTUFBYyxFQUNkLE1BQWMsRUFDZCxNQUFjO1FBUGQsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVE7SUFFeEIsQ0FBQztJQUNOLFlBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLGFBQUssUUFhakIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQaG90byB7XG4gICAgY29uc3RydWN0b3JcbiAgICAgIChcbiAgICAgICAgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBkYXRlOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBlbW9qaTE6IG51bWJlcixcbiAgICAgICAgcHVibGljIGVtb2ppMjogbnVtYmVyLFxuICAgICAgICBwdWJsaWMgZW1vamkzOiBudW1iZXIsXG4gICAgICAgIHB1YmxpYyBlbW9qaTQ6IG51bWJlcixcbiAgICAgICAgcHVibGljIGVtb2ppNTogbnVtYmVyLFxuICAgICAgKVxuICAgIHt9ICAgXG59Il19