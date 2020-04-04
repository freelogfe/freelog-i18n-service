import { app, assert } from 'midway-mock/bootstrap'

test('test/app/controller/i18nRepository.ts', () => {

})

const tree = {
  value: 3,
  leftNode: {
    value: 2,
    rightNode: {
      value: 3
    }
  },
  rightNode: {
    value: 3,
    rightNode: {
      value: 1
    }
  }
}
function getMax(tree) {
  let max = 0
  if (tree != null) {
    const leftNode = tree.leftNode
    const rightNode = tree.rightNode
    if (leftNode == null && leftNode == null) {
      max = tree.value
    } else if (leftNode == null || rightNode == null) {
      const tmpNode = leftNode || rightNode
      max = tree.value + getMax(tmpNode.leftNode.value) + getMax(tmpNode.rightNode.value)
    } else {
      const tmpMax1 = getMax(leftNode) + getMax(rightNode)
      const tmpMax2 = tree.value + getMax(leftNode.leftNode) + getMax(leftNode.rightNode) + getMax(rightNode.leftNode) + getMax(rightNode.rightNode)
      max = Math.max(tmpMax1, tmpMax2)
    }
  }
  return max
}

getMax(tree)

function ListNode(val) {
  this.val = val
  this.next = null
}
function addTwoNumber(l1, l2) {
  if (l1 == null || l2 == null) return l1 || l2
  const outPut = new ListNode(-1)
  let tmpL = outPut
  let carry = 0
  while (l1 != null && l2 != null) {
    const sum = l1.val + l2.val + carry
    if (sum >= 10) {
      carry = 1
      tmpL.next = new ListNode(sum % 10)
    } else {
      carry = 0
      tmpL.next = new ListNode(sum)
    }
    tmpL = tmpL.next
    l1 = l1.next
    l2 = l2.next
  }
  let remainL = l1 || l2
  while (remainL != null) {
    const sum = remainL.val + carry
    carry = 0
    tmpL.next = new ListNode(sum)
    remainL = remainL.next
  }
  if (carry === 1) {
    tmpL.next = new ListNode(1)
  }
  return outPut.next
}
