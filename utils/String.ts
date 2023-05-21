export const createHref = ({
  collection,
  id,
  name,
}: {
  collection: string;
  id: string;
  name: string;
}) => `/${collection}/${id}/${name.replaceAll(" ", "-").toLocaleLowerCase()}`;
