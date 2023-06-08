import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import SuperJSON from "superjson";

// Pre-hydrating the data ahead of time using tRPC SSG Helper:
//    getStaticProps doesn't mean this can't rerun
//    it means it will be treated mostly as a static asset
//    and we can trigger revalidation if/when we so choose
export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: SuperJSON, // optional - adds superjson serialization
  });
