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

  let pageIds: ID[] = [];
  if (viewId) {
    const vId = idToUuid(viewId);
    pageIds = views[vId]?.blockIds;
  } else {
    const pageSet = new Set<ID>();
    // * type not exist
    Object.values(views).forEach((view: any) => {
      view?.collection_group_results?.blockIds?.forEach((id: ID) =>
        pageSet.add(id)
      );
    });
    pageIds = [...pageSet];
  }
  return pageIds;
}
