import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

type CustomSkeletonProps = {
  variant?: "vertical" | "horizontal";
};
export default function CustomSkeleton({ variant }: CustomSkeletonProps) {
  return (
    <>
      <Box className={` gap-4 p-5 rounded-lg border border-border bg-card ${variant === "vertical" ? "min-w-[240px]" : "max-w-[240px]"}`}>
        <Skeleton variant="sharp" className="h-[150px] bg-border" />
        <SkeletonText _lines={3} className="h-3 bg-border" />
        <HStack className="gap-2 align-middle">
          <Skeleton
            variant="circular"
            className="h-[24px] w-[24px] mr-2 bg-border"
          />
          <SkeletonText _lines={2} gap={1} className="h-2 w-2/5 bg-border" />
        </HStack>
      </Box>
    </>
  );
}
