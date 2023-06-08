import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PostView } from "~/components/postView";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

// Pre-hydrating the data ahead of time using tRPC SSG Helper:
//    getStaticProps doesn't mean this can't rerun
//    it means it will be treated mostly as a static asset
//    and we can trigger revalidation if/when we so choose
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper(); // @server/helpers/ssgHelper

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  // prefetch lets us fetch data ahead of time
  // and then hydrate it through server side props
  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      // takes fetched data and puts it in a shape that can be parsed via NextJS server side props
      // then on the _app side, since we're wrapping .withTRPC it will hydrate
      // all that data through React Query
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

// When using StaticProps, It's necessary to tell NextJS which paths are valid
export const getStaticPaths = () => {
  // if paths is unspecified, it will generate them on load
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
