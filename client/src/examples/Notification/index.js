import React from "react";
import MDSnackbar from "components/MDSnackbar";

const icons = [
  {
    icon: "check",
    color: "success",
  },
  {
    icon: "notifications",
    color: "info",
  },
  {
    icon: "star",
    color: "warning",
  },
  {
    icon: "warning",
    color: "error",
  },
];

export default function Notification(props) {
  return (
    <MDSnackbar
      color={props.color}
      icon={icons.find((icon) => icon.color === props.color)?.icon}
      title={props.text}
      content={``}
      open={props.open}
      dateTime={``}
      onClose={props.onClose}
      close={() => props.onClose()}
    />
  );
}
