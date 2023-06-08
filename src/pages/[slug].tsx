import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PostView } from "~/components/postView";
import { api } from "~/utils/api";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;
  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600">
          <Image
            src={data.profileImageURL}
            alt={`${data.username ?? ""}'s profile picture`}
            width={128}
            height={128}
            className="absolute bottom-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? ""
        }`}</div>
        <div className="border-b border-slate-400"></div>
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";
import { PageLayout } from "~/components/layout";
import Image from "next/image";
import { LoadingPage } from "~/components/loading";

// Pre-hydrating the data ahead of time using tRPC SSG Helper:
//    getStaticProps doesn't mean this can't rerun
//    it means it will be treated mostly as a static asset
//    and we can trigger revalidation if/when we so choose
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: SuperJSON, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  // Removing the @ from the slug
  const username = slug.replace("@", "");

  // prefetch lets us fetch data ahead of time
  // and then hydrate it through server side props
  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      // takes fetched data and puts it in a shape that can be parsed via NextJS server side props
      // then on the _app side, since we're wrapping .withTRPC it will hydrate
      // all that data through React Query
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

// When using StaticProps, It's necessary to tell NextJS which paths are valid
export const getStaticPaths = () => {
  // if paths is unspecified, it will generate them on load
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
