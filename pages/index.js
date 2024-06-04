import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/Layout';
import styles from '../styles/Home.module.css';
import utilStyles from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";


///////////////////////////////////////////
// 静的サイト生成-SSG
///////////////////////////////////////////
export async function getStaticProps() {
  const allPostsData = getPostsData();
  // console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

///////////////////////////////////////////
// 動的サイト生成-SSR
///////////////////////////////////////////
// export async function getServerSideProps(context) {

//   return {
//     props: {
//       // コンポーネントに渡すためのprops

//     },
//   };
// }


export default function Home({ allPostsData }) {
  return (
    <Layout home>

      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <p>私は生涯現役を目指しているエンジニアです。好きな言語はJavaScriptとPHPです</p>
      </section>

      <section className={utilStyles.headingMd}>
        <h2>おっさんエンジニアのブログ</h2>
        <div className={styles.grid}>

          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <div className={utilStyles.boldText}>{title}</div>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>

          ))}


        </div>
      </section>

    </Layout>


  );
}
