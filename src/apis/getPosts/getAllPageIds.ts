import { ExtendedRecordMap, ID } from "notion-types";
import { idToUuid } from "notion-utils";

type PageIds = ID[];

export default function getAllPageIds(
  response: ExtendedRecordMap,
  viewId?: string
): PageIds {
  /** 데이터베이스의 쿼리 결과 */
  const collectionQuery = response.collection_query;

  const views = Object.values(collectionQuery)[0];

  if (viewId !== undefined) {
    return views[idToUuid(viewId)].blockIds;
  }

  return Object.values(views).flatMap(
    (view: any) => view?.collection_group_results?.blockIds || []
  );
}
