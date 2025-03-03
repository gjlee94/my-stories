import styled from "@emotion/styled";
import { Emoticon, emoticonSet } from "./Emoticon";
import { Flex } from "../common/Flex";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queries } from "@/query/queries";
import { addReaction } from "@/apis/reactions";

type EmoticonType = "like" | "dislike" | "heart";

const Wrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #ccc;
`;

export const EmoticonBox = ({
  id,
  username,
  token,
}: {
  id: string;
  username: string;
  token: string;
}) => {
  const emotionList = Object.keys(emoticonSet) as Array<
    keyof typeof emoticonSet
  >;

  const reactionQuery = useQuery({
    ...queries.reactions.detail(id),
    staleTime: 0,
  });

  const reactionMutation = useMutation({
    mutationFn: async (payload: { action: EmoticonType; username: string }) => {
      const response = await addReaction(id, payload);
      return response;
    },
    onSuccess: () => {
      reactionQuery.refetch();
    },
    onError: (error: any) => {
      alert("권한이 만료되었습니다. 다시 로그인해주세요.");

      sessionStorage.removeItem("accessToken");

      window.location.reload();
    },
  });

  const onReactionClick = async (reaction: EmoticonType) => {
    reactionMutation.mutate({ action: reaction, username });
  };

  const clickedBy = (key: EmoticonType) => {
    switch (key) {
      case "like":
        return reactionQuery.data?.likedBy?.join(",") ?? "";
      case "dislike":
        return reactionQuery.data?.dislikedBy?.join(",") ?? "";
      case "heart":
        return reactionQuery.data?.heartedBy?.join(",") ?? "";
    }
  };

  return (
    <Wrapper>
      <Flex gap={8} css={{ flexWrap: "wrap" }}>
        {emotionList.map((key) => (
          <Emoticon
            disabled={!token}
            active={clickedBy(key).includes(username)}
            key={key}
            type={key}
            count={reactionQuery.data?.[`${key}Count`] ?? 0}
            clickedBy={clickedBy(key)}
            onClick={() => onReactionClick(key)}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};
