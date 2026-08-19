"use client";
import { memo } from "react";
import { useParams, redirect } from "next/navigation";

const Page = () => {
  const { project } = useParams();

  redirect(`/projects/${project}/overview`);
};

export default memo(Page);
