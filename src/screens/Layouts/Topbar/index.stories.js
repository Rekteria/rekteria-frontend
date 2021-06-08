import React from "react";
import Topbar from "./index";

export default {
  title: "Components/Topbar",
  component: Topbar,
};

const Template = (args) => <Topbar  {...args}/>;

export const FullScreen = Template.bind({});
FullScreen.args = {
  currentStatus: 'Server Online!',
};
