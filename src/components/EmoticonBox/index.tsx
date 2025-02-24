import styled from "@emotion/styled";
import { Emoticon, emoticonSet } from "./Emoticon";
import { Flex } from "../common/Flex";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queries } from "@/query/queries";
import { addReaction } from "@/apis/reactions";
import { useState } from "react";
import { queryClient } from "@/query/queryClient";

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

  const reactionQuery = useQuery(queries.reactions.detail(id));
  const reactionMutation = useMutation({
    mutationFn: async (payload: { action: EmoticonType; username: string }) => {
      return await addReaction(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queries.reactions.detail(id));
    },
    onError: (error: any) => {
      alert("권한이 만료되었습니다. 다시 로그인해주세요.");

      sessionStorage.removeItem("accessToken");

      window.location.reload();
    },
  });

  const onReactionClick = (reaction: EmoticonType) => {
    reactionMutation.mutate({ action: reaction, username });
  };

  console.log("reactions", reactionQuery.data);
  return (
    <Wrapper>
      <Flex gap={8}>
        {emotionList.map((key) => (
          <Emoticon
            disabled={!token}
            key={key}
            type={key}
            count={0}
            onClick={() => onReactionClick(key)}
          />
        ))}
      </Flex>
    </Wrapper>
  );
};
