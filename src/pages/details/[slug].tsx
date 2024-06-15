import { ScrollArea } from "@/components/ui/scroll-area";
import { CameraIcon, EditIcon } from "lucide-react";
import {
  type InferGetStaticPropsType,
  type GetServerSidePropsContext,
} from "next";
import Image from "next/image";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { Review } from "~/components/template/ui/Review";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { AddReviewDialog } from "~/components/template/ui/AddReviewDialog";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/system/layouts/Loader";

const reviews = [
  {
    name: "John Doe",
    count: 5,
    date: "2 days ago",
    rank: 5,
    reviewTitle: "Great Service",
    reviewBody:
      "I had a great experience with Mango Chango. I would highly recommend them to anyone.",
  },
  {
    name: "Jane Doe",
    count: 2,
    date: "5 days ago",
    rank: 4,
    reviewTitle: "Good Service",
    reviewBody:
      "I had a good experience with Mango Chango. I would recommend them to anyone.",
    onEdit: () => console.log("Edit Review"),
  },
  {
    name: "John Smith",
    count: 3,
    date: "1 week ago",
    rank: 3,
    reviewTitle: "Average Service",
    reviewBody:
      "I had an average experience with Mango Chango. I would recommend them to anyone.",
  },
];

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Dashboard(props: PageProps) {
  const { data: vendor, isLoading } = api.vendor.get.useQuery({
    id: props.id,
  });

  if (isLoading) {
    return (
      <LayoutSigned>
        <LoadingPage />
      </LayoutSigned>
    );
  }

  if (!vendor) {
    return (
      <LayoutSigned>
        <p>Vendor not found</p>
      </LayoutSigned>
    );
  }

  return (
    <LayoutSigned>
      <section className="mb-8 flex flex-col gap-10 p-4 md:p-8">
        {/* company details */}
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {/* company description */}
          <div className="flex flex-col gap-6">
            {/* title and category */}
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <h1 className="text-lg font-bold text-[#093061]">
                  {vendor.name}
                </h1>
                <button>
                  <EditIcon
                    size={16}
                    className="stroke-[#093061] hover:stroke-blue-700"
                  />
                </button>
              </div>
              <h2 className="text-sm  font-semibold text-[#999999]">
                {vendor.category?.name}
              </h2>
            </div>
            <ScrollArea>
              <p className="max-w-[800px] text-base font-medium text-[#2C2C2C]">
                {vendor.description}
              </p>
            </ScrollArea>
          </div>
          {/* company photo */}
          <div className="relative h-[221px] w-full max-w-[368px]">
            <div className="relative h-[221px] w-full max-w-[368px]">
              <Image
                src={vendor.vendorImgUrl}
                alt="Company Image"
                className="rounded-lg"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        {/* separator */}
        <div className="h-[0px] w-full border border-neutral-200"></div>
        {/* reviews */}
        <div className="flex flex-col gap-8">
          {/* title */}
          <div className="flex gap-2">
            <h2 className="text-xl font-bold text-[#093061]">Reviews</h2>
            <AddReviewDialog />
          </div>
          {/* body */}
          <div className="flex flex-col gap-8">
            {reviews.map((review) => (
              <Review key={review.name} {...review} />
            ))}
          </div>
        </div>
      </section>
    </LayoutSigned>
  );
}

// Fetch data before the page loads
export const getStaticProps = (ctx: GetServerSidePropsContext) => {
  const helpers = generateSSGHelper();

  const slug = ctx.params?.slug as string;

  if (!slug) throw new Error("No slug provided");

  const id = slug.trim();

  // this only helps to prefetch in react query and save in cache
  helpers.vendor.get.prefetch({ id }).catch((err) => {
    console.error(err);
  });

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
