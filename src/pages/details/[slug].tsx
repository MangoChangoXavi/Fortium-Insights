import { ScrollArea } from "@/components/ui/scroll-area";
import { CameraIcon, EditIcon, PlusSquareIcon } from "lucide-react";
import {
  type InferGetStaticPropsType,
  type GetServerSidePropsContext,
} from "next";
import Image from "next/image";
import { LayoutSigned } from "~/components/system/layouts/LayoutSigned";
import { Review } from "~/components/template/ui/Review";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import CardGradientDetailsSvg from "~/assets/svg/card-gradient-details.svg";

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
export default function Address(props: PageProps) {
  const itemId = props.itemId;

  return (
    <LayoutSigned>
      <section className="flex flex-col gap-8 p-8">
        {/* company details */}
        <div className="flex justify-between">
          {/* company description */}
          <div className="flex flex-col gap-5">
            {/* title and category */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <h1 className="text-lg font-bold text-blue-950">
                  Mango Chango
                </h1>
                <button>
                  <EditIcon
                    size={16}
                    className="stroke-blue-950 hover:stroke-blue-700"
                  />
                </button>
              </div>
              <h2 className="text-sm  font-medium text-[#999999]">
                Software Development
              </h2>
            </div>
            <ScrollArea>
              <p className="w-[683px] text-base font-semibold text-[#2C2C2C]">
                We strongly believe that our people and our culture are our
                competitive differentiators. Passionate technologists and
                passion to build an extraordinary team with an extraordinary
                reputation.
              </p>
            </ScrollArea>
          </div>
          {/* company photo */}
          <div className="relative">
            <Image
              src="https://via.placeholder.com/368x221"
              alt="Company Image"
              width={368}
              height={221}
            />
            <Image
              src={CardGradientDetailsSvg}
              alt="Gradient"
              className="absolute bottom-0 left-0 right-0 mx-auto"
            />
            <button className="group absolute bottom-4 left-0 right-0 mx-auto">
              <div className=" flex items-center justify-center gap-2">
                <CameraIcon
                  size={16}
                  className="text-white  transition duration-150 ease-in-out group-hover:text-blue-200"
                />
                <span className="font-['Noto Sans JP'] text-sm font-medium text-white transition duration-150 ease-in-out group-hover:text-blue-200">
                  Upload cover
                </span>
              </div>
            </button>
          </div>
        </div>
        {/* separator */}
        <div className="h-[0px] w-full border border-neutral-200"></div>
        {/* reviews */}
        <div className="flex flex-col gap-6">
          {/* title */}
          <div className="flex gap-2">
            <h2 className="text-xl font-bold text-blue-950">Reviews</h2>
            <button>
              <PlusSquareIcon
                size={18}
                className="stroke-blue-950 hover:stroke-blue-700"
              />
            </button>
          </div>
          {/* body */}
          <ScrollArea className="h-[20vw] pr-8">
            <div className="flex flex-col gap-5">
              {reviews.map((review) => (
                <Review key={review.name} {...review} />
              ))}
            </div>
          </ScrollArea>
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

  const itemId = slug;

  return {
    props: {
      // very important - use `trpcState` as the key
      trpcState: helpers.dehydrate(),
      itemId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
