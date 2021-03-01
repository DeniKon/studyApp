export function isEqual(obj1, obj2): boolean {
    const props1 = Object.getOwnPropertyNames(obj1);
    const props2 = Object.getOwnPropertyNames(obj2);
    if (props1.length !== props2.length) {
      return false;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < props1.length; i++) {
      const prop = props1[i];
      if (obj1[prop] !== obj2[prop]) {
        return false;
      }
    }
    return true;
  }