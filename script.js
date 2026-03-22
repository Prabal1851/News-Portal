const API_KEY = "4d924c94e93e4c3da88605c524f51c58";
const url = "https://corsproxy.io/?https://newsapi.org/v2/everything?q=";

const container = document.getElementById("cardscontainer");

window.addEventListener("load", () => fetchNews("Delhi"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}


function bindData(articles) {
  container.innerHTML = "";
  const template = document.getElementById("template-news-card");

  articles.forEach(article => {
    if (!article.urlToImage) return;

    const clone = template.content.cloneNode(true);

    clone.querySelector("#news-img").src = article.urlToImage;
    clone.querySelector("#news-title").innerText = article.title;
    clone.querySelector("#news-desc").innerText = article.description || "";

    clone.firstElementChild.onclick = () => window.open(article.url);

    container.appendChild(clone);
  });
}


document.querySelectorAll(".city-pill").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".city-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    fetchNews(btn.dataset.query);
  };
});


document.getElementById("search-button").onclick = () => {
  const query = document.getElementById("search-text").value;
  fetchNews(query);
};

// DARK MODE
document.getElementById("dark-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};
