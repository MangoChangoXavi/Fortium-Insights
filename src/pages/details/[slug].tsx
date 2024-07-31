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
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { ConfirmDialog } from "~/components/template/ui/ConfirmDialog";
import { useState } from "react";
import NoImagePlaceholder from "~/assets/img/noimage-placeholder.jpg";
import {
  ChevronLeft,
  MessageCircle,
  PencilIcon,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { EditVendorDialog } from "~/components/template/ui/EditVendorDialog";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function Dashboard(props: PageProps) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const { data: vendor, isLoading } = api.vendor.get.useQuery({
    id: props.id,
  });
  const { data: session } = useSession();
  // use the `useMutation` hook to create a mutation
  const ctx = api.useUtils();
  const { mutate: deleteReview } = api.review.delete.useMutation({
    onSuccess: () => {
      ctx.vendor.get.invalidate().catch((err) => {
        console.error(err);
      });
      toast({ title: "Review delete" });
    },
    onError: (err) => {
      const errorMessage = err?.data?.zodError?.fieldErrors?.content?.[0];
      toast({
        title: errorMessage ?? "Something went wrong. Please try again later.",
      });
    },
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

  // is this user the owner of the vendor?
  const isOwner = session?.user?.id === vendor.userId;

  return (
    <LayoutSigned>
      <ConfirmDialog
        open={openDelete}
        setOpen={setOpenDelete}
        onConfirm={() => {
          deleteReview({ id: selectedId });
          setOpenDelete(false);
        }}
        title="Delete Review"
        description="Are you sure you want to delete this review?"
      />
      <AddReviewDialog
        vendorId={vendor.id}
        open={openReview}
        setOpen={setOpenReview}
      />
      <EditVendorDialog vendor={vendor} open={openEdit} setOpen={setOpenEdit} />
      <section className="flex  w-full  flex-col gap-8 p-8">
        {/* details */}
        <div className="card-shadow flex flex-col  justify-between rounded-2xl  bg-white p-6 md:h-[319px] md:flex-row">
          <div className="flex  w-full flex-col gap-10 md:flex-row">
            <Link
              href={"/"}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[20px] bg-[#466488] hover:bg-[#093061]"
            >
              <ChevronLeft className="h-6 w-6 stroke-white" />
            </Link>
            {/* image */}
            <div className="relative h-[319px] w-full md:h-full md:w-2/5">
              <Image
                className="rounded"
                src={vendor.vendorImgUrl}
                alt={""}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* description */}
            <div className="h-full items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="font-['Noto Sans JP'] text-[80px] font-bold text-[#093061]">
                  {vendor.rating.toFixed(1)}
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex h-8 w-48 gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon
                        key={i}
                        className={`h-8 w-8 ${
                          vendor.rating <= i - 1
                            ? "fill-[#999999] stroke-[#999999]"
                            : "fill-[#093061] stroke-[#093061]"
                        } `}
                      />
                    ))}
                  </div>
                  <div className="font-['Noto Sans JP']  w-48 text-sm font-normal text-[#999999]">
                    Based on {vendor.reviews.length} reviews
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-['Noto Sans JP']  text-[32px] font-bold text-[#2c2c2c]">
                  {vendor.name}
                </div>
                <div className="font-['Plus Jakarta Sans'] text-base font-semibold text-[#999999]">
                  {vendor.description}
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-row items-end justify-between md:flex-col">
            {/* category */}
            <div className="whitespace-nowrap text-base font-semibold text-[#466488]">
              {vendor.category.name}
            </div>
            {/* action buttons */}
            <div className="inline-flex h-10 items-center justify-start gap-4">
              <button
                onClick={() => setOpenEdit(true)}
                className="flex h-10 w-10 cursor-pointer items-center justify-start gap-2.5 rounded-[20px] bg-[#466488] px-2 py-1.5 hover:bg-[#093061]"
              >
                <PencilIcon className="h-6 w-6 stroke-white" />
              </button>
              <button
                onClick={() => setOpenReview(true)}
                className="flex h-10 w-10 cursor-pointer items-center justify-start gap-2.5 rounded-[20px] bg-[#466488] px-2 py-1.5 hover:bg-[#093061]"
              >
                <MessageCircle className="h-6 w-6 stroke-white" />
              </button>
            </div>
          </div>
        </div>
        {/* reviews */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {/* add card */}
          <button
            onClick={() => setOpenReview(true)}
            className="inline-flex h-[400px] w-full flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#2c2c2c] bg-white hover:shadow-xl"
          >
            <div className="flex flex-col items-center justify-center gap-7">
              <PlusIcon className="relative h-12 w-12 stroke-[#2c2c2c]" />
              <div className="font-['Plus Jakarta Sans'] text-2xl font-normal text-[#2c2c2c]">
                Add review
              </div>
            </div>
          </button>
          {/* rest of the reviews */}
          {vendor.reviews.map((review) => (
            <Review
              key={review.id}
              name={review.user.name ?? "Anonymous"}
              userImage={review.user.image ?? NoImagePlaceholder}
              date={review.createdAt.toLocaleDateString()}
              rating={review.rating}
              title={review.title}
              comment={review.comment}
              count={review.user._count.reviews}
              onDelete={isOwner ? () => setOpenDelete(true) : undefined}
            />
          ))}
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
