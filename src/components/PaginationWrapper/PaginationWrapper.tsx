import { IPaginationProps } from "../../interfaces";
import Pagination from "../Pagination/Pagination";
import React from "react";
interface Props {
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
}

const PaginationWrapper = ({
  top,
  bottom,
  children,
  ...paginationProps
}: Props & IPaginationProps) => {
  return (
    <>
      {top && <Pagination {...paginationProps} />}
      {children}
      {bottom && <Pagination {...paginationProps} />}
    </>
  );
};

export default PaginationWrapper;
