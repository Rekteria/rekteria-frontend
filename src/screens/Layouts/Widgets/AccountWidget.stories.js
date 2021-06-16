import React from "react";
import AccountWidget from "./AccountWidget2";

export default {
  title: "Components/AccountWidget",
  component: AccountWidget,
};

const AccountWidgetTemplate = (args) => <AccountWidget  {...args}/>;

export const LoggedOut = AccountWidgetTemplate.bind({});
export const LoggedIn = AccountWidgetTemplate.bind({});
LoggedIn.args = {
  account: {
    name: 'Morpheus'
  }
}
