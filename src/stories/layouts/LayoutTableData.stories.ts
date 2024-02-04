import type { Meta, StoryObj } from "@storybook/react";
import { LayoutTableData } from "~/layouts/LayoutTableData";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "layouts/LayoutTableData",
  component: LayoutTableData,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  //   argTypes: {
  //       backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof LayoutTableData>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [["hello"], ["world"]];
const columns = ["first"];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: "LayoutTableData",
    description: "LayoutTableData description",
    rows,
    columns,
  },
};

export const WithSearch: Story = {
  args: {
    title: "LayoutTableData",
    description: "LayoutTableData description",
    rows,
    columns,
    search: "hello",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSearch: () => {},
  },
};

export const WithFilters: Story = {
  args: {
    title: "LayoutTableData",
    description: "LayoutTableData description",
    rows,
    columns,
    filter: "hello",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setFilter: () => {},
    filters: [
      {
        label: "hello",
        value: "world",
      },
      {
        label: "world",
        value: "hello",
      },
    ],
  },
};

export const WithPagination: Story = {
  args: {
    title: "LayoutTableData",
    description: "LayoutTableData description",
    rows,
    columns,
    page: 1,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setPage: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleNext: async () => {},
    totalPages: 2,
    totalElements: 2,
  },
};
