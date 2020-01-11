
export const exists = (arr, f) =>
  arr.reduce((acc, el) => f(el) | acc, false)

export const map_obj_as_arr = (obj, fun) =>
  Object.keys(obj).map(key => fun(obj[key], key))

export const map_obj_as_obj = (obj, fun) => {
  const result = {};
  Object.keys(obj).forEach(key => {
    result[key] = fun(obj[key], key)
  });
  return result;
}