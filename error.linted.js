const text = 'aldj324' + 'sdçfslk';
const neverReassigned = {};
neverReassigned.name = 'filipe melo';
let tobeReassigned = {};
tobeReassigned = {
  name: 'filipe'
};
tobeReassigned = {
  name: 'melo'
};
tobeReassigned = 0;
tobeReassigned = {
  name: 'test'
};
const result = text.split(',').map(letter => letter.toUpperCase()).join('.');
console.log(result);
