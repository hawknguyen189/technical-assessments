import "./style.css";

// Add your rxjs imports here
import { fromEvent, interval, NEVER, Subject } from "rxjs";
import {
  scan,
  startWith,
  switchMap,
  tap,
  takeWhile,
  repeatWhen,
} from "rxjs/operators";
/*
 * Update the four slideshow's images.
 */
function updateImages(
  link0: string,
  link1: string,
  link2: string,
  link3: string
): void {
  let links: string[] = [link0, link1, link2, link3];
  document.getElementById("slideshow").childNodes.forEach((node: ChildNode) => {
    if (node.nodeType == Node.ELEMENT_NODE) {
      if (links.length) {
        let element: HTMLElement = node as HTMLElement;
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
const apiUrl: string = "https://dog.ceo/api/breeds/image/random";
// Do the magic here :)

// grab button reference
const getBtn: HTMLElement = document.getElementById("btn");

let button_initial_state = false;
let dogPhotos = [];
const fetchingPhoto = async () => {
  const response = await fetch(apiUrl);
  const image = await response.json();
  dogPhotos.push(image.message);
  if (dogPhotos.length > 4) {
    dogPhotos.splice(0, dogPhotos.length - 4);
  }
  updateImages(dogPhotos[0], dogPhotos[1], dogPhotos[2], dogPhotos[3]);
};
const start = new Subject<boolean>();
const setInterval = interval(5000);
start.next(false);

const setInterval$ = fromEvent(getBtn, "click").pipe(
  scan((currentState) => !currentState, button_initial_state),
  startWith(button_initial_state),
  tap((state) => (state ? start.next(true) : start.next(false))),
  tap((state) =>
    state ? (getBtn.innerHTML = "Stop") : (getBtn.innerHTML = "Start")
  ),
  switchMap((state) => {
    return state
      ? setInterval.pipe(
          takeWhile((val) => state === true),
          repeatWhen(() => start)
        )
      : NEVER;
  })
);

setInterval$.subscribe(async (): Promise<void> => {
  await fetchingPhoto();
});
