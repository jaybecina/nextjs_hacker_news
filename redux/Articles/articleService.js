import axios from "axios";

// Get articles
const getArticles = async () => {
  try {
    let resArr = [];
    let articleIds = await axios.get(
      `https://hacker-news.firebaseio.com/v0/topstories.json`
    );

    const dataSliced = articleIds.data?.slice(0, 5);

    const response = dataSliced.map((articleId) => {
      return axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
        .then((res) => res.data);
    });

    return Promise.all(response).then((item) => {
      resArr.push(item);
      return resArr;
    });
  } catch (e) {
    console.log("getNewsId Query Error: ", e);
  }
};

const articleService = {
  getArticles,
};

export default articleService;
