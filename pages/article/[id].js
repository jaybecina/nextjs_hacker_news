import React from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import NewsImage1 from "../../assets/images/hackernewsimage.jpg";
import styles from "../../styles/Article.module.scss";

export default function Article({ article }) {
  const router = useRouter();
  return (
    <div className="container">
      <Head>
        <title>{article.title} | The Hacker News</title>
        <meta name="description" content={article.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        <div className={styles.back__div}>
          <button onClick={() => router.back()} className={styles.back__button}>
            Back
          </button>
        </div>
        <motion.h1
          className="text-center"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "easeInOut",
          }}
        >
          {article.title}
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "easeInOut",
          }}
        >
          <Image src={NewsImage1} alt="News Image" className={styles.image} />
          <div className={styles.row}>
            <div className={styles.style__grp}>
              <p>
                <strong>Posted:</strong>
              </p>
              <p>{moment(article.time).format("MMM DD, YYYY HH:mm:ss")}</p>
            </div>
            <div className="style__grp">
              <p>
                <strong>Author:</strong>
              </p>
              <p>{article.by}</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.style__grp}>
              <p>
                <strong>Article Score:</strong>
              </p>
              <p>{article.score}</p>
            </div>
            <div className="style__grp">
              <p>
                <strong>Karma Score:</strong>
              </p>
              <p>{article.karma}</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.style__grp}>
              <p>
                <strong>Click here to go to link:</strong>
              </p>
              <a href={article.url} target="_blank" rel="noreferrer">
                <p className={styles.link}>{article.url}</p>
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const getStaticProps = async (context) => {
  const { params } = context;
  const article = await axios
    .get(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`)
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

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const ids = await await axios
    .get(`https://hacker-news.firebaseio.com/v0/topstories.json`)
    .then((res) => res.data);

  const paths = ids.map((id) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
