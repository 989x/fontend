// _________________________ using lodash

// import _ from "lodash";

// export const paginate = (items, pageNumber, pageSize) => {
//   const startIndex = (pageNumber - 1) * pageSize;
//   return _(items).slice(startIndex).take(pageSize).value();
// };

// _________________________ deleted lodash

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};
