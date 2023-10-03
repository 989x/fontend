// _________________________ version 1.1

export const paginate1 = (items, pageNumber, pageSize) => {
  // Check if items is null or undefined
  if (items === null || items === undefined) {
    // You can handle this error however you prefer, such as returning an empty array or throwing an error.
    // For simplicity, let's return an empty array here.
    return [];
  }

  const startIndex = (pageNumber - 1) * pageSize;
  
  // Ensure that startIndex is within the valid range of the items array
  if (startIndex < 0 || startIndex >= items.length) {
    // You can handle this error case as well. For now, let's return an empty array.
    return [];
  }

  return items.slice(startIndex, startIndex + pageSize);
};

// _________________________ version 1.2.2

export const paginate2 = <T>(items: T[] | null | undefined, pageNumber: number, pageSize: number): T[] => {
  // Check if items is falsy (null, undefined, or an empty array)
  if (!items || items.length === 0) {
    // You can handle this error however you prefer, such as returning an empty array or throwing an error.
    // For simplicity, let's return an empty array here.
    return [];
  }

  const startIndex = (pageNumber - 1) * pageSize;

  // Ensure that startIndex is within the valid range of the items array
  if (startIndex < 0 || startIndex >= items.length) {
    // You can handle this error case as well. For now, let's return an empty array.
    return [];
  }

  return items.slice(startIndex, startIndex + pageSize);
};

