import React from "react";
import ComingEventsWidget from "./ComingEventsWidget";

export default {
  title: "Components/ComingEventsWidget",
  component: ComingEventsWidget,
};

const Template = (args) => <ComingEventsWidget  {...args}/>;

export const FullScreen = Template.bind({});
