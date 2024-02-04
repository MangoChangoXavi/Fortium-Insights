import type { Meta, StoryObj } from "@storybook/react";
import { UIDebouncer } from "~/components/system/ui/UIDebouncer";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/UIDebouncer",
  component: UIDebouncer,
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
} satisfies Meta<typeof UIDebouncer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: "Value",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setValue: () => {},
  },
};

export const WithDebounceTime: Story = {
  args: {
    value: "Value",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setValue: () => {},
    debounceTime: 1000,
  },
};

export const WithPlaceholder: Story = {
  args: {
    value: "",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setValue: () => {},
    placeholder: "Placeholder",
  },
};
