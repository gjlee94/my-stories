import { Flex } from "@/components/common/Flex";
import { Typography } from "@/components/common/Typography";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Button } from "@/components/common/Button";

const ErrorContainer = styled(Flex)`
  width: 100%;
  height: 100vh;
  background-color: white;
`;

export default function ErrorPage() {
  const router = useRouter();
  const { message, previousPath } = router.query;

  const handleRetry = () => {
    if (previousPath) {
      router.push(previousPath as string).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <ErrorContainer direction="column" justify="center" align="center" gap={20}>
      <Typography variant="title1">Error</Typography>
      <Typography variant="body1">예상치 못한 오류가 발생했습니다.</Typography>
      {message && (
        <Typography variant="body4" css={{ color: "red" }}>
          {message}
        </Typography>
      )}
      <Button onClick={handleRetry}>다시 시도</Button>
    </ErrorContainer>
  );
}
