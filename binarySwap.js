// binarySwap(array, index1, index2)
function binarySwap(A, a, b)
{
    if (a == b) return;

    var c = parseInt((a+b)/2);
    var tmp = A[a];

    A[a] = A[b];
    A[b] = tmp;
    binarySwap(A, a, c);
    binarySwap(A, c+1, b);

    return A;
}
/*
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var newArr = binarySwap(arr, 3, 6); //newArr = [1, 2, 3, 5, 7, 4, 6, 8]
*/
