import { Flex } from "./common/Flex";
import { Typography } from "./common/Typography";

export const Categories = ({ categories }: { categories: string[] }) => {
  return (
    <Flex as="section" direction="column">
      <Typography as="h1" variant="title5">
        🗂️ 카테고리
      </Typography>
      <ul>
        {categories.map((category) => (
          <li>
            <Typography variant="body4">{category}</Typography>
          </li>
        ))}
      </ul>
    </Flex>
  );
};
