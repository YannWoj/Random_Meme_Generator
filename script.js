document.addEventListener("DOMContentLoaded", () => {
   const memeImage = document.getElementById("memeImage");
   const generateMeme = document.getElementById("generateMeme");
   const loader = document.getElementById("loader");

   // Default image in case the API doesn't work
   const DEFAULT_IMAGE = "https://i.imgflip.com/2ueh5q.jpg";

   // API URL to fetch memes (Thanks ImgFlip!)
   const API_URL = "https://api.imgflip.com/get_memes";

   // Function to fetch a random meme from the API
   async function fetchMeme() {
      try {
         // Show "Loading..." text while fetching
         loader.style.display = "block";
         memeImage.style.display = "none";

         const response = await fetch(API_URL);

         if (!response.ok) {
            throw new Error("API unavailable");
         }

         const data = await response.json();

         // Check if memes were received
         if (data.success && data.data.memes.length > 0) {
            const randomMeme =
               data.data.memes[
                  Math.floor(Math.random() * data.data.memes.length)
               ];
            memeImage.src = randomMeme.url;
         } else {
            memeImage.src = DEFAULT_IMAGE;
         }
      } catch (error) {
         console.error("Error loading meme:", error);
         memeImage.src = DEFAULT_IMAGE;
         alert("Unable to load a meme. Please try again later!");
      } finally {
         // Hide "Loading..." text and display the meme image
         loader.style.display = "none";
         memeImage.style.display = "block";
      }
   }

   generateMeme.addEventListener("click", fetchMeme);

   fetchMeme();
});
