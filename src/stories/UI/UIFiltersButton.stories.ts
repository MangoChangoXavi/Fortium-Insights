import type { Meta, StoryObj } from "@storybook/react";
import { UIFiltersButtons } from "~/components/UI/UIFiltersButtons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/UIFiltersButtons",
  component: UIFiltersButtons,
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
} satisfies Meta<typeof UIFiltersButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    filters: [
      {
        label: "Filter 1",
        value: "filter1",
      },
      {
        label: "Filter 2",
        value: "filter2",
      },
      {
        label: "Filter 3",
        value: "filter3",
      },
    ],
    filter: "filter1",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setFilter: () => {},
  },
};
