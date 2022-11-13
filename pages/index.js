import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import moment from "moment";
import { FaRegCalendarAlt, FaUserAlt, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import NewsImage1 from "../assets/images/hackernewsimage.jpg";
import styles from "../styles/Home.module.scss";

export default function Home({ articles }) {
  const [articleList, setArticleList] = useState(articles[0]);

  return (
    <div className="container">
      <Head>
        <title>The Hacker News</title>
        <meta name="description" content="The Hacker News" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        <motion.h1
          className="text-center"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "easeInOut",
          }}
        >
          Welcome To Hacker News
        </motion.h1>
      </AnimatePresence>
      {articleList?.map((d) => (
        <AnimatePresence>
          <Link href={`/article/${d.id}`}>
            <motion.div
              className={styles.card}
              key={d.title}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                type: "easeInOut",
              }}
            >
              <div className={styles.card__image}>
                <Image
                  src={NewsImage1}
                  n
                  alt="News Image"
                  className={styles.image}
                />
              </div>
              <div className={styles.card__content}>
                <h2>{d.title}</h2>
                <div className={styles.user__posted}>
                  <p>
                    <FaRegCalendarAlt className={styles.styled__icon} />{" "}
                    {moment(d.time).format("MMM DD, YYYY HH:mm:ss")}
                  </p>
                  <p>
                    <FaUserAlt className={styles.styled__icon} /> {d.by}
                  </p>
                </div>
                <div className={styles.score__karma}>
                  <div className={styles.left}>
                    <p>
                      <FaStar className={styles.styled__icon} /> {d.score}
                    </p>
                  </div>
                  <p>
                    <strong>Karma:</strong> {d.karma}
                  </p>
                </div>
                <div className="style__refer">
                  <span>Click to see reference link</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </AnimatePresence>
      ))}
      {articleList && <p>You've seen all the news.</p>}
    </div>
  );
}

const fetchArticlesInit = async () => {
  let resArr = [];

  let articleIds = await axios.get(
    `https://hacker-news.firebaseio.com/v0/topstories.json`
  );

  const data = articleIds.data;

  const response = data.map((articleId) => {
    return axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
      .then((res) => {
        return axios
          .get(`https://hacker-news.firebaseio.com/v0/user/${res.data.by}.json`)
          .then((user) => {
            const newObj = {
              ...res.data,
              karma: user.data.karma,
            };
            return newObj;
          });
      });
  });

  return Promise.all(response).then((item) => {
    resArr.push(item);
    return resArr;
  });
};

export const getStaticProps = async () => {
  const articlesData = await fetchArticlesInit();

  return {
    props: {
      articles: articlesData,
    },
  };
};
