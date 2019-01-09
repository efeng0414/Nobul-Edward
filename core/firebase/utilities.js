// For use with Firebase `child_added` listeners:
const insertSibling = function(siblings, snapshot, prevSiblingKey) {
  let data = [...siblings];

  if (prevSiblingKey === null) {
    data = [snapshot, ...data];
  } else {
    const prevSiblingIndex = data.findIndex(s => {
      return s.key === prevSiblingKey;
    });

    if (prevSiblingIndex >= 0) {
      data.splice(prevSiblingIndex, 0, snapshot);
    } else {
      data = [...data, snapshot];
    }
  }

  return data;
};

const orderSnapshots = function(snapshots = [], key = "createdAt") {
  return snapshots.sort((a, b) => {
    const aValue = a.val()[key];
    const bValue = b.val()[key];
    if (aValue != bValue) {
      return aValue < bValue ? 1 : -1;
    } else {
      return 0;
    }
  });
};

const mergeSnapshotArrays = function(
  snapshotArrays = [],
  sortKey = "createdAt"
) {
  const allSnapshots = snapshotArrays.reduce((all, snapshots) => {
    return all.concat(snapshots);
  }, []);

  return orderSnapshots(allSnapshots, sortKey);
};

const getChildrenFromSnapshot = function(snapshot) {
  const children = [];
  snapshot.forEach(child => {
    children.push(child);
  });
  return children;
};

const createObjectFromArray = array => {
  let object = {};
  array.forEach(element => {
    object[element] = true;
  });
  return object;
};

export {
  insertSibling,
  orderSnapshots,
  mergeSnapshotArrays,
  getChildrenFromSnapshot,
  createObjectFromArray
};
