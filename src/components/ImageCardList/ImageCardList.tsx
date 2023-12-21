import { FC, Fragment } from "react";
import type { GiphyResponse } from "@/types/Giphy";
import ImageCard from "../ImageCard/ImageCard";
import { Button, Stack, Typography } from "@mui/material";
import ImageCardListSkeleton from "./ImageCardListSkeleton";
import styles from "./ImageCardList.module.scss";
import { InfiniteData } from "@tanstack/react-query";
import NoInternetIcon from "@mui/icons-material/WifiOff";
import { UseUserLikes } from "@/hooks/useUserLikes";

interface ImageCardListProps extends UseUserLikes {
  status: "loading" | "success" | "error";
  isFetching: boolean;
  isFetchingNextPage: boolean;
  data?: InfiniteData<GiphyResponse>;
  hasNextPage?: boolean;
  error: unknown;
  observerRef: (node: HTMLDivElement) => void;
  refetch: () => Promise<void>;
}

const ImageCardList: FC<ImageCardListProps> = ({
  status,
  isFetching,
  isFetchingNextPage,
  data,
  error,
  hasNextPage,
  likes,
  addLike,
  removeLike,
  refetch,
  observerRef,
}) => {
  const isError = error !== null;
  const isLoadingFirstPage = isFetching && !isFetchingNextPage;

  if (status === "loading" && isLoadingFirstPage) {
    return <ImageCardListSkeleton />;
  }

  if (data === undefined || isError) {
    return (
      <Stack justifyContent="center" alignItems="center" mt={4}>
        <NoInternetIcon className={styles.NoInternetIcon} />
        <Typography mb={3}>No Data found</Typography>
        <Button variant="contained" onClick={refetch}>
         Re-enter
        </Button>
      </Stack>
    );
  }

  return (
    <Fragment>
      <Stack className={styles.ImageCardList}>
        {data.pages.map((group, idx) => (
          <Fragment key={`group-trending-${idx}`}>
            {group.data.map(({ id, images }, index) => (
              <ImageCard
                key={`image-${id}-idx-${index}`}
                id={id}
                imageUrl={images.original.webp}
                placeholderUrl={images.preview_webp.url}
                likes={likes}
                addLike={addLike}
                removeLike={removeLike}
              />
            ))}
          </Fragment>
        ))}
      </Stack>
      {hasNextPage && (
        <>
          <ImageCardListSkeleton />
          {!isFetchingNextPage && <div ref={observerRef} />}
        </>
      )}
    </Fragment>
  );
};

export default ImageCardList;
