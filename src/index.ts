import "@picocss/pico";
import "@/modules/home";

const imgs = document.querySelectorAll("img");

const intersectionObserverCallback: IntersectionObserverCallback = (
  entries,
  intersectionObserver,
) => {
  entries.forEach((entrie) => {
    if (entrie.isIntersecting) {
      const currentImg = entrie.target;
      const dataSrc = currentImg.getAttribute("data-src");
      currentImg.setAttribute("src", dataSrc || "");
      intersectionObserver.unobserve(currentImg);
    }
  });
};

const intersectionObserver = new IntersectionObserver(
  intersectionObserverCallback,
);

imgs.forEach((img) => {
  intersectionObserver.observe(img);
});
