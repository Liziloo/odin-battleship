import shipTop from "../assets/ship-top.png";
export { displayShips };

const displayShips = () => {
  const oldCarrier = document.getElementById("carrier-image");
  if (oldCarrier) {
    oldCarrier.remove();
  }

  const carrierDivs = document.querySelectorAll(".carrier");
  const battleshipDivs = document.querySelectorAll(".battleship");
  const cruiserDivs = document.querySelectorAll(".cruiser");
  const submarineDivs = document.querySelectorAll(".submarine");
  const destroyerDivs = document.querySelectorAll(".destroyer");

  const carrierImage = document.createElement("img");
  carrierImage.src = shipTop;
  carrierImage.style.position = "absolute";
  carrierImage.style.zIndex = "1";
  carrierImage.setAttribute("id", "carrier-image");
  carrierImage.classList.add("ship-illustration");

  let minTop = Infinity,
    maxBottom = -Infinity,
    minLeft = Infinity,
    maxRight = -Infinity;

  if (carrierDivs.length === 5) {
    carrierDivs.forEach((div) => {
      const rect = div.getBoundingClientRect();
      minTop = Math.min(minTop, rect.top);
      maxBottom = Math.max(maxBottom, rect.bottom);
      minLeft = Math.min(minLeft, rect.left);
      maxRight = Math.max(maxRight, rect.right);

      const rectWidth = maxRight - minLeft;
      const rectHeight = maxBottom - minTop;

      carrierImage.style.top = minTop + "px";
      carrierImage.style.left = minLeft + "px";

      document.body.appendChild(carrierImage);
      if (rectWidth < rectHeight) {
        carrierImage.classList.remove("overlay-image");
        carrierImage.classList.add("overlay-image-rotated");
        carrierImage.style.top = minTop + 100 + "px";
        carrierImage.style.left = minLeft - 100 + "px";
      } else {
        carrierImage.classList.remove("overlay-image-rotated");
        carrierImage.classList.add("overlay-image");
      }
    });
  }
};
