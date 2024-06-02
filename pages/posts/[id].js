import Head from "next/head";
import Layout, { siteTitle } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";


///////////////////////////////////////////
// 静的サイト生成-SSG
///////////////////////////////////////////
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);


  return {
    props: {
      postData,
    },
  };
}


///////////////////////////////////////////
// 動的URL取得
///////////////////////////////////////////
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };

}


export default function Post({ postData }) {

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }}/>

      </article>

    </Layout>
  );
}
