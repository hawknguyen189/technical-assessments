"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("./style.css");
// Add your rxjs imports here
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/*
 * Update the four slideshow's images.
 */
function updateImages(link0, link1, link2, link3) {
    var links = [link0, link1, link2, link3];
    document.getElementById("slideshow").childNodes.forEach(function (node) {
        if (node.nodeType == Node.ELEMENT_NODE) {
            if (links.length) {
                var element = node;
                element.classList.add("loading");
                element.style.backgroundImage = "url('" + links.shift() + "')";
                element.classList.remove("loading");
            }
        }
    });
}
/*
 * This API endpoint returns a JSON message of the following format:
 * {
 * "status": "success",
 * "message": "<url of a random image>"
 * }
 */
var apiUrl = "https://dog.ceo/api/breeds/image/random";
// Do the magic here :)
// grab button reference
var getBtn = document.getElementById("btn");
var button_initial_state = false;
var dogPhotos = [];
var fetchingPhoto = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(apiUrl)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                image = _a.sent();
                dogPhotos.push(image.message);
                if (dogPhotos.length > 4) {
                    dogPhotos.splice(0, dogPhotos.length - 4);
                }
                updateImages(dogPhotos[0], dogPhotos[1], dogPhotos[2], dogPhotos[3]);
                return [2 /*return*/];
        }
    });
}); };
var start = new rxjs_1.Subject();
var setInterval = (0, rxjs_1.interval)(5000);
start.next(false);
var setInterval$ = (0, rxjs_1.fromEvent)(getBtn, "click").pipe((0, operators_1.scan)(function (currentState) { return !currentState; }, button_initial_state), (0, operators_1.startWith)(button_initial_state), (0, operators_1.tap)(function (state) { return (state ? start.next(true) : start.next(false)); }), (0, operators_1.tap)(function (state) {
    return state ? (getBtn.innerHTML = "Stop") : (getBtn.innerHTML = "Start");
}), (0, operators_1.switchMap)(function (state) {
    return state
        ? setInterval.pipe((0, operators_1.takeWhile)(function (val) { return state === true; }), (0, operators_1.repeatWhen)(function () { return start; }))
        : rxjs_1.NEVER;
}));
setInterval$.subscribe(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchingPhoto()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
