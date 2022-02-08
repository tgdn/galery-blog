import Head from 'next/head';
import { GetStaticProps } from 'next';

function Home() {
  return (
    <>
      <Head>
        <title>Galery</title>
      </Head>
      <header className="w-full border-b bg-gray-50 py-6">
        <div className="container mx-auto font-medium">Galery</div>
      </header>
      <div>{/* content */}</div>
    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const blog = await fetchBlog();
//   return {
//     props: {
//       blog,
//     },
//   };
// };

export default Home;
