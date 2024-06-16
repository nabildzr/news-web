// apikey from newsapi.org
const apiKey = "pub_4648519815895da192c80657fcb2841759aef";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");




async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsdata.io/api/1/latest?country=id&category=technology&apikey=${apiKey}&size=8`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error Fetching", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim()

  if(query !== ""){
    try{
      const results = await fetchNewsQuery(query)
      displayBlogs(results)
    }catch(error){
      console.log("Error search while fetching", error)
    }
  }
})

async function fetchNewsQuery(query){
  try {
    const apiUrl = `https://newsdata.io/api/1/latest?country=id&apikey=${apiKey}&q=${query}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error Fetching", error);
    return [];
  }

  // return new Promise(async (resolve, reject) => {
  //   try{
  //     const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}`;
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();
  //     resolve(data.results)
  //   }catch(error){
  //     reject(error)
  //   }
  // })
}

function displayBlogs(results) {

  blogContainer.innerHTML = "";
  results.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.image_url;
    img.alt = article.title;

    // truncate the title if it's too long
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;

    // truncate the description if it's too long
    const description = document.createElement("p");
    const truncatedDesc =
      article.description.length > 100
        ? article.description.slice(0, 100) + "..."
        : article.description;


    description.textContent = truncatedDesc;

    // // if article img is null then display placeholder image
    // if (article.urlToImage === null) {
    //   img.src = "https://via.placeholder.com/150";
    // }

    // // if article title is null then display "No Title Found"
    // if (article.title === null) {
    //   title.textContent = "No Title Found";
    // }

    // // if article description is null then display "No Description Found"
    // if (article.description === null) {
    //   description.textContent = "No Description Found";
    // }

   
    // if (article.url === null) {
    //   blogCard.style.cursor = "default";
    // }

    // // if article is [Removed] then don't display it
    // if (article.title === "[Removed]") {
    //   return;
    // }

    // // if article img not fetched then don't display it
    // if (article.urlToImage === null) {
    //   return;
    // }

    // // if article img format is .webp then don't display it
    // if (article.urlToImage.includes(".webp")) {
    //   return;
    // }

    // // limit fetch to 5 articles
    // if (blogContainer.childElementCount === 5) {
    //   return;
    // }

    // // if in the data had status = error then display "No Data Found"
    // if (article.status === "error") {
    //   title.textContent = "No Data Found";
    //   description.textContent = "No Data Found";
    // }

    // show from search



    // declare the elements
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
        window.open(article.link, "_image")
    })
    blogContainer.appendChild(blogCard);
  });
}

// if api is fetching then display loading and if api is fetched then display the blogs

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error Fetching Random News", error);
  }
})();
