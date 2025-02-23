import shipTop from "../assets/ship-top.png";
export { displayShips };

const displayShips = () => {
  const carrierDivs = document.querySelectorAll(".carrier");
  const battleshipDivs = document.querySelectorAll(".battleship");
  const cruiserDivs = document.querySelectorAll(".cruiser");
  const submarineDivs = document.querySelectorAll(".submarine");
  const destroyerDivs = document.querySelectorAll(".destroyer");

  const carrierImage = document.createElement("img");
  carrierImage.src = shipTop;
  carrierImage.classList.add('ship-illustration');
  carrierImage.style.position = "absolute";
  carrierImage.style.zIndex = "1";

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

      carrierImage.style.top = minTop + "px";
      carrierImage.style.left = minLeft + "px";
      carrierImage.style.width = maxRight - minLeft + "px";
      carrierImage.style.height = maxBottom - minTop + "px";
      carrierImage.classList.add("overlay-image");

      document.body.appendChild(carrierImage);
    });
  }
};
