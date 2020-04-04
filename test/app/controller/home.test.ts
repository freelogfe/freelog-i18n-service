import { app, assert } from 'midway-mock/bootstrap'

describe('test/app/controller/home.test.ts', () => {

  it('should assert', async () => {
    const pkg = require('../../../package.json');
    console.log(app.config)
    assert(app.config.keys.startsWith(pkg.name));
    // const ctx = app.mockContext({});
    // await ctx.service.xx();
  });

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('Welcome to midwayjs!')
      .expect(200);
  });
});

function findMedianSortedArrays(arr1, arr2) {
  let m = arr1.length
  let n = arr2.length
  if (m > n) {
    const tmpArr = arr1
    arr1 = arr2
    arr2 = tmpArr
    const tmpL = m
    m = n
    n = tmpL
  }
  let [ min, max ] = [ 0, m ]
  const halfLeng = Math.floor((n + m + 1) / 2)

  while (min < max) {
    const i = Math.floor((min + max) / 2)
    const j = halfLeng - i
    if (i < max && arr2[j - 1] > arr1[i]) {
      min = i + 1
    } else if (i > min && arr1[i - 1] > arr2[j]) {
      max = i - 1
    } else {
      let left = 0
      if (i === 0) {
        left = arr2[j - 1]
      } else if (j === 0) {
        left = arr1[i - 1]
      } else {
        left = Math.max(arr1[i - 1], arr2[j - 1])
      }
      if ((m + m) % 2 === 1) { return left }
      let right = 0
      if (i === m) {
        right = arr2[j]
      } else if (j === m) {
        right = arr1[i]
      } else {
        right = Math.min(arr1[i], arr2[j])
      }
      return (left + right) / 2.0
    }
  }
  return 0.0
}
