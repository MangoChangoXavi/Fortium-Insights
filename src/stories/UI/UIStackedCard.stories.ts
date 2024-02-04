import type { Meta, StoryObj } from "@storybook/react";
import { UIStackedCard } from "~/components/UI/UIStackedCard";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/UIStackedCard",
  component: UIStackedCard,
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
} satisfies Meta<typeof UIStackedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1612833609248-5b8b6b7b9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZCUyMGJhY2tncm91bmQlMjBjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
};

export const WithSize: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1612833609248-5b8b6b7b9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZCUyMGJhY2tncm91bmQlMjBjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    size: "md",
  },
};

export const WithChildren: Story = {
  args: {
    imageSrc:
      "https://images.unsplash.com/photo-1612833609248-5b8b6b7b9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZCUyMGJhY2tncm91bmQlMjBjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    children: "Children",
  },
};
