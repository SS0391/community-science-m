import axios from "axios";

export const fetchDinosaurs = async () => {
  const titles = "Tyrannosaurus|Triceratops|Velociraptor|Stegosaurus|Brachiosaurus|Spinosaurus";

  const response = await axios.get("https://en.wikipedia.org/w/api.php", {
    params: {
      action: "query",
      format: "json",
      origin: "*", // Fixing CORS issues
      prop: "extracts|pageimages",
      exintro: true,
      explaintext: true,
      piprop: "thumbnail",
      pithumbsize: 500,
      titles: titles,
    },
  });

  const pages = response.data.query.pages;
  return Object.values(pages);
};
