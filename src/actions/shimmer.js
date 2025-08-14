import React from "react";
import { ShimmerThumbnail, ShimmerText } from "react-shimmer-effects";
import { ShimmerTitle } from "shimmer-effects-react";

export const renderShimmerPlaceholders = (count = 4) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div className="horizontal-cards" key={index}>
        <ShimmerThumbnail height={80} width={100} />
        <div>
          <ShimmerText line={3} gap={10} />
          <ShimmerText line={3} gap={5} />
        </div>
      </div>
    ))}
  </>
);

export const renderShimmerThumbnail = (
  count = 4,
  height = "100px",
  width = "100%"
) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index}>
          <ShimmerThumbnail height={Number(height)} width={Number(width)} />
        </div>
      ))}
  </>
);

export const RenderShimmerCard = ({ count = 4, height = 400 }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <div className="shimmer__card" key={index}>
          <ShimmerThumbnail width="100%" height={height} radius="8px" />
        </div>
      ))}
  </>
);

export const RenderShimmerTitle = ({ line = 1, gap = 0 }) => (
  <>
    <ShimmerTitle mode="light" line={1} gap={0} />
  </>
);

export const renderShimmerParagraph = (lines = 4, count = 1) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <div
          className="shimmer__paragraph"
          key={index}
          style={{ marginBottom: "1rem" }}
        >
          <ShimmerText line={lines} gap={15} variant="secondary" />
        </div>
      ))}
  </>
);
