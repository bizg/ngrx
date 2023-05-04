export const getThisState = (stateName: any) => {
  try {
    const serializedState = localStorage.getItem(stateName);
    if(serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
}

export const getItem = (itemName: any) => {
  const items = getThisState(itemName);
  if(items === undefined) {
    return {todos : []}
  } else {
    return items;
  }
}

export const saveItem = (key: string, data: any) => {
  const serializedState = JSON.stringify(data);
  localStorage.setItem(key, serializedState);
}

export const getItemByKey = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if(serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export const deleteItemByKey = (key: string) => localStorage.setItem(key, '');

export const emptyLocalStorage = (reducerkeys: any) => {
  try {
    if(reducerkeys != undefined && reducerkeys.length) {
      reducerkeys.forEach((key: string) => {
        localStorage.setItem(key, '');
      });
    }
  } catch (error) {
    console.log("error emptying localstorage");
  }
}

export const clearStorage = () => {
  localStorage.clear();
}
