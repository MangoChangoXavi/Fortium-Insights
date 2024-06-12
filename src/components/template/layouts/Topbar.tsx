import { Copy, MousePointerSquare, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import LogoSvg from "~/assets/svg/logo.svg";
import { Loader } from "~/components/system/layouts/Loader";
import { Debouncer } from "~/components/system/ui/Debouncer";
import { useSearchStore } from "~/stores/useSearchStore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "~/lib/categories";

export const Topbar = ({
  profileImgUrl,
  handleClickSignOut,
}: {
  profileImgUrl: string;
  handleClickSignOut: () => void;
}) => {
  /**
   * Represents the state of hover options in the topbar.
   */
  const [hoverOptions, setHoverOptions] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // zustand state
  const { setSearch } = useSearchStore();

  // whenever searchValue change we should go to /search/[searchValue]
  const router = useRouter();
  React.useEffect(() => {
    const makeSearch = async () => {
      if (searchValue) {
        setLoading(true);
        // save un zustand state
        setSearch(searchValue);
        // go to search page
        await router.push(`/search`);
        setSearchValue("");
        setLoading(false);
      }
    };
    void makeSearch();
  }, [router, searchValue, setSearch]);

  return (
    <div onMouseLeave={() => setHoverOptions(false)}>
      {/* topbar */}
      <div
        className={`relative flex h-[60px] w-full transition-colors duration-100 ease-in-out ${
          hoverOptions ? "bg-slate-950" : "bg-[#466488]"
        }`}
      >
        {/* logo */}
        <div
          onMouseEnter={() => setHoverOptions(false)}
          className="absolute bottom-0 left-0 top-0 z-10 my-auto flex h-full w-[203px] cursor-pointer items-center justify-center bg-white"
        >
          <Link href="/dashboard">
            <Image className="h-10 cursor-pointer" src={LogoSvg} alt="Logo" />
          </Link>
        </div>
        {/* center items */}
        <div className="absolute left-0 right-0 mx-auto inline-flex h-full items-center justify-center gap-8">
          <MousePointerSquare
            onMouseEnter={() => setHoverOptions(true)}
            className="cursor-pointer text-white transition duration-150 ease-in-out hover:scale-110"
          >
            Options
          </MousePointerSquare>
          {loading ? (
            <Loader />
          ) : (
            <Debouncer
              value={searchValue}
              setValue={setSearchValue}
              placeholder="Search"
              icon={
                <SearchIcon className="h-[12px] w-[12px] stroke-gray-200" />
              }
            />
          )}
        </div>
        {/* right items */}
        <div className="absolute bottom-0 right-[32px] top-0 my-auto flex items-center gap-2">
          {/* profile picture */}
          <div className="relative ">
            <Image
              className="h-[33px] w-[33px] rounded-full"
              src={profileImgUrl}
              alt="Profile Picture"
              width={33}
              height={33}
            />
            <div className="absolute right-0 top-0 h-1 w-1 rounded-full bg-green-500" />
          </div>
        </div>
      </div>
      {/* overlay */}
      {hoverOptions && (
        <div className="topbar-overlay absolute top-[60px] z-20 h-fit w-full bg-slate-950 p-16">
          <div className="inline-flex h-[95px] w-[348px] items-start justify-start gap-[72px]">
            <div className="inline-flex flex-col items-start justify-start gap-4">
              <div className="text-[17px] font-bold text-white">Pages</div>
              <div className="flex flex-col items-start justify-start gap-2">
                <Link
                  href={"/dashboard"}
                  className="text-base font-normal text-white hover:underline"
                >
                  Dashboard
                </Link>
                <Link
                  href={"/reports/users"}
                  className="text-base font-normal text-white hover:underline"
                >
                  Users administration
                </Link>
                <Link
                  href={"/search"}
                  className="text-base font-normal text-white hover:underline"
                >
                  Search
                </Link>
              </div>
            </div>
            <div className="inline-flex flex-col items-start justify-start gap-4">
              <div className="text-[17px] font-bold text-white">Actions</div>
              <div className="flex flex-col items-start justify-start gap-2">
                <Dialog>
                  <DialogTrigger>
                    <button className="text-base font-normal text-white hover:underline">
                      Add new vendor{" "}
                    </button>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add new vendor</DialogTitle>
                      </DialogHeader>
                      <div className="mb-8 mt-2 flex w-full flex-col gap-6">
                        <hr className="bg-[#e1e1e1]" />
                        <div className="grid w-full grid-cols-2 gap-8">
                          <div className="flex flex-col gap-3">
                            <Label>Company Name</Label>
                            <Input placeholder="Vendor" />
                          </div>
                          <div className="flex  flex-col gap-3">
                            <Label>Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.name}
                                    value={category.name}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid w-full grid-cols-1 gap-8">
                          <div className="flex flex-col gap-3">
                            <Label>Company Details and Contact</Label>
                            <Textarea placeholder="Description" />
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="default"
                            className="!rounded-full  !px-8"
                          >
                            Close
                          </Button>
                        </DialogClose>
                        <Button
                          type="button"
                          variant="primary"
                          className="!rounded-full !px-8"
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
                <button
                  onClick={handleClickSignOut}
                  className="text-base font-normal text-white hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
